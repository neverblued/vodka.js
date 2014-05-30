var substance = exports.substance = function(name){
	this.name = name;
	exports[name] = this;
};
	
substance.prototype.pour = function(mix, volume){
	return mix.add(this, volume);
};

substance.prototype.toString = function(){
	return '#' + this.name.toUpperCase();
};

var mix = exports.mix = function(){};

mix.prototype.content = {};

mix.prototype.find = function(name){
	var content = this.content;
	return (typeof content[name] !== 'undefined') && content[name];
};

mix.prototype.add = function(substance, volume){
	if(volume < 0){
		throw 'can not add negative volume of ' + substance;
	}
	console.log('add ' + volume + ' of ' + substance + ' to ' + this);
	if(!this.find(substance)){
		this.content[substance.name] = 0;
	}
	return this.content[substance.name] += volume;
};

mix.prototype.volume = function(){
	var total = 0;
	for(var name in this.content){
		var volume = this.content[name];
		total += volume;
	}
	return total;
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

schnapps.prototype.toString = function(){
	return ':: '
		+ water + ' = ' + this.content.water + ', '
		+ alcohol + ' = ' + this.content.alcohol + ', '
		+ 'Volume = ' + this.volume() + ', '
		+ 'Strength = ' + this.strength() + '.';
};
