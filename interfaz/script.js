document.addEventListener('DOMContentLoaded', () => {
    const playBtn = document.querySelector('.main-play');
    const heroPlay = document.querySelector('.play-btn-lg');
    let isPlaying = false;

    // Alternar Play/Pause
    const togglePlayback = () => {
        isPlaying = !isPlaying;
        const mainIcon = isPlaying ? 'fa-circle-pause' : 'fa-circle-play';
        const heroIcon = isPlaying ? 'fa-pause' : 'fa-play';
        
        playBtn.className = `fa-solid ${mainIcon} main-play`;
        heroPlay.innerHTML = `<i class="fa-solid ${heroIcon}"></i>`;
    };

    playBtn.addEventListener('click', togglePlayback);
    heroPlay.addEventListener('click', togglePlayback);

    // Selección de canción
    const rows = document.querySelectorAll('.track-row');
    rows.forEach(row => {
        row.addEventListener('click', () => {
            rows.forEach(r => r.classList.remove('active'));
            row.classList.add('active');
        });
    });
});