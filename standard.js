var rms = function(item1, item2){
	var volume = item1.volume() - item2.volume();
	var strength = item1.strength() - item2.strength();
	return Math.sqrt(Math.pow(volume, 2) + Math.pow(strength, 2));
};

exports.deviation = function(sample, etalon){
	return rms(sample, etalon);
};

exports.precision = Math.pow(10, -6);

var approximation = function(sample, etalon){
	var difference = exports.deviation(sample, etalon);
	return (difference < exports.precision) ? null : difference;
};

exports.validate = function(exhibit, etalon){
	for(var index in exhibit){
		var sample = exhibit[index];
		if(!approximation(sample, etalon)){
			return sample;
		}
	}
	return false;
};
