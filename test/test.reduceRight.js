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

describe( 'StringArray#reduceRight', function tests() {

	var arr;

	beforeEach( function before() {
		arr = new StringArray();
	});

	it( 'should provide a reduceRight function', function test() {
		expect( arr.reduceRight ).to.be.a( 'function' );
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
				arr.reduceRight( value );
			};
		}
	});

	it( 'should throw an error if not provided an initial value when the StringArray is empty', function test() {
		expect( foo ).to.throw( TypeError );
		function foo() {
			arr.reduceRight( function(){} );
		}
	});

	it( 'should return the sole array value if only one element exists and no initial value is provided', function test() {
		arr.push( 'a' );

		var val = arr.reduceRight( function(){} );
		assert.strictEqual( val, 'a' );
	});

	it( 'should return the initial value if the StringArray is empty', function test() {
		var val = arr.reduceRight( function(){}, 'beep' );
		assert.strictEqual( val, 'beep' );
	});

	it( 'should reduce from right-to-left', function test() {
		var val;

		arr.push( 'a', 'b', 'c' );

		val = arr.reduceRight( reduce );
		assert.strictEqual( val, 'cbbaa' );

		val = arr.reduceRight( reduce, '' );
		assert.strictEqual( val, 'ccbbaa' );

		function reduce( acc, val ) {
			return acc + val + val;
		}
	});

});
