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

describe( 'StringArray#sort', function tests() {

	var arr;

	beforeEach( function before() {
		arr = new StringArray();
	});

	it( 'should provide a sort function', function test() {
		expect( arr.sort ).to.be.a( 'function' );
	});

	it( 'should sort in place', function test() {
		arr.push( 'c', 'b', 'a' );
		assert.strictEqual( arr.toString(), 'c,b,a' );

		arr.sort();
		assert.strictEqual( arr.toString(), 'a,b,c' );

		arr.sort( sort );
		assert.strictEqual( arr.toString(), 'c,b,a' );

		function sort( a, b ) {
			if ( a > b ) {
				return -1;
			}
			if ( b > a ) {
				return 1;
			}
			return 0;
		}
	});

});
