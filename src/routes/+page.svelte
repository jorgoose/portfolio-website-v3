<script lang="ts">
let crtMode = false;
// Removed HaloRing3D import

const menuItems = [
  { label: 'ABOUT', link: '#about' },
  { label: 'PROJECTS', link: '/projects' },
  { label: 'SKILLS', link: '#skills' },
  { label: 'CONTACT', link: '#contact' },
  { label: 'RESUME', link: '#resume' }
];
</script>

<div class="crt-toggle-bar">
  <button class="crt-toggle" on:click={() => crtMode = !crtMode}>
    CRT Mode: {crtMode ? 'On' : 'Off'}
  </button>
</div>

{#if crtMode}
  <div class="tv-frame">
    <div class="crt-overlay"></div>
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
    <div class="tv-stand"></div>
    <div class="tv-base"></div>
  </div>
{:else}
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
{/if}

<style>
.crt-toggle-bar {
  width: 100vw;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 1rem 2rem 0.5rem 0;
  z-index: 100;
  position: relative;
}
.crt-toggle {
  background: #181818;
  color: #5ec3ff;
  border: 2px solid #5ec3ff;
  border-radius: 1.2em;
  font-size: 1.1rem;
  padding: 0.4em 1.2em;
  font-family: 'Xolonium', Arial, sans-serif;
  cursor: pointer;
  box-shadow: 0 0 8px #5ec3ff44;
  transition: background 0.2s, color 0.2s, border 0.2s;
}
.crt-toggle:hover {
  background: #5ec3ff;
  color: #181818;
  border: 2px solid #fff;
}
/* CRT TV styles (reuse from projects page) */
.tv-frame {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  aspect-ratio: 4 / 3;
  width: 90vw;
  max-width: 1200px;
  max-height: 90vh;
  background: linear-gradient(180deg, #23272b 0%, #18191a 100%);
  border: 24px solid #444b52;
  border-radius: 3.5rem;
  box-shadow:
    0 0 64px 8px #00bfff33,
    0 0 0 12px #222b,
    0 8px 32px #000c,
    0 0 0 2px #222 inset;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  box-sizing: border-box;
  z-index: 10;
}
.crt-overlay {
  pointer-events: none;
  position: absolute;
  left: 0; top: 0; right: 0; bottom: 0;
  z-index: 5;
  border-radius: inherit;
  mix-blend-mode: lighten;
  background:
    repeating-linear-gradient(
      to bottom,
      rgba(0,0,0,0.13) 0px,
      rgba(0,0,0,0.13) 2px,
      transparent 3px,
      transparent 6px
    ),
    repeating-linear-gradient(
      to right,
      rgba(255,0,0,0.07) 0px, rgba(255,0,0,0.07) 1px,
      rgba(0,255,0,0.07) 1px, rgba(0,255,0,0.07) 2px,
      rgba(0,0,255,0.07) 2px, rgba(0,0,255,0.07) 3px
    ),
    radial-gradient(ellipse at center, rgba(0,0,0,0) 60%, rgba(0,0,0,0.22) 100%);
  animation: crt-flicker 1.2s infinite steps(2);
}
@keyframes crt-flicker {
  0% { opacity: 0.97; }
  50% { opacity: 1; }
  100% { opacity: 0.97; }
}
.tv-stand {
  position: absolute;
  left: 50%;
  top: 100%;
  transform: translate(-50%, -10%);
  width: 180px;
  height: 32px;
  background: linear-gradient(180deg, #222 60%, #444 100%);
  border-radius: 0 0 48px 48px / 0 0 32px 32px;
  box-shadow: 0 8px 24px #000a;
  z-index: 1;
}
.tv-base {
  position: absolute;
  left: 50%;
  top: calc(100% + 18px);
  transform: translate(-50%, 0);
  width: 340px;
  height: 48px;
  background: linear-gradient(180deg, #222 60%, #444 100%);
  border-radius: 0 0 120px 120px / 0 0 48px 48px;
  box-shadow: 0 12px 32px #000b, 0 2px 0 #111 inset;
  z-index: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}
.tv-base::before {
  content: '';
  display: block;
  position: absolute;
  left: 10%;
  right: 10%;
  top: 30%;
  height: 8px;
  border-radius: 4px;
  background: repeating-linear-gradient(
    to right,
    #333 0 8px,
    #222 8px 16px
  );
  opacity: 0.7;
}
@media (max-width: 900px) {
  .tv-frame {
    width: 98vw;
    max-width: 100vw;
    border-width: 12px;
    border-radius: 2rem;
  }
  .tv-frame::before {
    border-radius: 1.6rem;
  }
  .tv-frame::after {
    border-radius: 1.5rem;
  }
  .tv-stand {
    width: 100px;
    height: 18px;
    border-radius: 0 0 32px 32px / 0 0 16px 16px;
  }
  .tv-base {
    width: 180px;
    height: 24px;
    border-radius: 0 0 60px 60px / 0 0 24px 24px;
  }
  .tv-base::before {
    height: 4px;
    border-radius: 2px;
  }
}
@media (max-width: 700px) {
  .tv-frame {
    width: 100vw;
    max-width: 100vw;
    border-width: 2vw;
    border-radius: 0.7rem;
    min-width: 0;
  }
  .tv-frame::before {
    border-radius: 0.5rem;
  }
  .tv-frame::after {
    border-radius: 0.4rem;
  }
  .tv-stand {
    width: 60px;
    height: 10px;
    border-radius: 0 0 12px 12px / 0 0 6px 6px;
  }
  .tv-base {
    width: 100px;
    height: 12px;
    border-radius: 0 0 24px 24px / 0 0 8px 8px;
  }
  .tv-base::before {
    height: 2px;
    border-radius: 1px;
  }
}
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
