/*
var format = require('./format');
console.log(format.header('start'));
try{
	
//	var etalon = require('./etalon');
//	var technology = require('./technology');
//	var scope = require('./scope');
//	var goal = require('./goal');

	var barmen = new automat;
	var solution = new technology(barmen)
	
		.option('fill 3-litre tank with water', function(){
			return this.get('tank-3').void() > 0;
		}, function(){
//			this.step(new automat.method('pour', 'water', 'tank-3'));
			this.get('water').pour(this.get('tank-3'));
		})

		.option('fill 5-litre tank with water', function(){
			return this.get('tank-5').void() > 0;
		}, function(){
//			this.step(new automat.method('pour', 'water', 'tank-5'));
			this.get('water').pour(this.get('tank-5'));
		})

		.option('fill 3-litre tank with alcohol', function(){
			return this.get('tank-3').void() > 0;
		}, function(){
//			this.step(new automat.method('pour', 'alcohol', 'tank-3'));
			this.get('alcohol').pour(this.get('tank-3'));
		})

		.option('fill 5-litre tank with alcohol', function(){
			return this.get('tank-5').void() > 0;
		}, function(){
//			this.step(new automat.method('pour', 'alcohol', 'tank-5'));
			this.get('alcohol').pour(this.get('tank-5'));
		})

		.option('empty 3-litre tank', function(){
			return this.get('tank-3').volume() > 0;
		}, function(){
			this.step(new automat.method('pour', 'tank-3'));
		})

		.option('empty 5-litre tank', function(){
			return this.get('tank-5').volume() > 0;
		}, function(){
			this.step(new automat.method('pour', 'tank-5'));
		})

		.option('pour from 3-litre tank into 5-litre tank', function(){
			return this.get('tank-3').volume() > 0 && this.get('tank-5').void() > 0;
		}, function(){
			this.step(new automat.method('pour', 'tank-3', 'tank-5'));
		})

		.option('pour from 5-litre tank into 3-litre tank', function(){
			return this.get('tank-5').volume() > 0 && this.get('tank-3').void() > 0;
		}, function(){
			this.step(new automat.method('pour', 'tank-5', 'tank-3'));
		})
	;
	console.log(format.status(solution.random(3).join(', ')));
}catch(condition){
	console.log(format.event(condition));
	throw condition;
}
console.log(format.header('end'));
*/
