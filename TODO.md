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
	-	fancy indexing (ability to provide clbk!!! --> one requirement: must return a string satisfying constraints --> will need to create a temporary array so that setting is atomic)
		-	regexp (reset)
			-	only single value or clbk
		-	logical (lset)
			-	matching array.length or single value or clbk
		-	boolean (bset)
			-	dido
		-	array of indices (mset)
			-	dido
		-	sequence (sset)
			-	dido
		-	general set which tries to deduce
4. add get, set examples
