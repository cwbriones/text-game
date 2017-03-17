SHELL := /bin/bash
BIN := $(shell yarn bin)

SRC       := ./src
JS_ENTRY  := $(SRC)/index.js
BUILD     := dist

build:
	$(BIN)/babel $(SRC) -d dist --presets es2015,stage-2

run: build
	node $(BUILD)/index.js

test:
	$(BIN)/mocha -u bdd -R spec

lint:
	$(BIN)/eslint $(SRC)

clean:
	rm -rf $(BUILD)

.PHONY: test lint watch clean
