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
_register "app:deploy"
_register "app:deploy:log:encrypt"
_register "app:deploy:log:decrypt"

################################################################################
# Local commands
################################################################################

_local_app_build__help="Build Ui & Server Docker images"
_register "app:build" "_local_app_build"
function _local_app_build() { "${SCRIPTS_DIR}/app-build.sh" "$@"; }

_local_env_init__help="Update local env files using values from SOPS files"
_register "env:init" "_local_env_init"
function _local_env_init() { "${SCRIPTS_DIR}/env-init.sh" "$@"; }

_local_release_metabase__help="Build and push metabase Docker image"
_register "release:metabase" "_local_release_metabase"
function _local_release_metabase() { "${SCRIPTS_DIR}/release-metabase.sh" "$@"; }

_local_sdk_release__help="Release SDK version"
_register "sdk:release" "_local_sdk_release"
function _local_sdk_release() { "${SCRIPTS_DIR}/sdk-release.sh" "$@"; }

_local_sentry_deploy__help="Notify deployment to sentry for existing sentry release"
_register "sentry:deploy" "_local_sentry_deploy"
function _local_sentry_deploy() { "${SCRIPTS_DIR}/sentry-deploy.sh" "$@"; }

_local_sentry_release__help="Create sentry release for existing Docker image"
_register "sentry:release" "_local_sentry_release"
function _local_sentry_release() { "${SCRIPTS_DIR}/sentry-release.sh" "$@"; }

_local_seed_apply__help="Apply seed to a database"
_register "seed:apply" "_local_seed_apply"
function _local_seed_apply() { "${SCRIPTS_DIR}/seed-apply.sh" "$@"; }

_local_seed_update__help="Update seed using a database"
_register "seed:update" "_local_seed_update"
function _local_seed_update() { "${SCRIPTS_DIR}/seed-update.sh" "$@"; }
