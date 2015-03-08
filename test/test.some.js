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

describe( 'StringArray#some', function tests() {

	var arr;

	beforeEach( function before() {
		arr = new StringArray();
	});

	it( 'should provide a some function', function test() {
		expect( arr.some ).to.be.a( 'function' );
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
				arr.some( value );
			};
		}
	});

	it( 'should positively validate', function test() {
		arr.push( 'a', 'b', 'c' );

		var bool = arr.some( function some( val ) {
			return ( val > 'a' );
		});
		assert.ok( bool );
	});

	it( 'should negatively validate', function test() {
		arr.push( 'a', 'b', 'c' );

		var bool = arr.some( function some( val ) {
			return ( val > 'd' );
		});
		assert.notOk( bool );
	});

	it( 'should accept a `this` context', function test() {
		arr.push( 'a', 'b', 'c' );

		var bool = arr.some( some, arr );
		assert.ok( bool );

		function some( val ) {
			/* jshint validthis:true */
			assert.ok( this instanceof StringArray );
			return ( val > 'a' );
		}
	});

});
