# Simple Opus to Wav converter in Javascript #

opustowavworker.js shows a web worker example that will download an opus file and convert it to wav.

The converter is based on the opus c libraries and compiled to javascript using emscripten.
The downloaded opus file is copied into the emscripten filesystem and sent to the library for conversion,
which writes the wav file back to the filesystem.

# QUICK testing instructions #

Open index HTML in a browser and the test.opus file will be converted to wav and made as source to the audio player in the page. If you don't have a webserver you can start one locally by running:

npm install
npm run lite

This will install and start lite-server on http://localhost:3000

You can also test in nodejs by running the nodetest.js file which will convert test.opus to test.wav

# Building libs

Remember to change optimization level to -O3 in libogg/configure. Look for your platform. e.g. search for -O20 which is for e.g. Linux and replace all instances of -O20 with -O3

Then you should be able to run sh buildlibs.sh

For building the opustowav program run sh buildopustowav.sh
