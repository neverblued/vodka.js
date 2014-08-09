var should = require('should');
var domain = require('../domain');

describe('Domain', function(){
	
	it('should exist', function(){
		should(domain).be.ok;
	});
	
	it('should implement entities', function(){
		should(domain).have.properties(['fluid', 'mix', 'schnapps', 'tank']);
	});
	
	it('should implement methods', function(){
		// add
		should(domain.mix.prototype.add).be.a.function;
		should(domain.tank.prototype.add).be.a.function;
		// compare
		should(domain.mix.prototype.compare).be.a.function;
		// empty
		should(domain.mix.prototype.empty).be.a.function;
		should(domain.tank.prototype.empty).be.a.function;
		// fill
		should(domain.tank.prototype.fill).be.a.function;
		// merge
		should(domain.mix.prototype.merge).be.a.function;
		/// pour
		should(domain.fluid.prototype.pour).be.a.function;
		should(domain.mix.prototype.pour).be.a.function;
		should(domain.schnapps.prototype.pour).be.a.function;
		should(domain.tank.prototype.pour).be.a.function;
		// strength
		should(domain.schnapps.prototype.strength).be.a.function;
		// void
		should(domain.tank.prototype.void).be.a.function;
		// volume
		should(domain.mix.prototype.volume).be.a.function;
		should(domain.tank.prototype.volume).be.a.function;
	});
});
