# lamar-web

Static landing site for **lamar.hackatoa.com** (the Lamar GTA V Discord bot).

Deploys via GHCR + Watchtower: pushes to `main` build `ghcr.io/hackatoan/lamar-web:latest`,
which Watchtower pulls on the Docker host (nginx serving `public/`).

`scripts/` + `i18n.config.json` are the build-time i18n generator (not shipped in the image).
