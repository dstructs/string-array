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

describe( 'StringArray#splice', function tests() {

	var arr;

	beforeEach( function before() {
		arr = new StringArray();
	});

	it( 'should provide a splice function', function test() {
		expect( arr.splice ).to.be.a( 'function' );
	});

	it( 'should throw an error if provided non-string primitives', function test() {
		var values = [
			new String( '5' ),
			5,
			true,
			NaN,
			null,
			undefined,
			[],
			{},
			function(){}
		];

		arr.push( 'a', 'b', 'c' );

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				arr.splice( 0, 0, value );
			};
		}
	});

	it( 'should throw an error if provided strings not satisfying length constraints', function test() {
		var values = [
			'beep',
			'0123456789'
		];

		arr.push( 'a', 'b', 'c' );

		arr.minLength = 5;
		arr.maxLength = 6;

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( RangeError );
		}
		function badValue( value ) {
			return function() {
				arr.splice( 0, 0, value );
			};
		}
	});

	it( 'should splice', function test() {
		arr.push( 'a', 'b', 'c' );
		arr.splice( 1, 1 );

		assert.strictEqual( arr.toString(), 'a,c' );

		arr.splice( 1, 0, 'beep' );
		assert.strictEqual( arr.toString(), 'a,beep,c' );
	});

});
