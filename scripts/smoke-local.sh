#!/usr/bin/env bash
set -euo pipefail

BASE_URL="${BASE_URL:-http://127.0.0.1:5173}"

echo "[smoke] target: ${BASE_URL}"

check() {
  local path="$1"
  local expect="$2"

  local body
  body="$(curl -fsS "${BASE_URL}${path}")"

  local normalized
  normalized="$(printf '%s' "${body}" | tr -d '[:space:]')"

  if [[ "${normalized}" != *"${expect}"* ]]; then
    echo "[smoke] FAIL ${path} (missing: ${expect})"
    exit 1
  fi

  echo "[smoke] OK   ${path}"
}

check "/.well-known/ocx.json" '"components":"/components/{name}.json"'
check "/index.json" '"name":"im-not-ai"'
check "/components/im-not-ai.json" '"type":"profile"'
check "/components/im-not-ai/commands/humanize.md" 'humanize'

echo "[smoke] all checks passed"
