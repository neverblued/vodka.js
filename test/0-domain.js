var expect = require('chai').expect;
var domain = require('../domain');

describe('Domain', function(){
	
	it('implements entities', function(){
		expect(domain).to.have.keys('fluid', 'water', 'alcohol', 'mix', 'schnapps', 'tank');
	});
	
	describe('implements methods', function(){
		it('add content to container', function(){
			expect(domain.mix.prototype.add).to.be.a('function');
			expect(domain.tank.prototype.add).to.be.a('function');
		});
		it('compare mixes', function(){
			expect(domain.mix.prototype.compare).to.be.a('function');
		});
		it('empty container', function(){
			expect(domain.mix.prototype.empty).to.be.a('function');
			expect(domain.tank.prototype.empty).to.be.a('function');
		});
		it('fill tank', function(){
			expect(domain.tank.prototype.fill).to.be.a('function');
		});
		it('merge mixes', function(){
			expect(domain.mix.prototype.merge).to.be.a('function');
		});
		it('pour', function(){
			expect(domain.fluid.prototype.pour).to.be.a('function');
			expect(domain.mix.prototype.pour).to.be.a('function');
			expect(domain.schnapps.prototype.pour).to.be.a('function');
			expect(domain.tank.prototype.pour).to.be.a('function');
		});
		it('strength of schnapps', function(){
			expect(domain.schnapps.prototype.strength).to.be.a('function');
		});
		it('tank void volume', function(){
			expect(domain.tank.prototype.void).to.be.a('function');
		});
		it('container content volume', function(){
			expect(domain.mix.prototype.volume).to.be.a('function');
			expect(domain.tank.prototype.volume).to.be.a('function');
		});
	});
	
	describe('instance properties', function(){
		it('content', function(){
			var schnapps = new domain.schnapps;
			expect(schnapps).to.be.instanceOf(domain.mix);
			expect(schnapps).to.have.key('content');
		});
	});
});
