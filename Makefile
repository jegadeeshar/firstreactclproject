# Makefile for React + Vite + TypeScript + Storybook project

# Use bash shell
SHELL := /bin/bash

# Default target
.DEFAULT_GOAL := help

# Colors for better readability
BLUE := \033[1;34m
GREEN := \033[1;32m
RESET := \033[0m

# 🧠 Helper: echo command messages nicely
define PRINT
	@echo "$(BLUE)→ $(1)$(RESET)"
endef

# ================
# 🚀 Development
# ================

start: ## Start the app using Vite
	$(call PRINT,Starting Vite dev server...)
	npm run start

dev: ## Run Vite in dev mode
	$(call PRINT,Running vite dev server...)
	npm run dev

build: ## Build TypeScript and Vite production bundle
	$(call PRINT,Building production app...)
	npm run build

preview: ## Preview production build locally
	$(call PRINT,Previewing production build...)
	npm run preview

# ================
# 🧪 Testing
# ================

test: ## Run Vitest tests
	$(call PRINT,Running tests...)
	npm run test

test-cov: ## Run Vitest with coverage
	$(call PRINT,Running tests with coverage...)
	npm run test:cov

test-watch: ## Run Vitest in watch mode
	$(call PRINT,Running tests in watch mode...)
	npm run test:watch

# ================
# 🧹 Code Quality
# ================

lint: ## Run ESLint
	$(call PRINT,Running ESLint...)
	npm run lint

lint-fix: ## Run ESLint and auto-fix issues
	$(call PRINT,Fixing lint issues...)
	npm run lint:fix

format: ## Format code with Prettier
	$(call PRINT,Formatting code...)
	npm run format

prepare: ## Setup Husky Git hooks
	$(call PRINT,Installing Husky hooks...)
	npm run prepare

# ================
# 📚 Storybook
# ================

storybook: ## Run Storybook in dev mode
	$(call PRINT,Starting Storybook on port 6006...)
	npm run storybook

build-storybook: ## Build Storybook static site
	$(call PRINT,Building Storybook static bundle...)
	npm run build-storybook

# ================
# 🧭 Utilities
# ================

clean: ## Remove node_modules and dist
	$(call PRINT,Cleaning project directories...)
	rm -rf node_modules dist

install: ## Install dependencies
	$(call PRINT,Installing dependencies...)
	npm install

help: ## Show available Make commands
	@echo "$(GREEN)Available commands:$(RESET)"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[1;34m%-20s\033[0m %s\n", $$1, $$2}'
