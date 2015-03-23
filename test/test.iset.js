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

describe( 'StringArray#iset', function tests() {

	var arr;

	beforeEach( function before() {
		arr = new StringArray();
	});

	it( 'should provide a set function which accepts index values', function test() {
		expect( arr.iset ).to.be.a( 'function' );
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
				arr.iset( value, '' );
			};
		}
	});

	it( 'should throw an error if not provided a string primitive or callback function for its second argument', function test() {
		var values = [
			5,
			Math.PI,
			-Math.PI,
			Number.POSITIVE_INFINITY,
			true,
			NaN,
			null,
			undefined,
			[],
			{},
			new String( '' )
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				arr.iset( 0, value );
			};
		}
	});

	it( 'should throw an error if a negative index does not resolve to a positive index', function test() {
		arr.push( 'a', 'b', 'c' );
		expect( foo ).to.throw( RangeError );
		function foo() {
			arr.iset( -10, 'beep' );
		}
	});

	it( 'should throw an error if a callback does not return a string primitive', function test() {
		arr.push( 'a', 'b', 'c' );
		expect( foo ).to.throw( TypeError );
		function foo() {
			arr.iset( 0, function set() {
				return 5;
			});
		}
	});

	it( 'should set an array element', function test() {
		arr.push( 'a', 'beep', 'c', 'boop' );

		arr.iset( 1, 'woot' );
		assert.strictEqual( arr.iget( 1 ), 'woot' );

		arr.iset( -1, 'woop' );
		assert.strictEqual( arr.iget( -1 ), 'woop' );

		arr.iset( -1, function set( d ) {
			assert.ok( this === arr );
			return d.replace( /o/g, 'e' );
		});
		assert.strictEqual( arr.iget( -1 ), 'weep' );
	});

	it( 'should fill with empty strings when an index exceeds the array length', function test() {
		arr.push( 'a', 'beep', 'c', 'boop' );

		assert.deepEqual( arr.toArray(), [
			'a',
			'beep',
			'c',
			'boop'
		]);

		arr.iset( 9, 'woot' );
		assert.strictEqual( arr.iget( 9 ), 'woot' );

		assert.deepEqual( arr.toArray(), [
			'a',
			'beep',
			'c',
			'boop',
			'',
			'',
			'',
			'',
			'',
			'woot'
		]);
	});

	it( 'should throw an error if provided a string which does not conform to length constraints', function test() {
		arr.push( 'a', 'b', 'c' );
		arr.minLength = 1;
		arr.maxLength = 1;
		expect( foo ).to.throw( RangeError );
		function foo() {
			arr.iset( 1, 'beep' );
		}
	});

});
