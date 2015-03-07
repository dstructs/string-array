/**
*
*	STRING ARRAY: slice
*
*
*	DESCRIPTION:
*		- Extracts a section of a StringArray into a new StringArray.
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

// MODULES //

var isInteger = require( 'validate.io-integer' );


// SLICE //

/**
* FUNCTION: slice( [start[, end]] )
*	Extracts a section of a StringArray into a new StringArray. See [Array#slice]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice}.
*
* @param {Number} [start=0] - start index at which to begin the slice
* @param {Number} [end=length] - end index at which to end the slice (exclusive)
* @returns {StringArray} new StringArray
*/
function slice( start, end ) {
	/* jshint validthis:true */
	var nargs = arguments.length,
		arr = this._arr,
		len = arr.length,
		out,
		i;

	if ( nargs ) {
		if ( !isInteger( start ) ) {
			throw new TypeError( 'slice()::invalid input argument. Start index must be an integer. Value: `' + start + '`.' );
		}
		if ( start < 0 ) {
			start = len + start - 1; // len - start - 1
		}
	} else {
		start = 0;
	}
	if ( nargs > 1 ) {
		if ( !isInteger( end ) ) {
			throw new TypeError( 'slice()::invalid input argument. End index must be an integer. Value: `' + end + '`.' );
		}
		if ( end < 0 ) {
			end = len + end; // len - end
		} else if ( end > len ) {
			end = len;
		}
	} else {
		end = len;
	}
	out = new this.constructor();
	out.minLength = this.minLength;
	out.maxLength = this.maxLength;
	for ( i = start; i < end; i++ ) {
		out._arr.push( arr[ i ] );
	}
	return out;
} // end FUNCTION slice()


// EXPORTS //

module.exports = slice;
