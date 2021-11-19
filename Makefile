.DEFAULT_GOAL := help

PULUMI_DIR = pulumi/

.PHONY: help
help: ## View help information
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

.PHONY: asdf-bootstrap
asdf-bootstrap: ## Install all tools through asdf-vm
	asdf plugin-add nodejs    || asdf install nodejs
	asdf plugin-add pulumi    || asdf install pulumi
	asdf plugin-add doctl     || asdf install doctl

.PHONY: npm-bootstrap
npm-bootstrap: asdf-bootstrap ## Install npm packages
	cd $(PULUMI_DIR) && npm install

.PHONY: preview
preview: npm-bootstrap ## Preview pulumi changes
	pulumi -C $(PULUMI_DIR) preview
