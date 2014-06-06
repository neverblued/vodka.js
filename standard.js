exports.precision = Math.pow(10, -6);

var rms = function(sample, etalon){
	var volume = sample.volume() - etalon.volume();
	var strength = sample.strength() - etalon.strength();
	return Math.sqrt(Math.pow(volume, 2) + Math.pow(strength, 2));
};

exports.deviation = function(sample, etalon){
	var difference = rms(sample, etalon);
	return (difference < exports.precision) ? -difference : difference;
};

exports.validate = function(exhibit, etalon){
	for(var index in exhibit){
		var sample = exhibit[index];
		if(exports.deviation(sample, etalon) > 0){
			continue;
		}
		return index;
	}
	return false;
};
