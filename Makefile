SHELL := /bin/bash

SRC := src
BIN := $(shell yarn bin)

build:
	$(BIN)/webpack

watch: build
	$(BIN)/webpack --watch

prod:
	NODE_ENV=prod $(BIN)/webpack -p

test:
	NODE_PATH=$(SRC) $(BIN)/mocha --require babel-core/register -u bdd -R spec

lint:
	$(BIN)/eslint $(SRC)

clean:
	rm -rf $(BUILD)

.PHONY: test lint watch clean
