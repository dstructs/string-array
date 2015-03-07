/**
*
*	STRING ARRAY: pop
*
*
*	DESCRIPTION:
*		- Removes the last array element and returns that element.
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
* FUNCTION: pop()
*	Removes the last array element and returns that element. See [Array#pop]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/pop}.
*
* @returns {String} removed element
*/
function pop() {
	/* jshint validthis:true */
	return this._arr.pop();
} // end FUNCTION pop()


// EXPORTS //

module.exports = pop;
