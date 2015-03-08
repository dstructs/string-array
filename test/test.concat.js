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

describe( 'StringArray#concat', function tests() {

	var arr;

	beforeEach( function before() {
		arr = new StringArray();
	});

	it( 'should provide a concat a function', function test() {
		expect( arr.concat ).to.be.a( 'function' );
	});

	it( 'should throw an error if provided non-primitive strings', function test() {
		var values = [
			5,
			true,
			NaN,
			null,
			undefined,
			{},
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				arr.concat( value );
			};
		}
	});

	it( 'should throw an error if provided non-primitive string arrays', function test() {
		var values = [
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
				arr.concat( [value] );
			};
		}
	});

	it( 'should throw an error if strings do not satisfy length constraints', function test() {
		var values = [
			'beep',
			'abkjljdkfjldadafdafd'
		];

		arr.minLength = 5;
		arr.maxLength = 10;

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( RangeError );
		}
		function badValue( value ) {
			return function() {
				arr.concat( value );
			};
		}
	});

	it( 'should throw an error if strings do not satisfy length constraints', function test() {
		var values = [
			'beep',
			'abkjljdkfjldadfadfad'
		];

		arr.minLength = 5;
		arr.maxLength = 10;

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( RangeError );
		}
		function badValue( value ) {
			return function() {
				arr.concat( [value] );
			};
		}
	});

	it( 'should throw an error if strings do not satisfy length constraints', function test() {
		var values, tmp;

		values = [
			'beep',
			'abkjljdkfjldadfadf'
		];

		arr.minLength = 5;
		arr.maxLength = 10;

		for ( var i = 0; i < values.length; i++ ) {
			tmp = new StringArray();
			tmp.push( values[i] );
			expect( badValue( tmp ) ).to.throw( RangeError );
		}
		function badValue( value ) {
			return function() {
				arr.concat( value );
			};
		}
	});

	it( 'should concatenate primitive strings', function test() {
		var out = arr.concat( 'a', 'b', 'c' );
		assert.ok( out instanceof StringArray );
		assert.strictEqual( out.toString(), 'a,b,c' );
	});

	it( 'should concatenate primitive string arrays', function test() {
		var out = arr.concat( ['a', 'b', 'c'] );
		assert.ok( out instanceof StringArray );
		assert.strictEqual( out.toString(), 'a,b,c' );
	});

	it( 'should concatenate StringArrays', function test() {
		var arr2 = new StringArray(),
			out;

		arr2.push( 'a', 'b', 'c' );
		out = arr.concat( arr2 );
		assert.ok( out instanceof StringArray );
		assert.strictEqual( out.toString(), 'a,b,c' );
	});

	it( 'should return a string array having the same length constraints', function test() {
		var out;

		arr.minLength = 1;
		arr.maxLength = 3;
		arr.push( 'a', 'b' );

		out = arr.concat( 'c', 'd' );

		assert.strictEqual( out.toString(), 'a,b,c,d' );
		assert.strictEqual( out.minLength, 1 );
		assert.strictEqual( out.maxLength, 3 );
		assert.strictEqual( arr.length, 2 );
	});

});
