#!/bin/bash
# Start both backend and frontend servers

# Start Express backend in the background
node server.js &

# Wait a moment for backend to start
sleep 2

# Start Vite frontend
npx vite

