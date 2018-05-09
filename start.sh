#!/bin/bash
# A simple script
cd iviato-ui
npm install
npm run start &

cd ../iviato-api
npm install
npm run start &