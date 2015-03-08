/**
*
*	STRING ARRAY: reget
*
*
*	DESCRIPTION:
*		- Returns values satisfying a regular expression in a new StringArray.
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

var isRegExp = require( 'validate.io-regexp' );

// REGET //

/**
* FUNCTION: reget( re )
*	Returns values satisfying a regular expression in a new StringArray.
*
* @param {RegExp} re - regular expression
* @returns {StringArray|null} new StringArray or null
*/
function reget( re ) {
	/* jshint validthis:true */
	var arr = this._arr,
		len = arr.length,
		out,
		i;
	if ( !isRegExp( re ) ) {
		throw new TypeError( 'reget()::invalid input argument. Must provide a regular expression. Value: `' + re + '`.' );
	}
	out = new this.constructor();
	for ( i = 0; i < len; i++ ) {
		if ( re.test( arr[ i ] ) ) {
			out._arr.push( arr[ i ] );
		}
	}
	return ( out._arr.length ) ? out : null;
} // end FUNCTION reget()


// EXPORTS //

module.exports = reget;
