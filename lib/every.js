/**
*
*	STRING ARRAY: every
*
*
*	DESCRIPTION:
*		- Returns true if every element passes a provided condition; otherwise, false.
*
*
*	NOTES:
*		[1] Similar to steps outlined in ECMA-262, Edition 5, 15.4.4.18.
*		[2] Reference: http://es5.github.io/#x15.4.4.18.
*		[3] Inspired by [MDN]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every}.
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
* FUNCTION: every( clbk[, thisArg] )
*	Returns true if every element passes a provided condition; otherwise, false. See [Array#every]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every}.
*
* @param {Function} clbk - function to execute
* @param {Object} [thisArg] - `this` context when executing the function
* @returns {Boolean} boolean indicating if every element satisfies a test condition
*/
function every( clbk, thisArg ) {
	/* jshint validthis:true */
	var arr = this._arr,
		len = arr.length,
		cntxt,
		i;

	if ( typeof clbk !== 'function' ) {
		throw new TypeError( 'every()::invalid input argument. Callback must be a function. Value: `' + clbk + '`.' );
	}
	if ( arguments.length > 1 ) {
		cntxt = thisArg;
	}
	for ( i = 0; i < len; i++ ) {
		if ( !clbk.call( cntxt, arr[ i ], i, this ) ) {
			return false;
		}
	}
	return true;
} // end FUNCTION every()


// EXPORTS //

module.exports = every;
