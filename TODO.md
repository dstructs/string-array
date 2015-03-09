TODO
====

1. Revisit when `Proxy`/`Class` is widely supported. Ideal scenario would be support for `Array` subclassing.
2. 


### Methods

1. isStringArray
	-	similar in concept to isArray. See validate.io module
	-	in fact, could just use the validate.io module
		-	will want the primitive string version
	-	do we want to include min and max options???
2. get method
	-	fancy indexing
		-	sequence (sget)
		-	general get which tries to deduce
3. set method
	-	fancy indexing
		-	regexp (reset)
			-	only single value or clbk
		-	logical (lset)
			-	matching array.length or single value or clbk
				-	tricky, as matching length means equal to logical array sum!!!
		-	boolean (bset)
			-	dido
		-	sequence (sset)
			-	dido
		-	general set which tries to deduce
4. add get, set examples
5. fixedLength/extensible/fixed property
	-	array length can never be changed
		-	no push, pop, shift, unshift, splice (unless 1:1 replace)
		-	no set with an index > length
	-	initial configuration setting `{'fixed':true}`
6. 'set' property
	-	act like `Set`, but only strings
	-	just create sep string-set; no prop
7. lock/immutable property
	-	no add, remove, set, etc.
8. event emitter ???
	-	would slow code down, as extra boolean check `if ( isEmitter ) {}`
	-	could get this for free with `observers`, but this would need to be polyfilled :(
	-	could create emitter-array
9. numbytes
	-	atop buffer (similar to tarrays)
10. 

