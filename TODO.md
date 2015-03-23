TODO
====

1. Revisit when `Proxy`/`Class` is widely supported. Ideal scenario would be support for `Array` subclassing.
	-	__note__: `proxy` cannot be polyfilled due to limitations in ES5
2. Holes should __not__ be allowed
	-	fill with empty `strings`
	-	any `set` fcn which is provided indices beyond the `array` length
		-	set
		-	sset
	-	tests to ensure always dense
3.


### Methods

1. isStringArray
	-	similar in concept to isArray. See validate.io module
	-	in fact, could just use the validate.io module
		-	will want the primitive string version
		-	but is a primitive string array the same as a `StringArray`? Do we want the ability to validate both? a `soft` versus `strict` option?
	-	do we want to include min and max options???
2. get method
	-	fancy indexing
		-	general get which tries to deduce
3. set method
	-	fancy indexing
		-	sequence (sset)
		-	general set which tries to deduce
4. add get, set examples
	-	sget, sset
5. fixedLength/extensible/fixed property
	-	array length can never be changed
		-	no push, pop, shift, unshift, splice (unless 1:1 replace)
		-	no set with an index > length
	-	initial configuration setting `{'fixed':true}`
6. 'set' property
	-	act like `Set`, but only strings
	-	just create sep string-set; no prop
	-	would be tricky here, as then some set fcns would be off-limits; e.g., mset where val is a string, as this would duplicate vals
7. lock/immutable property
	-	no add, remove, set, etc.
	-	freeze/seal
8. event emitter ???
	-	would slow code down, as extra boolean check `if ( isEmitter ) {}`
	-	could get this for free with `observers`, but this would need to be polyfilled :(
	-	could create emitter-array
9. numbytes
	-	atop buffer (similar to tarrays)
	-	string array then becomes a view
10. del methods ???
	-	could just force use of `splice`
	-	but would allow fancy indexing
11. 

