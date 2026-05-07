let songs = [
    {
        title: "Electronic Vibe",
        artist: "SoundHelix",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
    },
    {
        title: "Acoustic Journey",
        artist: "SoundHelix",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
    },
    {
        title: "Deep Cinematic",
        artist: "SoundHelix",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
    }
];

let currentSongIndex = 0;
let isPlaying = false;
let isDraggingProgress = false;
let isRepeating = false;

const audioElement = document.getElementById('audio-element');
const visualizerContainer = document.getElementById('visualizer');
const trackTitle = document.getElementById('track-title');
const trackArtist = document.getElementById('track-artist');

const playPauseBtn = document.getElementById('btn-play-pause');
const prevBtn = document.getElementById('btn-prev');
const nextBtn = document.getElementById('btn-next');
const iconPlay = document.getElementById('icon-play');
const iconPause = document.getElementById('icon-pause');

const progressBar = document.getElementById('progress-bar');
const currentTimeEl = document.getElementById('current-time');
const durationTimeEl = document.getElementById('duration-time');
const volumeBar = document.getElementById('volume-bar');
const playlistList = document.getElementById('playlist-list');

const fileInput = document.getElementById('file-input');
const btnAddLocal = document.getElementById('btn-add-local');
const btnRepeat = document.getElementById('btn-repeat');

const colorList = ['#7d30fa', 'darkblue', 'blue', '#00ccff', 'green', 'lime', 'yellow', 'orange', 'red', 'darkred'];
for (let i = 1; i <= 10; i++) {
    const color = colorList[i - 1];
    const leftPos = (i - 1) * 9.5 + 4;
    const speed = (i + 200 + (Math.random() * 750) / 2) + 'ms';

    createPeak(i, color, leftPos, speed, 'p');
    createPeak(i, color, leftPos, speed, 's');
}

function createPeak(index, color, left, speed, type) {
    const peak = document.createElement('div');
    peak.className = `peak type-${type}`;
    peak.style.setProperty('--peak-color', color);
    peak.style.setProperty('--anim-speed', speed);
    peak.style.left = left + '%';
    visualizerContainer.appendChild(peak);
}

