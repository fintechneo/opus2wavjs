export OGGDIR=$(cd libogg-1.3.2 && pwd)
export OPUSDIR=$(cd opus-1.1.4 && pwd)

export OGG_CFLAGS="-I"$OGGDIR/include""
export OGG_LIBS="-L"$OGGDIR""

export OPUS_CFLAGS="-I"$OPUSDIR/include""
export OPUS_LIBS="-I"$OPUSDIR""

emcc -O3 -s ASM_JS=1 -s EXPORTED_FUNCTIONS="['_opustowav']" -Iopusfile-0.7/include -I$OPUSDIR/include -I$OGGDIR/include opusfile-0.7/.libs/libopusfile.so $OGGDIR/src/.libs/libogg.so $OPUSDIR/.libs/libopus.so opustowav.c -o opustowavasm.js