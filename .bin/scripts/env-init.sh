#!/usr/bin/env bash

set -euo pipefail

echo "Updating local server/.env & ui/.env"

ansible-galaxy collection install -U community.sops

ANSIBLE_CONFIG="${ROOT_DIR}/.infra/ansible/ansible.cfg" ansible-playbook \
  --limit "local" \
  "${ROOT_DIR}/.infra/ansible/initialize-env.yml"

echo "PUBLIC_VERSION=0-local" >> "${ROOT_DIR}/server/.env"
echo "PUBLIC_PRODUCT_NAME=\"${PRODUCT_NAME}\"" >> "${ROOT_DIR}/server/.env"

echo "NEXT_PUBLIC_ENV=local" >> "${ROOT_DIR}/ui/.env"
echo "NEXT_PUBLIC_VERSION=0-local" >> "${ROOT_DIR}/ui/.env"
echo "NEXT_PUBLIC_PRODUCT_NAME=\"${PRODUCT_NAME}\"" >> "${ROOT_DIR}/ui/.env"
echo "NEXT_PUBLIC_PRODUCT_REPO=\"${REPO_NAME}\"" >> "${ROOT_DIR}/ui/.env"
echo "NEXT_PUBLIC_API_PORT=5002" >> "${ROOT_DIR}/ui/.env"

pnpm install
pnpm services:start
pnpm setup:mongodb
pnpm --filter server build:dev
pnpm cli migrations:up
pnpm cli indexes:recreate

