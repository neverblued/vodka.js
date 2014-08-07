var format = require('./format');
var model = require('./model');
var scope = require('./scope');
//var automat = require('./automat');

var technology = module.exports = function(){
	this.result = [];
};

technology.prototype.default = function(){
	return scope();
};

technology.prototype.draft = function(){
	return this.bestIndex && this.result[this.bestIndex] || this.default();
};

technology.prototype.record = function(){
};

technology.prototype.experiment = function(){
	var input = this.draft();
	var method = this.method(input);
	var output;
	try{
		output = this.automat.perform(input, method);
	}catch(condition){
		output = condition;
	}
	this.record(input, method, output);
};

/*
var technology = module.exports = function(automat){
	this.automat = automat;
	this.methods = [];
};

technology.option = function(automat, title, clause, action){
	this.automat = automat;
	this.title = title;
	this.clause = clause;
	this.action = action;
};

technology.option.prototype.check = function(){
	return this.clause.call(this.automat);
};

technology.option.prototype.perform = function(){
	this.action.call(this.automat);
};

technology.prototype.option = function(title, clause, action){
	var option = new technology.option(this.automat, title, clause, action);
	this.methods[this.methods.length] = option;
	return this;
};

technology.prototype.randomMethod = function(){
	return this.methods[Math.floor(Math.random() * this.methods.length)];
};

technology.prototype.random = function(length){
	var chain = [];
	for(var index = 0; index < length; index++){
		chain[chain.length] = this.randomOption();
	}
	return chain;
};
*/


/*
//technology.prototype.comparative = function(method1, method2){
//};
//
technology.prototype.method = function(data){
	return this.randomMethod();
//	var technology = this;
//	technology.methods.sort(function(method1, method2){
//		return technology.comparative.call(data, method1, method2);
//	});
//	return technology.methods[0];
};
*/
