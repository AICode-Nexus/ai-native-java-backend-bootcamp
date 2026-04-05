#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
ENV_FILE="$PROJECT_ROOT/.env"
DOCKER_BIN="${DOCKER_BIN:-}"
COMPOSE_BIN="${COMPOSE_BIN:-}"
COMPOSE_MODE="standalone"

if [[ -z "$DOCKER_BIN" ]] && command -v docker >/dev/null 2>&1; then
  DOCKER_BIN="$(command -v docker)"
fi

if [[ -z "$DOCKER_BIN" ]] && [[ -x "/Applications/Docker.app/Contents/Resources/bin/docker" ]]; then
  DOCKER_BIN="/Applications/Docker.app/Contents/Resources/bin/docker"
fi

if [[ -z "$DOCKER_BIN" ]]; then
  echo "docker command not found. Please install Docker Desktop first."
  exit 1
fi

if ! "$DOCKER_BIN" info >/dev/null 2>&1; then
  echo "Docker daemon is not running. Please start Docker Desktop and retry."
  exit 1
fi

if [[ -z "$COMPOSE_BIN" ]] && "$DOCKER_BIN" compose version >/dev/null 2>&1; then
  COMPOSE_MODE="docker-subcommand"
elif [[ -z "$COMPOSE_BIN" ]] && command -v docker-compose >/dev/null 2>&1; then
  COMPOSE_BIN="$(command -v docker-compose)"
elif [[ -z "$COMPOSE_BIN" ]] && [[ -x "/Applications/Docker.app/Contents/Resources/cli-plugins/docker-compose" ]]; then
  COMPOSE_BIN="/Applications/Docker.app/Contents/Resources/cli-plugins/docker-compose"
fi

run_compose() {
  if [[ "$COMPOSE_MODE" == "docker-subcommand" ]]; then
    "$DOCKER_BIN" compose "$@"
    return
  fi

  if [[ -n "$COMPOSE_BIN" ]]; then
    "$COMPOSE_BIN" "$@"
    return
  fi

  echo "Docker Compose command not found. Install Docker Compose or use Docker Desktop with compose enabled."
  exit 1
}

if [[ ! -f "$ENV_FILE" ]]; then
  ENV_FILE="$PROJECT_ROOT/.env.example"
  echo "No .env found, using .env.example defaults."
fi

cd "$PROJECT_ROOT"
run_compose --env-file "$ENV_FILE" up -d
run_compose --env-file "$ENV_FILE" ps
