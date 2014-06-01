var model = require('./model'),
	format = require('./format'),
	check = function(object){
		console.log(format.status(object));
	};

console.log('start...');
try{
	
	var water = model.water,
		alcohol = model.alcohol,
		schnapps = model.schnapps,
		tank = model.tank,
		
		tank3 = new tank(3, new schnapps),
		tank5 = new tank(5, new schnapps);

	check(tank3);
	check(tank5);

	water.pour(2, tank5);
	check(tank5);

	alcohol.pour(2, tank5);
	check(tank5);
	
	tank5.fill(water);
//	check(tank5);
	
	tank5.pour(tank3);
	check(tank3);
	check(tank5);

}catch(condition){
	console.log('! ' + (condition.message || condition));
	throw condition;
}
console.log('. end');
