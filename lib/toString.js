/**
*
*	STRING ARRAY: toString
*
*
*	DESCRIPTION:
*		- Returns a string representation of a StringArray instance.
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
* FUNCTION: toString()
*	Returns the array contents as a string. See [Array#toString]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toString}.
*
* @returns {String} string representation of array contents
*/
function toString() {
	/* jshint validthis:true */
	return this._arr.toString();
} // end FUNCTION toString()


// EXPORTS //

module.exports = toString;
