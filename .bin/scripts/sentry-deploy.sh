#!/usr/bin/env bash

set -euo pipefail

ENVIRONMENT="${1:?"Veuillez préciser l'environement"}"
VERSION=$(git rev-parse --short HEAD)

SENTRY_DSN=$(sops --decrypt --extract '["SERVER_SENTRY_DSN"]' .infra/env.global.yml)
SENTRY_AUTH_TOKEN=$(sops --decrypt --extract '["SENTRY_AUTH_TOKEN"]' .infra/env.global.yml)

docker run \
  --platform=linux/amd64 \
  --rm \
  -i \
  --entrypoint /bin/bash \
  -e SENTRY_AUTH_TOKEN="${SENTRY_AUTH_TOKEN}" \
  -e SENTRY_DSN="${SENTRY_DSN}" \
  ghcr.io/ccas-produits-numeriques/ccas_${PRODUCT_NAME}_server:${VERSION} \
  /app/server/sentry-deploy-server.sh "${ENVIRONMENT}" 
