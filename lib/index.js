/**
*
*	STRING ARRAY
*
*
*	DESCRIPTION:
*		- String array class.
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
* Class constructor.
*/
var StringArray = require( './ctor.js' );

/**
* Mutator methods.
*/
StringArray.prototype.push = require( './push.js' );

StringArray.prototype.pop = require( './pop.js' );

StringArray.prototype.unshift = require( './unshift.js' );

StringArray.prototype.shift = require( './shift.js' );

StringArray.prototype.reverse = require( './reverse.js' );

StringArray.prototype.sort = require( './sort.js' );

StringArray.prototype.splice = require( './splice.js' );

/**
* Accessor methods.
*/
StringArray.prototype.indexOf = require( './indexOf.js' );

StringArray.prototype.lastIndexOf = require( './lastIndexOf.js' );

StringArray.prototype.slice = require( './slice.js' );

StringArray.prototype.concat = require( './concat.js' );

StringArray.prototype.join = require( './join.js' );

StringArray.prototype.toString = require( './toString.js' );

StringArray.prototype.toLocaleString = require( './toLocaleString.js' );

StringArray.prototype.toArray = require( './toArray.js' );

/**
* Iteration methods.
*/
StringArray.prototype.forEach = require( './forEach.js' );

StringArray.prototype.every = require( './every.js' );

StringArray.prototype.some = require( './some.js' );

StringArray.prototype.filter = require( './filter.js' );


// EXPORTS //

module.exports = StringArray;
