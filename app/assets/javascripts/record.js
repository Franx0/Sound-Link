var container = document.getElementById('container');
var playRecord = document.getElementById('record_button');
var stopRecord = document.getElementById('stop_button');


var getUserMedia = (navigator.getUserMedia || 
                    navigator.webkitGetUserMedia || 
                    navigator.mozGetUserMedia || 
                    navigator.msGetUserMedia);

var userMediaCallback = function(stream){    
    console.log('entra en userMedia');
    if(window.IsChrome) stream = new window.MediaStream(stream.getAudioTracks());
        audioStream = stream;

        var player = new Audio(URL.createObjectURL(audioStream));
        player.controls = true;       
        container.appendChild(player);
        //player.muted = true;

        // "audio" is a default type
        recorder = winRecordRTC(stream, 
            {type: 'audio'
        });

    playRecord.addEventListener('click', function(){
        recorder.startRecording();
    });

    stopRecord.addEventListener('click', function(){
        recorder.stopRecording(function(audioURL){
            var player = new Audio(audioURL);
            player.controls = true;       
            container.appendChild(player);
            var recordedBlob = recorder.getBlob();
            recorder.getDataURL(function(dataURL) { });
        });
    });
};

function record() {
    console.log('entra en record');
    var audioConstraints = {audio:true, video:false};

    navigator.webkitGetUserMedia(audioConstraints, userMediaCallback, function(){alert('error!')});
};

$('document').ready(record);
