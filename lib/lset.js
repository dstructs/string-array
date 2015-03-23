/**
*
*	STRING ARRAY: lset
*
*
*	DESCRIPTION:
*		- Sets StringArray values where an input logical array is `1`.
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

var isLogicalArray = require( 'validate.io-logical-array' ),
	isStringArray = require( 'validate.io-string-primitive-array' );


// LSET //

/**
* FUNCTION: lset( logical, val )
*	Sets StringArray values where an input logical array is `1`.
*
* @param {Number[]} logical - logical array
* @param {String|String[]|Function} val - string primitive, string primitive array, or a callback which returns a string primitive
* @returns {StringArray} StringArray instance
*/
function lset( logical, val ) {
	/* jshint validthis:true */
	var arr = this._arr,
		len = arr.length,
		min = this._minLength,
		max = this._maxLength,
		type = typeof val,
		clbk,
		idx,
		tmp,
		N, i, j, k;

	if ( !isLogicalArray( logical ) ) {
		throw new TypeError( 'lset()::invalid input argument. Must provide a logical array. Value: `' + logical + '`.' );
	}
	if ( type === 'function' ) {
		clbk = val;
	} else if ( type !== 'string' && !isStringArray( val ) ) {
		throw new TypeError( 'lset()::invalid input argument. Second argument must be either a string primitive, string primitive array, or a callback function. Value: `' + val + '`.' );
	}
	N = logical.length;
	idx = [];
	for ( i = 0; i < N; i++ ) {
		if ( logical[ i ] ) {
			idx.push( i );
		}
	}
	N = idx.length;
	if ( !N ) {
		return this;
	}
	// If callback, first get all the transformed values, validate them, then set...
	if ( clbk ) {
		tmp = new Array( N );
		for ( i = 0; i < N; i++ ) {
			j = idx[ i ];
			j = clbk.call( this, arr[ j ], j );
			if ( typeof j !== 'string' ) {
				throw new TypeError( 'lset()::invalid value. Callback must return a string primitive. Value: `' + j + '`.' );
			}
			if ( j.length < min || j.length > max ) {
				throw new RangeError( 'lset()::invalid value. String length must be on the interval [' + min + ',' + max + ']. Value: `' + j + '`.' );
			}
			tmp[ i ] = j;
		}
		for ( i = 0; i < N; i++ ) {
			j = idx[ i ];
			if ( j > len ) {
				for ( k = len; k < j; k++ ) {
					arr.push( '' );
				}
				len = j;
			}
			arr[ j ] = tmp[ i ];
		}
	}
	else if ( type === 'string' ) {
		if ( val.length < min || val.length > max ) {
			throw new RangeError( 'lset()::invalid value. String length must be on the interval [' + min + ',' + max + ']. Value: `' + val + '`.' );
		}
		for ( i = 0; i < N; i++ ) {
			j = idx[ i ];
			if ( j > len ) {
				for ( k = len; k < j; k++ ) {
					arr.push( '' );
				}
				len = j;
			}
			arr[ j ] = val;
		}
	}
	else {
		if ( logical.length !== val.length ) {
			throw new Error( 'lset()::invalid input argument. Logical array and value array are not of equal length.' );
		}
		for ( i = 0; i < N; i++ ) {
			j = val[ idx[i] ];
			if ( j.length < min || j.length > max ) {
				throw new RangeError( 'lset()::invalid value. String length must be on the interval [' + min + ',' + max + ']. Value: `' + j + '`.' );
			}
		}
		for ( i = 0; i < N; i++ ) {
			j = idx[ i ];
			if ( j > len ) {
				for ( k = len; k < j; k++ ) {
					arr.push( '' );
				}
				len = j;
			}
			arr[ j ] = val[ j ];
		}
	}
	return this;
} // end FUNCTION lset()


// EXPORTS //

module.exports = lset;
