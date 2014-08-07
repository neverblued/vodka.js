var format = require('./format');
var model = require('./model');

var etalon = exports.object =
	(new model.schnapps).add(6/10, model.water).add(4/10, model.alcohol);
console.log(format.status(format.symbol('etalon') + ' is ' + etalon));

var rms = function(item1, item2){
	var volume = item1.volume() - item2.volume();
	var strength = item1.strength() - item2.strength();
	return Math.sqrt(Math.pow(volume, 2) + Math.pow(strength, 2));
};

exports.deviation = function(sample){
	var deviation = rms(sample, etalon);
	console.log(format.event(sample + ' deviates from etalon by ' + deviation));
	return deviation;
};

exports.precision = Math.pow(10, -6);
console.log(format.status(format.symbol('precision') + ' is ' + exports.precision));

var gate = function(value){
	return (value < exports.precision) ? null : value;
};

exports.validate = function(){
	var exhibit = Array.prototype.slice.call(arguments);
	for(var index in exhibit){
		var sample = exhibit[index];
		var deviation = exports.deviation(sample);
		if(!gate(deviation)){
			console.log(format.event(sample + ' deviates from etalon by ' + deviation));
			return sample;
		}
	}
	return false;
};
