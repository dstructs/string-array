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

val = arr.filter( function filter( val ) {
	return 'f' > val && val > 'b';
});
console.log( val.toString() );
// returns 'e,d,c'

val = arr.map( function map( val, i ) {
	var str = val;
	for ( var j = 0; j < i; j++ ) {
		val += str;
	}
	return val;
});
console.log( val.toString() );
// returns 'f,ee,ddd,cccc,bbbbb'

val = arr.reduce( function reduce( acc, curr ) {
	return acc + '-|-' + curr;
});
console.log( val );
// returns 'f-|-e-|-d-|-c-|-b'

val = arr.reduceRight( function reduce( acc, curr ) {
	return acc + '-|-' + curr;
});
console.log( val );
// returns 'b-|-c-|-d-|-e-|-f'


// GET //

val = arr.iget( 1 );
console.log( val );
// returns 'e'

val = arr.mget( [1,3] );
console.log( val.toString() );
// returns 'e,c'

val = arr.bget( [true,false,true,true,false] );
console.log( val.toString() );
// returns 'f,d,c'

val = arr.lget( [1,0,1,1,0] );
console.log( val.toString() );
// returns 'f,d,c'


// SET //

arr.iset( 1, 'eep' );
console.log( arr.toString() );
// returns 'f,eep,d,c,b'

arr.mset( [0,2], ['foo','bar'] );
console.log( arr.toString() );
// returns 'foo,eep,bar,c,b'

arr.bset( [false,false,false,true,true], function set( d ) {
	return d + d;
});
console.log( arr.toString() );
// returns 'foo,eep,bar,cc,bb'

arr.lset( [1,1,1], function set( d ) {
	return '~' + d + '~';
});
console.log( arr.toString() );
// returns ~foo~,~eep~,~bar~,cc,bb'



