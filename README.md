# Portfolio

React portfolio built with Vite and Tailwind CSS.

## Local development

With Make and npm installed, run:

```sh
make dev
```

## Production build

```sh
make build
```

`make build` installs the locked dependencies, including build tools, and builds
the complete app into `dist/`. Running `make` does the same thing.
`make preview` builds and serves the production app locally. `make dev` starts
the development server, and `make lint` checks the source with Oxlint.
Each command uses a compatible Node version, downloading Node 22 into the ignored
`.tools/` folder if needed. The first setup requires internet access. No manual
Node version switch is needed. Make and npm must already be installed.

## Keeping the repository light

Commit source files, `package.json`, and `package-lock.json`. Dependencies are
reinstalled with `npm ci`; do not commit `node_modules/`, the local `node-env/`
runtime, or generated `dist/` and `build/` directories. These are ignored by Git.

The local Node environment can stay on your machine without being pushed.
Removing it from tracking does not remove it from earlier Git history.
