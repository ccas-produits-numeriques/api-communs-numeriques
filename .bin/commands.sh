#!/usr/bin/env bash

set -euo pipefail

if [ ! -f "${ROOT_DIR}/.bin/shared/commands.sh" ]; then

  echo "Mise à jour du sous-module shared-bin"

  git submodule update --init "${ROOT_DIR}/.bin/shared"

fi

. "${ROOT_DIR}/.bin/shared/commands.sh"

################################################################################
# Shared commands
################################################################################

_register "dev:dependencies:check"
_register "dev:setup"
_register "vault:edit"
_register "app:deploy:log:encrypt"
_register "app:deploy:log:decrypt"

################################################################################
# Local commands
################################################################################

_local_env_init__help="Update local env files using values from SOPS files"
_register "env:init" "_local_env_init"
function _local_env_init() { "${SCRIPTS_DIR}/env-init.sh" "$@"; }

<<<<<<< HEAD
_local_release_metabase__help="Build and push metabase Docker image"
_register "release:metabase" "_local_release_metabase"
function _local_release_metabase() { "${SCRIPTS_DIR}/release-metabase.sh" "$@"; }
=======
_local_build_image__help="Build Docker images via buildx bake"
_register "build:image" "_local_build_image"

function _local_build_image() {
  "${SCRIPTS_DIR}/build-images.sh" "$@"
}

_local_release_interactive__help="Build and push release images interactively"
_register "release:interactive" "_local_release_interactive"

function _local_release_interactive() {
  "${SCRIPTS_DIR}/release-interactive.sh" "$@"
}

_local_release_app__help="Build and push release images"
_register "release:app" "_local_release_app"

function _local_release_app() {
  "${SCRIPTS_DIR}/release-app.sh" "$@"
}

_local_app_deploy__help="Deploy application version to environment"
_register "app:deploy" "_local_app_deploy"

function _local_app_deploy() {
  local ENV_FILTER=${1:?"Merci de préciser un ou plusieurs environnements (ex. recette ou preproduction)"}
  shift
  local APP_VERSION=${1:?"Merci de préciser la version à déployer"}
  shift

  if [[ "$APP_VERSION" == "latest" ]]; then
    echo "Err: Le déploiement de la version 'latest' n'est pas autorisé. Veuillez spécifier une version explicite." >&2
    exit 1
  fi

  _shared_app_deploy "$ENV_FILTER" --extra-vars "app_version=$APP_VERSION" "$@"
}
>>>>>>> be752bb (feat: adapt ci)

_local_sdk_release__help="Release SDK version"
_register "sdk:release" "_local_sdk_release"
function _local_sdk_release() { "${SCRIPTS_DIR}/sdk-release.sh" "$@"; }

_local_sentry_deploy__help="Notify deployment to sentry for existing sentry release"
_register "sentry:deploy" "_local_sentry_deploy"
function _local_sentry_deploy() { "${SCRIPTS_DIR}/sentry-deploy.sh" "$@"; }

_local_sentry_release__help="Create sentry release for existing Docker image"
_register "sentry:release" "_local_sentry_release"
function _local_sentry_release() { "${SCRIPTS_DIR}/sentry-release.sh" "$@"; }

_local_seed_update__help="Update seed using a database"
_register "seed:update" "_local_seed_update"

function _local_seed_update() {
  "${SCRIPTS_DIR}/seed-update.sh" "$@"
}

_local_seed_apply__help="Apply seed to a database"
_register "seed:apply" "_local_seed_apply"

function _local_seed_apply() {
  "${SCRIPTS_DIR}/seed-apply.sh" "$@"
}

################################################################################
# Release orchestration (Node tooling)
################################################################################

_local_release_setup__help="Build release tooling"
_register "release:setup" "_local_release_setup"

function _local_release_setup () {
  pnpm exec tsc -b "${SCRIPTS_DIR}/release/tsconfig.json"
}

