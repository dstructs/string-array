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

describe( 'StringArray#iget', function tests() {

	var arr;

	beforeEach( function before() {
		arr = new StringArray();
	});

	it( 'should provide a get function which accepts index values', function test() {
		expect( arr.iget ).to.be.a( 'function' );
	});

	it( 'should throw an error if not provided an integer', function test() {
		var values = [
			'5',
			Math.PI,
			-Math.PI,
			Number.POSITIVE_INFINITY,
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
				arr.iget( value );
			};
		}
	});

	it( 'should return an array element', function test() {
		arr.push( 'a', 'beep', 'c', 'boop' );

		assert.strictEqual( arr.iget(1), 'beep' );
		assert.strictEqual( arr.iget(-1), 'boop' );
	});

	it( 'should return undefined if the index exceeds the array bounds', function test() {
		arr.push( 'a', 'beep', 'c', 'boop' );

		assert.isUndefined( arr.iget( 20 ) );
	});

});
