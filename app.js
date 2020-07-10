const app = () => {

    const song = document.querySelector('.song'); // select song
    const play = document.querySelector('.play'); // select play
    const outline = document.querySelector('.moving-outline circle'); // select outline
    const video = document.querySelector('.vid-container video');
    

    //sounds
    const sounds = document.querySelectorAll('.sound-picker button');

    //time display
    const timeDisplay = document.querySelector('.time-display');
    const timeSelect = document.querySelectorAll('.time-select button');
    //get the length of the outline
    const outlineLength = outline.getTotalLength();

    //duration
    let fakeDuration = 600;

    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;

    //pick different sounds
    sounds.forEach(sound => {
        sound.addEventListener('click', function() {
            song.src = this.getAttribute('data-sound');
            video.src = this.getAttribute('data-video');
            checkPlaying(song);
        });
    });

    //play sound
    play.addEventListener('click', () => {
        checkPlaying(song);
    });

    // select sound 
    timeSelect.forEach(option => { 
        option.addEventListener('click', function() {
            fakeDuration = this.getAttribute('data-time');
            timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(fakeDuration % 60)}`;
        });
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
        let elapsed = fakeDuration - currentTime;
        let seconds = Math.floor(elapsed % 60); // when it gets to 60secs it resets
        let minutes = Math.floor(elapsed / 60);


        //animate the circle
        let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
        outline.style.strokeDashoffset = progress;
        // animate the text
        timeDisplay.textContent = `${minutes}:${seconds}`;

        if(currentTime >= fakeDuration) {
            song.pause();
            song.currentTime = 0;
            play.src = './svg/play.svg';
            video.pause();
        }
    };
};

app();