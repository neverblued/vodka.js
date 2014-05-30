var model = require('./model');
console.log('start!');

var drink = new model.schnapps;
console.log('now ' + drink);

model.water.pour(drink, 30);
console.log('now ' + drink);

model.alcohol.pour(drink, 20);
console.log('now ' + drink);

console.log('end.');
