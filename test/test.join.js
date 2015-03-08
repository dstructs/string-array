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

describe( 'StringArray#join', function tests() {

	var arr;

	beforeEach( function before() {
		arr = new StringArray();
	});

	it( 'should provide a join function', function test() {
		expect( arr.join ).to.be.a( 'function' );
	});

	it( 'should throw an error if not provided a non-string separator', function test() {
		var values = [
			function() {},
			5,
			true,
			NaN,
			null,
			undefined,
			[],
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				arr.join( value );
			};
		}
	});

	it( 'should return an empty string if the StringArray is empty', function test() {
		assert.strictEqual( arr.join(), '' );
	});

	it( 'should join', function test() {
		arr.push( 'a', 'b', 'c' );

		var str = arr.join();
		assert.strictEqual( str, 'a,b,c' );
	});

	it( 'should join using a specified separator', function test() {
		arr.push( 'a', 'b', 'c' );

		var str = arr.join( '|' );
		assert.strictEqual( str, 'a|b|c' );
	});

});
