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

describe( 'StringArray#reverse', function tests() {

	var arr;

	beforeEach( function before() {
		arr = new StringArray();
	});

	it( 'should provide a reverse function', function test() {
		expect( arr.reverse ).to.be.a( 'function' );
	});

	it( 'should reverse the StringArray elements in place', function test() {
		arr.push( 'a', 'b', 'c' );
		assert.strictEqual( arr.toString(), 'a,b,c' );

		arr.reverse();
		assert.strictEqual( arr.toString(), 'c,b,a' );
	});

});
