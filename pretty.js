var model = require('./model'),
	format = require('./format');

model.substance.prototype.toString = function(){
	return format.symbol(this.name);
};

model.tank.prototype.toString = function(){
	return format.symbol('tank')
		+ '{ ' + this.mix + ' }'
		+ '=' + format.volume(this.limit);
};

model.schnapps.prototype.toString = function(){
	return format.symbol('schnapps')
		+ '(' + format.strength(this.strength()) + ')'
		+ '=' + format.volume(this.volume());
};
