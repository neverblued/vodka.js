var should = require('should');
var robot = require('../robot');
var etalon = require('../etalon');

describe('Robot', function(){
	
	describe('scope', function(){
		var scope;
		var scopeProperties = ['water', 'alcohol', 'tankA', 'tankB'];

		it('should be implemented', function(){
			should(robot.scope).be.a.function;
		});

		it('should be created', function(){
			scope = new robot.scope(etalon.object);
			should(scope).have.properties(scopeProperties);
		});
		
		it('should be cloned', function(){
			should(scope.clone).be.a.function;
			var another = scope.clone();
			should(another).have.properties(scopeProperties);
			should(another.tankA.mix.content).be.eql(scope.tankA.mix.content);
			another.tankA.pour();
			should(another.tankA.mix.content).be.not.eql(scope.tankA.mix.content);
		});
	});
	
	describe('experiment', function(){
		
		it('should be implemented', function(){
			should(robot.experiment).be.a.function;
		});
	});
});
