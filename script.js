import audioDatabase from './audioDatabase.js';

const trackName = document.querySelector('.track-name');
const artistName = document.querySelector('.artist-name');
let artworkImage = document.getElementById('artwork-image');

//Select the buttons
const playBtn = document.querySelector('.play-btn');
const nextBtn = document.querySelector('.next-btn');
const previous = document.querySelector('.previous-btn');

//Select the whole time container of the track
const startTime = document.querySelector('.start-time');
const endTime = document.querySelector('.end-time');

//Select the current time of the track
const startMinutes = document.querySelector('.minutes');
const startSeconds = document.querySelector('.seconds');

//Select the duration of the track
const endMinutes = document.querySelector('.end-minutes');
const endSeconds = document.querySelector('.end-seconds');

//Bar
const bar = document.querySelector('.bar');

let currTime;

let audiofile = audioDatabase[Math.floor(Math.random() * audioDatabase.length)];
console.log(audiofile.audioName);

// var audio = new Audio('./Audio Files/Chill – sakura Hz (No Copyright Music) (128 kbps).mp3');
var audio = new Audio(audiofile.audioName);

//At first
trackName.innerHTML = audiofile.name;
artistName.innerHTML = audiofile.artist;
artworkImage.setAttribute("src", audiofile.artwork);


playBtn.addEventListener('click', togglePlay);

function playAudio() {
    audio.play();

    console.log(Math.floor(audio.currentTime));
    console.log(Math.floor(audio.duration));

    playBtn.innerHTML = `<i class="fas fa-pause"></i>`;

}

function pauseAudio() {
    audio.pause();

    playBtn.innerHTML = `<i class="fas fa-play"></i>`;
}

function showTime() {
    let totalSeconds = Math.floor(audio.currentTime);

    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;

    // startSeconds.innerHTML = seconds;
    startMinutes.innerHTML = minutes;

    if (seconds < 10) {
        startSeconds.innerHTML = "0" + seconds;
    }
    else {
        startSeconds.innerHTML = seconds;
    }

    if (audio.currentTime == audio.duration) {
        clearInterval(currTime);
    }

    console.log(totalSeconds);
}

function showDuration() {
    //Duration
    endMinutes.innerHTML = Math.floor(audio.duration / 60);
    endSeconds.innerHTML = Math.floor(audio.duration) % 60;

    if (Math.floor(audio.duration) % 60 < 10) {
        endSeconds.innerHTML = "0" + Math.floor(audio.duration) % 60;
    }
}

function displayArtwork() {
    artworkImage.setAttribute("src", audiofile.artwork);
}

let progress;

function togglePlay() {
    if (audio.paused) {
        playAudio();

        currTime = setInterval(showTime, 1000);

        trackName.innerHTML = audiofile.name;
        artistName.innerHTML = audiofile.artist;

        console.log('Audio is playing!');

        showDuration();
        displayArtwork();

        let j = Math.floor(audio.duration / 100);
        progress = setInterval(progressBar, j);

        
    //New line - need to be looked at
        // if (Math.floor(audio.currentTime) === Math.floor(audio.duration)) {   
        //     playBtn.innerHTML = `<i class="fas fa-pause"></i>`;
        // }

    }
    else {
        pauseAudio();

        clearInterval(currTime);

        console.log('Audio is paused :(');
    }
}


//Progress Bar
function progressBar() {
    bar.style.width = Math.floor(audio.currentTime * (100 / audio.duration)) + "%";
}

const progressContainer = document.querySelector('.progress-container');

//Set the progress of the track
progressContainer.addEventListener('click', setProgress);

function setProgress(event) {
    let widthOfBar = this.clientWidth;
    let setTime = event.offsetX;
    let duration = Math.floor(audio.duration);
    
    console.log(setTime);
    console.log(widthOfBar);
    console.log(duration);

    audio.currentTime = (setTime / widthOfBar) * duration;
}

