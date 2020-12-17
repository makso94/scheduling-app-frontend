#!/bin/bash
# ------------------------------------------------------------------
# [Toshe Mitev] PreprodWebapp
#          Deploy webapp to Staging server
# ------------------------------------------------------------------
SUBJECT=2dd42381-b43c-4d02-ba18-951cf0e2a94b
# --- Locks -------------------------------------------------------
LOCK_FILE=/tmp/$SUBJECT.lock
if [ -f "$LOCK_FILE" ]; then
   echo "$(basename $0)" " is already running"
   exit
fi

trap "rm -f $LOCK_FILE" EXIT
touch $LOCK_FILE

IMIN="$( cd "$( dirname "$0" )" && pwd )"
SRC="$(dirname "$IMIN")"

# --- Body --------------------------------------------------------
set -e

# Variables
TSTAMP=$(date +%Y-%m-%d_%H%M)
DEPLOY_FILE=deploy_webapp_$TSTAMP.zip
SERVER_SSH=software@rms.ved.mk
APP_DIR=/home/software/app/webapp
BACKUP_DIR=/home/software/app/backups/

echo -e "\nCreating deployment archive."
cd "$SRC" || return

# copy previously built frontend dist
cp -r /tmp/rms.zip /tmp/"$DEPLOY_FILE"

echo -e "\nUploading archive to remote server."
scp -o StrictHostKeyChecking=no /tmp/"$DEPLOY_FILE" $SERVER_SSH:/tmp

echo -e "\nCreate backup of the current app on remote server."
ssh -t $SERVER_SSH 'bash -s' << EOF
    mkdir -p $BACKUP_DIR;
    zip -r $BACKUP_DIR/backup_webapp_$TSTAMP.tar.gz $APP_DIR/*

    echo -e "\nRecreation of the application directory..."
    rm -rf $APP_DIR
    mkdir $APP_DIR

    echo -e "\nUnpacking deployment archive..."
    unzip /tmp/$DEPLOY_FILE -d $APP_DIR
EOF

exit $?
