vodka.js
========

### Overview

This project is my attempt to solve
a classical excercise, explained hereinafter,
by Javascript implementation.

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
solve the excercise by itself and
save lazy me from googling out the right algorithm.

### Coding

* Pure proprietary Javascript, no external dependencies;
* Abstraction layers are modules;
* Clear, sensible semantics.

### Layers

* __Automat__ is charged with setting up experimental environment,
performing serial execution of methods and checking progress;
* __Model__ describes _Fluid_, _Mix_, _Schnapps_ and _Tank_, their protocols
and conforms to _Automat_ interface;
* __View__ adds some sugar to console output via _toString_ overriding;
* _Standard_ should separately describe approximation;
* _Technology_ should implement experimental sequence generation and feedback processing;
* __Test__ is executed by _run_ script and glues modules together.

### Platform

[node.js](http://nodejs.org/)

### Status

* Model v.beta
* Automat v.alpha
* Standard ...
* Technology ...

### Test

```
user@host:/project/folder$ ./run
```
