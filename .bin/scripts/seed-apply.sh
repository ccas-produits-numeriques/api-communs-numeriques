#!/usr/bin/env bash

set -euo pipefail

DB_NAME="api"

# Parse exclude options
EXCLUDE_RAW=""
while [[ $# -gt 0 ]]; do
  case "$1" in
    --exclude=*|-x=*)
      EXCLUDE_RAW="${1#*=}"
      shift
      ;;
    --exclude|-x)
      shift
      EXCLUDE_RAW="${1:-}"
      [ $# -gt 0 ] && shift || true
      ;;
    *)
      echo "Unknown option: $1" >&2
      exit 2
      ;;
  esac
done

# Build --nsExclude args from --exclude="users,workspaces"
nsExcludeArgs=()
if [[ -n "${EXCLUDE_RAW// /}" ]]; then
  IFS=',' read -r -a _excluded <<< "$EXCLUDE_RAW"
  for col in "${_excluded[@]}"; do
    col_trim="$(echo -n "$col" | xargs)"
    [[ -z "$col_trim" ]] && continue
    nsExcludeArgs+=( "--nsExclude=${DB_NAME}.${col_trim}" )
  done
  echo "Excluded collections (not overwritten, not restored): ${EXCLUDE_RAW}"
fi


if [ -z "${1:-}" ]; then
    readonly TARGET_DB="mongodb://__system:password@localhost:27017/$DB_NAME?authSource=local&directConnection=true"
else
    readonly TARGET_DB="$1"
    shift
fi

echo "Target database: $TARGET_DB"

readonly SEED_GPG="$ROOT_DIR/.infra/files/configs/mongodb/seed.gpg"
readonly SEED_GZ="$ROOT_DIR/.infra/files/configs/mongodb/seed.gz"
readonly PASSPHRASE="$ROOT_DIR/.bin/SEED_PASSPHRASE.txt"

read -p "Database will be overwritten. Continue? [y/N]: " response
case $response in
  [yY][eE][sS]|[yY])
    ;;
  *)
    exit 1
;;
esac

delete_cleartext() {
  rm -f "$SEED_GZ" "$PASSPHRASE"
}
trap delete_cleartext EXIT

sops --decrypt "${ROOT_DIR}/.infra/env.global.yml" | yq '.SEED_GPG_PASSPHRASE' > "$PASSPHRASE"

rm -f "$SEED_GZ"
gpg -d --batch --passphrase-file "$PASSPHRASE" -o "$SEED_GZ" "$SEED_GPG"


cat "$SEED_GZ" \
  | docker compose -f "$ROOT_DIR/docker-compose.yml" exec -iT mongodb \
      mongorestore \
        --archive \
        --uri="${TARGET_DB}" \
        --gzip \
        --drop \
        --nsInclude="${DB_NAME}.*" \
        "${nsExcludeArgs[@]}"


pnpm build
pnpm cli migrations:up
pnpm cli indexes:recreate
