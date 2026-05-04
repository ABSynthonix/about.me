const INFO_DATA = {
    games: {
        id: "InfoSectionGames",
        title: "Games I Play",
        list: ["Sol's RNG", "Nullscape", "Geometry Dash", "Overall Roblox"]
    },
    music: {
        id: "InfoSectionMusic",
        title: "Genres I Listen To",
        list: ["J-Core", "Artcore", "Ambient", "Breakcore"]
    },
    code: {
        id: "InfoSectionCoding",
        title: "Languages I Code In",
        list: ["Luau", "Java", "Python", "HTML & CSS"]
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

const infoSection = document.getElementById("InfoSection");
infoSection.innerHTML = Object.values(INFO_DATA)
    .map(info => createInfoCard(info))
    .join('');

const socialSection = document.getElementById("SocialSection");
socialSection.innerHTML = Object.values(SOCIALS_DATA)
    .map(social => createSocialCard(social))
    .join('');