/* global require, describe, it, beforeEach */
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

describe( 'StringArray#toString', function tests() {

	var arr;

	beforeEach( function before() {
		arr = new StringArray();
	});

	it( 'should provide a toString function', function test() {
		expect( arr.toString ).to.be.a( 'function' );
	});

	it( 'should return a string', function test() {
		arr.push( 'a', 'b', 'c' );

		assert.strictEqual( arr.toString(), 'a,b,c' );
	});

});
