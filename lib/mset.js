/**
*
*	STRING ARRAY: mset
*
*
*	DESCRIPTION:
*		- Sets StringArray values located at a specified indices.
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

var isIntegerArray = require( 'validate.io-integer-array' ),
	isStringArray = require( 'validate.io-string-primitive-array' );


// MSET //

/**
* FUNCTION: mset( idx, val[, thisArg] )
*	Sets StringArray values located at a specified indices.
*
* @param {Array} idx - index
* @param {String|String[]|Function} val - string primitive, string primitive array, or a callback which returns a string primitive
* @param {Object} [thisArg] - `this` context when executing a callback
* @returns {StringArray} StringArray instance
*/
function mset( idx, val, thisArg ) {
	/* jshint validthis:true */
	var arr = this._arr,
		len = arr.length,
		min = this._minLength,
		max = this._maxLength,
		type = typeof val,
		clbk,
		tmp,
		N, i, j, k;

	if ( !isIntegerArray( idx ) ) {
		throw new TypeError( 'mset()::invalid input argument. Must provide an integer array. Value: `' + idx + '`.' );
	}
	N = idx.length;

	// TODO: slight optimization if roll own `slice`, as `slice` is slow.
	idx = idx.slice(); // copy so don't mutate original

	if ( type === 'function' ) {
		clbk = val;
	} else if ( type !== 'string' && !isStringArray( val ) ) {
		throw new TypeError( 'mset()::invalid input argument. Second argument must be either a string primitive, string primitive array, or a callback function. Value: `' + val + '`.' );
	}
	// Validate all the indices...
	for ( i = 0; i < N; i++ ) {
		j = idx[ i ];
		if ( j < 0 ) {
			j = len + j; // len - idx[i]
			if ( j < 0 ) {
				throw new RangeError( 'mset()::invalid input argument. Index array contains a negative index which exceeds array limits.' );
			}
			idx[ i ] = j;
		}
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
				throw new TypeError( 'mset()::invalid value. Callback must return a string primitive. Value: `' + j + '`.' );
			}
			if ( j.length < min || j.length > max ) {
				throw new RangeError( 'mset()::invalid value. String length must be on the interval [' + min + ',' + max + ']. Value: `' + j + '`.' );
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
			throw new RangeError( 'mset()::invalid value. String length must be on the interval [' + min + ',' + max + ']. Value: `' + val + '`.' );
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
		if ( N !== val.length ) {
			throw new Error( 'mset()::invalid input argument. Index array and value array are not of equal length.' );
		}
		for ( i = 0; i < N; i++ ) {
			j = val[ i ];
			if ( j.length < min || j.length > max ) {
				throw new RangeError( 'mset()::invalid value. String length must be on the interval [' + min + ',' + max + ']. Value: `' + j + '`.' );
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
			arr[ j ] = val[ i ];
		}
	}
	return this;
} // end FUNCTION mset()


// EXPORTS //

module.exports = mset;
