var expect = require('chai').expect;
var domain = require('../domain');
var etalon = require('../etalon');

describe('Etalon', function(){
	
	it('implements deviation', function(){
		expect(etalon.deviation).to.be.a.function;
	});
	it('implements precision', function(){
		expect(etalon.precision).to.be.a.number;
	});
	it('implements validation', function(){
		expect(etalon.validate).to.be.a.function;
	});
	
	it('implements object', function(){
		expect(etalon.object).to.be.an.instanceOf(domain.schnapps);
		expect(etalon.object.volume()).to.be.equal(1);
		expect(etalon.object.strength()).to.be.equal(0.4);
	});
	
	it('validates object', function(){
		expect(etalon.validate(etalon.object)).to.be.equal(etalon.object);
	});
	
	it('does not validate random exhibit', function(){
		expect(etalon.validate(null)).to.be.false;
		expect(etalon.validate(undefined)).to.be.false;
		expect(etalon.validate(new domain.mix)).to.be.false;
		expect(etalon.validate(new domain.schnapps)).to.be.false;
		expect(etalon.validate(new domain.schnapps({water: .5, alcohol: .5}))).to.be.false;
		expect(etalon.validate(new domain.schnapps({water: .55, alcohol: .45}))).to.be.false;
	});
});
