'use strict';

var StringArray = require( './../lib' );

var arr, val, bool;

arr = new StringArray();

arr.push( 'a', 'b', 'c' );
console.log( arr.length );
// returns 3

console.log( arr.toString() );
// returns 'a,b,c'

console.log( arr.pop() );
// returns 'c'

console.log( arr.shift() );
// returns 'a'

arr.unshift( 'c' );
console.log( arr.length );
// returns 2

console.log( arr.toString() );
// returns 'c,b'

arr.splice( 1, 0, 'd', 'e', 'f' );
console.log( arr.length );
// returns 5

console.log( arr.toString() );
// returns 'c,d,e,f,b'

val = arr.slice( 1, -1 );
console.log( val.toString() );
// returns 'd,e,f'

arr.forEach( function forEach( val, i ) {
	console.log( i, val );
});

arr.sort();
console.log( arr.toString() );
// returns 'b,c,d,e,f'

arr.reverse();
console.log( arr.toString() );
// returns 'f,e,d,c,b'

bool = arr.every( function every( val ) {
	return ( val < 'g' );
});
console.log( bool );
// returns true


bool = arr.some( function some( val ) {
	return ( val >= 'c' );
});
console.log( bool );
// returns true
