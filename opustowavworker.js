var progressMessagePost = function(msg) {
    postMessage({status: "message", result: msg}); 
}

progressMessagePost("Importing opustowavasm.js");
importScripts('opustowavasm.js');

progressMessagePost("Initialize emscripten");
Module['onRuntimeInitialized'] = function() {
	progressMessagePost("Emscripten ready");
	var opustowav = Module.cwrap("opustowav",'number',['string','string']);
	progressMessagePost("opus to wav asm.js library imported");

	FS.mkdir('/working');
	FS.mount(MEMFS, { root: '.' }, '/working');
	FS.chdir("/working");

	progressMessagePost("Downloading test.opus");
	var oReq = new XMLHttpRequest();
	oReq.responseType = "arraybuffer";
	oReq.addEventListener("load", function() {
	    if (oReq.status===200) {
        	var arrayBuffer = oReq.response; // Note: not oReq.responseText

	        if (arrayBuffer) {       
        	    progressMessagePost("Copying opus file into emscripten memory disk"); 
	            FS.writeFile('test.opus', new Uint8Array(arrayBuffer), {encoding: 'binary'});
            
        	    progressMessagePost("Converting to wav");
	            var starttime = new Date().getTime();
        	    opustowav("test.opus","test.wav");
	            var duration = new Date().getTime()-starttime;
        	    progressMessagePost("Conversion time: "+(duration/1000)+"s");
	            console.log("Now create object url from wav");
            
        	    var blob = new Blob([FS.readFile("test.wav")], { type: "audio/wav" });
	            console.log("Posting back to page");
		    postMessage({status: "done", result: URL.createObjectURL(blob)});
        	}
    	}
	});
	oReq.open("GET", "test.opus");
	oReq.send();
};
