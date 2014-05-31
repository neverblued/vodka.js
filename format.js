var format = module.exports = {
	
		// line
	status: function(object){
		return '? ' + object;
	},
	action: function(message){
		return '- ' + message;
	},
	
		// value
	symbol: function(it){
		return '#' + it.toUpperCase();
	},
	measure: function(quantity, entity){
		return entity + '=' + format.volume(quantity);
	},
	volume: function(quantity){
		return 'V:' + quantity;
	},
	strength: function(percent){
		return Math.round(100 * percent) + '%';
	}
};
