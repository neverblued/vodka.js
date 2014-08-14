var domain = require('../domain');
var etalon = require('../etalon');
var robot = require('./index');

robot.goal = function(){
	if(this instanceof robot.scope){
		var win;
		this.exhibit().forEach(function(mix){
			if(!win){
				win = etalon.validate(mix);
			}
		});
		return win;
	}else{
		throw new Error('bad scope');
	}
};
