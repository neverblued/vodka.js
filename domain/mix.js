var format = require('../format');
var domain = require('./index');

domain.mix = function(content){
	if(content){
		this.content = content;
	}else{
		this.empty();
	}
};

domain.mix.prototype.empty = function(){
	this.content = {};
	return this;
};

domain.mix.prototype.find = function(name){
	return (typeof this.content[name] === 'undefined') ? null : this.content[name];
};

domain.mix.prototype.add = function(volume, ingredient){
	console.log(format.action('add ' + format.measure(volume, ingredient) + ' to ' + this));
	var name = ingredient.name;
	if(!this.find(name)){
		this.content[name] = 0;
	}
	this.content[name] += volume;
	this.container && this.container.check();
	return this;
};

domain.mix.prototype.merge = function(target){
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

domain.mix.prototype.pour = function(volume){
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

domain.mix.prototype.volume = function(){
	var total = 0;
	for(var name in this.content){
		var volume = this.content[name];
		total += volume;
	}
	return total;
};

domain.mix.prototype.compare = function(another){
	var difference = Object.clone(this.content);
	var name;
	var volume;
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
