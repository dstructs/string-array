/**
*
*	STRING ARRAY: sort
*
*
*	DESCRIPTION:
*		- Sorts the array elements in place and returns the array.
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
* FUNCTION: sort( [comparator] )
*	Sorts the array elements in place and returns the array. See [Array#sort]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort}.
*
* @param {Function} comparator - comparator function used for determining the sort order
* @returns {StringArray} StringArray instance
*/
function sort( fcn ) {
	/* jshint validthis:true */
	if ( arguments.length ) {
		this._arr.sort( fcn );
	} else {
		this._arr.sort();
	}
	return this;
} // end FUNCTION sort()


// EXPORTS //

module.exports = sort;
