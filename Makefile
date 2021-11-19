.DEFAULT_GOAL := help

.PHONY: help
help: ## View help information
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

.PHONY: asdf-bootstrap
asdf-bootstrap: ## Install all tools through asdf-vm
	asdf plugin-add poetry    || asdf install poetry
	asdf plugin-add pulumi    || asdf install pulumi
	asdf plugin-add doctl     || asdf install doctl

.PHONY: shell
shell: asdf-bootstrap ## Install python dependencies and enter virtual environment
	poetry install
	poetry shell

.PHONY: preview
preview: ## Preview pulumi changes
	pulumi preview
