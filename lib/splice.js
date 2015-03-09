/**
*
*	STRING ARRAY: splice
*
*
*	DESCRIPTION:
*		- Add and/or remove array elements.
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
* FUNCTION: splice( start, deleteCount[, str0[, str1[,...] ] ] )
*	Add or remove array elements. See [Array#splice]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice}.
*
* @param {Number} start - start index
* @param {Number} deleteCount - number of elements to delete
* @param {...String} strings to add to the array
* @returns {String[]} array containing the delete elements, or an empty array if no elements were deleted
*/
function splice() {
	/* jshint validthis:true */
	var args = arguments,
		nargs = args.length,
		min = this._minLength,
		max = this._maxLength,
		str,
		len,
		i;

	if ( nargs > 2 ) {
		for ( i = 2; i < nargs; i++ ) {
			str = args[ i ];
			if ( typeof str !== 'string' ) {
				throw new TypeError( 'splice()::invalid input argument. Values must be string primitives. Value: `' + str + '`.' );
			}
			len = str.length;
			if ( len < min || len > max ) {
				throw new RangeError( 'splice()::invalid input argument. String length must be on the interval [' + min + ',' + max + '].' );
			}
		}
	}
	return this._arr.splice.apply( this._arr, args );
} // end FUNCTION splice()


// EXPORTS //

module.exports = splice;
