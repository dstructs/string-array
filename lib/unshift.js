/**
*
*	STRING ARRAY: unshift
*
*
*	DESCRIPTION:
*		- Adds one or more elements to the front of an array and returns the new array length.
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
* FUNCTION: unshift( value0[, value1[,...] ] )
*	Adds one or more elements to the front of an array and returns the new array length. See [Array#unshift]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift}.
*
* @param {...String} value - strings to add to the array
* @returns {Number} array length
*/
function unshift() {
	/* jshint validthis:true */
	var args = arguments,
		nargs = args.length,
		min = this._minLength,
		max = this._maxLength,
		str,
		len,
		i;

	for ( i = 0; i < nargs; i++ ) {
		str = args[ i ];
		if ( typeof str !== 'string' ) {
			throw new TypeError( 'unshift()::invalid input argument. Method only accepts string primitives. Value: `' + str + '`.' );
		}
		len = str.length;
		if ( len < min || len > max ) {
			throw new RangeError( 'unshift()::invalid input argument. String length must be on the interval [' + min + ',' + max + '].' );
		}
	}
	for ( i = nargs-1; i >= 0; i-- ) {
		this._arr.unshift( args[ i ] );
	}
	return this._arr.length;
} // end FUNCTION unshift()


// EXPORTS //

module.exports = unshift;
