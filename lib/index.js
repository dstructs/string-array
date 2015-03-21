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
* Get methods.
*/
// StringArray.prototype.get = require( './get.js' );

StringArray.prototype.iget = require( './iget.js' );

StringArray.prototype.mget = require( './mget.js' );

StringArray.prototype.sget = require( './sget.js' );

StringArray.prototype.reget = require( './reget.js' );

StringArray.prototype.bget = require( './bget.js' );

StringArray.prototype.lget = require( './lget.js' );


/**
* Set methods.
*/
// StringArray.prototype.set = require( './set.js' );

StringArray.prototype.iset = require( './iset.js' );

StringArray.prototype.mset = require( './mset.js' );

// StringArray.prototype.sset = require( './sset.js' );

StringArray.prototype.reset = require( './reset.js' );

StringArray.prototype.bset = require( './bset.js' );

StringArray.prototype.lset = require( './lset.js' );


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

StringArray.prototype.map = require( './map.js' );

StringArray.prototype.reduce = require( './reduce.js' );

StringArray.prototype.reduceRight = require( './reduceRight.js' );


// EXPORTS //

module.exports = StringArray;
