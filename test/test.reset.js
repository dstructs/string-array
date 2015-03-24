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

describe( 'StringArray#reset', function tests() {

	var arr;

	beforeEach( function before() {
		arr = new StringArray();
	});

	it( 'should provide a set function which accepts regular expressions', function test() {
		expect( arr.reset ).to.be.a( 'function' );
	});

	it( 'should throw an error if not provided a regular expression', function test() {
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
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				arr.reset( value, '' );
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
				arr.reset( /.*/, value );
			};
		}
	});

	it( 'should throw an error if a callback does not return a string primitive', function test() {
		arr.push( 'a', 'b', 'c' );
		expect( foo ).to.throw( TypeError );
		function foo() {
			arr.reset( /.*/, function set() {
				return 5;
			});
		}
	});

	it( 'should set array elements', function test() {
		arr.push( 'a', 'beep', 'c', 'boop' );

		arr.reset( /^b.*p$/, 'woot' );
		assert.strictEqual( arr.toString(), 'a,woot,c,woot' );

		arr.reset( /^w.*t$/, function set( d ) {
			assert.ok( this === arr );
			return d.replace( /o{2}t$/, 'eep' );
		});
		assert.strictEqual( arr.toString(), 'a,weep,c,weep' );
	});

	it( 'should use a provided `this` context', function test() {
		var self = { 'x': 4 };

		arr.push( 'a', 'b', 'c' );
		arr.reset( /[bc]/, set, self );

		function set() {
			/* jshint validthis:true */
			assert.notOk( this === arr );
			assert.strictEqual( this, self );
			return 'woot';
		}
	});

	it( 'should do nothing if no value satisfies the regular expression', function test() {
		arr.push( 'a', 'beep', 'c', 'boop' );

		arr.reset( /^w.*t$/, 'weep' );
		assert.strictEqual( arr.toString(), 'a,beep,c,boop' );
	});

	it( 'should throw an error if provided a string which does not conform to length constraints', function test() {
		arr.push( 'a', 'b', 'c' );
		arr.minLength = 1;
		arr.maxLength = 1;
		expect( foo ).to.throw( RangeError );
		expect( bar ).to.throw( RangeError );
		function foo() {
			arr.reset( /.*/, 'beep' );
		}
		function bar() {
			arr.reset( /.*/, function set( d, i ) {
				return 'beep';
			});
		}
	});

});
