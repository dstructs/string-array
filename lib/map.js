/**
*
*	STRING ARRAY: map
*
*
*	DESCRIPTION:
*		- Applies a function to each StringArray element and maps the result of each invocation to an element in a new StringArray.
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
* FUNCTION: map( clbk[, thisArg] )
*	Applies a function to each StringArray element and maps the result of each invocation to an element in a new StringArray. See [Array#map]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map}.
*
* @param {Function} clbk - function to execute
* @param {Object} [thisArg] - `this` context when executing the function
* @returns {StringArray} new StringArray containing mapped elements
*/
function map( clbk, thisArg ) {
	/* jshint validthis:true */
	var arr = this._arr,
		len = arr.length,
		cntxt,
		out,
		tmp,
		i;

	if ( typeof clbk !== 'function' ) {
		throw new TypeError( 'map()::invalid input argument. Callback must be a function. Value: `' + clbk + '`.' );
	}
	if ( arguments.length > 1 ) {
		cntxt = thisArg;
	}
	out = new this.constructor();
	for ( i = 0; i < len; i++ ) {
		tmp = clbk.call( cntxt, arr[ i ], i, this );
		if ( typeof tmp !== 'string' ) {
			throw new TypeError( 'map()::invalid return value. Map function return value must be a primitive string. Value: `' + tmp + '`.' );
		}
		out._arr.push( tmp );
	}
	return out;
} // end FUNCTION map()


// EXPORTS //

module.exports = map;
