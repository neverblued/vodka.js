var expect = require('chai').expect;
var robot = require('../../robot');

describe('Robot', function(){
	
	describe('method', function(){

		it('constructor is a function', function(){
			expect(robot.method).be.a.function;
		});

		it('options number is 8', function(){
			expect(robot.method.all).to.be.lengthOf(8);
		});
	});
});
