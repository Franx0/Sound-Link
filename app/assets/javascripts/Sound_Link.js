//Play all button
var button = document.getElementsByClassName('btn-play');
var button2 = document.getElementsByClassName('btn-pause');
var player = document.getElementsByClassName('player');

window.addEventListener('load', function(){
    for(var b=0; b<button.length; b++){

        button[b].addEventListener('click', playTracks.bind(this, b));
    };

});

function playTracks(b){
    for(var t=0; t<player.length; t++){
        if(button[b].id == player[t].id){
            player[t].play();
        };
    }; 
};



