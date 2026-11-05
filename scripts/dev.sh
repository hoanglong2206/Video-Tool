#!/usr/bin/env bash
set -e

echo "=========================================="
echo "  Starting AI Motion Studio Development  "
echo "=========================================="

if [ ! -f ".env" ]; then
    echo "[!] .env not found. Copying from .env.example..."
    cp .env.example .env
fi

npm run dev

