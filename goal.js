var etalon = require('./etalon');

module.exports = function(data){
	return etalon.validate(data.tankA.mix, data.tankB.mix);
};
