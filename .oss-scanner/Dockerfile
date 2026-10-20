# syntax=docker/dockerfile:1
# Build environment for Anthropic OSS Scanner.
# Builds the TypeScript project, installs dev dependencies, and runs the
# offline test suite so the scanner can audit in a network-disabled container.
FROM node:20-bookworm-slim

ENV DEBIAN_FRONTEND=noninteractive

WORKDIR /src

# Install dependencies first for better layer caching.
COPY package.json package-lock.json ./
# prepare script runs npm run build before source is present, so skip lifecycle scripts here.
RUN npm ci --ignore-scripts

# Copy the rest of the source and build.
COPY . .
RUN npm run build

# Verify the build and tests pass in the image (network not required here).
RUN npm test

CMD ["/bin/bash"]