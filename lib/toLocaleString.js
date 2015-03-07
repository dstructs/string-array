/**
*
*	STRING ARRAY: toLocaleString
*
*
*	DESCRIPTION:
*		- Returns a locale specific string representation of a StringArray instance.
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
* FUNCTION: toLocaleString()
*	Returns the array contents as a locale specific string. See [Array#toLocaleString]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toLocaleString}.
*
* @returns {String} locale specific string representation of array contents
*/
function toLocaleString() {
	/* jshint validthis:true */
	return this._arr.toLocaleString();
} // end FUNCTION toLocaleString()


// EXPORTS //

module.exports = toLocaleString;
