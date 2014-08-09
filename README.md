vodka.js
========

### Overview

This project is my attempt to solve
a classical exercise, explained hereinafter,
by JavaScript implementation.

The outcome should be data describing exactly one litre of vodka,
which is accepted as 40% solution of alcohol in water.
To achieve this goal one may use just the following:

* Unlimited actions;
* Unlimited source of water and alcohol;
* Two tanks: 3 and 5 litres.

Since there are no measurement instruments,
one may only fill tanks totally and
pour water from various sources to another tank or nowhere.

My implementation approach is focused on
creating an intellectual system that would
solve the exercise by itself and
save lazy me from googling out the right algorithm.

### Coding

* Pure proprietary JavaScript, no external dependencies;
* Abstraction layers are modules;
* Clear, sensible semantics.

Development dependencies exist for testing.

### Modules

* __Format__ defines output style;
* __Automat__ is charged with setting up experimental environment (?),
performing serial execution of methods and checking progress (almost ready);
* __Model__ describes entities (_Fluid_, _Mix_, _Schnapps_ and _Tank_) and protocols (ready);
* __View__ adds some _Model_ and _Automat_ output detailing
via _toString_ overriding (ready);
* __Etalon__ implements output standard and estimation;
* _Technology_ implements generating tree of _Experiments_ and processing their output (expected);
* _Experiment_ instances hold a scope, a log and can be cloned to start next technological step.

### Platform

[Node.js](http://nodejs.org/)

### Test

```
user@host:/project/folder$ npm install && npm test
```
