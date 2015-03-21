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

describe( 'StringArray#sget', function tests() {

	var arr;

	beforeEach( function before() {
		arr = new StringArray();
	});

	it( 'should provide a get function which accepts a subsequence string', function test() {
		expect( arr.sget ).to.be.a( 'function' );
	});

	it( 'should throw an error if not provided a valid subsequence string', function test() {
		var values = [
			'[5',
			':a5',
			'::::',
			'beep',
			'end*2::-1',
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
			expect( badValue( values[i] ) ).to.throw( Error );
		}
		function badValue( value ) {
			return function() {
				arr.sget( value );
			};
		}
	});

	it( 'should return a new StringArray containing values extracted according to a provided subsequence', function test() {
		var arr2;

		arr.push( 'a', 'beep', 'c', 'boop' );

		arr2 = arr.sget( '1::2' );

		assert.ok( arr2 instanceof StringArray );
		assert.strictEqual( arr2.length, 2 );
		assert.strictEqual( arr2.toString(), 'beep,boop' );

		arr2 = arr.sget( '::-1' );

		assert.strictEqual( arr2.length, 4 );
		assert.strictEqual( arr2.toString(), 'boop,c,beep,a' );

		arr2 = arr.sget( ':end:2' );

		assert.strictEqual( arr2.length, 2 );
		assert.strictEqual( arr2.toString(), 'a,c' );
	});

	it( 'should return null if no StringArray values correspond to the subsequence string', function test() {
		var arr2;

		arr.push( 'a', 'beep', 'c', 'boop' );

		arr2 = arr.sget( '10:' );

		assert.isNull( arr2 );
	});

});
