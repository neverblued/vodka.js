var model = require('./model');
console.log('start!');

var drink = new model.tank(40, new model.schnapps);
console.log('drink is ' + drink);

model.water.pour(30, drink);
console.log('drink is ' + drink);

model.alcohol.pour(20, drink);
console.log('drink is ' + drink);

console.log('end.');
