/**
*
*	STRING ARRAY: concat
*
*
*	DESCRIPTION:
*		- Concatenates a `StringArray` with other StringArray(s), array(s) of strings, and/or string(s).
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
	typeName = require( 'type-name' );


// CONCAT //

/**
* FUNCTION: concat( value0[, value1[,...] ] )
*	Concatenates this `StringArray` with other StringArray(s), array(s) of strings, and/or string(s). See [Array#concat]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat}.
*
* @param {...StringArray|String[]|string} [value] - values to concatenate
* @returns {StringArray} new StringArray instance
*/
function concat() {
	/* jshint validthis:true */
	var args = arguments,
		nargs = args.length,
		arr = this._arr,
		min = this._minLength,
		max = this._maxLength,
		out = new this.constructor(),
		ref,
		val,
		n, v, i, j;

	out.minLength = this.minLength;
	out.maxLength = this.maxLength;
	ref = out._arr;
	for ( i = 0; i < arr.length; i++ ) {
		ref.push( arr[ i ] );
	}
	for ( i = 0; i < nargs; i++ ) {
		val = args[ i ];
		if ( typeof val === 'string' ) {
			n = val.length;
			if ( n < min || n > max ) {
				throw new RangeError( 'concat()::invalid input argument. String length must be on the interval [' + min + ',' + max + '].' );
			}
			ref.push( val );
		}
		else if ( isArray( val ) ) {
			for ( j = 0; j < val.length; j++ ) {
				v = val[ j ];
				if ( typeof v !== 'string' ) {
					throw new TypeError( 'concat()::invalid input argument. Arrays must only contain string primitives.' );
				}
				n = v.length;
				if ( n < min || n > max ) {
					throw new RangeError( 'concat()::invalid input argument. Array string lengths must be on the interval [' + min + ',' + max + '].' );
				}
				ref.push( v );
			}
		}
		else if ( typeName( val ) === 'StringArray' ) {
			// WARNING: may want to switch to using API: toArray()
			val = val._arr;
			for ( j = 0; j < val.length; j++ ) {
				v = val[ j ];
				n = val.length;
				if ( n < min || n > max ) {
					throw new RangeError( 'concat()::invalid input argument. Incompatible StringArrays. String length breaks constraints. String lengths must be on the interval [' + min + ',' + max + '].' );
				}
				ref.push( v );
			}
		}
		else {
			throw new TypeError( 'concat()::invalid input argument. Must provide StringArray(s), array(s) of strings, or string primitives. Value: `' + val + '`.' );
		}
	}
	return out;
} // end FUNCTION concat()


// EXPORTS //

module.exports = concat;
