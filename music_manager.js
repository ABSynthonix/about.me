const music = document.getElementById("MUSIC");
music.muted = true;
music.volume = 0.5;
const main_container = document.getElementById("MAIN");
let rot = 0;
const rotating_cube_1 = document.getElementById("RotatingBGCube1");
const rotating_cube_1_1 = document.getElementById("RotatingBGCube1-1");
const music_toggler = document.getElementById("MusicToggler");
const music_thumb = document.getElementById("MusicThumb");

let ctx, src, analyzer;

music_toggler.addEventListener("click", async () => {
    music.muted = !music.muted;
    MusicThumb.classList.toggle("active");

    if (music.paused) {
        await music.play().catch(err => console.log("Playback failed:", err));
    }

    if (!ctx) {
        ctx = new AudioContext();
        src = ctx.createMediaElementSource(music);
        analyzer = ctx.createAnalyser();

        src.connect(analyzer);
        analyzer.connect(ctx.destination);

        analyzer.fftSize = 256;
    }

    if (ctx.state === "suspended") {
        await ctx.resume();
    }
});

const dataArray = new Uint8Array(128);

function lerp(a, b, t) {
    return a + (b - a) * t;
}

function animate() {
    requestAnimationFrame(animate);

    if (analyzer) {
        analyzer.getByteFrequencyData(dataArray);

        let sum = 0;
        for (let i = 0; i < dataArray.length; i++) sum += dataArray[i];
        let avg = sum / dataArray.length;

        let t = avg / 255;
        
        rotating_cube_1.style.opacity = 0.1 + (t / 2);
        rotating_cube_1_1.style.opacity = 0.1 + t;

        rot = lerp(rot, rot + (avg/40), t);
        rotating_cube_1.style.transform = `translate(-50%, -50%) rotate(${rot}deg)`
        rotating_cube_1_1.style.transform = `translate(150%, 150%) rotate(-${rot}deg)`
    }
}

animate();
