const INFO_DATA = {
    games: {
        id: "InfoSectionGames",
        title: "Games I Play",
        list: ["Geometry Dash", "Nullscape", "EToH"]
    },
    music: {
        id: "InfoSectionMusic",
        title: "Genres I Listen To",
        list: ["Witch House", "Breakcore", "Ambient", "J-Core" ]
    },
    code: {
        id: "InfoSectionCoding",
        title: "Languages I Code In",
        list: ["Luau", "Python", "Java", "C++"]
    }
}

const SOCIALS_DATA = {
    discord: {
        display: "Discord",
        source: "discord_logo.png",
        link: "https://discord.com/users/1463949201607233659"
    },
    github: {
        display: "GitHub",
        source: "github_logo.jpg",
        link: "https://github.com/ABSynthonix"
    },
    roblox: {
        display: "Roblox",
        source: "roblox_logo.jpg",
        link: "https://www.roblox.com/users/1559040093/profile"
    }
}

function createInfoCard(infoDict) {
    return `
        <div id="${infoDict.id}" class="InfoSectionDiv">
            <p><u><b>${infoDict.title}</b></u><br>- ${infoDict.list.join('<br>- ')}</p>
        </div>
    `
}

function createSocialCard(socialDict) {
    return `
        <a href="${socialDict.link}" target="_blank">
            <div class="SocialSectionDiv">
                <p><b>${socialDict.display}</b></p>
                <img src="${socialDict.source}" class="SocialIcon" style="background-color: #ffffff">
            </div>
        </a>
    `
}

function createPortfolioCard(projectsDict) {
    
}  

const infoSection = document.getElementById("InfoSection");
infoSection.innerHTML = Object.values(INFO_DATA)
    .map(info => createInfoCard(info))
    .join('');

const socialSection = document.getElementById("SocialSection");
socialSection.innerHTML = Object.values(SOCIALS_DATA)
    .map(social => createSocialCard(social))
    .join('');

const music = document.getElementById("music");
music.volume = 0.5;
const button = document.getElementById("MusicPlayer");
const name = document.getElementById("MusicName");
const status = document.getElementById("MusicStatus");

name.textContent = "DIgital Descendant, Key After Key\n> Won't you hear my Symphony? <";

let ctx, src, analyzer;

async function createCtx() {
    if (!ctx) {
        ctx = new AudioContext();
        src = ctx.createMediaElementSource(music);
        analyzer = ctx.createAnalyser();

        src.connect(analyzer);
        analyzer.connect(ctx.destination);

        analyzer.fftSize = 256;
    }

    if (ctx.state == "suspended") {
        await ctx.resume();
    }
}

function toggleMusic(invert) {
    if (music.paused && !invert) {
        music.play();
        status.textContent = "⏸";
    } else {
        music.pause();
        status.textContent = "▶";
    }

    createCtx();
}

const dataArray = new Uint8Array(128);

toggleMusic(true);

button.addEventListener('click', () => {
    toggleMusic();
});

const lerp = (start, end, t) => start + (end - start) * t;

function lerpColor(var1, var2, t) {
    const ft = Math.min(Math.max(t, 0), 1);
    return `color-mix(in srgb, var(${var1}), var(${var2}) ${ft * 100}%)`
}

const isMobile = window.matchMedia("(max-width: 768px)").matches;

let bgAngle = 0;
let loudnessSum = 0;
let lastTime = 0;
let prevAngle = 0;
let prevY = 0;
let angle = 2;
let speed = 1 / 1000;
function update(currentTime) {
    const dt = (currentTime - lastTime) / 1000;
    lastTime = currentTime;

    //------------
    let curAngle = 0;
    let curY = 0;
    if (!music.paused) {
        curAngle = angle * Math.sin(currentTime * speed);
        curY = Math.cos(currentTime * speed);
    }

    let newAngle = lerp(prevAngle, curAngle, 1 - Math.pow(0.1, dt));
    prevAngle = newAngle;
    let newY = lerp(prevY, curY, 1 - Math.pow(0.1, dt));
    prevY = newY;

    const X = isMobile ? -50 : 0;

    button.style.rotate = `${newAngle}deg`;
    button.style.transform = `translate(${X}%, ${newY}cqh)`
    //------------

    if (analyzer && !music.paused) {
        analyzer.getByteFrequencyData(dataArray)

        let loudnessSum = 0;
        for (let i = 0; i < dataArray.length; i++) loudnessSum += dataArray[i];
        let avg = loudnessSum / dataArray.length;
        bgAngle += avg;

        const finalBgAngle = (bgAngle / 1000) % 360;
        document.documentElement.style.setProperty('--bg-angle', `${finalBgAngle}deg`);

        let col1 = lerpColor('--background-color', '--div-background-color', 0.5 - 0.5 * Math.sin((bgAngle / 10000) + Math.PI/2))
        let col2 = lerpColor('--background-color', '--div-background-color', 0.5 + 0.5 * Math.sin((bgAngle / 10000) + Math.PI/2))
        document.documentElement.style.setProperty('background-image', `linear-gradient(var(--bg-angle, 0deg),${col1},${col2})`)
    }

    requestAnimationFrame(update);
}

requestAnimationFrame(update);