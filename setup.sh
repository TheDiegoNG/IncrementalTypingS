#!/usr/bin/env bash
# Install dependencies
npm ci

# Install Chrome/Chromium
sudo apt-get update
sudo apt-get install -y chromium-browser

# Configure Karma to find the browser
export CHROME_BIN=/usr/bin/chromium-browser
