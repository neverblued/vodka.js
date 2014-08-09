var format = require('./format');
var model = require('./model');
// var automat = require('./automat');
// var technology = require('./technology');

model.fluid.prototype.toString = function(){
	return format.symbol(this.name);
};

model.mix.prototype.toString = function(){
	var list = [];
	for(var name in this.content){
		var volume = this.content[name];
		list.push(format.measure(volume, model.fluid.get(name)));
	}
	if(list.length){
		list.reverse();
		return '{ ' + list.join(' ') + ' }';
	}else{
		return '{}';
	}
};

model.schnapps.prototype.toString = function(){
	var mix = format.measure(this.volume(), model.mix.prototype.toString.call(this));
	var title = '(' + format.strength(this.strength()) + ')' + 'schnapps';
	return format.symbol(title) + '^' + mix;
};

model.tank.prototype.toString = function(){
	return format.measure(this.limit, format.symbol('tank')) + '^' + this.mix;
};

/*
automat.method.prototype.toString = function(){
	return format.method(
		this.action + ' ' + this.source +
		(this.target.length ? (', ' + this.target.join(', ')) : '')
	);
};

technology.prototype.toString = function(){
	return format.symbol('technology');
};

technology.option.prototype.toString = function(){
	return '#T(' + this.title + ')';
};
*/
