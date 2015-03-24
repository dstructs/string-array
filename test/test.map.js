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

describe( 'StringArray#map', function tests() {

	var arr;

	beforeEach( function before() {
		arr = new StringArray();
	});

	it( 'should provide a map function', function test() {
		expect( arr.map ).to.be.a( 'function' );
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
				arr.map( value );
			};
		}
	});

	it( 'should map', function test() {
		arr.push( 'a', 'b', 'c' );

		var arr2 = arr.map( function map( val ) {
			return val + val;
		});
		assert.strictEqual( arr2.toString(), 'aa,bb,cc' );
	});

	it( 'should accept a `this` context', function test() {
		arr.push( 'a', 'b', 'c' );

		var arr2 = arr.map( map, arr );
		assert.strictEqual( arr2.toString(), 'aa,bb,cc' );

		function map( val ) {
			/* jshint validthis: true */
			assert.ok( this instanceof StringArray );
			return val + val;
		}
	});

	it( 'should throw an error if a map function returns value which is not a string primitive', function test() {
		arr.push( 'a', 'b', 'c' );
		expect( foo ).to.throw( TypeError );
		expect( bar ).to.throw( TypeError );
		function foo() {
			arr.map( map );
		}
		function bar() {
			arr.map( map, {} );
		}
		function map() {
			return 5;
		}
	});

});
