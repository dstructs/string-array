/**
*
*	STRING ARRAY: lget
*
*
*	DESCRIPTION:
*		- Returns values where the input array is equal to `1` in a new StringArray.
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

var isLogicalArray = require( 'validate.io-logical-array' );


// LGET //

/**
* FUNCTION: lget( arr )
*	Returns values where the input array is equal to `1` in a new StringArray.
*
* @param {Number[]} arr - logical array
* @returns {StringArray|null} new StringArray or null
*/
function lget( logical ) {
	/* jshint validthis:true */
	var arr = this._arr,
		len = arr.length,
		out,
		i;
	if ( !isLogicalArray( logical ) ) {
		throw new TypeError( 'lget()::invalid input argument. Must provide a logical array. Value: `' + logical + '`.' );
	}
	if ( arr.length > logical.length ) {
		len = logical.length;
	}
	out = new this.constructor();
	for ( i = 0; i < len; i++ ) {
		if ( logical[ i ] ) {
			out._arr.push( arr[ i ] );
		}
	}
	return ( out._arr.length ) ? out : null;
} // end FUNCTION lget()


// EXPORTS //

module.exports = lget;
