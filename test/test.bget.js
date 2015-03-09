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

describe( 'StringArray#bget', function tests() {

	var arr;

	beforeEach( function before() {
		arr = new StringArray();
	});

	it( 'should provide a get function which accepts a boolean array', function test() {
		expect( arr.bget ).to.be.a( 'function' );
	});

	it( 'should throw an error if not provided a boolean array', function test() {
		var values = [
			'5',
			5,
			true,
			NaN,
			null,
			undefined,
			[],
			{},
			function(){},
			[true,null],
			[1,1,1]
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				arr.bget( value );
			};
		}
	});

	it( 'should return a new StringArray containing values where the boolean array is true', function test() {
		var arr2;

		arr.push( 'a', 'beep', 'c', 'boop' );

		arr2 = arr.bget( [false,true,false,true] );

		assert.ok( arr2 instanceof StringArray );
		assert.strictEqual( arr2.length, 2 );
		assert.strictEqual( arr2.toString(), 'beep,boop' );
	});

	it( 'should accept boolean arrays having a length less than the StringArray', function test() {
		var arr2;

		arr.push( 'a', 'beep', 'c', 'boop' );

		arr2 = arr.bget( [false,true] );

		assert.ok( arr2 instanceof StringArray );
		assert.strictEqual( arr2.length, 1 );
		assert.strictEqual( arr2.toString(), 'beep' );
	});

	it( 'should accept boolean arrays having a length longer than the StringArray', function test() {
		var arr2;

		arr.push( 'a', 'beep', 'c', 'boop' );

		arr2 = arr.bget( [true,true,false,true,true,true,true] );

		assert.ok( arr2 instanceof StringArray );
		assert.strictEqual( arr2.length, 3 );
		assert.strictEqual( arr2.toString(), 'a,beep,boop' );
	});

	it( 'should return null if no StringArray values correspond to true values in the boolean array', function test() {
		var arr2;

		arr.push( 'a', 'beep', 'c', 'boop' );

		arr2 = arr.bget( [false,false,false,false] );

		assert.isNull( arr2 );
	});

});
