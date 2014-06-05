var format = require('./format');

var automat = module.exports = function(constructor){
	console.log(format.action('initialize'));
	this.initialize = constructor;
	this.sequence = [];
	this.reset();
	console.log(format.header('prepare'));
};

var interface = automat.interface = {
	
	run: function(action, target){
		var lambda = this[action];
		if(typeof lambda !== 'function'){
			throw 'invalid method ' + action + ' of ' + this;
		}
		lambda.apply(this, target);
	}
};

interface.conform = function(it){
	it.prototype.run = interface.run;
};

// scope

automat.prototype.name = function(it){
	return typeof it === 'string' && it.length > 0;
};

automat.prototype.take = function(name, object){
	if(!this.name(name)){
		throw 'invalid name ' + name;
	}
	console.log(format.action('take ' + name));
	this.data[name] = object;
	return this;
};

automat.prototype.get = function(it){
	if(this.name(it)){
		return (typeof this.data[it] === 'undefined') ? null : this.data[it];
	}else{
		return it;
	}
};

automat.prototype.validator = undefined;

automat.prototype.check = function(predicate){
	this.validator = predicate;
	return this;
};

// method

var method = automat.method = function(action, source){
	this.action = action;
	this.source = source;
	this.target = Array.prototype.slice.call(arguments, 2) || [];
};

method.prototype.master = undefined;

method.prototype.check = function(){
	if(!this.master.name(this.action)){
		throw 'invalid action ' + this.action;
	}
	if(!this.master.name(this.source)){
		throw 'invalid source ' + this.source;
	}
};

method.prototype.host = function(master){
	this.master = master;
	this.check();
	console.log('' + this);
	return this;
};

method.prototype.run = function(){
	console.log(format.action(this));
	if(!this.master){
		throw 'no master';
	}
	var source = this.source && this.master.get(this.source);
	if(!source){
		throw 'no source ' + this.source;
	}
	var target = [];
	for(var limit = this.target.length, index = 0; index < limit; index++){
		target[index] = this.master.get(this.target[index]);
	}
	return source.run.call(source, this.action, target);
};

// action

automat.prototype.step = function(method){
	return this.sequence[this.sequence.length] = method.host(this);
};

automat.prototype.perform = function(step){
	var method = this.sequence[step];
	if(!method){
		throw 'empty step ' + step + ' method ' + method;
	}
	if(typeof method.run !== 'function'){
		throw 'step ' + step + ' method ' + method + ' is not callable';
	}
	return method.run();
};

automat.prototype.reset = function(){
	console.log(format.action('reset'));
	if(this.data){
		delete this.data;
	}
	this.data = {};
	this.initialize.call(this);
	return this;
};

automat.prototype.each = function(lambda){
	for(var limit = this.sequence.length, index = 0; index < limit; index++){
		lambda.call(this, index);
	}
	return this;
};

automat.prototype.test = function(){
	return this.validator.call(this);
};

automat.prototype.run = function(){
	console.log(format.header('run'));
	this.reset();
	this.each(function(step){
		this.perform(step);
		if(this.test()){
			console.log(format.success());
			throw this.data;
		}
	});
	return this.data;
};
