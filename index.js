var model = require('./model'),
	water = model.water,
	alcohol = model.alcohol,
	schnapps = model.schnapps,
	drink = new schnapps;
	
	//tank = model.tank;
/*	
var tank3 = new tank(3),
	tank5 = new tank(5);

tank3.pour(water);
*/

var log = function(){
	console.log(schnapps.toString.call(drink));
};

log();
water.pour(drink, 30);
log();
alcohol.pour(drink, 20);
log();