_local_release_post_build__help="Update latest-build tag and WIP prerelease"
_register "release:post:build" "_local_release_post_build"

function _local_release_post_build () {
  _local_release_setup
  node "${SCRIPTS_DIR}/release/dist/index.mjs" post-build "$@"
}

_local_release_build_local__help="Build and register a local latest-build"
_register "release:build:local" "_local_release_build_local"

function _local_release_build_local () {
  _local_release_setup
  node "${SCRIPTS_DIR}/release/dist/index.mjs" build-from-local
}

_local_release_deploy_before__help="Run pre-deploy release steps"
_register "release:deploy:before" "_local_release_deploy_before"

function _local_release_deploy_before () {
  readonly ENV_TYPE=${1:?"Merci de préciser un type d'environnement (recette ou preproduction)"}
  shift

  _local_release_setup
  VAULT_DATA=$("${SCRIPTS_DIR}/view-vault.sh")
  export TCHAP_BOT_PATH_MD=$(echo "${VAULT_DATA}" | yq -r ".TCHAP_BOT_PATH_MD.${ENV_TYPE}")
  export GH_PAT_PACKAGE_READONLY=$(echo "${VAULT_DATA}" | yq -r ".GH_PAT_PACKAGE_READONLY")
  node "${SCRIPTS_DIR}/release/dist/index.mjs" pre-deploy "$ENV_TYPE"
}

_local_release_deploy__help="Run deploy release steps"
_register "release:deploy" "_local_release_deploy"

function _local_release_deploy () {
  readonly ENV_FILTER=${1:?"Merci de préciser un environnement (recette ou preproduction)"}
  shift

  _local_release_setup
  VAULT_DATA=$("${SCRIPTS_DIR}/view-vault.sh")
  export GH_PAT_PACKAGE_READONLY=$(echo "${VAULT_DATA}" | yq -r ".GH_PAT_PACKAGE_READONLY")
  node "${SCRIPTS_DIR}/release/dist/index.mjs" deploy "$ENV_FILTER"
}

_local_release_deploy_after__help="Run post-deploy release steps"
_register "release:deploy:after" "_local_release_deploy_after"

function _local_release_deploy_after () {
  readonly ENV_TYPE=${1:?"Merci de préciser un type d'environnement (recette ou preproduction)"}
  shift
  readonly STATUS=${1:?"Merci de préciser le statut de la release (success ou failure)"}
  shift

  _local_release_setup
  VAULT_DATA=$("${SCRIPTS_DIR}/view-vault.sh")
  export TCHAP_BOT_PATH_MD=$(echo "${VAULT_DATA}" | yq -r ".TCHAP_BOT_PATH_MD.${ENV_TYPE}")
  export GH_PAT_PACKAGE_READONLY=$(echo "${VAULT_DATA}" | yq -r ".GH_PAT_PACKAGE_READONLY")
  node "${SCRIPTS_DIR}/release/dist/index.mjs" post-deploy "$ENV_TYPE" "$STATUS"
}

_local_release_deploy_local__help="Run local deploy release steps"
_register "release:deploy:local" "_local_release_deploy_local"

function _local_release_deploy_local () {
  readonly ENV=${1:?"Merci de préciser un type d'environnement (recette ou preproduction)"}
  shift
  _local_release_setup
  VAULT_DATA=$("${SCRIPTS_DIR}/view-vault.sh")
  export TCHAP_BOT_PATH_MD=$(echo "${VAULT_DATA}" | yq -r ".TCHAP_BOT_PATH_MD.${ENV}")
  export GH_PAT_PACKAGE_READONLY=$(echo "${VAULT_DATA}" | yq -r ".GH_PAT_PACKAGE_READONLY")
  node "${SCRIPTS_DIR}/release/dist/index.mjs" deploy:local "$ENV" "$@"
}

_local_release_post_publish__help="Finalize published prerelease into rc tag"
_register "release:post:publish" "_local_release_post_publish"

