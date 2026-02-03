// 1. Page Navigation Logic
const startBtn = document.getElementById('start-btn');
const homePage = document.getElementById('home-page');
const editorPage = document.getElementById('editor-page');

startBtn.addEventListener('click', () => {
    homePage.classList.add('hidden');
    editorPage.classList.remove('hidden');
});

// 2. Preview Logic
const uploader = document.getElementById('uploader');
const player = document.getElementById('player');

uploader.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const url = URL.createObjectURL(file);
        player.src = url;
        document.getElementById('status').innerText = "File loaded: " + file.name;
    }
});

// 3. FFmpeg Export Logic
const { createFFmpeg, fetchFile } = FFmpeg;
const ffmpeg = createFFmpeg({ log: true });

document.getElementById('export-btn').addEventListener('click', async () => {
    const status = document.getElementById('status');
    
    if (!ffmpeg.isLoaded()) {
        status.innerText = "⏳ Loading engine (First time takes longer)...";
        await ffmpeg.load();
    }
    
    status.innerText = "✅ Engine Ready! Processing...";
    // Video processing code goes here
});
