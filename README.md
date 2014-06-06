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

### Modules

* __Format__ defines output style;
* __Automat__ is charged with setting up experimental environment,
performing serial execution of methods and checking progress (almost ready);
* __Model__ describes _Fluid_, _Mix_, _Schnapps_ and _Tank_, their protocols
and conforms to _Automat_ interface (ready);
* __View__ adds some _Model_ and _Automat_ output detailing
via _toString_ overriding (ready);
* _Standard_ should separately describe test approximation (expected);
* _Technology_ should implement experimental sequence generation and feedback processing (expected);
* __Test__ is executed by _run_ script and glues modules together (continuous refactoring).

### Platform

[node.js](http://nodejs.org/)

### Test

```
user@host:/project/folder$ ./run
```
