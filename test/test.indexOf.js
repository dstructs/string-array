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

describe( 'StringArray#indexOf', function tests() {

	var arr;

	beforeEach( function before() {
		arr = new StringArray();
	});

	it( 'should provide an indexOf function', function test() {
		expect( arr.indexOf ).to.be.a( 'function' );
	});

	it( 'should return -1 if not provided a search value', function test() {
		arr.push( 'a', 'b', 'c' );

		var idx = arr.indexOf();
		assert.strictEqual( idx, -1 );
	});

	it( 'should return the correct index', function test() {
		arr.push( 'a', 'b', 'c' );

		var idx = arr.indexOf( 'b' );
		assert.strictEqual( idx, 1 );
	});

	it( 'should return -1 if unable to match provided string', function test() {
		arr.push( 'a', 'b', 'c' );

		var idx = arr.indexOf( 'd' );
		assert.strictEqual( idx, -1 );
	});

	it( 'should not match string objects', function test() {
		arr.push( 'a', 'b', 'c' );

		var idx = arr.indexOf( new String( 'a' ) );
		assert.strictEqual( idx, -1 );
	});

});
