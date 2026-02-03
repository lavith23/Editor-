const uploader = document.getElementById('uploader');
const player = document.getElementById('player');

uploader.addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (file) {
    // Create a temporary URL for the uploaded file
    const url = URL.createObjectURL(file);
    
    // Set it to the player so the user can see a "Preview"
    player.src = url;
    console.log("File loaded for preview!");
  }
});

document.getElementById('export-btn').addEventListener('click', () => {
    alert("To export, you will need to integrate FFmpeg.wasm in the next step!");
});
