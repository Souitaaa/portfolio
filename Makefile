.DEFAULT_GOAL := build

# Prefer the project runtime; keep the existing local environment as a fallback.
export PATH := $(CURDIR)/.tools/node_modules/.bin:$(CURDIR)/node-env/bin:$(PATH)
# Debian packages npm dependencies separately; let the local Node runtime find them.
ifneq ($(wildcard /usr/share/nodejs),)
export NODE_PATH := /usr/share/nodejs$(if $(NODE_PATH),:$(NODE_PATH))
endif
NPM ?= npm

.PHONY: build install dev preview lint runtime

runtime:
	@command -v "$(NPM)" >/dev/null 2>&1 || { echo "npm is required to set up Node. Install Node.js and npm, then retry."; exit 1; }
	@node -e 'const [major, minor] = process.versions.node.split(".").map(Number); process.exit((major === 20 && minor >= 19) || (major === 22 && minor >= 12) || major > 22 ? 0 : 1)' 2>/dev/null || { \
		echo "Installing Node 22 locally (first run requires internet)..."; \
		$(NPM) install --prefix .tools --no-save --package-lock=false --no-audit --no-fund node@22; \
	}

install: runtime
	$(NPM) ci --include=dev --no-audit --no-fund

build: install
	$(NPM) run build

dev: install
	$(NPM) run dev

preview: build
	$(NPM) run preview

lint: install
	$(NPM) run lint
