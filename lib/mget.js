/**
*
*	STRING ARRAY: mget
*
*
*	DESCRIPTION:
*		- Returns values located at specified positions a new StringArray.
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

var isArray = require( 'validate.io-array' ),
	isObject = require( 'validate.io-object' ),
	isBoolean = require( 'validate.io-boolean-primitive' ),
	isIntegerArray = require( 'validate.io-integer-array' ),
	unique = require( 'compute-unique' );


// MGET //

/**
* FUNCTION: mget( idx[, options] )
*	Returns values located at specified positions in a new StringArray.
*
* @param {Array} idx - array of indices
* @param {Object} [options] - function options
* @param {Boolean} [options.dedupe=true] - boolean indicating if results should be deduped and sorted by index in ascending order
* @returns {StringArray|null} new StringArray or null
*/
function mget( idx, options ) {
	/* jshint validthis:true */
	var nargs = arguments.length,
		arr = this._arr,
		len = arr.length,
		opts,
		tmp,
		out,
		N, i, j;
	if ( !isArray( idx ) ) {
		throw new TypeError( 'mget()::Must provide an integer index array. Value: `' + idx + '`.' );
	}
	N = idx.length;
	if ( !N ) {
		return null;
	}
	if ( !isIntegerArray( idx ) ) {
		throw new TypeError( 'mget()::invalid input argument. Must provide an integer index array. Value: `' + idx + '`.' );
	}
	if ( nargs > 1 ) {
		if ( !isObject( options ) ) {
			throw new TypeError( 'mget()::invalid input argument. Options must be an object. Value: `' + options + '`.' );
		}
		opts = options;
		if ( opts.hasOwnProperty( 'dedupe' ) ) {
			if ( !isBoolean( opts.dedupe ) ) {
				throw new TypeError( 'mget()::invalid option. Dedupe option must be a boolean. Option: `' + opts.dedupe + '`.' );
			}
		} else {
			opts.dedupe = true;
		}
	} else {
		opts = {
			'dedupe': true
		};
	}
	tmp = [];
	for ( i = 0; i < N; i++ ) {
		j = idx[ i ];
		if ( j < 0 ) {
			j = len + j;
		}
		if ( j < len ) {
			tmp.push( j );
		}
	}
	if ( !tmp.length ) {
		return null;
	}
	if ( opts.dedupe ) {
		unique( tmp );
	}
	N = tmp.length;
	out = new this.constructor();
	for ( i = 0; i < N; i++ ) {
		out._arr.push( arr[ tmp[ i ] ] );
	}
	return out;
} // end FUNCTION mget()


// EXPORTS //

module.exports = mget;
