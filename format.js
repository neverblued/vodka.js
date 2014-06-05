var format = module.exports = {
	
		// line
	header: function(title){
		return '\n' + title + '...';
	},
	event: function(condition){
		return '! ' + (condition.message || condition);
	},
	status: function(object){
		return '? ' + object;
	},
	action: function(message){
		return '• ' + message;
	},
	method: function(message){
		return '✓ ' + message;
	},
	success: function(){ // @TODO (goal) ?
		return '\n-=-=- !!!!! =-= :) =-= SUCCESS =-= :) =-= !!!!! -=-=- ';
	},
	
		// value
	symbol: function(it){
		return '#' + it.toUpperCase();
	},
	measure: function(quantity, entity){
		return (entity || 'V') + ':' + quantity;
	},
	strength: function(percent){
		return Math.round(100 * percent) + '%';
	}
};
