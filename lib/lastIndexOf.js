/**
*
*	STRING ARRAY: lastIndexOf
*
*
*	DESCRIPTION:
*		- Returns the last index of a StringArray value equal to a specified string.
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
* FUNCTION: lastIndexOf( [str] )
*	Returns the last index of a StringArray value equal to a specified string. Returns -1 if not found. See [Array#indexOf]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf}.
*
* @param {String} [str] - search value
* @returns {Number} index or -1
*/
function lastIndexOf( str ) {
	/* jshint validthis:true */
	var arr = this._arr,
		len = arr.length,
		i;

	if ( !arguments.length ) {
		return -1;
	}
	for ( i = len-1; i >= 0; i-- ) {
		if ( arr[ i ] === str ) {
			return i;
		}
	}
	return -1;
} // end FUNCTION lastIndexOf()


// EXPORTS //

module.exports = lastIndexOf;