function formatTime(seconds) {
    if (isNaN(seconds)) return "0:00";
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec.toString().padStart(2, '0')}`;
}

function loadSong(index) {
    if (songs.length === 0) return;
    const song = songs[index];
    audioElement.src = song.src;
    trackTitle.textContent = song.title;
    trackArtist.textContent = song.artist;

    progressBar.value = 0;
    currentTimeEl.textContent = "0:00";
    durationTimeEl.textContent = "0:00";

    renderPlaylist();
}

function renderPlaylist() {
    playlistList.innerHTML = '';

    songs.forEach((song, index) => {
        const li = document.createElement('li');
        li.className = `playlist-item ${index === currentSongIndex ? 'active' : ''}`;

        li.addEventListener('click', () => {
            currentSongIndex = index;
            loadSong(currentSongIndex);
            playSong();
        });

        const infoDiv = document.createElement('div');
        infoDiv.className = 'playlist-item-info';

        const titleSpan = document.createElement('span');
        titleSpan.className = 'playlist-item-title';
        titleSpan.title = song.title;
        titleSpan.textContent = song.title;

        const artistSpan = document.createElement('span');
        artistSpan.className = 'playlist-item-artist';
        artistSpan.textContent = song.artist;

        infoDiv.appendChild(titleSpan);
        infoDiv.appendChild(artistSpan);
        li.appendChild(infoDiv);

        const removeBtn = document.createElement('button');
        removeBtn.className = 'btn-remove';
        removeBtn.title = 'Remover música';
        removeBtn.innerHTML = '<svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>';

        removeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            removeSong(index);
        });
        li.appendChild(removeBtn);

        playlistList.appendChild(li);
    });
}

function removeSong(indexToRemove) {
    songs.splice(indexToRemove, 1);

    if (songs.length === 0) {
        // Lista ficou vazia
        pauseSong();
        audioElement.src = '';
        trackTitle.textContent = 'Sem músicas';
        trackArtist.textContent = 'Adicione novas faixas';
        currentSongIndex = 0;
        progressBar.value = 0;
        currentTimeEl.textContent = "0:00";
        durationTimeEl.textContent = "0:00";
    } else {
        if (indexToRemove === currentSongIndex) {
            // Removeu a música que estava tocando
            if (currentSongIndex >= songs.length) {
                currentSongIndex = 0;
            }
            const wasPlaying = isPlaying;
            loadSong(currentSongIndex);
            if (wasPlaying) playSong();
        } else if (indexToRemove < currentSongIndex) {
            // Removeu uma música antes da atual (ajusta o índice)
            currentSongIndex--;
        }
    }
    renderPlaylist();
}

function playSong() {
    if (songs.length === 0) return;
    isPlaying = true;
    iconPlay.style.display = 'none';
    iconPause.style.display = 'block';
    visualizerContainer.classList.add('playing'); // Inicia a animação
    audioElement.play();
}

function pauseSong() {
    isPlaying = false;
    iconPlay.style.display = 'block';
    iconPause.style.display = 'none';
    visualizerContainer.classList.remove('playing'); // Pausa a animação
    audioElement.pause();
}

function togglePlay() {
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
}

function prevSong() {
    if (songs.length === 0) return;
    currentSongIndex--;
    if (currentSongIndex < 0) {
        currentSongIndex = songs.length - 1;
    }
    loadSong(currentSongIndex);
    if (isPlaying) playSong();
}

function nextSong() {
    if (songs.length === 0) return;
    currentSongIndex++;
    if (currentSongIndex > songs.length - 1) {
        currentSongIndex = 0;
    }
    loadSong(currentSongIndex);
    if (isPlaying) playSong();
}

btnAddLocal.addEventListener('click', () => {
    fileInput.click();
});

fileInput.addEventListener('change', (event) => {
    const files = event.target.files;
    if (files.length === 0) return;

    const isFirstLoad = songs.length === 0;

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const title = file.name.replace(/\.[^/.]+$/, "");
        const src = URL.createObjectURL(file);

        songs.push({
            title: title,
            artist: "Arquivo Local",
            src: src
        });
    }

    renderPlaylist();

    if (isFirstLoad) {
        currentSongIndex = 0;
        loadSong(currentSongIndex);
    }

    playlistList.scrollTop = playlistList.scrollHeight;

    fileInput.value = '';
});

playPauseBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

btnRepeat.addEventListener('click', () => {
    isRepeating = !isRepeating;
    btnRepeat.classList.toggle('active', isRepeating);
});

audioElement.addEventListener('timeupdate', () => {
    if (!isDraggingProgress && audioElement.duration) {
        const progressPercent = (audioElement.currentTime / audioElement.duration) * 100;
        progressBar.value = progressPercent;
        currentTimeEl.textContent = formatTime(audioElement.currentTime);
    }
});

audioElement.addEventListener('loadedmetadata', () => {
    durationTimeEl.textContent = formatTime(audioElement.duration);
});

progressBar.addEventListener('input', () => {
    isDraggingProgress = true;
    const seekTime = (progressBar.value / 100) * audioElement.duration;
    currentTimeEl.textContent = formatTime(seekTime);
});

progressBar.addEventListener('change', () => {
    const seekTime = (progressBar.value / 100) * audioElement.duration;
    audioElement.currentTime = seekTime;
    isDraggingProgress = false;
});

volumeBar.addEventListener('input', (e) => {
    const volumeValue = e.target.value;
    audioElement.volume = volumeValue / 100;
});

audioElement.addEventListener('ended', () => {
    if (isRepeating) {
        audioElement.currentTime = 0;
        playSong();
    } else {
        nextSong();
    }
});

audioElement.volume = volumeBar.value / 100;
loadSong(currentSongIndex);
