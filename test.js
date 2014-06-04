var model = require('./model');
var format = require('./format');
var automat = require('./automat');

console.log(format.header('start'));
try{
	
	var barmen = new automat(function(){this
		.take('water', model.water)
		.take('alcohol', model.alcohol)
		.take('tank-3', new model.tank(3, new model.schnapps))
		.take('tank-5', new model.tank(5, new model.schnapps));
	});
	
	barmen.plan(new automat.method('check', 'tank-3'));
	barmen.plan(new automat.method('check', 'tank-5'));
	
	barmen.plan(new automat.method('pour', 'water', 2, 'tank-5'));
	barmen.plan(new automat.method('check', 'tank-5'));

	barmen.plan(new automat.method('pour', 'alcohol', 2, 'tank-5'));
	barmen.plan(new automat.method('check', 'tank-5'));

	barmen.plan(new automat.method('fill', 'tank-5', 'water'));
	
	barmen.plan(new automat.method('pour', 'tank-5', 'tank-3'));
	barmen.plan(new automat.method('check', 'tank-3'));
	barmen.plan(new automat.method('check', 'tank-5'));
	
	barmen.run();

}catch(condition){
	console.log('! ' + (condition.message || condition));
	throw condition;
}
console.log(format.header('. end'));
