var format = require('../format');
var domain = require('./index');

domain.fluid = function(name){
	this.name = name;
	domain.fluid.element[name] = domain[name] = this;
};

domain.fluid.element = {};

domain.fluid.get = function(name){
	if(!domain.fluid.element[name]){
		throw 'undefined fluid ' + name;
	}
	return domain.fluid.element[name];
};

domain.fluid.prototype.pour = function(volume, mix){
	if(volume < 0){
		throw 'negative volume ' + volume + ' of ' + this + ' is not valid';
	}
	console.log(format.action('pour ' + format.measure(volume, this) + ' into ' + mix));
	return mix.add(volume, this);
};

new domain.fluid('water');
new domain.fluid('alcohol');
