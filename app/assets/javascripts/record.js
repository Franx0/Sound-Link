var container = document.getElementById('container');
var playRecord = document.getElementById('record_button');
var stopRecord = document.getElementById('stop_button');
var saveRecord = document.getElementById('submit');

var getUserMedia = (navigator.getUserMedia || 
                    navigator.webkitGetUserMedia || 
                    navigator.mozGetUserMedia || 
                    navigator.msGetUserMedia);

var userMediaCallback = function(stream){    
    
    if(window.IsChrome) stream = new window.MediaStream(stream.getAudioTracks());
        audioStream = stream;

        //var player = new Audio(URL.createObjectURL(audioStream));
        //player.controls = true;       
        //container.appendChild(player);
        //player.muted = true;

        // "audio" is a default type
        recorder = window.RecordRTC(stream, {bufferSize: 16384},
            {type: 'audio'
        });

    playRecord.addEventListener('click', function(){
        playRecord.className = ('hidden button');
        stopRecord.className = ('button');
        recorder.startRecording();
    });

    stopRecord.addEventListener('click', function(){
        recorder.stopRecording(function(audioURL){

            playRecord.className = ('button');
            stopRecord.className = ('hidden button')

            var player = new Audio(audioURL);
            player.controls = true;       
            container.appendChild(player);

            var recordedBlob = recorder.getBlob();
            recorder.getDataURL(function(dataURL) { });

            var name = document.createElement('input');
            var trackName = name.value;
            //.appendChild(name);
            name.setAttribute('name', trackName);

            


            //<input id="track_name" name="track[name]" type="text">

        });
    });
};

function record() {
    
    var audioConstraints = {audio:true, video:false};

    navigator.webkitGetUserMedia(audioConstraints, userMediaCallback, function(){alert('error!')});
};

$('document').ready(record);

//Save records with paperclip
$("#submit").on("click", function() {
    
    var anchor = document.createElement('anchor');
    anchor.setAttribute('data-method', 'delete');

    var data = new FormData();

    data.append("track[audio]", recorder.getBlob(), (new Date()).getTime() + ".webm");

    var oReq = new XMLHttpRequest();
    oReq.open("POST", "./tracks");
    oReq.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'));
    oReq.send(data);
    oReq.onload = function(oEvent) {
        if (oReq.status == 200) {
            console.log("Uploaded");
        } else {
            console.log("Error " + oReq.status + " occurred uploading your file.");
        }
    };
});

/*
var workerPath = 'https://cdn.webrtc-experiment.com/ffmpeg_asm.js';

    function processInWebWorker() {
        var blob = URL.createObjectURL(new Blob(['importScripts("' + workerPath + '");var now = Date.now;function print(text) {postMessage({"type" : "stdout","data" : text});};onmessage = function(event) {var message = event.data;if (message.type === "command") {var Module = {print: print,printErr: print,files: message.files || [],arguments: message.arguments || [],TOTAL_MEMORY: message.TOTAL_MEMORY || false};postMessage({"type" : "start","data" : Module.arguments.join(" ")});postMessage({"type" : "stdout","data" : "Received command: " +Module.arguments.join(" ") +((Module.TOTAL_MEMORY) ? ".  Processing with " + Module.TOTAL_MEMORY + " bits." : "")});var time = now();var result = ffmpeg_run(Module);var totalTime = now() - time;postMessage({"type" : "stdout","data" : "Finished processing (took " + totalTime + "ms)"});postMessage({"type" : "done","data" : result,"time" : totalTime});}};postMessage({"type" : "ready"});'], {
            type: 'application/javascript'
        }));

        var worker = new Worker(blob);
        URL.revokeObjectURL(blob);
        return worker;
    }

    var worker;

    function convertStreams(audioBlob) {
        var aab;
        var buffersReady;
        var workerReady;
        var posted;

        var fileReader = new FileReader();
        fileReader.onload = function() {
            aab = this.result;
            postMessage();
        };
        fileReader.readAsArrayBuffer(audioBlob);

        if (!worker) {
            worker = processInWebWorker();
        }

        worker.onmessage = function(event) {
            var message = event.data;
            if (message.type == "ready") {
                log('<a href="'+ workerPath +'" download="ffmpeg-asm.js">ffmpeg-asm.js</a> file has been loaded.');

                workerReady = true;
                if (buffersReady)
                    postMessage();
            } else if (message.type == "stdout") {
                log(message.data);
            } else if (message.type == "start") {
                log('<a href="'+ workerPath +'" download="ffmpeg-asm.js">ffmpeg-asm.js</a> file received ffmpeg command.');
            } else if (message.type == "done") {
                log(JSON.stringify(message));

                var result = message.data[0];
                log(JSON.stringify(result));

                var blob = new Blob([result.data], {
                                type: 'audio/ogg'
                });

                log(JSON.stringify(blob));

                PostBlob(blob);
            }
        };
        var postMessage = function() {
            posted = true;

            worker.postMessage({
                type: 'command',
                arguments: [
                    '-i', 'audio.wav', 
                    '-c:a', 'vorbis', 
                    '-b:a', '4800k', 
                    '-strict', 'experimental', 'output.mp4'
                ],
                files: [
                    {
                        data: new Uint8Array(aab),
                        name: "audio.wav"
                    }
                ]
            });
        };
    }

    function PostBlob(blob) {
        var audio = document.createElement('audio');
        audio.controls = true;
                    
        var source = document.createElement('source');
        source.src = URL.createObjectURL(blob);
        source.type = 'audio/ogg; codecs=vorbis';
        audio.appendChild(source);
                    
        audio.download = 'Converted Audio.ogg';

        inner.appendChild(document.createElement('hr'));
        var h2 = document.createElement('h2');
        h2.innerHTML = '<a href="' + audio.src + '" target="_blank" download="Converted Audio.ogg">Converted Ogg:</a>';
        inner.appendChild(h2);
        inner.appendChild(audio);

        audio.tabIndex = 0;
        audio.focus();

        document.querySelector('#record-audio').disabled = false;
    }

    var logsPreview = document.getElementById('logs-preview');

    function log(message) {
        var li = document.createElement('li');
        li.innerHTML = message;
        logsPreview.appendChild(li);

        li.tabIndex = 0;
        li.focus();
    }
*/
