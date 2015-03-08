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

describe( 'StringArray#filter', function tests() {

	var arr;

	beforeEach( function before() {
		arr = new StringArray();
	});

	it( 'should provide a filter function', function test() {
		expect( arr.filter ).to.be.a( 'function' );
	});

	it( 'should throw an error if not provided a callback function', function test() {
		var values = [
			'5',
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
				arr.filter( value );
			};
		}
	});

	it( 'should filter', function test() {
		arr.push( 'a', 'b', 'c' );

		var arr2 = arr.filter( function filter( val ) {
			return ( val > 'a' );
		});
		assert.strictEqual( arr2.toString(), 'b,c' );
	});

	it( 'should accept a `this` context', function test() {
		arr.push( 'a', 'b', 'c' );

		var arr2 = arr.filter( filter, arr );
		assert.strictEqual( arr2.toString(), 'b,c' );

		function filter( val ) {
			/* jshint validthis: true */
			assert.ok( this instanceof StringArray );
			return ( val > 'a' );
		}
	});

});
