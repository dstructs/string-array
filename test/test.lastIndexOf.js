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

describe( 'StringArray#lastIndexOf', function tests() {

	var arr;

	beforeEach( function before() {
		arr = new StringArray();
	});

	it( 'should provide a lastIndexOf function', function test() {
		expect( arr.lastIndexOf ).to.be.a( 'function' );
	});

	it( 'should return -1 if not provided a search value', function test() {
		arr.push( 'a', 'b', 'c' );

		var idx = arr.lastIndexOf();
		assert.strictEqual( idx, -1 );
	});

	it( 'should return the correct index', function test() {
		arr.push( 'a', 'b', 'b', 'c' );

		var idx = arr.lastIndexOf( 'b' );
		assert.strictEqual( idx, 2 );
	});

	it( 'should return -1 if unable to match provided string', function test() {
		arr.push( 'a', 'b', 'c' );

		var idx = arr.lastIndexOf( 'd' );
		assert.strictEqual( idx, -1 );
	});

	it( 'should not match string objects', function test() {
		arr.push( 'a', 'b', 'c' );

		var idx = arr.lastIndexOf( new String( 'a' ) );
		assert.strictEqual( idx, -1 );
	});

});
