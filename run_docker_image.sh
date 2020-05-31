#!/bin/bash

docker stop meuproduto-frontend || true && docker rm meuproduto-frontend || true
CONTAINER_ID=`docker run -d --name meuproduto-frontend -p 80:80 rderoci/meuproduto-frontend:latest nginx -g 'daemon off;'`
sleep 3;