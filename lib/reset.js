/**
*
*	STRING ARRAY: reset
*
*
*	DESCRIPTION:
*		- Sets StringArray elements whose values satisfy a regular expression.
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


// RESET //

/**
* FUNCTION: reset( re, val )
*	Sets StringArray elements whose values satisfy a regular expression.
*
* @param {RegExp} re - regular expression
* @param {String|Function} val - string primitive or a callback which returns a string primitive
* @returns {StringArray} StringArray instance
*/
function reset( re, val ) {
	/* jshint validthis:true */
	var arr = this._arr,
		len = arr.length,
		min = this._minLength,
		max = this._maxLength,
		type = typeof val,
		clbk,
		tmp,
		idx,
		i, j;
	if ( !isRegExp( re ) ) {
		throw new TypeError( 'reset()::invalid input argument. Must provide a regular expression. Value: `' + re + '`.' );
	}
	if ( type === 'function' ) {
		clbk = val;
	} else if ( type !== 'string' ) {
		throw new TypeError( 'reset()::invalid input argument. Second argument must be either a string primitive or a callback function. Value: `' + val + '`.' );
	}
	idx = [];
	for ( i = 0; i < len; i++ ) {
		if ( re.test( arr[i] ) ) {
			idx.push( i );
		}
	}
	len = idx.length;
	if ( !len ) {
		return this;
	}
	if ( clbk ) {
		tmp = [];
		for ( i = 0; i < len; i++ ) {
			j = idx[ i ];
			j = clbk.call( this, arr[ j ], j );
			if ( typeof j !== 'string' ) {
				throw new TypeError( 'reset()::invalid value. Callback must return a string primitive. Value: `' + j + '`.' );
			}
			if ( j.length < min || j.length > max ) {
				throw new RangeError( 'reset()::invalid value. String length must be on the interval [' + min + ',' + max + ']. Value: `' + j + '`.' );
			}
			tmp.push( j );
		}
		for ( i = 0; i < len; i++ ) {
			arr[ idx[i] ] = tmp[ i ];
		}
	} else {
		if ( val.length < min || val.length > max ) {
			throw new RangeError( 'reset()::invalid input argument. String length must be on the interval [' + min + ',' + max + ']. Value: `' + val + '`.' );
		}
		for ( i = 0; i < len; i++ ) {
			arr[ idx[i] ] = val;
		}
	}
	return this;
} // end FUNCTION reset()


// EXPORTS //

module.exports = reset;
