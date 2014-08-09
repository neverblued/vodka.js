var format = require('./format');
var domain = require('./domain');

var etalon = (new domain.schnapps).add(6 / 10, domain.water).add(4 / 10, domain.alcohol);
exports.object = etalon;
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
	exhibit.forEach(function(sample){
		var deviation = exports.deviation(sample);
		if(!gate(deviation)){
			console.log(format.event(sample + ' deviates from etalon by ' + deviation));
			return sample;
		}
	});
	return false;
};
