# Variables
ASCIIDOCTOR = asciidoctor
SRC_DIR = ./docs
BUILD_DIR = ./_site
INCLUDES_DIR = include
ARTICLES_DIR = articles

# Includes shouldn't be converted
ALL_SOURCES := $(shell find $(SRC_DIR) -name "*.adoc" -not -path "$(SRC_DIR)/$(INCLUDES_DIR)/*")

# Split the sources
ARTICLES := $(filter $(SRC_DIR)/$(ARTICLES_DIR)/%.adoc,$(ALL_SOURCES))
SRCS := $(filter-out $(SRC_DIR)/$(ARTICLES_DIR)/%.adoc,$(ALL_SOURCES))

# Objects
SRCS_OBJS := $(patsubst $(SRC_DIR)/%.adoc,$(BUILD_DIR)/%.html,$(SRCS))
ARTICLE_OBJS := \
  $(addprefix $(BUILD_DIR)/$(ARTICLES_DIR)/, \
    $(notdir $(ARTICLES:.adoc=.html)))

OBJECTS := $(SRCS_OBJS) $(ARTICLE_OBJS)

# Default target
all: $(OBJECTS)

$(BUILD_DIR)/%.html: $(SRC_DIR)/%.adoc
	@echo $@
	@mkdir -p $(dir $@)
	@$(ASCIIDOCTOR) $< -o $@

$(BUILD_DIR)/$(ARTICLES_DIR)/%.html:
	@echo $@
	@mkdir -p $(BUILD_DIR)/$(ARTICLES_DIR)
	@src=$(shell find $(SRC_DIR)/$(ARTICLES_DIR) -name "$*.adoc"); \
	asciidoctor $$src -o $@

# Clean up
clean:
	rm -rf $(BUILD_DIR)

.PHONY: all clean
