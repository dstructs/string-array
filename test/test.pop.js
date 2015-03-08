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

describe( 'StringArray#pop', function tests() {

	var arr;

	beforeEach( function before() {
		arr = new StringArray();
	});

	it( 'should provide a pop function', function test() {
		expect( arr.pop ).to.be.a( 'function' );
	});

	it( 'should remove the last array element', function test() {
		var val;

		arr.push( 'a', 'b', 'c' );
		assert.strictEqual( arr.toString(), 'a,b,c' );

		val = arr.pop();
		assert.strictEqual( val, 'c' );
		assert.strictEqual( arr.toString(), 'a,b' );
	});

});
