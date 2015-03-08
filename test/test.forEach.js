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

describe( 'StringArray#forEach', function tests() {

	var arr;

	beforeEach( function before() {
		arr = new StringArray();
	});

	it( 'should provide a forEach function', function test() {
		expect( arr.forEach ).to.be.a( 'function' );
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
				arr.forEach( value );
			};
		}
	});

	it( 'should iterate over each element', function test() {
		var arr2 = [];

		arr.push( 'a', 'b', 'c' );

		arr.forEach( function each( val ) {
			arr2.push( val );
		});
		assert.deepEqual( arr2, ['a','b','c'] );
	});

	it( 'should accept a `this` context', function test() {
		var arr2 = [];

		arr.push( 'a', 'b', 'c' );

		arr.forEach( each, arr );
		assert.deepEqual( arr2, ['a','b','c'] );

		function each( val ) {
			/* jshint validthis:true */
			assert.ok( this instanceof StringArray );
			arr2.push( val );
		}
	});

});