function _local_release_post_publish () {
  _local_release_setup
  if [[ -z "${GITHUB_ACTIONS:-}" ]]; then
    VAULT_DATA=$("${SCRIPTS_DIR}/view-vault.sh")
    export TCHAP_BOT_PATH_MD=$(echo "${VAULT_DATA}" | yq -r ".TCHAP_BOT_PATH_MD.preproduction")
    export GH_PAT_PACKAGE_READONLY=$(echo "${VAULT_DATA}" | yq -r ".GH_PAT_PACKAGE_READONLY")
  fi
  node "${SCRIPTS_DIR}/release/dist/index.mjs" post-publish "$@"
}

_local_release_rollback_before__help="Run pre-rollback release steps"
_register "release:rollback:before" "_local_release_rollback_before"

function _local_release_rollback_before () {
  readonly ENV_TYPE=${1:?"Merci de préciser un type d'environnement (recette ou preproduction)"}
  shift

  _local_release_setup
  VAULT_DATA=$("${SCRIPTS_DIR}/view-vault.sh")
  export TCHAP_BOT_PATH_MD=$(echo "${VAULT_DATA}" | yq -r ".TCHAP_BOT_PATH_MD.${ENV_TYPE}")
  export GH_PAT_PACKAGE_READONLY=$(echo "${VAULT_DATA}" | yq -r ".GH_PAT_PACKAGE_READONLY")
  node "${SCRIPTS_DIR}/release/dist/index.mjs" pre-rollback "$ENV_TYPE" "$@"
}

_local_release_rollback__help="Run rollback release steps"
_register "release:rollback" "_local_release_rollback"

function _local_release_rollback () {
  readonly ENV_FILTER=${1:?"Merci de préciser un environnement (recette ou preproduction)"}
  shift

  _local_release_setup
  VAULT_DATA=$("${SCRIPTS_DIR}/view-vault.sh")
  export GH_PAT_PACKAGE_READONLY=$(echo "${VAULT_DATA}" | yq -r ".GH_PAT_PACKAGE_READONLY")
  node "${SCRIPTS_DIR}/release/dist/index.mjs" rollback "$ENV_FILTER" "$@"
}

_local_release_rollback_after__help="Run post-rollback release steps"
_register "release:rollback:after" "_local_release_rollback_after"

function _local_release_rollback_after () {
  readonly ENV_TYPE=${1:?"Merci de préciser un type d'environnement (recette ou preproduction)"}
  shift
  readonly STATUS=${1:?"Merci de préciser le statut de la release (success ou failure)"}
  shift

  _local_release_setup
  VAULT_DATA=$("${SCRIPTS_DIR}/view-vault.sh")
  export TCHAP_BOT_PATH_MD=$(echo "${VAULT_DATA}" | yq -r ".TCHAP_BOT_PATH_MD.${ENV_TYPE}")
  export GH_PAT_PACKAGE_READONLY=$(echo "${VAULT_DATA}" | yq -r ".GH_PAT_PACKAGE_READONLY")
  node "${SCRIPTS_DIR}/release/dist/index.mjs" post-rollback "$ENV_TYPE" "$STATUS"
}

_local_release_rollback_local__help="Run local rollback release steps"
_register "release:rollback:local" "_local_release_rollback_local"

function _local_release_rollback_local () {
  readonly ENV=${1:?"Merci de préciser un type d'environnement (recette ou preproduction)"}
  shift
  _local_release_setup
  VAULT_DATA=$("${SCRIPTS_DIR}/view-vault.sh")
  export TCHAP_BOT_PATH_MD=$(echo "${VAULT_DATA}" | yq -r ".TCHAP_BOT_PATH_MD.${ENV}")
  export GH_PAT_PACKAGE_READONLY=$(echo "${VAULT_DATA}" | yq -r ".GH_PAT_PACKAGE_READONLY")
  node "${SCRIPTS_DIR}/release/dist/index.mjs" rollback:local "$ENV" "$@"
}
