/**
*
*	STRING ARRAY: reduceRight
*
*
*	DESCRIPTION:
*		- Executes a function against an accumulator and each StringArray element to return a single value. The order in which elements are processed proceeds from the end of the StringArray to the start of the StringArray.
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
*	Executes a function against an accumulator and each StringArray element to return a single value.  The order in which elements are processed proceeds from the end of the StringArray to the start of the StringArray. See [Array#reduceRight]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduceRight}.
*
* @param {Function} clbk - function to execute
* @param {*} [initialValue] - initial value
* @returns {*} reduced result
*/
function reduceRight( clbk, val ) {
	/* jshint validthis:true */
	var arr = this._arr,
		len = arr.length,
		i;

	if ( typeof clbk !== 'function' ) {
		throw new TypeError( 'reduceRight()::invalid input argument. Callback must be a function. Value: `' + clbk + '`.' );
	}
	if ( arguments.length === 1 ) {
		if ( len === 0 ) {
			throw new TypeError( 'reduceRight()::invalid input argument. Running reduce over an empty array requires providing an initial value.' );
		}
		if ( len === 1 ) {
			return arr[ 0 ];
		}
		val = arr[ len-1 ];
		i = len - 2;
	}
	if ( arguments.length > 1 ) {
		if ( !len ) {
			return val;
		}
		i = len - 1;
	}
	while ( i >= 0 ) {
		val = clbk( val, arr[ i ], i, this );
		i--;
	}
	return val;
} // end FUNCTION reduceRight()


// EXPORTS //

module.exports = reduceRight;
