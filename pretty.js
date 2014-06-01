var model = require('./model'),
	format = require('./format');

model.substance.prototype.toString = function(){
	return format.symbol(this.name);
};

model.mix.prototype.toString = function(){
	var list = [];
	for(var name in this.content){
		var volume = this.content[name];
		list.push(format.measure(volume, model.substance.id(name)));
	}
	if(list.length){
		list.reverse();
		return '{ ' + list.join(' ') + ' }';
	}else{
		return '{}';
	}
};

model.schnapps.prototype.toString = function(){
	return format.measure(this.volume(), format.symbol('schnapps'))
		+ '(' + format.strength(this.strength()) + ')'
		+ model.mix.prototype.toString.call(this);
};

model.tank.prototype.toString = function(){
	return format.measure(this.limit, format.symbol('tank')) + '^' + this.mix;
};
