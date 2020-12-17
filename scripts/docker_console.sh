#!/bin/bash
# ------------------------------------------------------------------
# [Mario Maksimovikj] Build/Run docker container for this project
# ------------------------------------------------------------------

SUBJECT=e6425250-a903-423d-9ad1-96deafab0906

# --- Locks -------------------------------------------------------
LOCK_FILE=/tmp/$SUBJECT.lock
if [ -f "$LOCK_FILE" ]; then
    echo "$(basename $0)" " is already running"
    exit
fi

trap "rm -f $LOCK_FILE" EXIT
touch $LOCK_FILE

# --- Body --------------------------------------------------------
docker network create lara-network || echo 'Network "lara-network" already created!'

# Update the base image
docker pull node:14.15.1-stretch-slim

docker build --force-rm -t scheduling-web -f docker/Dockerfile .
docker rmi "$(docker images -f "dangling=true" -q)"

docker run --name web-nginx -p 80:80 -p 443:443 \
    --network=lara-network \
    -v /tmp:/tmp \
    -v $FILES_PATH:/usr/share/nginx/files \
    -v "$(pwd)"/webapp:/usr/share/nginx/html:ro \
    -v "$(pwd)"/etc/docker_nginx_dev.conf:/etc/nginx/conf.d/default.conf \
    -d nginx:alpine sh -c "while true; do nginx -g 'daemon off;'; sleep 1; done"

# scheduling-web webapp container
# Notice the non mapping volume mount /project/webapp/node_modules, it
# is used as a placeholder for the dependencies that were already
# installed when this image was built (docker build above). We are using
# the docker caching mechanism which means that the dependencies are being
# installed at 'build' stage only if packages.json or yarn.lock is modified.

docker run --rm -it --name=scheduling-web \
    -v "$(pwd)":/project --mount source=scheduling-web_deps,target=/project/webapp/node_modules \
    -v /tmp:/tmp --hostname scheduling-web \
    --network=lara-network \
    -p 4200:4200 \
    scheduling-web tmux -L scheduling-web

# removing related containers
docker rm -f web-nginx

DANGLING=$(docker images -f "dangling=true" -q)
if [ "x""$DANGLING" != "x" ]; then
    docker rmi $DANGLING
fi

echo "Successfuly destroyed all linked containers"

exit 0
