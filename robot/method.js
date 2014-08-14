var domain = require('../domain');
var robot = require('./index');

robot.method = function(name, clause, body){
	this.name = name;
	this.clause = clause;
	this.body = body;
	robot.method.all.push(this);
};

robot.method.all = [];

new robot.method('fill 3-litre tank with water', function(){
	return this.tankA.void() > 0;
}, function(){
	this.water.pour(this.tankA);
});

new robot.method('fill 5-litre tank with water', function(){
	return this.tankB.void() > 0;
}, function(){
	this.water.pour(this.tankB);
});

new robot.method('fill 3-litre tank with alcohol', function(){
	return this.tankA.void() > 0;
}, function(){
	this.alcohol.pour(this.tankA);
});

new robot.method('fill 5-litre tank with alcohol', function(){
	return this.tankB.void() > 0;
}, function(){
	this.alcohol.pour(this.tankB);
});

new robot.method('empty 3-litre tank', function(){
	return this.tankA.volume() > 0;
}, function(){
	this.tankA.pour();
});

new robot.method('empty 5-litre tank', function(){
	return this.tankB.volume() > 0;
}, function(){
	this.tankB.pour();
});

new robot.method('pour from 3-litre tank into 5-litre tank', function(){
	return this.tankA.volume() > 0 && this.tankB.void() > 0;
}, function(){
	this.tankA.pour(this.tankB);
});

new robot.method('pour from 5-litre tank into 3-litre tank', function(){
	return this.tankB.volume() > 0 && this.tankA.void() > 0;
}, function(){
	this.tankB.pour(this.tankA);
});
