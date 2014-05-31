var model = require('./model'),
	format = require('./format'),
	taste = function(object){
		console.log(format.status(object));
	};

console.log('start...');
try{
	
	var drink = new model.tank(55, new model.schnapps);
	taste(drink);

	model.water.pour(30, drink);
	taste(drink);

	model.alcohol.pour(20, drink);
	taste(drink);
	
	drink.fill(model.water);
	taste(drink);

}catch(condition){
	console.log('! ' + (condition.message || condition));
}
console.log('. end');
