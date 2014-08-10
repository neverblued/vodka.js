var domain = require('./index');

domain.schnapps = function(){
	domain.mix.prototype.constructor.apply(this, arguments);
};
domain.schnapps.prototype = Object.create(domain.mix.prototype);

domain.schnapps.prototype.strength = function(){
	var alcohol = this.content['alcohol'];
	if(!alcohol){
		return 0;
	}
	var volume = this.volume();
	if(alcohol === volume){
		return 1;
	}
	return alcohol / volume;
};
