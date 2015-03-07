/**
*
*	STRING ARRAY: toArray
*
*
*	DESCRIPTION:
*		- Returns a copy of a string array as a native array.
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
* FUNCTION: toArray()
*	Returns a copy of a string array as a native array.
*
* @returns {String[]} array of strings
*/
function toArray() {
	/* jshint validthis:true */
	return this._arr.slice();
} // end FUNCTION toArray()


// EXPORTS //

module.exports = toArray;
