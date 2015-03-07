/**
*
*	STRING ARRAY: shift
*
*
*	DESCRIPTION:
*		- Removes the first element from an array and returns that element.
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
* FUNCTION: shift()
*	Removes the first element from an array and returns that element. See [Array#shift]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/shift}.
*
* @returns {String} removed element
*/
function shift() {
	/* jshint validthis:true */
	return this._arr.shift();
} // end FUNCTION shift()


// EXPORTS //

module.exports = shift;
