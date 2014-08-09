var format = require('../format');
var domain = require('./index');

domain.tank = function(limit, content){
	this.limit = limit;
	this.mix = content || new mix;
	this.mix.container = this;
};

domain.tank.prototype.volume = function(){
	return this.mix.volume();
};

domain.tank.prototype.empty = function(){
	return this.mix.empty();
};

domain.tank.prototype.add = function(volume, ingredient){
	if(this.volume() + volume > this.limit){
		throw 'volume excess attempt';
	}
	return this.mix.add(volume, ingredient);
};

domain.tank.prototype.check = function(){
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
	}else{
		console.log(format.status(this));
	}
	return this;
};

domain.tank.prototype.void = function(){
	return this.limit - this.mix.volume();
};

domain.tank.prototype.fill = function(source){
	console.log(format.action('fill ' + this + ' with ' + source));
	source.pour(this.void(), this);
	if(this.mix.volume() !== this.limit){
		throw 'not full ' + this;
	}
	return this;
};

domain.tank.prototype.pour = function(target){
	if(typeof target === 'number'){
		console.log(format.action('pour ' + format.measure(target) + ' from ' + this));
		this.mix.pour(target);
	}else if(typeof target === 'object'){
		console.log(format.action('pour from ' + this + ' to ' + target));
		this.mix.pour(Math.min(this.volume(), target.void())).merge(target);
	}else{
		console.log(format.action('pour all from ' + this));
		this.empty();
	}
	return this;
};
