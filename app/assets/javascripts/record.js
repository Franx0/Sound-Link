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

            //
            convertStreams(record.getBlob());

            //
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
