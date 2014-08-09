var domain = require('../domain');
var robot = require('./index');

robot.experiment = function(base){
	this.base = base;
	this.index = base && base.index + 1 || 0;
	this.scope = base && base.scope.clone() || new robot.scope;
};
