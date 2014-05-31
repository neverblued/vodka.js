var format = require('./format');

var substance = exports.substance = function(name){
	this.name = name;
	exports[name] = this;
};
	
substance.prototype.pour = function(volume, mix){
	if(volume < 0){
		throw 'negative volume ' + volume + ' of ' + this + ' is not valid';
	}
	console.log(format.action('pour ' + format.measure(volume, this) + ' into ' + mix));
	return mix.add(volume, this);
};

var mix = exports.mix = function(){};

mix.prototype.content = {};

mix.prototype.find = function(name){
	return (typeof this.content[name] !== 'undefined') && this.content[name];
};

mix.prototype.add = function(volume, ingredient){
	console.log(format.action('add ' + format.measure(volume, ingredient) + ' to ' + this));
	if(!this.find(ingredient)){
		this.content[ingredient.name] = 0;
	}
	return this.content[ingredient.name] += volume;
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
};

tank.prototype.add = function(volume, ingredient){
	if(this.mix.volume() + volume > this.limit){
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
	console.log(format.action('fill ' + this));
	source.pour(this.space(), this);
	if(this.check() !== this.limit){
		throw 'not full ' + this;
	}
};

var water = new substance('water');
var alcohol = new substance('alcohol');

var schnapps = exports.schnapps = function(){};
schnapps.prototype = Object.create(mix.prototype);

schnapps.prototype.strength = function(){
	if(!this.content.water){
		return this.content.alcohol ? 1 : 0;
	}
	if(!this.content.alcohol){
		return 0;
	}
	return this.content.alcohol / this.content.water;
};

require('./pretty');
