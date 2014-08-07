var model = require('./model');

module.exports = function(){
	this.water = model.water;
	this.alcohol = model.alcohol;
	this.tankA = new model.tank(3, new model.schnapps);
	this.tankB = new model.tank(5, new model.schnapps);
};
