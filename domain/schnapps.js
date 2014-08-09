var format = require('../format');
var domain = require('./index');

domain.schnapps = function(){
	domain.mix.prototype.constructor.apply(this, Array.prototype.slice(arguments));
};
domain.schnapps.prototype = Object.create(domain.mix.prototype);

domain.schnapps.prototype.strength = function(){
	if(!this.content.water){
		return this.content.alcohol ? 1 : 0;
	}
	if(!this.content.alcohol){
		return 0;
	}
	return this.content.alcohol / this.volume();
};
