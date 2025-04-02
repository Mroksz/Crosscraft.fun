const SERVER_IP = '38.97.61.76:19241';
const DISCORD_CLIENT_ID = '1353590179264200755';
const DISCORD_REDIRECT_URI = encodeURIComponent('https://crosscraft.com/');
const DISCORD_SCOPE = encodeURIComponent('identify email');


function createSnowflakes() {
    const container = document.getElementById('snowflakes-container');
    const flakes = 75;
    
    for (let i = 0; i < flakes; i++) {
        const flake = document.createElement('div');
        flake.className = 'snowflake';
        
        flake.style.width = `${Math.random() * 8 + 2}px`;
        flake.style.height = flake.style.width;
        flake.style.left = `${Math.random() * 100}vw`;
        flake.style.opacity = Math.random();
        flake.style.animationDuration = `${Math.random() * 10 + 5}s`;
        flake.style.animationDelay = `${Math.random() * 5}s`;
        
        container.appendChild(flake);
    }
}


function setupCopyButton() {
    const btn = document.querySelector('.copy-btn');
    const tooltip = document.querySelector('.tooltip-text');
    
    btn.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(SERVER_IP);
            tooltip.textContent = '¡Copiado!';
            setTimeout(() => tooltip.textContent = 'Copiar IP', 2000);
        } catch (err) {
            tooltip.textContent = 'Error al copiar';
            setTimeout(() => tooltip.textContent = 'Copiar IP', 2000);
        }
    });
}


function setupDiscordAuth() {
    const loginBtn = document.getElementById('discord-login-btn');
    
    loginBtn.addEventListener('click', () => {
        window.location.href = `https://discord.com/oauth2/authorize?client_id=1353590179264200755&response_type=code&redirect_uri=Https%3A%2F%2Fcrosscraft.fun&scope=identify+guilds.join+email+guilds+rpc+guilds.members.read+gdm.join+connections`;
    });
}


async function checkAuth() {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    
    if (!code) return;
    
    try {
        const response = await fetch('/auth', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code, redirect_uri: decodeURIComponent(DISCORD_REDIRECT_URI) })
        });
        
        const { access_token } = await response.json();
        if (!access_token) throw new Error('No token received');
        
        const userRes = await fetch('https://discord.com/api/users/@me', {
            headers: { 'Authorization': `Bearer ${access_token}` }
        });
        
        const user = await userRes.json();
        displayUser(user);
    } catch (error) {
        console.error('Auth error:', error);
    }
}


function displayUser(user) {
    const loginSection = document.getElementById('discord-login-info');
    const avatar = document.getElementById('discord-avatar');
    const username = document.getElementById('discord-username');
    const loginBtn = document.getElementById('discord-login-btn');
    
    avatar.src = user.avatar 
        ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=128`
        : 'https://cdn.discordapp.com/embed/avatars/0.png';
    
    username.textContent = `${user.username}#${user.discriminator}`;
    loginSection.style.display = 'flex';
    loginBtn.textContent = 'Sesión iniciada';
    loginBtn.disabled = true;
}


document.addEventListener('DOMContentLoaded', () => {
    createSnowflakes();
    setupCopyButton();
    setupDiscordAuth();
    checkAuth();
});