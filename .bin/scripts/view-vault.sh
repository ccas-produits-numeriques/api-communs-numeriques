#!/usr/bin/env bash

set -euo pipefail

sops --decrypt "${ROOT_DIR}/.infra/env.global.yml"
