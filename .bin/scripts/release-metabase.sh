#!/usr/bin/env bash

set -euo pipefail

readonly DOCKERFILE_PATH="${ROOT_DIR}/.infra/docker/metabase/Dockerfile"
readonly VERSION=$(
  sed -n 's/^FROM metabase\/metabase:\([^[:space:]]\+\)$/\1/p' "$DOCKERFILE_PATH"
)

if [[ -z "$VERSION" ]]; then
  echo "Err: impossible d'extraire la version Metabase depuis ${DOCKERFILE_PATH}" >&2
  exit 1
fi

echo "Build & Push docker de metabase:${VERSION} sur le registry github (https://ghcr.io/${GITHUB_ORGANIZATION}/)"

read -p "Do you need to login to ghcr.io registry? [y/N]" RES_LOGIN

case $RES_LOGIN in
  [yY][eE][sS]|[yY])
    read -p "[ghcr.io] user ? : " u
    read -p "[ghcr.io] GH personnal token ? : " p

    echo "Login sur le registry ..."
    echo "$p" | docker login ghcr.io -u "$u" --password-stdin
    echo "Logged!"
    ;;
esac

echo "Building metabase:${VERSION} ..."
docker buildx build "${ROOT_DIR}/.infra/docker/metabase" \
      --file "${DOCKERFILE_PATH}" \
      --platform linux/amd64,linux/arm64 \
      --tag ghcr.io/ccas-produits-numeriques/ccas_${PRODUCT_NAME}_metabase:"$VERSION" \
      --label "org.opencontainers.image.source=https://github.com/ccas-produits-numeriques/api-communs-numeriques" \
      --label "org.opencontainers.image.version=$VERSION" \
      --label "org.opencontainers.image.licenses=MIT" \
      --push
