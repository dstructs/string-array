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

describe( 'StringArray#mget', function tests() {

	var arr;

	beforeEach( function before() {
		arr = new StringArray();
	});

	it( 'should provide a get function which accepts an array of indices', function test() {
		expect( arr.mget ).to.be.a( 'function' );
	});

	it( 'should throw an error if not provided an integer array', function test() {
		var values = [
			'5',
			5,
			true,
			NaN,
			null,
			undefined,
			{},
			[5,6,null],
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				arr.mget( value );
			};
		}
	});

	it( 'should throw an error if provided a non-object options', function test() {
		var values = [
			'5',
			5,
			true,
			NaN,
			null,
			undefined,
			[],
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				arr.mget( [0,1], value );
			};
		}
	});

	it( 'should throw an error if provided a non-boolean dedupe option', function test() {
		var values = [
			'5',
			5,
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
				arr.mget( [0,1], {'dedupe': value} );
			};
		}
	});

	it( 'should return null if provided an empty array', function test() {
		arr.push( 'a', 'b', 'c' );
		assert.isNull( arr.mget( [] ) );
	});

	it( 'should return a new StringArray containing values located at specified indices', function test() {
		var arr2;

		arr.push( 'a', 'beep', 'c', 'boop' );

		arr2 = arr.mget( [0,2,3] );

		assert.ok( arr2 instanceof StringArray );
		assert.strictEqual( arr2.length, 3 );
		assert.strictEqual( arr2.toString(), 'a,c,boop' );
	});

	it( 'should return null if no indices have no corresponding value', function test() {
		var arr2;

		arr.push( 'a', 'beep', 'c', 'boop' );

		arr2 = arr.mget( [30,40,50,-30] );
		assert.isNull( arr2 );
	});

	it( 'should dedupe indices and return in sorted order', function test() {
		arr.push( 'a', 'b', 'c' );

		var arr2 = arr.mget( [2,2,1,1,1] );
		assert.strictEqual( arr2.length, 2 );
		assert.strictEqual( arr2.toString(), 'b,c' );
	});

	it( 'should not dedupe indices when instructed to turn off deduping', function test() {
		arr.push( 'a', 'b', 'c' );

		var arr2 = arr.mget( [1,1,1], {'dedupe': false} );
		assert.strictEqual( arr2.length, 3 );
		assert.strictEqual( arr2.toString(), 'b,b,b' );
	});

	it( 'should accommodate negative indices', function test() {
		arr.push( 'a', 'b', 'c' );

		var arr2 = arr.mget( [-1,-3], {} );
		assert.strictEqual( arr2.length, 2 );
		assert.strictEqual( arr2.toString(), 'a,c' );
	});

});
