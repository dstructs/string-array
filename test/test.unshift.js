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

describe( 'StringArray#unshift', function tests() {

	var arr;

	beforeEach( function before() {
		arr = new StringArray();
	});

	it( 'should provide an unshift function', function test() {
		expect( arr.unshift ).to.be.a( 'function' );
	});

	it( 'should throw an error if provided a non-string primitive', function test() {
		var values = [
			new String( 'beep' ),
			5,
			true,
			NaN,
			null,
			undefined,
			[],
			{},
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				arr.unshift( value );
			};
		}
	});

	it( 'should throw an error if an input string does not satisfy length constraints', function test() {
		var values = [
			'beep',
			'0123456789'
		];

		arr.minLength = 5;
		arr.maxLength = 8;

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( RangeError );
		}
		function badValue( value ) {
			return function() {
				arr.unshift( value );
			};
		}
	});

	it( 'should add strings to the StringArray', function test() {
		arr.push( 'a', 'b', 'c' );
		arr.unshift( 'd', 'e', 'f' );
		assert.strictEqual( arr.toString(), 'd,e,f,a,b,c' );
	});

});
