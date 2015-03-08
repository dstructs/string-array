/**
*
*	STRING ARRAY: iget
*
*
*	DESCRIPTION:
*		- Return a StringArray value located at a specific index.
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


// IGET //

/**
* FUNCTION: iget( idx )
*	Return a StringArray value located at a specific index.
*
* @param {Number} idx - index
* @returns {String|undefined} element or undefined
*/
function iget( idx ) {
	/* jshint validthis:true */
	if ( !isInteger( idx ) ) {
		throw new TypeError( 'iget()::invalid input argument. Index must be an integer. Value: `' + idx + '`.' );
	}
	if ( idx < 0 ) {
		idx = this._arr.length + idx; // len - idx
	}
	return this._arr[ idx ];
} // end FUNCTION iget()


// EXPORTS //

module.exports = iget;
