String Array
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

> String array class.


## Installation

``` bash
$ npm install string-array
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage

``` javascript
var StringArray = require( 'string-array' );
```


#### StringArray( [len, opts] )

String array constructor. If provided a length `len`, initializes an empty `StringArray` of length `len`.

``` javascript
var arr = new StringArray();

arr.length;
// returns 0

arr = new StringArray( 20 );

arr.length;
//returns 20
```

The constructor accepts an options `object` with the following possible options:
*	__min__: minimum length of a `string` added to the `array`
*	__max__: maximum length of a `string` added to the `array`

``` javascript
var opts = {
	'min': 5,
	'max': 10
};

var arr = new StringArray( opts );

// Valid string...
arr.push( 'Hello' );

// Invalid string...
arr.push( 'a' );
// throws RangeError

// Invalid string...
arr.push( 'How are you doing today?' );
// throw RangeError
```


#### Properties


##### [length](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/length)

Returns the number of `array` elements.

``` javascript
var arr = new StringArray();

arr.length;
// returns 0

arr.push( 'beep' );
arr.length;
// returns 1

arr.length = 0;
arr.length;
// returns 0
```


##### minLength

Specifies the minimum allowed length of `strings` added to the `array`. Default length is `0`.

``` javascript
var arr = new StringArray();

arr.minLength;
// returns 0

// Valid string...
arr.push( 'beep' );

arr.minLength = 5;

// Invalid string...
arr.push( 'beep' );
// throws RangeError
```

__Note__: setting the `minLength` after elements have been added to the `array` does __not__ affect the existing elements; the setting only applies to future `strings` added to the `array`.


##### maxLength

Specifies the maximum allowed length of `strings` added to the `array`. Default length is `2^32-1`.

``` javascript
var arr = new StringArray();

arr.maxLength;
// returns 2^31-1

// Valid string...
arr.push( 'beep' );

arr.maxLength = 3;

// Invalid string...
arr.push( 'beep' );
// throws RangeError
```

__Note__: setting the `maxLength` after elements have been added to the `array` does __not__ affect the existing elements; the setting only applies to future `strings` added to the `array`.


#### Mutator Methods


##### [StringArray.prototype.push()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push)

Adds one or more elements to the end of an `array` and returns the new `array` length.

``` javascript
var arr = new StringArray();

arr.push( 'a', 'b', 'c' );
// returns 3

arr.toString();
// returns 'a,b,c'

arr.push( 'd' );
// returns 4

arr.toString();
// returns 'a,b,c,d'
```


##### [StringArray.prototype.pop()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/pop)

Removes the last `array` element and returns that element.

``` javascript
var arr = new StringArray();

arr.push( 'a', 'b', 'c' );
arr.toString();
// returns 'a,b,c'

arr.pop();
// returns 'c'

arr.toString();
// returns 'a,b'
```



##### [StringArray.prototype.unshift()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift)

Adds one or more elements to the front of an `array` and returns the new `array` length.

``` javascript
var arr = new StringArray();

arr.push( 'a', 'b', 'c' );
// returns 3

arr.toString();
// returns 'a,b,c'

arr.unshift( 'd' );
// returns 4

arr.toString();
// returns 'd,a,b,c'
```


##### [StringArray.prototype.shift()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/shift)

Removes the first `array` element and returns that element.

``` javascript
var arr = new StringArray();

arr.push( 'a', 'b', 'c' );
arr.toString();
// returns 'a,b,c'

arr.shift();
// returns 'a'

arr.toString();
// returns 'b,c'
```


##### [StringArray.prototype.reverse()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse)

Reverses the `array` order.

``` javascript
var arr = new StringArray();

arr.push( 'a', 'b', 'c' );
arr.toString();
// returns 'a,b,c'

arr.reverse();
arr.toString();
// returns 'c,b,a'
```


##### [StringArray.prototype.sort()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)

Sorts the `array` elements __in place__.

``` javascript
var arr = new StringArray();

function descending( a, b ) {
	if ( a < b ) {
		return 1;
	}
	if ( a > b ) {
		return -1;
	}
	return 0;
}

arr.push( 'a', 'b', 'c' );
arr.toString();
// returns 'a,b,c'

arr.sort( descending );
arr.toString();
// returns 'c,b,a'
```


##### [StringArray.prototype.splice()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice)

Adds and/or removes `array` elements and returns any removed elements,

``` javascript
var arr = new StringArray();

arr.push( 'a', 'b', 'c' );
arr.toString();
// returns 'a,b,c'

arr.splice( 1, 1 );
// returns ['b']

arr.toString();
// returns 'a,c'

arr.splice( 1, 0, 'b' );
// returns []

arr.toString();
// returns 'a,b,c'
```



#### Accessor Methods

##### [StringArray.prototype.toString()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toString)

Returns a `string` representation of a `StringArray`.

``` javascript
var arr = new StringArray();

arr.push( 'a', 'b', 'c' );
arr.toString();
// returns 'a,b,c'
```

##### StringArray.prototype.toArray()

Returns a native `array` representation of a `StringArray`.

``` javascript
var arr = new StringArray();

arr.push( 'a', 'b', 'c' );
arr.toArray();
// returns ['a','b','c']
```

__Note__: changes to the returned `array` will __not__ affect the `StringArray`.



## Examples

``` javascript
var StringArray = require( 'string-array' );
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


## Notes

* `Object.keys()` will __not__ work as expected. A `StringArray` instance is an `object` which manages an internal `array`.
* A `StringArray` is __not__ an `Array` instance.
* When applied to a `StringArray`, [`Array.isArray()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray)  will return `false`.


## Tests

### Unit

Unit tests use the [Mocha](http://mochajs.org/) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


---
## License

[MIT license](http://opensource.org/licenses/MIT). 


## Copyright

Copyright &copy; 2015. Athan Reines.


[npm-image]: http://img.shields.io/npm/v/string-array.svg
[npm-url]: https://npmjs.org/package/string-array

[travis-image]: http://img.shields.io/travis/kgryte/string-array/master.svg
[travis-url]: https://travis-ci.org/kgryte/string-array

[coveralls-image]: https://img.shields.io/coveralls/kgryte/string-array/master.svg
[coveralls-url]: https://coveralls.io/r/kgryte/string-array?branch=master

[dependencies-image]: http://img.shields.io/david/kgryte/string-array.svg
[dependencies-url]: https://david-dm.org/kgryte/string-array

[dev-dependencies-image]: http://img.shields.io/david/dev/kgryte/string-array.svg
[dev-dependencies-url]: https://david-dm.org/dev/kgryte/string-array

[github-issues-image]: http://img.shields.io/github/issues/kgryte/string-array.svg
[github-issues-url]: https://github.com/kgryte/string-array/issues
