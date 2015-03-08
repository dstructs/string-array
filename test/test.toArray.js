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

describe( 'StringArray#toArray', function tests() {

	var arr;

	beforeEach( function before() {
		arr = new StringArray();
	});

	it( 'should provide a toArray function', function test() {
		expect( arr.toArray ).to.be.a( 'function' );
	});

	it( 'should return a native array', function test() {
		arr.push( 'a', 'b', 'c' );

		assert.deepEqual( arr.toArray(), ['a','b','c'] );
	});

});
