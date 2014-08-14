var expect = require('chai').expect;
var robot = require('../../robot');

describe('Robot', function(){
	
	describe('experiment', function(){
		var experiment = [];
		
		it('is a function', function(){
			expect(robot.experiment).be.a.function;
		});
		
		it('creates instances', function(){
			experiment[0] = new robot.experiment;
			experiment[1] = new robot.experiment;
			expect(experiment[0].index).to.equal(0);
			expect(experiment[1].index).to.equal(0);
		});
		
		it('derives instances', function(){
			experiment[2] = new robot.experiment(experiment[0]);
			expect(experiment[2].index).to.equal(1);
			expect(experiment[2].base).to.equal(experiment[0]);
		});
	});
});
