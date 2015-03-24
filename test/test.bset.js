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

describe( 'StringArray#bset', function tests() {

	var arr;

	beforeEach( function before() {
		arr = new StringArray();
	});

	it( 'should provide a set function which accepts a boolean array', function test() {
		expect( arr.bset ).to.be.a( 'function' );
	});

	it( 'should throw an error if not provided a boolean array', function test() {
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
			[true,true,null]
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				arr.bset( value, '' );
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
				arr.bset( [true], value );
			};
		}
	});

	it( 'should throw an error if a callback does not return a string primitive', function test() {
		arr.push( 'a', 'b', 'c' );
		expect( foo ).to.throw( TypeError );
		function foo() {
			arr.bset( [true], function set() {
				return 5;
			});
		}
	});

	it( 'should throw an error if a boolean array and a value array are not of equal lengths', function test() {
		arr.push( 'a', 'b', 'c' );
		expect( foo ).to.throw( Error );
		function foo() {
			arr.bset( [true], ['a','b'] );
		}
	});

	it( 'should set elements', function test() {
		arr.push( 'a', 'beep', 'c', 'boop' );

		arr.bset( [false,true,false,true], 'woot' );
		assert.strictEqual( arr.mget( [1,3] ).toString(), 'woot,woot' );

		arr.bset( [false,true,false,true], ['f', 'woop','g', 'woop'] );
		assert.strictEqual( arr.toString(), 'a,woop,c,woop' );

		arr.bset( [false,true,false,true], function set( d ) {
			assert.ok( this === arr );
			return d.replace( /o/g, 'e' );
		});
		assert.strictEqual( arr.toString(), 'a,weep,c,weep' );
	});

	it( 'should use a provided `this` context', function test() {
		var self = { 'x': 4 };

		arr.push( 'a', 'b', 'c' );
		arr.bset( [false,true,true], set, self );

		function set() {
			/* jshint validthis:true */
			assert.notOk( this === arr );
			assert.strictEqual( this, self );
			return 'woot';
		}
	});

	it( 'should fill with empty strings if an index corresponding to a true value exceeds the array length', function test() {
		var expected;

		arr.push( 'a', 'b', 'c' );

		arr.bset( [false,false,false,false,true], 'woot' );
		expected = [ 'a', 'b', 'c', '', 'woot' ];
		assert.deepEqual( arr.toArray(), expected );

		arr.bset( [false,false,false,false,false,false,true,false,true], ['z', 'x', 'y', 'w', 'v', 'u', 'd', 't', 'e'] );
		expected.push( '', 'd', '', 'e' );
		assert.deepEqual( arr.toArray(), expected );

		arr.bset( [false,false,false,false,false,false,false,false,false,false,true,false,true], function set() {
			return 'f';
		});
		expected.push( '', 'f', '', 'f' );
		assert.deepEqual( arr.toArray(), expected );
	});

	it( 'should do nothing if no input array values are true', function test() {
		arr.push( 'a', 'b', 'c' );

		arr.bset( [false,false,false], 'woot' );
		assert.strictEqual( arr.toString(), 'a,b,c' );
	});

	it( 'should allow for boolean arrays which are shorter than the StringArray length', function test() {
		arr.push( 'a', 'b', 'c' );

		arr.bset( [true,true], ['beep','boop' ] );
		assert.strictEqual( arr.toString(), 'beep,boop,c' );
	});

	it( 'should allow for boolean arrays which are longer than the StringArray length', function test() {
		arr.push( 'a', 'b', 'c' );

		arr.bset( [true,true,false,true,true,false,true], 'woot' );
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
			arr.bset( [true], 'beep' );
		}
		function strarr() {
			arr.bset( [true], ['beep'] );
		}
		function clbk() {
			arr.bset( [true], function set(){
				return 'beep';
			});
		}
	});

});
