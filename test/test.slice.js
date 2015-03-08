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

describe( 'StringArray#slice', function tests() {

	var arr;

	beforeEach( function before() {
		arr = new StringArray();
	});

	it( 'should provide a slice function', function test() {
		expect( arr.slice ).to.be.a( 'function' );
	});

	it( 'should throw an error if not provided an integer start index', function test() {
		var values = [
			'5',
			Math.PI,
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
				arr.slice( value );
			};
		}
	});

	it( 'should throw an error if not provided an integer end index', function test() {
		var values = [
			'5',
			Math.PI,
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
				arr.slice( 1, value );
			};
		}
	});

	it( 'should slice', function test() {
		var arr2;

		arr.push( 'a', 'b', 'c', 'd', 'e', 'f' );

		arr2 = arr.slice( 1, 4 );
		assert.strictEqual( arr2.toString(), 'b,c,d' );

		arr2 = arr.slice( 1, -1 );
		assert.strictEqual( arr2.toString(), 'b,c,d,e' );

		arr2 = arr.slice( -3 );
		assert.strictEqual( arr2.toString(), 'c,d,e,f' );

		arr2 = arr.slice( -3, 20 );
		assert.strictEqual( arr2.toString(), 'c,d,e,f' );
	});

	it( 'should return a StringArray having the same length constraints', function test() {
		var arr2;

		arr.push( 'a', 'b', 'c', 'd', 'e', 'f' );
		arr.minLength = 1;
		arr.maxLength = 10;

		arr2 = arr.slice();

		assert.ok( arr2 instanceof StringArray );
		assert.strictEqual( arr2.minLength, 1 );
		assert.strictEqual( arr2.maxLength, 10 );
	});

});
