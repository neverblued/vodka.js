var format = require('./format');

var substance = exports.substance = function(name){
	this.name = name;
	substance.element[name] = exports[name] = this;
};

substance.element = {};

substance.id = function(name){
	if(!substance.element[name]){
		throw 'undefined substance ' + name;
	}
	return substance.element[name];
};

substance.prototype.pour = function(volume, mix){
	if(volume < 0){
		throw 'negative volume ' + volume + ' of ' + this + ' is not valid';
	}
	console.log(format.action('pour ' + format.measure(volume, this) + ' into ' + mix));
	return mix.add(volume, this);
};

var mix = exports.mix = function(){
	this.empty();
};

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

mix.prototype.merge = function(destination){
	console.log(format.action('merge ' + this + ' with ' + destination));
	if(typeof destination.add !== 'function'){
		throw destination + ' has no add method';
	}
	for(var name in this.content){
		var ingredient = substance.id(name),
			volume = this.content[name];
		destination.add(volume, ingredient);
	}
	this.empty();
	destination.check && destination.check();
	return destination;
};

mix.prototype.pour = function(volume){
	console.log(format.action('pour ' + format.measure(volume) + ' from ' + this));
	var total = this.volume();
	if(total < volume){
		throw 'can not pour more than total volume';
	}
	var difference = new mix;
	for(var name in this.content){
		var part = this.content[name],
			delta = volume * (part / total);
		this.content[name] -= delta;
		difference.add(delta, substance.id(name));
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

var tank = exports.tank = function(limit, content){
	this.limit = limit;
	this.mix = content || new mix;
	this.mix.container = this;
};

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
	}
	return volume;
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

tank.prototype.pour = function(destination){
	console.log(format.action('pour from ' + this + ' to ' + destination));
	if(destination){
		this.mix.pour(Math.min(this.volume(), destination.space())).merge(destination);
	}else{
		this.empty();
	}
	return this;
};

var water = new substance('water');
var alcohol = new substance('alcohol');

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

require('./pretty');
