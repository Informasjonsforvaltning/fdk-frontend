#!/bin/sh

# Determine the environment file to use
if [ -n "$NODE_ENV" ] && [ -f ".env.$NODE_ENV" ]; then
  ENV_FILE=".env.$NODE_ENV"
else
  ENV_FILE=".env.local"
fi

# Load the environment file if it exists
if [ -f "$ENV_FILE" ]; then
  echo "Loading environment variables from $ENV_FILE"
  set -a
  . "$ENV_FILE"
  set +a
else
  echo "No environment file found: $ENV_FILE"
  exit 1
fi

# Run OpenAPI TypeScript generation
npx openapi-typescript "$API_1" -o "$OUTPUT_1"
npx openapi-typescript "$API_2" -o "$OUTPUT_2"
npx openapi-typescript "$API_3" -o "$OUTPUT_3"
npx openapi-typescript "$API_4" -o "$OUTPUT_4"
