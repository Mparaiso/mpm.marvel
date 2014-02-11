test: compile
	@mocha -t 4000 -R spec --recursive
compile: coffee
	@coffee -m -b -c -o js coffee
commit: compile
	@git add .
	@git commit -am"update : $(message) `date`" | : 
push: commit
	@git push origin master
.PHONY: test push compile