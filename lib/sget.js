/**
*
*	STRING ARRAY: sget
*
*
*	DESCRIPTION:
*		- Returns values in a new StringArray according to a specified subsequence.
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

var ispace = require( 'compute-indexspace' );


// SGET //

/**
* FUNCTION: sget( str )
*	Returns values in a new StringArray according to a specified subsequence.
*
* @param {String} str - subsequence string
* @returns {StringArray|null} new StringArray or null
*/
function sget( str ) {
	/* jshint validthis:true */
	var arr = this._arr,
		len = arr.length,
		idx,
		out,
		i;

	// NOTE: punt type checking to the indexspace module...
	idx = ispace( str, len );
	len = idx.length;

	out = new this.constructor();
	for ( i = 0; i < len; i++ ) {
		out._arr.push( arr[ idx[i] ] );
	}
	return ( out._arr.length ) ? out : null;
} // end FUNCTION sget()


// EXPORTS //

module.exports = sget;
