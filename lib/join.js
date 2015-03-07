/**
*
*	STRING ARRAY: join
*
*
*	DESCRIPTION:
*		- Joins all StringArray values into a single string.
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

/**
* FUNCTION: join( [sep] )
*	Joins all StringArray values into a single string. See [Array#join]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join}.
*
* @param {String} [sep=','] - value separator
* @returns {String} StringArray values as a single string
*/
function join( sep ) {
	/* jshint validthis:true */
	var arr = this._arr,
		len = arr.length,
		str = '',
		i;

	if ( arguments.length ) {
		if ( typeof sep !== 'string' ) {
			throw new TypeError( 'join()::invalid input argument. Separator must be a string primitive. Value: `' + sep + '`.' );
		}
	} else {
		sep = ',';
	}
	if ( !len ) {
		return str;
	}
	for ( i = 0; i < len-1; i++ ) {
		str += arr[ i ] + sep;
	}
	str += arr[ i ];
	return str;
} // end FUNCTION join()


// EXPORTS //

module.exports = join;
