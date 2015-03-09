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

describe( 'StringArray#mset', function tests() {

	var arr;

	beforeEach( function before() {
		arr = new StringArray();
	});

	it( 'should provide a set function which accepts an index array', function test() {
		expect( arr.mset ).to.be.a( 'function' );
	});

	it( 'should throw an error if not provided an integer array', function test() {
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
			[1,2,null]
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				arr.mset( value, '' );
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
				arr.mset( [0], value );
			};
		}
	});

	it( 'should throw an error if a negative index does not resolve to a positive index', function test() {
		arr.push( 'a', 'b', 'c' );
		expect( foo ).to.throw( RangeError );
		function foo() {
			arr.mset( [-10], 'beep' );
		}
	});

	it( 'should throw an error if a callback does not return a string primitive', function test() {
		arr.push( 'a', 'b', 'c' );
		expect( foo ).to.throw( TypeError );
		function foo() {
			arr.mset( [0], function set() {
				return 5;
			});
		}
	});

	it( 'should throw an error if index array and value array are not of equal lengths', function test() {
		arr.push( 'a', 'b', 'c' );
		expect( foo ).to.throw( Error );
		function foo() {
			arr.mset( [0], ['a','b'] );
		}
	});

	it( 'should set multiple elements', function test() {
		arr.push( 'a', 'beep', 'c', 'boop' );

		arr.mset( [1,3], 'woot' );
		assert.strictEqual( arr.mget( [1,3] ).toString(), 'woot,woot' );

		arr.mset( [-1,-3], ['woop','woop'] );
		assert.strictEqual( arr.mget( [-1,-3] ).toString(), 'woop,woop' );

		arr.mset( [-1,-3], function set( d ) {
			assert.ok( this === arr );
			return d.replace( /o/g, 'e' );
		});
		assert.strictEqual( arr.mget( [-1,-3] ).toString(), 'weep,weep' );
	});

	it( 'should throw an error if provided a string which does not conform to length constraints', function test() {
		arr.push( 'a', 'b', 'c' );
		arr.minLength = 1;
		arr.maxLength = 1;

		expect( str ).to.throw( RangeError );
		expect( strarr ).to.throw( RangeError );
		expect( clbk ).to.throw( RangeError );
		function str() {
			arr.mset( [1], 'beep' );
		}
		function strarr() {
			arr.mset( [1], ['beep'] );
		}
		function clbk() {
			arr.mset( [1], function set(){
				return 'beep';
			});
		}
	});

});
