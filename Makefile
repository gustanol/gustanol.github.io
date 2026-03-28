# Variables
ASCIIDOCTOR = asciidoctor
SRC = ./docs
BUILD = _site

# Include files don't need to be built
OBJECTS = \
	$(BUILD)/index.html

# Default target
all: $(OBJECTS)

# Rule to convert .adoc to .html
$(BUILD)/%.html: $(SRC)/%.adoc
	@mkdir -p $(dir $@)
	@$(ASCIIDOCTOR) $< -o $@

# Clean up
clean:
	rm -rf $(BUILD)

.PHONY: all clean
