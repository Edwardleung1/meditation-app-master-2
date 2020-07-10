const app = () => {

    const song = document.querySelector('.song'); // select song
    const play = document.querySelector('.play'); // select play
    const outline = document.querySelector('.moving-outline circle'); // select outline
    const video = document.querySelector('.vid-container video');
    

    //sounds
    const sounds = document.querySelectorAll('.sound-picker button');

    //time display
    const timeDisplay = document.querySelector('.time-display');

    //get the length of the outline
    const outlineLength = outline.getTotalLength();

    //duration
    let fakeDuration = 600;

    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;


    //play sound
    play.addEventListener('click', () => {
        checkPlaying(song);
    });


    // create a function specific to stop and play the sounds
    const checkPlaying = song => {
        if(song.paused) { // if the song is paused then song will play
            song.play();
            video.play();
            play.src = './svg/pause.svg';
        } else {
            song.pause(); // if its playing then we can pause it
            video.pause();
            play.src = './svg/play.svg';
        }
    };


    //we can animate the circle in the middle
    song.ontimeupdate = () => {
        let currentTime = song.currentTime; // keeps updating when the song plays
    }


};

app();