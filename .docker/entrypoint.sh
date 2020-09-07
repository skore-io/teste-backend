#!/bin/bash

cd /home/node/app

npm install
npm run typeorm migration:run
npm run start:dev
