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
// Text apply karne ka function
function applyText() {
    const textInput = document.getElementById('user-text').value;
    const overlay = document.getElementById('overlay-text');
    overlay.innerText = textInput;
    document.getElementById('status').innerText = "Text Added: " + textInput;
}

// Export logic mein FFmpeg ko command dena
document.getElementById('export-btn').onclick = async () => {
    const status = document.getElementById('status');
    const textValue = document.getElementById('user-text').value;

    try {
        if (!ffmpeg.isLoaded()) {
            status.innerText = "⏳ Engine Loading...";
            await ffmpeg.load();
        }

        const file = document.getElementById('uploader').files[0];
        if (!file) { alert("Please upload a file first!"); return; }

        status.innerText = "⚙️ Processing Video (Adding Text)...";

        // FFmpeg memory mein file save karna
        ffmpeg.FS('writeFile', 'input.mp4', await FFmpeg.fetchFile(file));

        // REAL EDITING COMMAND: Video par text "Burn" karna
        // Yeh command video ke beech mein white text dal degi
        await ffmpeg.run('-i', 'input.mp4', '-vf', `drawtext=text='${textValue}':x=50:y=50:fontsize=24:fontcolor=white`, 'output.mp4');

        // Final file ko download karwana
        const data = ffmpeg.FS('readFile', 'output.mp4');
        const url = URL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4' }));
        
        const link = document.createElement('a');
        link.href = url;
        link.download = 'edited_video.mp4';
        link.click();

        status.innerText = "✅ Done! Video Downloaded.";

    } catch (err) {
        console.error(err);
        status.innerText = "❌ Error: Browser security blocked processing.";
    }
};

