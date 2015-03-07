/* global require, describe, it */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	StringArray = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'string-array', function tests() {

	it( 'should export a function', function test() {
		expect( StringArray ).to.be.a( 'function' );
	});

	it( 'should do something' );

});
