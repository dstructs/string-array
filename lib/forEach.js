/**
*
*	STRING ARRAY: forEach
*
*
*	DESCRIPTION:
*		- Executes a provided function once for every StringArray element.
*
*
*	NOTES:
*		[1] Similar to steps outlined in ECMA-262, Edition 5, 15.4.4.18.
*		[2] Reference: http://es5.github.io/#x15.4.4.18.
*		[3] Inspired by [MDN]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach}.
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
* FUNCTION: forEach( clbk, thisArg )
*	Executes a provided function once for every StringArray element. See [Array#forEach]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach}.
*
* @param {Function} clbk - function to execute
* @param {Object} [thisArg] - `this` context when executing the function
* @returns {undefined}
*/
function forEach( clbk, thisArg ) {
	/* jshint validthis:true */
	var arr = this._arr,
		len = arr.length,
		i;

	if ( typeof clbk !== 'function' ) {
		throw new TypeError( 'forEach()::invalid input argument. Callback must be a function. Value: `' + clbk + '`.' );
	}
	if ( arguments.length > 1 ) {
		for ( i = 0; i < len; i++ ) {
			clbk.call( thisArg, arr[ i ], i, this );
		}
	} else {
		for ( i = 0; i < len; i++ ) {
			clbk( arr[ i ], i, this );
		}
	}
} // end FUNCTION forEach()


// EXPORTS //

module.exports = forEach;
