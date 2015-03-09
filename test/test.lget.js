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

describe( 'StringArray#lget', function tests() {

	var arr;

	beforeEach( function before() {
		arr = new StringArray();
	});

	it( 'should provide a get function which accepts a logical array', function test() {
		expect( arr.lget ).to.be.a( 'function' );
	});

	it( 'should throw an error if not provided a logical array', function test() {
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
			[1,null],
			['1','0'],
			[new Number(0), new Number(1)],
			[true,true,true]
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				arr.lget( value );
			};
		}
	});

	it( 'should return a new StringArray containing values where the logical array equals 1', function test() {
		var arr2;

		arr.push( 'a', 'beep', 'c', 'boop' );

		arr2 = arr.lget( [0,1,0,1] );

		assert.ok( arr2 instanceof StringArray );
		assert.strictEqual( arr2.length, 2 );
		assert.strictEqual( arr2.toString(), 'beep,boop' );
	});

	it( 'should accept logical arrays having a length less than the StringArray', function test() {
		var arr2;

		arr.push( 'a', 'beep', 'c', 'boop' );

		arr2 = arr.lget( [0,1] );

		assert.ok( arr2 instanceof StringArray );
		assert.strictEqual( arr2.length, 1 );
		assert.strictEqual( arr2.toString(), 'beep' );
	});

	it( 'should accept logical arrays having a length longer than the StringArray', function test() {
		var arr2;

		arr.push( 'a', 'beep', 'c', 'boop' );

		arr2 = arr.lget( [1,1,0,1,1,1,1] );

		assert.ok( arr2 instanceof StringArray );
		assert.strictEqual( arr2.length, 3 );
		assert.strictEqual( arr2.toString(), 'a,beep,boop' );
	});

	it( 'should return null if no StringArray values correspond to `1` values in the logical array', function test() {
		var arr2;

		arr.push( 'a', 'beep', 'c', 'boop' );

		arr2 = arr.lget( [0,0,0,0] );

		assert.isNull( arr2 );
	});

});
