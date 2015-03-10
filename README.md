String Array
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

> String array class.

Why not just use native `Arrays`? A `StringArray`

*	prevents non-string primitives from being added to the `array`
*	provides options to constrain `string` length
*	allows __fancy indexing__
	-	fancy [get](#get-methods)
	-	fancy [set](#set-methods)

===
1. [Install](#installation)
1. [Usage](#usage)
	-	[StringArray()](#string-array)
	-	[Properties](#properties)
		*	[length](#length)
		*	[minLength](#minlength)
		*	[maxLength](#maxlength)
	-	[Get Methods](#get-methods)
		*	[get](#get)
		*	[iget](#iget)
		*	[mget](#mget)
		*	[sget](#sget)
		*	[reget](#reget)
		*	[bget](#bget)
		*	[lget](#lget)
	-	[Set Methods](#set-methods)
		*	[set](#set)
		*	[iset](#iset)
		*	[mset](#mset)
		*	[sset](#sset)
		*	[reset](#reset)
		*	[bset](#bset)
		*	[lset](#lset)
	-	[Mutator Methods](#mutator-methods)
		*	[push()](#push)
		*	[pop()](#pop)
		*	[unshift()](#unshift)
		*	[shift()](#shift)
		*	[reverse()](#reverse)
		*	[sort()](#sort)
		*	[splice()](#splice)
	-	[Accessor Methods](#accessor-methods)
		*	[indexOf()](#indexof)
		*	[lastIndexOf()](#lastindexof)
		*	[slice()](#slice)
		*	[concat()](#concat)
		*	[join()](#join)
		*	[toString()](#tostring)
		*	[toLocaleString()](#tolocalestring)
		*	[toArray()](#toarray)
	-	[Iteration Methods](#iteration-methods)
		*	[forEach()](#foreach)
		*	[every()](#every)
		*	[some()](#some)
		*	[filter()](#filter)
		*	[map()](#map)
		*	[reduce()](#reduce)
		*	[reduceRight()](#reduceRight)
1. [Examples](#examples)
1. [Notes](#notes)
1. [Tests](#tests)
	-	[Unit](#unit)
	-	[Coverage](#test-coverage)
1. [License](#license)


===
## Installation

``` bash
$ npm install string-array
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage

``` javascript
var StringArray = require( 'string-array' );
```


<a name="string-array"></a>
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

The constructor accepts an options `object` with the following options:
*	__min__: minimum length of a `string` added to the `array`. Default: `0`.
*	__max__: maximum length of a `string` added to the `array`. Default: `2^32-1`.

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


===
#### Properties


<a name="length"></a>
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


<a name="minlength"></a>
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


<a name="maxlength"></a>
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



===
#### Get Methods

<a name="get"></a>
##### StringArray.prototype.get()

TBD.



<a name="iget"></a>
##### StringArray.prototype.iget( idx )

Returns a `StringArray` value located at a specific index. If `idx < 0`, the index refers to a position relative to the `StringArray` end, where `idx = -1` corresponds to the last element. If the input `idx` does not correspond to any element, the method returns `undefined`.

``` javascript
var arr = new StringArray(),
	val;

arr.push( 'a', 'b', 'c', 'd' );

val = arr.iget( 2 );
// returns 'c'

val = arr.iget( -3 );
// returns 'b'

val = arr.iget( 10 );
// returns undefined
```


<a name="mget"></a>
##### StringArray.prototype.mget( idx[, options] )

Returns values located at specified indices in a new `StringArray`. If an index is `< 0`, the index refers to a position relative to the `StringArray` end.

``` javascript
var arr1 = new StringArray(),
	arr2;

arr1.push( 'a', 'b', 'c', 'd' );

arr2 = arr1.mget( [2,3] );
arr2.toString();
// returns 'c,d'

arr2 = arr1.mget( [-3,-4] );
arr2.toString();
// returns 'a,b'

arr2 = arr1.mget( [10,11,12] );
// returns null
```

If an index exceeds `array` dimensions, the index is ignored. If provided an empty index `array` __or__ no indices correspond to `StringArray` values, the method returns `null`.

By default, duplicate indices are ignored and results are ordered by ascending index. To allow duplicate indices and to turn off sorting, set the `dedupe` option to `false`.

``` javascript
var arr1 = new StringArray(),
	arr2;

arr1.push( 'a', 'b', 'c', 'd' );

arr2 = arr1.mget( [2,2,1,1,1,1] );
arr2.toString();
// returns 'b,c'

arr2 = arr1.mget( [2,2,1,1,1,1], {'dedupe':false} );
arr2.toString();
// returns 'c,c,b,b,b,b'
```



<a name="sget"></a>
##### StringArray.prototype.sget( subsequence )

Returns values in a new `StringArray` according to a specified [`subsequence`](https://github.com/compute-io/indexspace). If no `subsequence` indices correspond to `StringArray` elements, the method returns `null`.

``` javascript
var arr1 = new StringArray(),
	arr2;

arr1.push( 'a', 'b', 'c', 'd', 'e', 'f' );

arr2 = arr1.sget( ':' );
arr2.toString();
// returns 'a,b,c,d,e,f'

arr2 = arr1.sget( '2:' );
arr2.toString();
// returns 'c,d,e,f'

arr2 = arr1.sget( '2:4' );
arr2.toString();
// returns 'c,d'

arr2 = arr1.sget( '2:-1' );
arr2.toString();
// returns 'c,d,e'

arr2 = arr1.sget( '2:end-1' );
arr2.toString();
// returns 'c,d,e'

arr2 = arr1.sget( '::2' );
arr2.toString();
// returns 'a,c,e'

arr2 = arr1.sget( '5::-1' );
arr2.toString();
// returns 'f,e,d,c,b,a'

arr2 = arr1.sget( '20:' );
// returns null
```

For further subsequence documentation, see [compute-indexspace](https://github.com/compute-io/indexspace).





<a name="reget"></a>
##### StringArray.prototype.reget( re )

Returns values satisfying a regular expression in a new `StringArray`. If no values satisfy the regular expression, the method returns `null`.

``` javascript
var arr1 = new StringArray(),
	arr2;

arr1.push( 'a', 'beep', 'boop', 'c' );

arr2 = arr1.reget( /^b.*p$/ );
arr2.toString();
// returns 'beep,boop'

arr2 = arr.reget( /^w.*t$/ );
// returns null
```





<a name="bget"></a>
##### StringArray.prototype.bget( arr )

Returns values where the input `array` is equal to `true` in a new `StringArray`. If all elements in the input [`boolean array`](https://github.com/validate-io/boolean-array) are `false`, the method returns `null`.

``` javascript
var arr1 = new StringArray(),
	arr2;

arr1.push( 'a', 'beep', 'boop', 'c' );

arr2 = arr1.bget( [true,false,true,false] );
arr2.toString();
// returns 'a,boop'

arr2 = arr.bget( [false,false,false,false] );
// returns null
```

The input `boolean array` is __not__ required to have the same length as the `StringArray`. If the `boolean array` is shorter than the `StringArray`, only the first `N` elements are considered, where `N` is the input `array` length. If the input `array` length is greater than the `StringArray` length, only the first `N` elements are considered, where `N` is the `StringArray` length.

``` javascript
var arr1 = new StringArray(),
	arr2;

arr1.push( 'a', 'beep', 'boop', 'd' );

arr2 = arr1.bget( [false,true,true] );
arr2.toString();
// returns 'beep,boop'

arr2 = arr1.bget( [false,true,false,false,true,true] );
arr2.toString();
// returns 'beep'
```



<a name="lget"></a>
##### StringArray.prototype.lget( arr )

Returns values where the input `array` is equal to `1` in a new `StringArray`. If all elements in the input [`logical array`](https://github.com/validate-io/logical-array) are `0`, the method returns `null`.

``` javascript
var arr1 = new StringArray(),
	arr2;

arr1.push( 'a', 'beep', 'boop', 'c' );

arr2 = arr1.lget( [1,0,1,0] );
arr2.toString();
// returns 'a,boop'

arr2 = arr.lget( [0,0,0,0] );
// returns null
```

The input `logical array` is __not__ required to have the same length as the `StringArray`. If the `logical array` is shorter than the `StringArray`, only the first `N` elements are considered, where `N` is the input `array` length. If the input `array` length is greater than the `StringArray` length, only the first `N` elements are considered, where `N` is the `StringArray` length.

``` javascript
var arr1 = new StringArray(),
	arr2;

arr1.push( 'a', 'beep', 'boop', 'd' );

arr2 = arr1.lget( [0,1,1] );
arr2.toString();
// returns 'beep,boop'

arr2 = arr1.lget( [0,1,0,0,1,1] );
arr2.toString();
// returns 'beep'
```



===
#### Set Methods

<a name="set"></a>
##### StringArray.prototype.set()

TBD.



<a name="iset"></a>
##### StringArray.prototype.iset( idx, val )

Sets a `StringArray` value located at a specified index. `val` may be either a `string` primitive or a callback `function`. The callback is provided two arguments:
*	__value__: value at the specified index.
*	__idx__: specified index.


The callback is __expected__ to return a `string` primitive; otherwise, the method throws a `TypeError`. The callback `this` context is, by default, set to the `StringArray` instance. To override the `this` context, use [`bind`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind).

``` javascript
var arr = new StringArray();

arr.push( 'a', 'b', 'c' );

arr.iset( 1, 'beep' );
arr.toString();
// returns 'a,beep,c'

arr.iset( 1, function set( d, i ) {
	console.log( this.toString() );
	// returns 'a,beep,c'
	return d.replace( /e/g, 'o' );
});
arr.toString();
// returns 'a,boop,c'

arr.iset( 4, 'e' );
arr.toString();
// returns 'a,boop,c,,e'
```

Negative indices are allowed, as long as they resolve to a nonnegative index; e.g., `len - |idx| >= 0`. If not, the method throws a `RangeError`.

``` javascript
arr.iset( -4, 'beep' );
arr.toString();
// returns 'a,beep,c,,e'
```

__Note__: an input `string` must abide by `StringArray` length constraints. If an input `string` does not conform, the method throws a `RangeError`.



<a name="mset"></a>
##### StringArray.prototype.mset( idx, val )

Sets `StringArray` values located at a specified indices. `val` may be either a single `string` primitive, a `string` primitive `array` of equal length, or a callback `function`. The callback is provided two arguments:
*	__value__: value at the specified index.
*	__idx__: specified index.


The callback is __expected__ to return a `string` primitive; otherwise, the method throws a `TypeError`. The callback `this` context is, by default, set to the `StringArray` instance. To override the `this` context, use [`bind`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind).

``` javascript
var arr = new StringArray();

arr.push( 'a', 'b', 'c' );

arr.mset( [0,1], 'beep' );
arr.toString();
// returns 'beep,beep,c'

arr.mset( [0,1], function set( d, i ) {
	console.log( this.toString() );
	// returns 'beep,beep,c'
	return d.replace( /e/g, 'o' );
});
arr.toString();
// returns 'boop,boop,c'

arr.mset( [3,4], ['d','e'] );
arr.toString();
// returns 'boop,boop,c,d,e'
```

Negative indices are allowed, as long as they resolve to a nonnegative index; e.g., `len - |idx| >= 0`. If not, the method throws a `RangeError`.

``` javascript
arr.mset( [-4], 'beep' );
arr.toString();
// returns 'boop,beep,c,d,e'
```

__Notes__:
*	all `strings` must abide by `StringArray` length constraints. If a `string` does not conform, the method throws a `RangeError`.

	``` javascript
	arr.minLength = 1;
	arr.maxLength = 1;

	arr.mset( [0,1,2], ['a','b','woot'] );
	// throws RangeError

	arr.toString();
	// returns 'boop,beep,c,d,e'
	```

*	setting multiple `StringArray` values is __atomic__. If setting one value fails (e.g., `TypeError`), all values fail to be set.

	``` javascript
	arr.mset( [0,1,2], function set( d, i ) {
		if ( i === 2 ) {
			return 5;
		}
		return d;
	});
	// throws TypeError
	
	arr.toString();
	// returns 'boop,beep,c,d,e'
	```




<a name="sset"></a>
##### StringArray.prototype.sset( idx, val )

Sets `StringArray` values according to a specified [`subsequence`](https://github.com/compute-io/indexspace). `val` may be either a single `string` primitive, a `string` primitive `array` of equal length, or a callback `function`. The callback is provided two arguments:
*	__value__: value at a subsequence index.
*	__idx__: subsequence index.


The callback is __expected__ to return a `string` primitive; otherwise, the method throws a `TypeError`. The callback `this` context is, by default, set to the `StringArray` instance. To override the `this` context, use [`bind`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind).

``` javascript
var arr = new StringArray();

arr.push( 'a', 'b', 'c' );

arr.sset( ':2', 'beep' );
arr.toString();
// returns 'beep,beep,c'

arr.sset( '0:end-1:1', function set( d, i ) {
	console.log( this.toString() );
	// returns 'beep,beep,c'
	return d.replace( /e/g, 'o' );
});
arr.toString();
// returns 'boop,boop,c'

arr.sset( '3:', ['d','e'] );
arr.toString();
// returns 'boop,boop,c,d,e'

arr.sset( '::2', ['wo','ot', '!!'] );
arr.toString();
// returns 'wo,boop,ot,d,!!'
```

For further subsequence documentation, see [compute-indexspace](https://github.com/compute-io/indexspace).



__Notes__:
*	all `strings` must abide by `StringArray` length constraints. If a `string` does not conform, the method throws a `RangeError`.

	``` javascript
	arr.minLength = 1;
	arr.maxLength = 1;

	arr.sset( ':3', ['a','b','woot'] );
	// throws RangeError

	arr.toString();
	// returns 'wo,beep,ot,d,!!'
	```

*	setting multiple `StringArray` values is __atomic__. If setting one value fails (e.g., `TypeError`), all values fail to be set.

	``` javascript
	arr.sset( ':3, function set( d, i ) {
		if ( i === 2 ) {
			return 5;
		}
		return d;
	});
	// throws TypeError
	
	arr.toString();
	// returns 'wo,beep,ot,d,!!'
	```




<a name="reset"></a>
##### StringArray.prototype.reset( re, val )

Sets `StringArray` elements whose values satisfy a regular expression. `val` may be either a `string` primitive or a callback `function`. The callback is provided two arguments:
*	__value__: value satisfying regular expression.
*	__idx__: value index.


The callback is __expected__ to return a `string` primitive; otherwise, the method throws a `TypeError`. The callback `this` context is, by default, set to the `StringArray` instance. To override the `this` context, use [`bind`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind).

``` javascript
var arr = new StringArray();

arr.push( 'a', 'beep', 'boop', 'c' );

arr.reset( /^b.*p$/, 'woot' );
arr.toString();
// returns 'a,woot,woot,c'

arr.reset( /^w.*/, function set( d, i ) {
	console.log( this.toString() );
	// returns 'a,woot,woot,c'
	return d.replace( /o{2}t$/, 'eep' );
});
arr.toString();
// returns 'a,weep,weep,c'
```

__Note__: an input `string` must abide by `StringArray` length constraints. If an input `string` does not conform, the method throws a `RangeError`.






<a name="bset"></a>
##### StringArray.prototype.bset( idx, val )

Sets `StringArray` values where an input `boolean array` is `true`. `val` may be either a single `string` primitive, a `string` primitive `array` of equal length, or a callback `function`. The callback is provided two arguments:
*	__value__: value where input `array` is `true`.
*	__idx__: value index.


The callback is __expected__ to return a `string` primitive; otherwise, the method throws a `TypeError`. The callback `this` context is, by default, set to the `StringArray` instance. To override the `this` context, use [`bind`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind).

``` javascript
var arr = new StringArray();

arr.push( 'a', 'b', 'c' );

arr.bset( [true,false,true], 'beep' );
arr.toString();
// returns 'beep,b,beep'

arr.bset( [true,false,true], function set( d, i ) {
	console.log( this.toString() );
	// returns 'beep,b,beep'
	return d.replace( /e/g, 'o' );
});
arr.toString();
// returns 'boop,b,boop'

arr.bset( [true,false,true], ['d','e','f'] );
arr.toString();
// returns 'd,b,f'
```

The input `boolean array` is __not__ required to have the same length as the `StringArray`. If the `boolean array` is shorter than the `StringArray`, only the first `N` elements are considered, where `N` is the input `array` length. If the input `array` length is greater than the `StringArray` length, each `array` element equal to `true` extends the `StringArray`.

``` javascript
arr.bset( [false,false,false,false,true,false,true], 'woot' );
arr.toString();
// returns 'd,b,f,,woot,,woot'

arr.bset( [true,true], ['beep','boop'] );
arr.toString();
// returns 'beep,boop,f,,woot,,woot'
```


__Notes__:
*	all `strings` must abide by `StringArray` length constraints. If a `string` does not conform, the method throws a `RangeError`.

	``` javascript
	var arr = new StringArray();

	arr.push( 'd', 'b', 'f' );
	arr.minLength = 1;
	arr.maxLength = 1;

	arr.bset( [true,true,true], ['a','e','woot'] );
	// throws RangeError

	arr.toString();
	// returns 'd,b,f'
	```

*	setting multiple `StringArray` values is __atomic__. If setting one value fails (e.g., `TypeError`), all values fail to be set.

	``` javascript
	arr.bset( [true,true,true], function set( d, i ) {
		if ( i === 2 ) {
			return 5;
		}
		return d;
	});
	// throws TypeError
	
	arr.toString();
	// returns 'd,b,f'
	```



<a name="lset"></a>
##### StringArray.prototype.lset( idx, val )

Sets `StringArray` values where an input [`logical array`](https://github.com/validate-io/logical-array) is `1`. `val` may be either a single `string` primitive, a `string` primitive `array` of equal length, or a callback `function`. The callback is provided two arguments:
*	__value__: value where input `array` is `1`.
*	__idx__: value index.


The callback is __expected__ to return a `string` primitive; otherwise, the method throws a `TypeError`. The callback `this` context is, by default, set to the `StringArray` instance. To override the `this` context, use [`bind`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind).

``` javascript
var arr = new StringArray();

arr.push( 'a', 'b', 'c' );

arr.lset( [1,0,1], 'beep' );
arr.toString();
// returns 'beep,b,beep'

arr.lset( [1,0,1], function set( d, i ) {
	console.log( this.toString() );
	// returns 'beep,b,beep'
	return d.replace( /e/g, 'o' );
});
arr.toString();
// returns 'boop,b,boop'

arr.lset( [1,0,1], ['d','e','f'] );
arr.toString();
// returns 'd,b,f'
```

The input `logical array` is __not__ required to have the same length as the `StringArray`. If the `logical array` is shorter than the `StringArray`, only the first `N` elements are considered, where `N` is the input `array` length. If the input `array` length is greater than the `StringArray` length, each `array` element equal to `1` extends the `StringArray`.

``` javascript
arr.lset( [0,0,0,0,1,0,1], 'woot' );
arr.toString();
// returns 'd,b,f,,woot,,woot'

arr.lset( [1,1], ['beep','boop'] );
arr.toString();
// returns 'beep,boop,f,,woot,,woot'
```


__Notes__:
*	all `strings` must abide by `StringArray` length constraints. If a `string` does not conform, the method throws a `RangeError`.

	``` javascript
	var arr = new StringArray();

	arr.push( 'd', 'b', 'f' );
	arr.minLength = 1;
	arr.maxLength = 1;

	arr.lset( [1,1,1], ['a','e','woot'] );
	// throws RangeError

	arr.toString();
	// returns 'd,b,f'
	```

*	setting multiple `StringArray` values is __atomic__. If setting one value fails (e.g., `TypeError`), all values fail to be set.

	``` javascript
	arr.lset( [1,1,1], function set( d, i ) {
		if ( i === 2 ) {
			return 5;
		}
		return d;
	});
	// throws TypeError
	
	arr.toString();
	// returns 'd,b,f'
	```





===
#### Mutator Methods


<a name="push"></a>
##### [StringArray.prototype.push( string0[, string1[,...]] )](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push)

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


<a name="pop"></a>
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



<a name="unshift"></a>
##### [StringArray.prototype.unshift( string0[, string1[,...]] )](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift)

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


<a name="shift"></a>
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


<a name="reverse"></a>
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


<a name="sort"></a>
##### [StringArray.prototype.sort( [comparator] )](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)

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


<a name="splice"></a>
##### [StringArray.prototype.splice( start, deleteCount[, string0[, string1[,...]]] )](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice)

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


===
#### Accessor Methods



<a name="indexof"></a>
##### [StringArray.prototype.indexOf( [str] )](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf)

Returns the first index of a `StringArray` value equal to a specified value. Returns `-1` if not found.

``` javascript
var arr = new StringArray();

arr.push( 'a', 'b', 'c' );
arr.indexOf( 'b' );
// returns 1

arr.indexOf( 'd' );
// returns -1
```




<a name="lastindexof"></a>
##### [StringArray.prototype.lastIndexOf( [str] )](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/lastIndexOf)

Returns the last index of a `StringArray` value equal to a specified value. Returns `-1` if not found.

``` javascript
var arr = new StringArray();

arr.push( 'a', 'b', 'b', 'c' );
arr.lastIndexOf( 'b' );
// returns 2

arr.lastIndexOf( 'd' );
// returns -1
```


<a name="slice"></a>
##### [StringArray.prototype.slice( [start[, end]] )](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)

Extracts a section of a `StringArray` into a new `StringArray`. If not provided, `start` defaults to `0` and `end` defaults to the array length.

``` javascript
var arr = new StringArray(),
	slice;

arr.push( 'a', 'b', 'c', 'd', 'e' );

slice = arr.slice();
slice.toString();
// returns 'a,b,c,d,e'

slice = arr.slice( 2 );
slice.toString();
// returns 'c,d,e'

slice = arr.slice( -3 );
slice.toString();
// returns 'b,c,d,e'

slice = arr.slice( 1, 3 );
slice.toString();
// returns 'b,c'

slice = arr.slice( 1, -1 );
slice.toString();
// returns 'b,c,d'
```

__Note__: returns a new `StringArray` with the same `string` length constraints.






<a name="concat"></a>
##### [StringArray.prototype.concat( value0[, value1[,...]] )](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat)

Concatenates this `StringArray` with other StringArray(s), array(s) of strings, and/or string(s).

``` javascript
var arr1 = new StringArray(),
	arr2 = new StringArray();

arr1.push( 'a', 'b', 'c' );
arr2.push( 'd', 'e', 'f' );

var arr3 = arr1.concat( arr2 );

arr3 instanceof StringArray;
// returns true

arr3.toString();
// returns 'a,b,c,d,e,f'

var arr4 = arr3.concat( 'beep' );
arr4.toString();
// returns 'a,b,c,d,e,f,beep'

var arr5 = arr1.concat( 'd', ['e','f'] );
arr5.toString();
// returns 'a,b,c,d,e,f'
```

__Note__: returns a new `StringArray` with the same `string` length constraints.





<a name="join"></a>
##### [StringArray.prototype.join( [sep] )](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join)

Joins all `StringArray` values into a single `string`. The default value separator is `','`.

``` javascript
var arr = new StringArray();

arr.push( 'a', 'b', 'c' );
arr.join();
// returns 'a,b,c'
```

To specify a different separator,

``` javascript
var arr = new StringArray();

arr.push( 'a', 'b', 'c' );
arr.join( ' - ' );
// returns 'a - b - c'
```




<a name="tostring"></a>
##### [StringArray.prototype.toString()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toString)

Returns a `string` representation of a `StringArray`.

``` javascript
var arr = new StringArray();

arr.push( 'a', 'b', 'c' );
arr.toString();
// returns 'a,b,c'
```



<a name="tolocalestring"></a>
##### [StringArray.prototype.toLocaleString()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toLocaleString)

Returns a locale specific `string` representation of a `StringArray`.

``` javascript
var arr = new StringArray();

arr.push( 'a', 'b', 'c' );
arr.toLocaleString();
// returns 'a,b,c'
```


<a name="toarray"></a>
##### StringArray.prototype.toArray()

Returns a native `array` representation of a `StringArray`.

``` javascript
var arr = new StringArray();

arr.push( 'a', 'b', 'c' );
arr.toArray();
// returns ['a','b','c']
```

__Note__: changes to the returned `array` will __not__ affect the `StringArray`.




===
#### Iteration Methods

<a name="foreach"></a>
##### [StringArray.prototype.forEach( clbk[, thisArg] )](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)

Executes a provided `function` once for every `StringArray` element. The `clbk` is provided the following arguments:
*	__value__: current element
*	__index__: current element index
*	__arr__: `StringArray` instance

To specify the runtime `this` context for the callback, provide a `thisArg`.

``` javascript
var arr = new StringArray();
arr.push( 'a', 'b', 'c' );

arr.forEach( function forEach( val, i, arr ) {
	console.log( 'Value at index `' + i + '` is `' + val + '`.' );
});
```

__Note__: do __not__ use this as a __general__ method. Instead, use `Array.prototype.forEach.call()` when wanting to apply to non-`StringArray` objects.



<a name="every"></a>
##### [StringArray.prototype.every( clbk[, thisArg] )](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every)

Returns `true` if every element passes a provided condition; otherwise, `false`. The condition `clbk` is provided the following arguments:
*	__value__: current element
*	__index__: current element index
*	__arr__: `StringArray` instance

To specify the runtime `this` context for the callback, provide a `thisArg`.

``` javascript
var arr = new StringArray();
arr.push( 'a', 'b', 'c' );

var bool = arr.every( function every( val, i, arr ) {
	return ( val.length < 3 );
});
// returns true
```

__Note__: do __not__ use this as a __general__ method. Instead, use `Array.prototype.every.call()` when wanting to apply to non-`StringArray` objects.



<a name="some"></a>
##### [StringArray.prototype.some( clbk[, thisArg] )](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some)

Returns `true` if at least __one__ element passes a provided condition; otherwise, `false`. The condition `clbk` is provided the following arguments:
*	__value__: current element
*	__index__: current element index
*	__arr__: `StringArray` instance

To specify the runtime `this` context for the callback, provide a `thisArg`.

``` javascript
var arr = new StringArray();
arr.push( 'a', 'beep', 'c' );

var bool = arr.some( function some( val, i, arr ) {
	return ( val.length > 1 );
});
// returns true
```

__Note__: do __not__ use this as a __general__ method. Instead, use `Array.prototype.some.call()` when wanting to apply to non-`StringArray` objects.



<a name="filter"></a>
##### [StringArray.prototype.filter( clbk[, thisArg] )](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)

Returns a new `StringArray` containing only those elements which satisfy a test condition. The condition `clbk` is provided the following arguments:
*	__value__: current element
*	__index__: current element index
*	__arr__: `StringArray` instance

To specify the runtime `this` context for the callback, provide a `thisArg`.

``` javascript
var arr = new StringArray();
arr.push( 'a', 'beep', 'boop', 'c' );

var arr2 = arr.filter( function filter( val, i, arr ) {
	return ( val.length > 1 );
});
arr2.toString();
// returns 'beep,boop'
```

__Notes__: 
*	do __not__ use this as a __general__ method. Instead, use `Array.prototype.filter.call()` when wanting to apply to non-`StringArray` objects.
*	returns a new `StringArray` instance having the same length constraints.



<a name="map"></a>
##### [StringArray.prototype.map( clbk[, thisArg] )](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)

Applies a `function` to each `StringArray` element and maps the result of each invocation to an element in a new `StringArray`. The `clbk` is provided the following arguments:
*	__value__: current element
*	__index__: current element index
*	__arr__: `StringArray` instance

To specify the runtime `this` context for the callback, provide a `thisArg`.

``` javascript
var arr = new StringArray();
arr.push( 'a', 'beep', 'boop', 'c' );

var arr2 = arr.map( function map( val, i, arr ) {
	return val + '-bot';
});
arr2.toString();
// returns 'a-bot,beep-bot,boop-bot,c-bot'
```

__Notes__:
*	the map `function` should return only `string` primitives. A `non-string` primitive result will throw an `Error`.
*	do __not__ use this as a __general__ method. Instead, use `Array.prototype.map.call()` when wanting to apply to non-`StringArray` objects.
*	returns a new `StringArray` instance having __no__ length constraints.




<a name="reduce"></a>
##### [StringArray.prototype.reduce( clbk[, initialValue] )](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)

Executes a `function` against an accumulator and each `StringArray` element to return a single value. The `clbk` is provided the following arguments:
*	__acc__: previous reduce result
*	__curr__: current element
*	__index__: current element index
*	__arr__: `StringArray` instance

To specify an initial value, provide a second argument.

``` javascript
var arr = new StringArray();
arr.push( 'a', 'b', 'c' );

var result = arr.reduce( function reduce( acc, val, i, arr ) {
	return acc + val + val;
});
// returns 'aabbcc'
```

__Notes__: do __not__ use this as a __general__ method. Instead, use `Array.prototype.reduce.call()` when wanting to apply to non-`StringArray` objects.



<a name="reduceRight"></a>
##### [StringArray.prototype.reduceRight( clbk[, initialValue] )](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduceRight)

Executes a `function` against an accumulator and each `StringArray` element to return a single value. The order in which elements are processed proceeds from the end of the `StringArray` to the start of the `StringArray`.The `clbk` is provided the following arguments:
*	__acc__: previous reduce result
*	__curr__: current element
*	__index__: current element index
*	__arr__: `StringArray` instance

To specify an initial value, provide a second argument.

``` javascript
var arr = new StringArray();
arr.push( 'a', 'b', 'c' );

var result = arr.reduceRight( function reduce( acc, val, i, arr ) {
	return acc + val + val;
});
// returns 'ccbbaa'
```

__Notes__: do __not__ use this as a __general__ method. Instead, use `Array.prototype.reduceRight.call()` when wanting to apply to non-`StringArray` objects.


===
## Examples

``` javascript
var StringArray = require( 'string-array' );

var arr, val, bool;

arr = new StringArray();

arr.push( 'a', 'b', 'c' );
arr.length;
// returns 3

arr.toString();
// returns 'a,b,c'

val = arr.pop();
// returns 'c'

val = arr.shift();
// returns 'a'

arr.unshift( 'c' );
arr.length;
// returns 2

arr.toString();
// returns 'c,b'

arr.splice( 0, 0, 'd', 'e', 'f' );
arr.length;
// returns 5

arr.toString();
// returns 'c,d,e,f,b'

val = arr.slice( 1, -1 );
// returns 'd,e,f'

arr.forEach( function forEach( val, i ) {
	console.log( i, val );
});

arr.sort();
arr.toString();
// returns 'b,c,d,e,f'

arr.reverse();
arr.toString();
// returns 'f,e,d,c,b'

bool = arr.every( function every( val, i ) {
	return ( val < 'g' );
});
// returns true

bool = arr.some( function some( val, i ) {
	return ( val >= 'c' );
});
// returns true

val = arr.filter( function filter( val ) {
	return 'f' > val && val > 'b';
});
val.toString();
// returns 'e,d,c'

val = arr.map( function map( val, i ) {
	var str = val;
	for ( var j = 0; j < i; j++ ) {
		val += str;
	}
	return val;
});
val.toString();
// returns 'f,ee,ddd,cccc,bbbbb'

val = arr.reduce( function reduce( acc, curr ) {
	return acc + '-|-' + curr;
});
// returns 'f-|-e-|-d-|-c-|-b'

val = arr.reduceRight( function reduce( acc, curr ) {
	return acc + '-|-' + curr;
});
// returns 'b-|-c-|-d-|-e-|-f'


// GET //

val = arr.iget( 1 );
// returns 'e'

val = arr.mget( [1,3] );
val.toString();
// returns 'e,c'

val = arr.bget( [true,false,true,true,false] );
val.toString();
// returns 'f,d,c'

val = arr.lget( [1,0,1,1,0] );
val.toString();
// returns 'f,d,c'


// SET //

arr.iset( 1, 'eep' );
arr.toString();
// returns 'f,eep,d,c,b'

arr.mset( [0,2], ['foo','bar'] );
arr.toString();
// returns 'foo,eep,bar,c,b'

arr.bset( [false,false,false,true,true], function set( d ) {
	return d + d;
});
arr.toString();
// returns 'foo,eep,bar,cc,bb'

arr.lset( [1,1,1], function set( d ) {
	return '~' + d + '~';
});
arr.toString();
// returns '~foo~,~eep~,~bar~,cc,bb'
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


===
## Notes

* 	A `StringArray` is __not__ an `Array` instance.
* 	`Object.keys()` will __not__ work as expected. A `StringArray` instance is an `object` which manages an internal `array`.
* 	When applied to a `StringArray`, [`Array.isArray()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray)  will return `false`.
* 	While an effort has been made to retain fidelity to the ECMAScript standard for `Arrays`, no guarantee is made that method implementations are spec compliant. This is particularly the case where the spec stipulates additional checks, etc; e.g., `Array#reverse`.
*	`[]` notation does __not__ work as expected. A `StringArray` is an `object`. Using bracket notation will set and return values on the `StringArray` itself, __not__ on the internally managed `array` instance. You can set properties directly on the `StringArray` as you can with any `object`; just ensure that this is treated as distinct from the `StringArray` array data.
*	Working with external methods expecting native `arrays` will require marshalling and unmarshalling of `StringArray` data to and from `arrays`.

	``` javascript 
	var arr = new StringArray();

	arr.push( 'a', 'b', 'c' );

	// Some method expecting native arrays...
	var nativeArray = foo( arr.toArray() );

	// Assuming the native array elements are all strings, marshal the data back into a string array...
	arr = new StringArray();
	arr.push.apply( arr, nativeArray );
	```

===
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
