var domain = require('../domain');
var robot = require('./index');

robot.scope = function(mixA, mixB){
	this.water = domain.water;
	this.alcohol = domain.alcohol;
	this.tankA = new domain.tank(3, new domain.schnapps(mixA && mixA.content));
	this.tankB = new domain.tank(5, new domain.schnapps(mixB && mixB.content));
};

robot.scope.prototype.clone = function(){
	return new robot.scope(this.tankA.mix, this.tankB.mix);
};
