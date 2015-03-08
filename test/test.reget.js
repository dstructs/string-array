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

describe( 'StringArray#reget', function tests() {

	var arr;

	beforeEach( function before() {
		arr = new StringArray();
	});

	it( 'should provide a get function which accepts regular expressions', function test() {
		expect( arr.reget ).to.be.a( 'function' );
	});

	it( 'should throw an error if not provided a regular expression', function test() {
		var values = [
			'5',
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
				arr.reget( value );
			};
		}
	});

	it( 'should return a new StringArray containing values which satisfied the regular expression', function test() {
		var arr2;

		arr.push( 'a', 'beep', 'c', 'boop' );

		arr2 = arr.reget( /^b.*p$/ );

		assert.ok( arr2 instanceof StringArray );
		assert.strictEqual( arr2.length, 2 );
		assert.strictEqual( arr2.toString(), 'beep,boop' );
	});

	it( 'should return null if no string satisfies the regular expression', function test() {
		var arr2;

		arr.push( 'a', 'beep', 'c', 'boop' );

		arr2 = arr.reget( /^w.*t$/ );

		assert.isNull( arr2 );
	});

});
