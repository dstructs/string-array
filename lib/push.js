/**
*
*	STRING ARRAY: push
*
*
*	DESCRIPTION:
*		- Adds one or more elements to the end of an array and returns the new array length.
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
* FUNCTION: push( value0[, value1[,...] ] )
*	Adds one or more elements to the end of an array and returns the new array length. See [Array#push]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push}.
*
* @param {...String} value - strings to add to the array
* @returns {Number} array length
*/
function push() {
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
			throw new TypeError( 'push()::invalid input argument. Method only accepts string primitives. Value: `' + str + '`.' );
		}
		len = str.length;
		if ( len < min || len > max ) {
			throw new RangeError( 'push()::invalid input argument. String length must on the interval [' + min + ',' + max + '].' );
		}
	}
	for ( i = 0; i < nargs; i++ ) {
		this._arr.push( args[ i ] );
	}
	return this._arr.length;
} // end FUNCTION push()


// EXPORTS //

module.exports = push;
