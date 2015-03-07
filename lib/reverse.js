/**
*
*	STRING ARRAY: reverse
*
*
*	DESCRIPTION:
*		- Reverses the array order.
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
* FUNCTION: reverse()
*	Reverses the array order. See [Array#reverse]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse}.
*
* @returns {StringArray} StringArray instance
*/
function reverse() {
	/* jshint validthis:true */
	var arr = this._arr,
		N = arr.length,
		half = Math.floor( N / 2 ),
		tmp,
		i, j;

	N = N - 1;
	for ( i = 0; i < half; i++ ) {
		tmp = arr[ i ];
		j = N - i;
		arr[ i ] = arr[ j ];
		arr[ j ] = tmp;
	}
	return this;
} // end FUNCTION reverse()


// EXPORTS //

module.exports = reverse;
