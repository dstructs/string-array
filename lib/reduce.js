/**
*
*	STRING ARRAY: reduce
*
*
*	DESCRIPTION:
*		- Executes a function against an accumulator and each StringArray element to return a single value.
*
*
*	NOTES:
*		[1]
*
*
*	TODO:
*		[1]
*
*
*	LICENSE:
*		MIT
*
*	Copyright (c) 2015. Athan Reines.
*
*
*	AUTHOR:
*		Athan Reines. kgryte@gmail.com. 2015.
*
*/

'use strict';

/**
* FUNCTION: reduce( clbk[, initialValue] )
*	Executes a function against an accumulator and each StringArray element to return a single value. See [Array#reduce]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce}.
*
* @param {Function} clbk - function to execute
* @param {*} [initialValue] - initial value
* @returns {*} reduced result
*/
function reduce( clbk, val ) {
	/* jshint validthis:true */
	var arr = this._arr,
		len = arr.length,
		i;

	if ( typeof clbk !== 'function' ) {
		throw new TypeError( 'reduce()::invalid input argument. Callback must be a function. Value: `' + clbk + '`.' );
	}
	if ( arguments.length === 1 ) {
		if ( len === 0 ) {
			throw new TypeError( 'reduce()::invalid input argument. Running reduce over an empty array requires providing an initial value.' );
		}
		if ( len === 1 ) {
			return arr[ 0 ];
		}
		val = arr[ 0 ];
		i = 1;
	}
	if ( arguments.length > 1 ) {
		if ( !len ) {
			return val;
		}
		i = 0;
	}
	while ( i < len ) {
		val = clbk( val, arr[ i ], i, this );
		i++;
	}
	return val;
} // end FUNCTION reduce()


// EXPORTS //

module.exports = reduce;
