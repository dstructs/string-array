/**
*
*	STRING ARRAY: iset
*
*
*	DESCRIPTION:
*		- Sets a StringArray value located at a specified index.
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


// ISET //

/**
* FUNCTION: iset( idx, val[, thisArg] )
*	Sets a StringArray value located at a specified index.
*
* @param {Number} idx - index
* @param {String|Function} val - string primitive or a callback which returns a string primitive
* @param {Object} [thisArg] - `this` context when executing a callback
* @returns {StringArray} StringArray instance
*/
function iset( idx, val, thisArg ) {
	/* jshint validthis:true */
	var arr = this._arr,
		len = arr.length,
		type = typeof val,
		clbk,
		i;
	if ( !isInteger( idx ) ) {
		throw new TypeError( 'iset()::invalid input argument. Index must be an integer. Value: `' + idx + '`.' );
	}
	if ( type === 'function' ) {
		clbk = val;
	} else if ( type !== 'string' ) {
		throw new TypeError( 'iset()::invalid input argument. Second argument must be either a string primitive or a callback function. Value: `' + val + '`.' );
	}
	if ( idx < 0 ) {
		idx = len + idx; // len - idx
		if ( idx < 0 ) {
			throw new RangeError( 'iset()::invalid input argument. Negative index exceeds array limits.' );
		}
	}
	if ( clbk ) {
		if ( thisArg === void 0 ) {
			thisArg = this;
		}
		val = clbk.call( thisArg, arr[ idx ], idx );
		if ( typeof val !== 'string' ) {
			throw new TypeError( 'iset()::invalid value. Callback must return a string primitive. Value: `' + val + '`.' );
		}
	}
	if ( val.length < this._minLength || val.length > this._maxLength ) {
		throw new RangeError( 'iset()::invalid value. String length must be on the interval [' + this._minLength + ',' + this._maxLength + ']. Value: `' + val + '`.' );
	}
	if ( idx > len ) {
		for ( i = len; i < idx; i++ ) {
			arr.push( '' );
		}
	}
	arr[ idx ] = val;
	return this;
} // end FUNCTION iset()


// EXPORTS //

module.exports = iset;
