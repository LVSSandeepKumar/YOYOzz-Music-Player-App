let songIndex = 0;
let audioElement = new Audio( "./songs/1.mp3" );
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let songItems = Array.from(document.getElementsByClassName("songItem"));
let songItemPlay = Array.from(document.getElementsByClassName("songItemPlay"));
let timeStamp = Array.from(document.getElementsByClassName("timeStamp"));
let coverImage = document.getElementById('coverImage');

let songs = [
    {songName:"Lungi Dance", songPath:"./songs/1.mp3", coverPath:"./covers/1.jpg"},
    {songName:"Desi Kalakaar", songPath:"./songs/2.mp3", coverPath:"./covers/2.jpg"},
    {songName:"Urvashi", songPath:"./songs/3.mp3", coverPath:"./covers/3.jpg"},
    {songName:"Love Dose", songPath:"./songs/4.mp3", coverPath:"./covers/4.jpg"},
    {songName:"Blue Eyes", songPath:"./songs/5.mp3", coverPath:"./covers/5.jpg"},
    {songName:"Party All Night", songPath:"./songs/6.mp3", coverPath:"./covers/6.jpg"},
     {songName:"Dheere Dheere", songPath:"./songs/7.mp3", coverPath:"./covers/7.jpg"},
    {songName:"Chhote Peg", songPath:"./songs/8.mp3", coverPath:"./covers/8.jpg"},
    {songName:"Loca", songPath:"./songs/9.mp3", coverPath:"./covers/9.jpg"}
]

songItems.forEach((element, i) => {
    element.getElementsByClassName("songName")[0].innerText=songs[i].songName;
})

function songPlaying() {
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    gif.style.opacity=1;
}

function songPaused() {
    masterPlay.classList.remove('fa-circle-pause');
    masterPlay.classList.add('fa-circle-play')
    gif.style.opacity=0;
}

function pauseIcon() {
    songItemPlay[songIndex-1].classList.remove('fa-circle-play');
    songItemPlay[songIndex-1].classList.add('fa-circle-pause');
}

function playIcon() {
    songItemPlay[songIndex-1].classList.remove('fa-circle-pause');
    songItemPlay[songIndex-1].classList.add('fa-circle-play');
}

masterPlay.addEventListener('click', () => {
    if(audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        songPlaying();
        pauseIcon();
    }
    else {
        audioElement.pause();
        songPaused();
        playIcon();
    }
})

audioElement.addEventListener('timeupdate', () => {
    progress = parseInt((audioElement.currentTime/audioElement.duration) * 100);
    myProgressBar.value=progress;
})

audioElement.addEventListener('ended', ()=> {
    songIndex+=1;
    audioElement.src=`./songs/${songIndex}.mp3`;
    audioElement.play();
    songPlaying();
    songItemPlay[songIndex-1].classList.remove('fa-circle-play');
    songItemPlay[songIndex-1].classList.add('fa-circle-pause');
    songItemPlay[songIndex].classList.remove('fa-circle-pause');
    songItemPlay[songIndex].classList.add('fa-circle-play');
    document.getElementById('masterSongName').innerText=songs[songIndex-1].songName;
})

myProgressBar.addEventListener('change',() => {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
} )

const makeAllPlays = () => {
    songItemPlay.forEach((element) => {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}

songItemPlay.forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        document.getElementById("masterSongName").innerText=songs[songIndex-1].songName;
        audioElement.src=`./songs/${songIndex}.mp3`;
        coverImage.src=`./covers/${songIndex}.jpg`;
        if (audioElement.paused || audioElement.currentTime <=0) {
            audioElement.play();
            pauseIcon();
        } else {
            audioElement.pause();
            playIcon();
        }
        songPlaying();
    })
})

document.getElementById('next').addEventListener('click', ()=> {
    if(songIndex>9) {
        songIndex=1;
    }
    else {
        songIndex += 1;
    }
    audioElement.src=`./songs/${songIndex}.mp3`;
    document.getElementById("masterSongName").innerText=songs[songIndex-1].songName;
    audioElement.currentTime=0;
    audioElement.play();
    songPlaying();
    coverImage.src=`./covers/${songIndex}.jpg`;
    makeAllPlays();
    pauseIcon();
})

document.getElementById('previous').addEventListener('click', ()=> {
    if(songIndex<1) {
        songIndex=9;
    }
    else {
        songIndex-=1;
    }
    audioElement.src=`./songs/${songIndex}.mp3`;
    document.getElementById("masterSongName").innerText=songs[songIndex-1].songName;
    audioElement.currentTime=0;
    audioElement.play();
    songPlaying();
    coverImage.src=`./covers/${songIndex}.jpg`;
    makeAllPlays();
    pauseIcon();
})

document.getElementById('forward').addEventListener('click', ()=> {
    audioElement.currentTime+=5;
})

document.getElementById('backward').addEventListener('click', ()=> {
    audioElement.currentTime-=5;
})

document.addEventListener('keydown', (event)=> {
    makeSound(event.code);
})

const makeSound = (code) => {
    switch(code) {
        case "Space" :
            if(audioElement.paused || audioElement.duration === 0) {
                audioElement.play();
                songPlaying();
                pauseIcon();
            }
            else {
                audioElement.pause();
                songPaused();
                playIcon();
            }
            break;
        case "ArrowUp" :
            audioElement.volume+=0.1;
            break;
        case "ArrowDown" :
            audioElement.volume-=0.1;
            break;
        case "ArrowRight" :
            audioElement.currentTime+=5;
            break;
        case "ArrowLeft" :
            audioElement.currentTime-=5;
            break;
    }
}

