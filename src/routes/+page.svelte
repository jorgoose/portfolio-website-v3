<script lang="ts">
// Removed HaloRing3D import

const menuItems = [
  { label: 'ABOUT', link: '#about' },
  { label: 'PROJECTS', link: '/projects' },
  { label: 'SKILLS', link: '#skills' },
  { label: 'CONTACT', link: '#contact' },
  { label: 'RESUME', link: '#resume' }
];
</script>

<div class="halo-bg">
  <video autoplay loop muted playsinline class="background-video">
    <source src="/menu_background.webm" type="video/webm" />
    Your browser does not support the video tag.
  </video>
  <div class="title-sigil-container">
    <div class="sigil-container">
      <svg viewBox="0 0 1200 400" class="sigil-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="600" cy="200" r="220" stroke="#5ec3ff" stroke-width="4" opacity="0.5" />
        <circle cx="600" cy="200" r="160" stroke="#5ec3ff" stroke-width="2" opacity="0.3" />
        <circle cx="600" cy="200" r="80" stroke="#5ec3ff" stroke-width="1.5" opacity="0.2" />
        <g opacity="0.5">
          <line x1="600" y1="40" x2="600" y2="360" stroke="#5ec3ff" stroke-width="2" />
          <line x1="40" y1="200" x2="1160" y2="200" stroke="#5ec3ff" stroke-width="2" />
          <line x1="200" y1="100" x2="1000" y2="300" stroke="#5ec3ff" stroke-width="1.2" />
          <line x1="1000" y1="100" x2="200" y2="300" stroke="#5ec3ff" stroke-width="1.2" />
        </g>
        <g opacity="0.7">
          <ellipse cx="600" cy="200" rx="350" ry="90" stroke="#5ec3ff" stroke-width="1" />
          <ellipse cx="600" cy="200" rx="90" ry="180" stroke="#5ec3ff" stroke-width="1" />
        </g>
        <g opacity="0.25">
          <path d="M 80 200 Q 200 120 600 120 Q 1000 120 1120 200" stroke="#5ec3ff" stroke-width="2" fill="none" />
          <path d="M 80 200 Q 200 280 600 280 Q 1000 280 1120 200" stroke="#5ec3ff" stroke-width="2" fill="none" />
        </g>
        <g opacity="0.7">
          <rect x="60" y="180" width="40" height="40" rx="8" stroke="#5ec3ff" stroke-width="2" />
          <rect x="1100" y="180" width="40" height="40" rx="8" stroke="#5ec3ff" stroke-width="2" />
        </g>
        <circle cx="600" cy="200" r="12" fill="#5ec3ff" opacity="0.7" />
      </svg>
    </div>
    <h1 class="halo-title">LOGAN</h1>
  </div>
  <ul class="menu">
    {#each menuItems as item}
      <li><a href={item.link}>{item.label}</a></li>
    {/each}
  </ul>
</div>

<style>
.title-sigil-container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-bottom: 2rem;
}
.sigil-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  width: 90vw;
  max-width: 1200px;
  min-width: 320px;
  pointer-events: none;
  opacity: 0.5;
}
.sigil-svg {
  width: 100%;
  height: auto;
  filter: drop-shadow(0 0 32px #5ec3ff88) drop-shadow(0 0 8px #5ec3ff44);
}
.halo-title {
  font-size: 9vw;
  letter-spacing: 1rem;
  background: linear-gradient(
    to bottom,
    #FFFFFF 0%,
    #FFFFFF 50%,
    #1976D2 75%,
    #001A3D 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
  text-shadow: 
  0 2px 8px #001A3D66, 
  0 0 140px #FFFFFF;
  font-family: 'Halo', 'Halo Outline', sans-serif;
}
.menu {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 2;
}
.menu li a {
  font-size: 3.2rem;
  color: #5ec3ff;
  text-decoration: none;
  letter-spacing: 0.2rem;
  text-shadow: 0 0 10px #5ec3ff, 0 0 2px #fff;
  transition: color 0.2s, text-shadow 0.2s;
  font-family: 'Xolonium', Arial, sans-serif;
  text-align: center;
}
.menu li a:hover {
  color: #fff;
  text-shadow: 0 0 20px #fff, 0 0 10px #5ec3ff;
}
.halo-bg {
  min-height: 100vh;
  background: radial-gradient(ellipse at center, #222 0%, #111 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #b8d0ff;
  position: relative;
  overflow: hidden;
}
.background-video {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  z-index: 0;
  pointer-events: none;
}

@media (max-width: 600px) {
  .halo-title {
    font-size: 12vw;
  }
  .menu li a {
    font-size: 1.1rem;
  }
}
</style>
