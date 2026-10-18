async function getDiscordPFP() {
    const userId = "1463949201607233659";

    try {
        const response = await fetch(`https://api.lanyard.rest/v1/users/${userId}`);
        const data = await response.json();

        const img = document.getElementById("pfp");
        img.crossOrigin = "anonymous";

        const avatarHash = data.data.discord_user.avatar;

        const PFPUrl = `https://cdn.discordapp.com/avatars/${userId}/${avatarHash}.png?size=256`;

        img.src = PFPUrl;
    } catch (error) {
        console.error("Couldn't load Discord PFP: ", error);
    }
}

function applyColorsFromImage(imageElement) {
    const colorThief = new ColorThief();

    const colors = 2;

    const palette = colorThief.getPalette(imageElement, colors);

    const dominant = `rgb(${palette[0].join(',')})`;
    const accent = `rgba(${palette[colors - 1].join(',')}, 0.7)`;

    document.documentElement.style.setProperty('--background-color', dominant);
    document.documentElement.style.setProperty('--div-background-color', accent);
}

getDiscordPFP();