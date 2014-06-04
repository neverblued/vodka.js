var format = require('./format');
var automat = require('./automat');

// fluid

var fluid = exports.fluid = function(name){
	this.name = name;
	fluid.element[name] = exports[name] = this;
};

automat.interface.conform(fluid);

fluid.element = {};

fluid.get = function(name){
	if(!fluid.element[name]){
		throw 'undefined fluid ' + name;
	}
	return fluid.element[name];
};

fluid.prototype.pour = function(volume, mix){
	if(volume < 0){
		throw 'negative volume ' + volume + ' of ' + this + ' is not valid';
	}
	console.log(format.action('pour ' + format.measure(volume, this) + ' into ' + mix));
	return mix.add(volume, this);
};

new fluid('water');
new fluid('alcohol');

// mix

var mix = exports.mix = function(){
	this.empty();
};

automat.interface.conform(mix);

mix.prototype.empty = function(){
	this.content = {};
	return this;
};

mix.prototype.find = function(name){
	return (typeof this.content[name] === 'undefined') ? null : this.content[name];
};

mix.prototype.add = function(volume, ingredient){
	console.log(format.action('add ' + format.measure(volume, ingredient) + ' to ' + this));
	var name = ingredient.name;
	if(!this.find(name)){
		this.content[name] = 0;
	}
	this.content[name] += volume;
	this.container && this.container.check();
	return this;
};

mix.prototype.merge = function(target){
	console.log(format.action('merge ' + this + ' with ' + target));
	if(typeof target.add !== 'function'){
		throw target + ' has no method add';
	}
	for(var name in this.content){
		var ingredient = fluid.get(name);
		var volume = this.content[name];
		target.add(volume, ingredient);
	}
	this.empty();
	target.check && target.check();
	return target;
};

mix.prototype.pour = function(volume){
	console.log(format.action('pour ' + format.measure(volume) + ' from ' + this));
	var total = this.volume();
	if(total < volume){
		throw 'can not pour more than total volume';
	}
	var difference = new mix;
	for(var name in this.content){
		var part = this.content[name];
		var delta = volume * (part / total);
		this.content[name] -= delta;
		difference.add(delta, fluid.get(name));
	}
	return difference;
};

mix.prototype.volume = function(){
	var total = 0;
	for(var name in this.content){
		var volume = this.content[name];
		total += volume;
	}
	return total;
};

mix.prototype.compare = function(another){
	var difference = Object.clone(this.content), name, volume;
	for(name in another){
		volume = another[name];
		if(typeof difference[name] === 'undefined'){
			difference[name] = 0;
		}
		difference[name] = -volume;
	}
	var result = new mix;
	for(name in difference){
		volume = difference[name];
		result.add(volume, liquid.get(name));
	}
	return result;
};

// tank

var tank = exports.tank = function(limit, content){
	this.limit = limit;
	this.mix = content || new mix;
	this.mix.container = this;
};

automat.interface.conform(tank);

tank.prototype.volume = function(){
	return this.mix.volume();
};

tank.prototype.empty = function(){
	return this.mix.empty();
};

tank.prototype.add = function(volume, ingredient){
	if(this.volume() + volume > this.limit){
		throw 'volume excess attempt';
	}
	return this.mix.add(volume, ingredient);
};

tank.prototype.check = function(){
	var volume = this.mix.volume();
	if(volume < 0){
		throw 'negative volume' + this;
	}else if(volume > this.limit){
		throw 'volume limit excess' + this;
	}
	if(volume === 0){
		console.log(format.status('empty ' + this));
	}else if(volume === this.limit){
		console.log(format.status('full ' + this));
	}else{
		console.log(format.status(this));
	}
	return this;
};

tank.prototype.space = function(){
	return this.limit - this.mix.volume();
};

tank.prototype.fill = function(source){
	console.log(format.action('fill ' + this + ' with ' + source));
	source.pour(this.space(), this);
	if(this.mix.volume() !== this.limit){
		throw 'not full ' + this;
	}
	return this;
};

tank.prototype.pour = function(target){
	console.log(format.action('pour from ' + this + ' to ' + target));
	if(target){
		this.mix.pour(Math.min(this.volume(), target.space())).merge(target);
	}else{
		this.empty();
	}
	return this;
};

// schnapps

var schnapps = exports.schnapps = function(){
	mix.prototype.constructor.call(this);
};
schnapps.prototype = Object.create(mix.prototype);

schnapps.prototype.strength = function(){
	if(!this.content.water){
		return this.content.alcohol ? 1 : 0;
	}
	if(!this.content.alcohol){
		return 0;
	}
	return this.content.alcohol / this.volume();
};

// view

require('./view');
