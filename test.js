var format = require('./format');
var automat = require('./automat');
var model = require('./model');
var standard = require('./standard');

console.log(format.header('start'));
try{
	
	var vodka = (new model.schnapps).add(6/10, model.water).add(4/10, model.alcohol);
	console.log(format.status(format.symbol('litre-of-vodka') + ' = ' + vodka));

	var barmen = new automat(function(){this
		.take('water', model.water)
		.take('alcohol', model.alcohol)
		.take('tank-3', new model.tank(3, new model.schnapps))
		.take('tank-5', new model.tank(5, new model.schnapps));
	}).check(function(){
		var exhibit = [this.get('tank-3').mix, this.get('tank-5').mix];
		var result = standard.validate(exhibit, vodka);
		if(result !== false){
			var message = 'goal achieved via exhibit ' + (++result) + ': ' + exhibit[result];
			console.log(format.event(message));
		}
		return !!result;
	});
	
	barmen.step(new automat.method('check', 'tank-3'));
	barmen.step(new automat.method('check', 'tank-5'));
	
	barmen.step(new automat.method('pour', 'water', 2, 'tank-5'));
	barmen.step(new automat.method('check', 'tank-5'));

	barmen.step(new automat.method('pour', 'alcohol', 2, 'tank-5'));
	barmen.step(new automat.method('check', 'tank-5'));

	barmen.step(new automat.method('fill', 'tank-5', 'water'));
	
	barmen.step(new automat.method('pour', 'tank-5', 'tank-3'));
	barmen.step(new automat.method('check', 'tank-3'));
	barmen.step(new automat.method('check', 'tank-5'));

	barmen.step(new automat.method('pour', 'tank-3', 2));

	barmen.run();

}catch(condition){
	console.log(format.event(condition));
	throw condition;
}
console.log(format.header('end'));
