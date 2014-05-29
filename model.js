var the = {},

	substance = exports.substance = function(name){
		console.log('construct substance', name);
		var it = this;
		it.name = name;
		the[name] = exports[name] = it;
		it.pour = function(mix, volume){
			return mix.add(it, volume);
		};
		it.toString = function(){
			return '#' + it.name.toUpperCase();
		};
	},
	
	water = substance('water'),
	alcohol = substance('alcohol'),

	mix = exports.mix = function(){
		var schema = [];
		console.log('arguments', arguments);
		for(var index = 0, limit = arguments.length; index < limit; index++){
			var name = arguments[index];
			schema[index] = the[name];
			console.log(name, the[name]);
		}
		console.log('schema', schema);
		return function(){
			console.log('construct mix');
			this.prototype = mix;
			var content = this.content = {},
				reset = function(ingredient){
					if(typeof ingredient === 'undefined'){
						throw 'undefined ingredient';
					}
					var key = (typeof ingredient === 'String') ? ingredient : ingredient.name;
					content[key] = 0;
				};
			for(var index = 0, limit = schema.length; index < limit; index++){
				try{
					var ingredient = schema[index];
					console.log('ingredient', index, ingredient);
					reset(ingredient);
				}catch(condition){
					throw condition + ' in ' + schema + '[' + index + ']';
				}
			}
			var pick = this.ingredient = function(name){
				return (typeof content[name] !== 'undefined') && content[name];
			};
			this.add = function(it, volume){
				if(volume < 0){
					throw 'can not add negative volume of ' + it;
				}
				var key = it.name,
					ingredient = pick(name);
				if(!ingredient){
					reset(key);
				}
				return content[key] += volume;
			};
		};
	},

//	schnapps = exports.schnapps = mix(water, alcohol);
	schnapps = exports.schnapps = mix();

mix.volume = function(){
	var content = this.content,
		total = 0;
	for(var name in content){
		var volume = content[name];
		total += volume;
	}
	return total;
};

schnapps.prototype.strength = function(){
	if(!this.content.water){
		return this.content.alcohol ? 1 : 0;
	}
	return this.content.alcohol / this.content.water;
};

schnapps.prototype.toString = function(){
	return 'Mix :: '
		+ 'Water = ' + this.content.water + ', '
		+ 'Alcohol = ' + this.content.alcohol + ', '
		+ 'Volume = ' + this.volume() + ', '
		+ 'Strength = ' + this.strength() + '.';
};
