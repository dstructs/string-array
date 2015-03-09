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

describe( 'StringArray#lset', function tests() {

	var arr;

	beforeEach( function before() {
		arr = new StringArray();
	});

	it( 'should provide a set function which accepts a logical array', function test() {
		expect( arr.lset ).to.be.a( 'function' );
	});

	it( 'should throw an error if not provided a logical array', function test() {
		var values = [
			'5',
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
			function(){},
			[1,2,null],
			[1,1,null]
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				arr.lset( value, '' );
			};
		}
	});

	it( 'should throw an error if not provided a string primitive, string primitive array, or callback function for its second argument', function test() {
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
			new String( '' ),
			['a','b',1]
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				arr.lset( [1], value );
			};
		}
	});

	it( 'should throw an error if a callback does not return a string primitive', function test() {
		arr.push( 'a', 'b', 'c' );
		expect( foo ).to.throw( TypeError );
		function foo() {
			arr.lset( [1], function set() {
				return 5;
			});
		}
	});

	it( 'should throw an error if a logical array and a value array are not of equal lengths', function test() {
		arr.push( 'a', 'b', 'c' );
		expect( foo ).to.throw( Error );
		function foo() {
			arr.lset( [1], ['a','b'] );
		}
	});

	it( 'should set elements', function test() {
		arr.push( 'a', 'beep', 'c', 'boop' );

		arr.lset( [0,1,0,1], 'woot' );
		assert.strictEqual( arr.mget( [1,3] ).toString(), 'woot,woot' );

		arr.lset( [0,1,0,1], ['f', 'woop','g', 'woop'] );
		assert.strictEqual( arr.toString(), 'a,woop,c,woop' );

		arr.lset( [0,1,0,1], function set( d ) {
			assert.ok( this === arr );
			return d.replace( /o/g, 'e' );
		});
		assert.strictEqual( arr.toString(), 'a,weep,c,weep' );
	});

	it( 'should do nothing if no input array values are `1`', function test() {
		arr.push( 'a', 'b', 'c' );

		arr.lset( [0,0,0], 'woot' );
		assert.strictEqual( arr.toString(), 'a,b,c' );
	});

	it( 'should allow for logical arrays which are shorter than the StringArray length', function test() {
		arr.push( 'a', 'b', 'c' );

		arr.lset( [1,1], ['beep','boop' ] );
		assert.strictEqual( arr.toString(), 'beep,boop,c' );
	});

	it( 'should allow for logical arrays which are longer than the StringArray length', function test() {
		arr.push( 'a', 'b', 'c' );

		arr.lset( [1,1,0,1,1,0,1], 'woot' );
		assert.strictEqual( arr.toString(), 'woot,woot,c,woot,woot,,woot' );
	});

	it( 'should throw an error if provided a string which does not conform to length constraints', function test() {
		arr.push( 'a', 'b', 'c' );
		arr.minLength = 1;
		arr.maxLength = 1;

		expect( str ).to.throw( RangeError );
		expect( strarr ).to.throw( RangeError );
		expect( clbk ).to.throw( RangeError );
		function str() {
			arr.lset( [1], 'beep' );
		}
		function strarr() {
			arr.lset( [1], ['beep'] );
		}
		function clbk() {
			arr.lset( [1], function set(){
				return 'beep';
			});
		}
	});

});
