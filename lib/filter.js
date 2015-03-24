/**
*
*	STRING ARRAY: filter
*
*
*	DESCRIPTION:
*		- Returns a new StringArray containing only those elements which satisfy a test condition.
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
* FUNCTION: filter( clbk[, thisArg] )
*	Returns a new StringArray containing only those elements which satisfy a test condition. See [Array#filter]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter}.
*
* @param {Function} clbk - function to execute
* @param {Object} [thisArg] - `this` context when executing the function
* @returns {StringArray} new StringArray containing filtered elements
*/
function filter( clbk, thisArg ) {
	/* jshint validthis:true */
	var arr = this._arr,
		len = arr.length,
		out,
		i;

	if ( typeof clbk !== 'function' ) {
		throw new TypeError( 'filter()::invalid input argument. Callback must be a function. Value: `' + clbk + '`.' );
	}
	out = new this.constructor();
	out.minLength = this.minLength;
	out.maxLength = this.maxLength;
	if ( arguments.length > 1 ) {
		for ( i = 0; i < len; i++ ) {
			if ( clbk.call( thisArg, arr[ i ], i, this ) ) {
				out._arr.push( arr[ i ] );
			}
		}
	} else {
		for ( i = 0; i < len; i++ ) {
			if ( clbk( arr[ i ], i, this ) ) {
				out._arr.push( arr[ i ] );
			}
		}
	}
	return out;
} // end FUNCTION filter()


// EXPORTS //

module.exports = filter;
