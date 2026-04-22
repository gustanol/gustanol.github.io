# Variables
BUNDLE = bundle
JEKYLL = $(BUNDLE) exec jekyll

.PHONY: all install build serve clean

all: install build

# Install dependencies defined in Gemfile
install:
	$(BUNDLE) install

# Build the site into the _site directory
build:
	$(JEKYLL) build

# Run a local server with auto-regeneration
serve:
	$(JEKYLL) serve --livereload

# Clean the build directory
clean:
	$(JEKYLL) clean
