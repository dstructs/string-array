/**
*
*	STRING ARRAY: bget
*
*
*	DESCRIPTION:
*		- Returns values where the input array is equal to `true` in a new StringArray.
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

var isBooleanArray = require( 'validate.io-boolean-primitive-array' );


// BGET //

/**
* FUNCTION: bget( arr )
*	Returns values where the input array is equal to `true` in a new StringArray.
*
* @param {Boolean[]} arr - boolean array
* @returns {StringArray|null} new StringArray or null
*/
function bget( bool ) {
	/* jshint validthis:true */
	var arr = this._arr,
		len = arr.length,
		out,
		i;
	if ( !isBooleanArray( bool ) ) {
		throw new TypeError( 'bget()::invalid input argument. Must provide a boolean array. Value: `' + bool + '`.' );
	}
	if ( arr.length > bool.length ) {
		len = bool.length;
	}
	out = new this.constructor();
	for ( i = 0; i < len; i++ ) {
		if ( bool[ i ] ) {
			out._arr.push( arr[ i ] );
		}
	}
	return ( out._arr.length ) ? out : null;
} // end FUNCTION bget()


// EXPORTS //

module.exports = bget;
