var model = require('./model');
var format = require('./format');
var automat = require('./automat');

console.log(format.header('start'));
try{
	
	var approximation = (function(){
		var vodka = (new model.schnapps).add(6/10, model.water).add(4/10, model.alcohol);
		console.log(format.status(format.symbol('litre-of-vodka') + ' = ' + vodka));
		var difference = function(example, standard){
			var volume = example.volume() - standard.volume();
			var strength = example.strength() - standard.strength();
			return Math.sqrt(Math.pow(volume, 2) + Math.pow(strength, 2));
		};
		var precision = Math.pow(10, -6);
		return function(drink){
			var mean = difference(drink.mix, vodka);
			return (mean < precision) ? 0 : mean;
		};
	})();
	
	var barmen = new automat(function(){this
		.take('water', model.water)
		.take('alcohol', model.alcohol)
		.take('tank-3', new model.tank(3, new model.schnapps))
		.take('tank-5', new model.tank(5, new model.schnapps));
	}).check(function(){
		var exhibit = ['tank-3', 'tank-5'];
		console.log(format.action('check exhibit: ' + exhibit.join(', ')));
		for(var index in exhibit){
			var it = this.get(exhibit[index]);
			if(approximation(it) === 0){
				var number = 1 * index + 1;
				console.log(format.event('goal achieved via exhibit ' + number + ': ' + it));
				return true;
			}
		}
		return false;
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
