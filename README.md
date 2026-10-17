# Pi-Tray plugin template

A starting point for a Pi-Tray plugin package, with CI that builds it for every platform and keeps its tools up to date.

## Making a plugin from it

1. Click **Use this template** on GitHub to make your own repo.
2. In `package.json`, set `name` (e.g. `@your-name/pi-tray-something`), `description` and `author`.
3. Replace the example plugins in `src/` with your own, and export each from `src/index.ts`.
4. Run `npm install` and commit `package-lock.json`, which CI needs.
5. In your repo's **Settings > Actions > General**, under **Workflow permissions**, tick **Allow GitHub Actions to create and approve pull requests**, so the update workflow can open pull requests. If your repo belongs to an organisation and the option is greyed out, an organisation owner has to tick it first in the organisation's **Settings > Actions > General**, then you can tick it for the repo.
6. To release, set `version` in `package.json`, push it, then push a matching tag, e.g. `git tag v1.0.0 && git push origin v1.0.0`.

People install it in the Pi-Tray Editor with your repo's name, e.g. `your-name/pi-tray-something`.

## What's here

- `src/index.ts`: exports each plugin by name. A cell refers to one as `<package name>/<export name>`
- `src/log_message`: a plugin that does something when its button is pressed
- `src/uptime`: a live tile, which keeps its button's label up to date
- `.github/workflows/release.yml`: builds every platform on each push to `main`, and publishes a release for a `v*` tag
- `.github/workflows/update.yml`: every Monday, opens a pull request if there's a newer `@pi-tray/types` or `@pi-tray/plugin-build`

## Building locally

`npm run typecheck` checks the types. `npm run build` builds this machine's archive into `plugin-dist/`.

If a dependency has a native module, building needs the Node version the Pi-Tray server ships with, and CI builds each platform on its own runner. Pure JavaScript plugins build on any Node, into one archive for every platform.

Build settings (the entry file, dependencies to leave out, which platforms to build) go in a `"pi-tray"` field in `package.json`, see [@pi-tray/plugin-build](https://github.com/Pi-Tray/Pi-Tray/tree/main/packages/plugin-build).
