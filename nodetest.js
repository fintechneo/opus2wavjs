var fs = require("fs");
eval(fs.readFileSync("opustowavasm.js","UTF-8"));

var starttime = new Date().getTime();

FS.mkdir('/working');
FS.mount(NODEFS, { root: '.' }, '/working');
FS.chdir("/working");

var opustowav = Module.cwrap("opustowav",'number',['string','string']);
opustowav("test.opus","test.wav");

var duration = new Date().getTime()-starttime;
console.log("Conversion finished in "+(duration/1000)+" secs");
