test: compile
	@mocha -t 4000 -R spec --recursive
compile: coffee
	@coffee -b -c -o js coffee
.PHONY: test 