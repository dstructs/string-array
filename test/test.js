/* global require, describe, it */
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

describe( 'string-array', function tests() {

	it( 'should export a function', function test() {
		expect( StringArray ).to.be.a( 'function' );
	});

	it( 'should not require the new operator', function test() {
		var createArray = StringArray,
			arr;

		arr = createArray();
		assert.ok( arr instanceof StringArray );

		arr = createArray( 10 );
		assert.ok( arr instanceof StringArray );

		arr = createArray( 10, {} );
		assert.ok( arr instanceof StringArray );
	});

	it( 'should throw an error if provided an argument which is not either a nonnegative integer or an options object', function test() {
		var values = [
			'5',
			Math.PI,
			-1,
			true,
			NaN,
			null,
			undefined,
			[],
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				new StringArray( value );
			};
		}
	});

	it( 'should throw an error if provided a nonnegative integer length', function test() {
		var values = [
			'5',
			Math.PI,
			-1,
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
				new StringArray( value, {} );
			};
		}
	});

	it( 'should throw an error if provided a non-object options arguments', function test() {
		var values = [
			'5',
			5,
			true,
			NaN,
			null,
			undefined,
			[],
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				new StringArray( 10, value );
			};
		}
	});

	it( 'should throw an error if provided a nonnegative min length', function test() {
		var values = [
			'5',
			Math.PI,
			-1,
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
				new StringArray( {'min':value} );
			};
		}
	});

	it( 'should throw an error if provided a nonnegative max length', function test() {
		var values = [
			'5',
			Math.PI,
			-1,
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
				new StringArray( {'max':value} );
			};
		}
	});

	it( 'should have a length property', function test() {
		var arr = new StringArray();

		assert.hasOwnProperty( arr, 'length' );
		assert.strictEqual( arr.length, 0 );
	});

	it( 'should have a property to specify the minimum string length', function test() {
		var arr = new StringArray();

		assert.hasOwnProperty( arr, 'minLength' );
		assert.strictEqual( arr.minLength, 0 );
	});

	it( 'should throw an error if provided a nonnegative min string length', function test() {
		var values = [
			'5',
			Math.PI,
			-1,
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
				var arr = new StringArray();
				arr.minLength = value;
			};
		}
	});

	it( 'should have a property to specify the maximum string length', function test() {
		var arr = new StringArray();

		assert.hasOwnProperty( arr, 'maxLength' );
		assert.strictEqual( arr.maxLength, Math.pow( 2, 32 ) - 1 );
	});

	it( 'should throw an error if provided a nonnegative max string length', function test() {
		var values = [
			'5',
			Math.PI,
			-1,
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
				var arr = new StringArray();
				arr.maxLength = value;
			};
		}
	});

	it( 'should initialize a new StringArray having a specified length', function test() {
		var arr = new StringArray( 10 );
		assert.strictEqual( arr.length, 10 );
	});

	it( 'should allowed min/max string lengths to be specified at instantation', function test() {
		var arr = new StringArray({
			'min': 5,
			'max': 15
		});
		assert.strictEqual( arr.minLength, 5 );
		assert.strictEqual( arr.maxLength, 15 );
	});

	it( 'should set the min string length', function test() {
		var arr = new StringArray();
		arr.minLength = 5;
		assert.strictEqual( arr.minLength, 5 );
	});

	it( 'should set the max string length', function test() {
		var arr = new StringArray();
		arr.maxLength = 15;
		assert.strictEqual( arr.maxLength, 15 );
	});

	it( 'should set the string array length', function test() {
		var arr = new StringArray();
		arr.length = 20;
		assert.strictEqual( arr.length, 20 );
	});

});
