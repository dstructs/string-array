/**
*
*	STRING ARRAY: constructor
*
*
*	DESCRIPTION:
*		- String array constructor.
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

var isObject = require( 'validate.io-object' ),
	isNonNegativeInteger = require( 'validate.io-nonnegative-integer' );


// STRING ARRAY //

/**
* FUNCTION: StringArray( [len, opts] )
*	String array class.
*
* @constructor
* @param {Number} [len] - array length
* @param {Object} [opts] - options
* @param {Number} [opts.min=0] - minimum string length
* @param {Number} [opts.max=2^32-1] - maximum string length
* @returns {StringArray} new string array
*/
function StringArray( len, opts ) {
	var nargs = arguments.length;

	if ( !(this instanceof StringArray) ) {
		if ( nargs === 0 ) {
			return new StringArray();
		}
		if ( nargs === 1 ) {
			return new StringArray( len );
		}
		return new StringArray( len, opts );
	}
	// [0] Validate input arguments...
	if ( nargs ) {
		if ( nargs === 1 ) {
			if ( isNonNegativeInteger( len ) ) {
				opts = {};
			}
			else if ( isObject( len ) ) {
				opts = len;
				len = 0;
			}
			else {
				throw new TypeError( 'StringArray()::invalid input argument. Unable to initialize a new StringArray. Input value: `' + len + '`.' );
			}
		}
		else {
			if ( !isNonNegativeInteger( len ) ) {
				throw new TypeError( 'StringArray()::invalid input argument. Array length must be a nonnegative integer. Value: `' + len + '`.' );
			}
			if ( !isObject( opts ) ) {
				throw new TypeError( 'StringArray()::invalid input argument. Options must be an object. Value: `' + opts + '`.' );
			}
		}
	} else {
		len = 0;
		opts = {};
	}
	// [1] Validate options...
	if ( opts.hasOwnProperty( 'min' ) ) {
		if ( !isNonNegativeInteger( opts.min ) ) {
			throw new TypeError( 'StringArray()::invalid option. Minimum string length must be a nonnegative integer. Option: `' + opts.min + '`.' );
		}
		this._minLength = opts.min;
	} else {
		this._minLength = 0;
	}
	if ( opts.hasOwnProperty( 'max' ) ) {
		if ( !isNonNegativeInteger( opts.min ) ) {
			throw new TypeError( 'StringArray()::invalid option. Maximum string length must be a nonnegative integer. Option: `' + opts.max + '`.' );
		}
		this._maxLength = opts.max;
	} else {
		this._maxLength = Math.pow( 2, 32 ) - 1;
	}
	// [2] Add length and min/max properties...
	Object.defineProperty( this, 'length', {
		get: function() {
			return this._arr.length;
		},
		set: function( val ) {
			this._arr.length = val;
		}
	});
	Object.defineProperty( this, 'minLength', {
		get: function() {
			return this._minLength;
		},
		set: function( value ) {
			if ( !isNonNegativeInteger( value ) ) {
				throw new TypeError( 'minLength::invalid value. Minimum string length must be a nonnegative integer. Value: `' + value + '`.' );
			}
			this._minLength = value;
		}
	});
	Object.defineProperty( this, 'maxLength', {
		get: function() {
			return this._maxLength;
		},
		set: function( value ) {
			if ( !isNonNegativeInteger( value ) ) {
				throw new TypeError( 'maxLength::invalid value. Maximum string length must be a nonnegative integer. Value: `' + value + '`.' );
			}
			this._maxLength = value;
		}
	});
	// [3] Initialize the underlying array...
	if ( !len ) {
		this._arr = [];
	}
	else {
		this._arr = new Array( len );
	}
	return this;
} // end FUNCTION StringArray()


// EXPORTS //

module.exports = StringArray;
