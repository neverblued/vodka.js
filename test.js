var model = require('./model'),
	water = model.water,
	alcohol = model.alcohol,
	schnapps = model.schnapps,
	drink = new schnapps;
	
var log = function(){
	console.log(schnapps.prototype.toString.call(drink));
};

log();
water.pour(drink, 30);
log();
alcohol.pour(drink, 20);
log();
