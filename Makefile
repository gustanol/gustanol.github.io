# Variables
ASCIIDOCTOR = asciidoctor
SRC_DIR = .
OUT_DIR = _site
SOURCES = $(shell find $(SRC_DIR) -name "*.adoc" -not -path "./$(OUT_DIR)/*")
OBJECTS = $(SOURCES:$(SRC_DIR)/%.adoc=$(OUT_DIR)/%.html)

# Default target
all: $(OBJECTS)

# Rule to convert .adoc to .html
$(OUT_DIR)/%.html: $(SRC_DIR)/%.adoc
	@mkdir -p $(dir $@)
	$(ASCIIDOCTOR) $< -o $@

# Clean up
clean:
	rm -rf $(OUT_DIR)

.PHONY: all build clean
