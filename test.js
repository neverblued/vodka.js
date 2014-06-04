var model = require('./model');
var format = require('./format');
var automat = require('./automat');

console.log(format.header('start'));
try{
	
	var satisfy = (function(){
		var precision = Math.pow(10, -6);
		var validate = function(example, standard){
			return Math.abs(example - standard) < precision;
		};
		var litre = function(drink){
			return validate(drink.volume(), 5); // @FIXME should be 1
		};
		var vodka = function(drink){
			return validate(drink.mix.strength(), 40/100);
		};
		return function(drink){
			return litre(drink) && vodka(drink);
		};
	})();
	
	var barmen = new automat(function(){this
		.take('water', model.water)
		.take('alcohol', model.alcohol)
		.take('tank-3', new model.tank(3, new model.schnapps))
		.take('tank-5', new model.tank(5, new model.schnapps));
	}).check(function(){
		var clause1 = satisfy(this.get('tank-3'));
		var clause2 = satisfy(this.get('tank-5'));
		console.log(format.action('check: clause1 = ' + clause1 + ', clause2 = ' + clause2));
		return clause1 || clause2;
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
	
	barmen.run();

}catch(condition){
	console.log(format.event(condition));
	throw condition;
}
console.log(format.header('. end'));
