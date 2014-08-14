var expect = require('chai').expect;

var domain = require('../../domain');
var etalon = require('../../etalon');
var robot = require('../../robot');

describe('Robot', function(){
	describe('goal', function(){

		it('is a function', function(){
			expect(robot.goal).to.be.a.function;
		});
		
		var check = function(scope){
			return robot.goal.call(scope);
		};
		it('returns false for empty scope', function(){
			expect(check(new robot.scope)).to.be.false;
		});
		it('returns exhibit for scope with etalon in tankA', function(){
			expect(check(new robot.scope(etalon.object, undefined))).to.be.ok;
		});
		it('returns exhibit for scope with etalon in tankB', function(){
			expect(check(new robot.scope(undefined, etalon.object))).to.be.ok;
		});
	});
});
