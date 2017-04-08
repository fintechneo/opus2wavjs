export OGGDIR=$(cd libogg-1.3.2 && pwd)
export OPUSDIR=$(cd opus-1.1.4 && pwd)

export OGG_CFLAGS="-I"$OGGDIR/include""
export OGG_LIBS="-L"$OGGDIR""

export OPUS_CFLAGS="-I"$OPUSDIR/include""
export OPUS_LIBS="-I"$OPUSDIR""

export DEPS_CFLAGS="-I"$OPUSDIR/include" -I"$OGGDIR/include""
export DEPS_LIBS="-I"$OPUSDIR" -I"$OGGDIR""

# Remember to change optimization level to -O3 in libogg/configure (look for your platform. e.g. search for -O20 which is for Linux)
cd libogg-1.3.2
emconfigure ./configure
emmake make
cd ..

cd opus-1.1.4
emconfigure ./configure CFLAGS="-O3" --disable-intrinsics
emmake make
cd ..

cd opusfile-0.7
emconfigure ./configure CFLAGS="-O3" --disable-http 
emmake make
cd ..

