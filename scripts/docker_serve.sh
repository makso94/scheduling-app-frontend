#!/bin/bash
# ------------------------------------------------------------------
# [Toshe Mitev] Grunt serve from within docker container
# ------------------------------------------------------------------

VERSION=1.0.0
SUBJECT=fa27a8eb-422e-42c9-b451-e10b621711c9
USAGE="Usage: Run this script without any arguments."

# --- Locks -------------------------------------------------------
LOCK_FILE=/tmp/$SUBJECT.lock
if [ -f "$LOCK_FILE" ]; then
   echo "$(basename $0)" " is already running"
   exit
fi

if [ $1'x' == 'x' ]; then
	echo "Please provide one argument -> the name of the application you want to serve"
	exit 1
fi

trap "rm -f $LOCK_FILE" EXIT
touch $LOCK_FILE

# scripts
IMIN="$( cd "$( dirname "$0" )" && pwd )"

# --- Body --------------------------------------------------------
HERE=`pwd`
SRC="$(dirname "$IMIN")"

cd $SRC/webapp
echo "Serving" $1
ng serve --live-reload=false --host=0.0.0.0 $1
            
cd $HERE
exit 0
