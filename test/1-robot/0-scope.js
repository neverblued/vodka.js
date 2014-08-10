var expect = require('chai').expect;
var robot = require('../../robot');
var domain = require('../../domain');
var etalon = require('../../etalon');

describe('Robot', function(){
	
	describe('scope', function(){
		var scope;
		var scopeProperties = ['water', 'alcohol', 'tankA', 'tankB'];
		it('is a function', function(){
			expect(robot.scope).to.be.a('function');
		});
		it('creates instances', function(){
			scope = new robot.scope(etalon.object);
			expect(scope).to.have.keys(scopeProperties);
			expect(scope.tankA.mix.content).to.eql(etalon.object.content);
		});
		
		describe('clone', function(){
			it('is a function', function(){
				expect(scope.clone).to.be.a('function');
			});
			var another;
			it('produces instances of scope', function(){
				another = scope.clone();
				expect(another).to.have.keys(scopeProperties);
			});
			it('with equal content', function(){
				expect(another.tankA.mix.content).to.eql(scope.tankA.mix.content);
			});
			it('pour all from another scope tankA', function(){
				another.tankA.pour();
				expect(another.tankA.mix.content).to.be.empty;
			});
			it('tankA from first scope should still contain a litre of vodka', function(){
				expect(scope.tankA.mix.content).to.eql(etalon.object.content);
			});
		});
	});
});
