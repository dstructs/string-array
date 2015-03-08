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

describe( 'StringArray#shift', function tests() {

	var arr;

	beforeEach( function before() {
		arr = new StringArray();
	});

	it( 'should provide a shift function', function test() {
		expect( arr.shift ).to.be.a( 'function' );
	});

	it( 'should remove the first array element', function test() {
		var val;

		arr.push( 'a', 'b', 'c' );
		assert.strictEqual( arr.toString(), 'a,b,c' );

		val = arr.shift();
		assert.strictEqual( val, 'a' );
		assert.strictEqual( arr.toString(), 'b,c' );
	});

});
