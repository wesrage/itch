# itch
Flexible and readable switch statement replacement library for JavaScript

## Basic Usage
```javascript
var itch = require('itch');

var price = itch(item)
   .match('Orange').then(0.59)
   .match('Apple').then(0.32)
   .match('Banana').then(0.48)
   .match('Cherry').then(3.00)
   .matchOneOf(['Mango', 'Papaya']).then(2.79)
   .scratch(999.99)
```

This code is functionally equivalent to the following alternative standard implementations:

### Switch
```javascript
var price = (function() {
   switch(item) {
      case 'Orange':
         return 0.59;
      case 'Apple':
         return 0.32;
      case 'Banana':
         return 0.48;
      case 'Cherry':
         return 3.00;
      case 'Mango':
      case 'Papaya':
         return 2.79;
      default:
         return 999.99;
   }
})();
```

### If-else
```javascript
var price = (function() {
   if (item === 'Orange') {
      return 0.59;
   } else if (item === 'Apple') {
      return 0.32;
   } else if (item === 'Banana') {
      return 0.48;
   } else if (item === 'Cherry') {
      return 3.00;
   } else if (item === 'Mango' || item === 'Papaya') {
      return 2.79;
   } else {
      return 999.99;
   }
})();
```

### Object Literals
```javascript
var price = {
   Orange: 0.59,
   Apple: 0.32,
   Banana: 0.48,
   Cherry: 3.00,
   Mango: 2.79,
   Papaya: 2.79
}[item] || 999.99;
```

## Syntax
```javascript
itch(seed)
   .match(candidate).then(returnValue)
   .match(anotherCandidate).then(anotherReturnValue)
   // ...
   .scratch(defaultValue)
```

* An `itch` statement is a function chain that starts with a call to the `itch` function with a seed value.
* The `itch()` call is followed by a series of `match().then()` calls.
 * `match()` accepts one argument, which is a candidate value to test for equality against the seed value.
 * `then()` accepts one argument, which is the value that will be returned if the seed matches the current candidate.
* The chain must be concluded with a `scratch()` call, whose sole argument is the default return value, should none of the candidates match the seed.

## Custom Matchers
Add a `using()` call in the chain before a `match()` to use a custom matching function thereafter:

```javascript
itch(-1)
   .using(function(a, b) {
      return b === -a;
   })
   .match(1).then(true)
   .scratch(false);
// returns true
```

The following are equivalent:

```javascript
itch(2)
   .using(function(a, b) {
      return b.some(function(bb) {
         return bb === a;
      });
   })
   .match([1, 2, 3]).then(true)
   .scratch(false);
// returns true
```

```javascript
itch(2)
   .matchOneOf([1, 2, 3]).then(true)
   .scratch(false);
// returns true
```
