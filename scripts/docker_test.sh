#!/bin/bash
# ------------------------------------------------------------------
# [Toshe Mitev] Build/Run tests
# ------------------------------------------------------------------
SUBJECT=b0913f09-9c1a-43cc-ab7b-a25e80e82941

# --- Locks -------------------------------------------------------
LOCK_FILE=/tmp/$SUBJECT.lock
if [ -f "$LOCK_FILE" ]; then
   echo "$(basename "$0")" " is already running"
   exit
fi

trap 'rm -f "$LOCK_FILE"' EXIT
touch $LOCK_FILE

# scripts
IMIN="$( cd "$( dirname "$0" )" && pwd )"
SRC="$(dirname "$IMIN")"

# --- Body --------------------------------------------------------
cd "$SRC"/webapp/

npm test --source-map

cd "$SRC" || return
