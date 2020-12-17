#!/bin/bash
# ------------------------------------------------------------------
# [Toshe Mitev] Build/project distributables
# ------------------------------------------------------------------
SUBJECT=b17806ea-7821-45d6-a16f-0e3ea089f227
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
HERE=$(pwd)

cd "$SRC"/webapp || return

rm -rf .tmp /tmp/rms/
mkdir -p /tmp/rms/

for project in projects/*/ ; do
    APP="$(basename "$project")"

    if [ "x$APP" = "xshared" ]; then
        continue
    fi

    printf "\n\n\nNow building %s\n-----------------------\n" "$APP"

    ng build "$APP" --prod --aot --output-path=/tmp/rms/en/"$APP"

    if [ "x$?" != "x0" ]; then
        printf "\n\n\n%s build failed!\n-----------------------\n" "$APP"
        exit 1
    fi

    # for lang in mk; do
    #     ng build "$APP" --prod --aot
    #     ng build "$APP" --configuration=$lang --prod --aot
    #         # --base-href=/$lang/ \
    #         # --deploy-url=/$lang/ \
    #         # --i18n-file=src/locale/messages.$lang.xlf \
    #         # --i18n-format=xlf \
    #         # --i18n-locale=$lang \
    #         # --i18n-missing-translation=warning;
    #     if [ "x""$?" != "x0" ]; then
    #         printf "\n\n\n%s build failed!\n-----------------------\n" "$APP"
    #         exit 1
    #     fi
    # done
done

RES=$?

rm -rf .tmp

if [ $RES != 0 ]; then
    echo 'Build failed!!'
    exit 1
fi

rm -rf /tmp/rms.zip
cd /tmp/rms/ || return
zip -r /tmp/rms.zip ./*

cd "$HERE" || return
echo "Done."
