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

describe( 'StringArray#every', function tests() {

	var arr;

	beforeEach( function before() {
		arr = new StringArray();
	});

	it( 'should provide an every function', function test() {
		expect( arr.every ).to.be.a( 'function' );
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
				arr.every( value );
			};
		}
	});

	it( 'should positively validate', function test() {
		arr.push( 'a', 'b', 'c' );

		var bool = arr.every( function every( val ) {
			return ( val.length > 0 );
		});
		assert.ok( bool );
	});

	it( 'should negatively validate', function test() {
		arr.push( 'a', 'b', 'c' );

		var bool = arr.every( function every( val ) {
			return ( val < 'b' );
		});
		assert.notOk( bool );
	});

	it( 'should positively validate and accept a `this` context', function test() {
		arr.push( 'a', 'b', 'c' );

		var bool = arr.every( every, arr );
		assert.ok( bool );

		function every( val ) {
			/* jshint validthis:true */
			assert.ok( this instanceof StringArray );
			return ( val.length > 0 );
		}
	});

	it( 'should negatively validate and accept a `this` context', function test() {
		arr.push( 'a', 'b', 'c' );

		var bool = arr.every( every, arr );
		assert.notOk( bool );

		function every( val ) {
			/* jshint validthis:true */
			assert.ok( this instanceof StringArray );
			return ( val.length < 'b' );
		}
	});

});
