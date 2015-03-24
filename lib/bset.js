/**
*
*	STRING ARRAY: bset
*
*
*	DESCRIPTION:
*		- Sets StringArray values where an input boolean array is `true`.
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

var isBooleanArray = require( 'validate.io-boolean-primitive-array' ),
	isStringArray = require( 'validate.io-string-primitive-array' );


// BSET //

/**
* FUNCTION: bset( bool, val[, thisArg] )
*	Sets StringArray values where an input boolean array is `true`.
*
* @param {Boolean[]} bool - boolean array
* @param {String|String[]|Function} val - string primitive, string primitive array, or a callback which returns a string primitive
* @param {Object} [thisArg] - `this` context when executing a callback
* @returns {StringArray} StringArray instance
*/
function bset( bool, val, thisArg ) {
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

	if ( !isBooleanArray( bool ) ) {
		throw new TypeError( 'bset()::invalid input argument. Must provide a boolean array. Value: `' + bool + '`.' );
	}
	if ( type === 'function' ) {
		clbk = val;
	} else if ( type !== 'string' && !isStringArray( val ) ) {
		throw new TypeError( 'bset()::invalid input argument. Second argument must be either a string primitive, string primitive array, or a callback function. Value: `' + val + '`.' );
	}
	N = bool.length;
	idx = [];
	for ( i = 0; i < N; i++ ) {
		if ( bool[ i ] ) {
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
		if ( thisArg === void 0 ) {
			thisArg = this;
		}
		for ( i = 0; i < N; i++ ) {
			j = idx[ i ];
			j = clbk.call( thisArg, arr[ j ], j );
			if ( typeof j !== 'string' ) {
				throw new TypeError( 'bset()::invalid value. Callback must return a string primitive. Value: `' + j + '`.' );
			}
			if ( j.length < min || j.length > max ) {
				throw new RangeError( 'bset()::invalid value. String length must be on the interval [' + min + ',' + max + ']. Value: `' + j + '`.' );
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
			throw new RangeError( 'bset()::invalid value. String length must be on the interval [' + min + ',' + max + ']. Value: `' + val + '`.' );
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
		if ( bool.length !== val.length ) {
			throw new Error( 'bset()::invalid input argument. Boolean array and value array are not of equal length.' );
		}
		for ( i = 0; i < N; i++ ) {
			j = val[ idx[i] ];
			if ( j.length < min || j.length > max ) {
				throw new RangeError( 'bset()::invalid value. String length must be on the interval [' + min + ',' + max + ']. Value: `' + j + '`.' );
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
} // end FUNCTION bset()


// EXPORTS //

module.exports = bset;
