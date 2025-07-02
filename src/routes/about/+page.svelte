<script lang="ts">
  import { onMount } from 'svelte';
  
  let crtMode = false;

  // About sections data
  const aboutSections = [
    {
      title: 'WHO I AM',
      content: `I'm a passionate software developer with a love for creating immersive digital experiences. 
My journey in technology began with a fascination for how code can bring ideas to life, 
and it has evolved into a career focused on building robust, user-centered applications.`
    },
    {
      title: 'MY APPROACH',
      content: `I believe in writing clean, maintainable code that not only solves problems but also 
creates delightful user experiences. Every project is an opportunity to learn, innovate, 
and push the boundaries of what's possible in web development.`
    },
    {
      title: 'TECHNOLOGY',
      content: `My expertise spans modern web technologies including React, Vue, Svelte, Node.js, 
and cloud platforms. I'm constantly exploring new frameworks and tools to stay 
at the forefront of web development.`
    },
    {
      title: 'BEYOND CODE',
      content: `When I'm not coding, you'll find me exploring new technologies, contributing to 
open-source projects, or sharing knowledge with the developer community. 
I believe in continuous learning and collaboration.`
    }
  ];

  let selectedSection = 0;
  let menuRefs: HTMLElement[] = [];

  function selectSection(idx: number) {
    selectedSection = idx;
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'ArrowUp') {
      selectedSection = (selectedSection - 1 + aboutSections.length) % aboutSections.length;
      menuRefs[selectedSection]?.focus();
      e.preventDefault();
    } else if (e.key === 'ArrowDown') {
      selectedSection = (selectedSection + 1) % aboutSections.length;
      menuRefs[selectedSection]?.focus();
      e.preventDefault();
    } else if (e.key === 'Enter' || e.key === ' ') {
      // Already selected on focus
      e.preventDefault();
    }
  }

  onMount(() => {
    // Read CRT mode from localStorage
    if (typeof window !== 'undefined') {
      crtMode = localStorage.getItem('crtMode') === 'true';
      
      // Listen for storage changes (in case user has multiple tabs)
      const handleStorageChange = (e: StorageEvent) => {
        if (e.key === 'crtMode') {
          crtMode = e.newValue === 'true';
        }
      };
      
      window.addEventListener('storage', handleStorageChange);
      
      return () => {
        window.removeEventListener('storage', handleStorageChange);
      };
    }
  });
</script>

{#if crtMode}
  <div class="crt-background">
    <div class="tv-frame">
      <div class="crt-overlay"></div>
      <video autoplay loop muted playsinline class="background-video">
        <source src="/menu_background.webm" type="video/webm" />
        Your browser does not support the video tag.
      </video>
      <div class="about-header">About</div>
      <div class="menu-bar advanced-menu">
        <div class="menu-vertical">
          <div class="menu-list">
            {#each aboutSections as section, idx}
              <div
                class="menu-item {selectedSection === idx ? 'selected' : ''}"
                bind:this={menuRefs[idx]}
                tabindex="0"
                role="button"
                aria-selected={selectedSection === idx}
                on:click={() => selectSection(idx)}
                on:keydown={handleKeyDown}
                >
                {section.title}
              </div>
            {/each}
          </div>
          <div class="menu-content">
            <div class="section-text">{aboutSections[selectedSection].content}</div>
          </div>
        </div>
        <div class="about-icon-area">
          <svg viewBox="0 0 120 120" aria-hidden="true" class="about-icon-svg" style="filter: drop-shadow(0 0 18px #5ec3ff88);">
            <defs>
              <radialGradient id="aboutIconGradient" cx="60" cy="60" r="54" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stop-color="#5ec3ff" stop-opacity="0.7" />
                <stop offset="70%" stop-color="#5ec3ff" stop-opacity="0.25" />
                <stop offset="100%" stop-color="#1976d2" stop-opacity="0.18" />
              </radialGradient>
              <linearGradient id="infoHighlight" x1="60" y1="30" x2="60" y2="90" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stop-color="#fff" stop-opacity="0.7" />
                <stop offset="100%" stop-color="#5ec3ff" stop-opacity="0.2" />
              </linearGradient>
            </defs>
            <circle cx="60" cy="60" r="54" stroke="#5ec3ff" stroke-width="8" fill="url(#aboutIconGradient)" />
            <text x="60" y="78" text-anchor="middle" font-size="64" fill="#5ec3ff" font-family="'Xolonium', Arial, sans-serif" style="filter: drop-shadow(0 0 8px #5ec3ffcc);">i</text>
          </svg>
        </div>
      </div>
      <div class="back-row">
        <div class="back-label interactive" tabindex="0" role="button" aria-label="Back" on:click={() => history.back()}>= BACK</div>
      </div>
      <div class="tv-stand"></div>
      <div class="tv-base"></div>
    </div>
  </div>
{:else}
  <div class="about-bg">
    <video autoplay loop muted playsinline class="background-video">
      <source src="/menu_background.webm" type="video/webm" />
      Your browser does not support the video tag.
    </video>
    <div class="about-header">About</div>
    <div class="menu-bar advanced-menu">
      <div class="menu-vertical">
        <div class="menu-list">
          {#each aboutSections as section, idx}
            <div
              class="menu-item {selectedSection === idx ? 'selected' : ''}"
              bind:this={menuRefs[idx]}
              tabindex="0"
              role="button"
              aria-selected={selectedSection === idx}
              on:click={() => selectSection(idx)}
              on:keydown={handleKeyDown}
              >
              {section.title}
            </div>
          {/each}
        </div>
        <div class="menu-content">
          <div class="section-text">{aboutSections[selectedSection].content}</div>
        </div>
      </div>
      <div class="about-icon-area">
        <svg viewBox="0 0 120 120" aria-hidden="true" class="about-icon-svg" style="filter: drop-shadow(0 0 18px #5ec3ff88);">
          <defs>
            <radialGradient id="aboutIconGradient" cx="60" cy="60" r="54" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stop-color="#5ec3ff" stop-opacity="0.7" />
              <stop offset="70%" stop-color="#5ec3ff" stop-opacity="0.25" />
              <stop offset="100%" stop-color="#1976d2" stop-opacity="0.18" />
            </radialGradient>
            <linearGradient id="infoHighlight" x1="60" y1="30" x2="60" y2="90" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stop-color="#fff" stop-opacity="0.7" />
              <stop offset="100%" stop-color="#5ec3ff" stop-opacity="0.2" />
            </linearGradient>
          </defs>
          <circle cx="60" cy="60" r="54" stroke="#5ec3ff" stroke-width="8" fill="url(#aboutIconGradient)" />
          <text x="60" y="78" text-anchor="middle" font-size="64" fill="#5ec3ff" font-family="'Xolonium', Arial, sans-serif" style="filter: drop-shadow(0 0 8px #5ec3ffcc);">i</text>
        </svg>
      </div>
    </div>
    <div class="back-row">
      <div class="back-label interactive" tabindex="0" role="button" aria-label="Back" on:click={() => history.back()}>= BACK</div>
    </div>
  </div>
{/if}

<style>
html, body {
  max-width: 100vw;
  overflow-x: hidden;
  overflow-y: hidden;
  min-height: 100vh;
  background: radial-gradient(ellipse at center, #222 60%, #111 100%) fixed, url('data:image/svg+xml;utf8,<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg"><rect width="100" height="100" fill="%23111111"/><circle cx="50" cy="50" r="40" fill="%23222222" fill-opacity="0.08"/></svg>');
  background-blend-mode: multiply;
  background-size: cover;
  background-repeat: repeat;
}

.crt-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: url('/CRT_bg.jpeg') 44% 54% no-repeat;
  background-size: 124%;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

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
  z-index: 2;
}

.tv-frame::before {
  content: '';
  pointer-events: none;
  position: absolute;
  left: 0; top: 0; right: 0; bottom: 0;
  border-radius: 2.8rem;
  background: linear-gradient(120deg, rgba(255,255,255,0.13) 10%, rgba(255,255,255,0.03) 60%, rgba(255,255,255,0.18) 100%);
  z-index: 2;
}

.tv-frame::after {
  content: '';
  pointer-events: none;
  position: absolute;
  left: 0; top: 0; right: 0; bottom: 0;
  border-radius: 2.7rem;
  background: repeating-linear-gradient(
    to bottom,
    rgba(255,255,255,0.03) 0px,
    rgba(255,255,255,0.03) 1px,
    transparent 2px,
    transparent 4px
  );
  z-index: 3;
  mix-blend-mode: lighten;
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

.about-bg {
  min-height: 100vh;
  background: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  max-width: 100vw;
  overflow: hidden;
}

.background-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
  pointer-events: none;
}

.about-header {
  position: relative;
  font-family: 'Xolonium', Arial, sans-serif;
  font-size: clamp(1.5rem, 8vw, 3.8rem);
  color: #5ec3ff;
  letter-spacing: 0.15em;
  z-index: 2;
  text-shadow: 0 0 8px #5ec3ff88, 0 0 2px #fff8;
  text-transform: uppercase;
  text-align: left;
  margin-top: clamp(0.5rem, 3vh, 2.5rem);
  margin-bottom: clamp(0.1rem, 1vh, 0.3rem);
  margin-left: 20%;
  padding-left: 0;
  width: 100%;
  box-sizing: border-box;
  flex-shrink: 0;
}

.menu-bar {
  width: 100%;
  height: 0;
  flex: 1;
  min-height: 0;
  background: rgba(10, 20, 40, 0.85);
  border-top: clamp(1px, 0.3vh, 3px) solid #1976d2;
  border-bottom: clamp(1px, 0.3vh, 3px) solid #1976d2;
  border-left: none;
  border-right: none;
  border-radius: 0;
  box-shadow: 0 0 32px #1976d288, 0 0 2px #fff8;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  z-index: 1;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

.about-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 800px;
  padding: clamp(1rem, 3vh, 2rem);
  box-sizing: border-box;
  z-index: 1;
}

.about-section {
  background: rgba(10, 20, 40, 0.85);
  border: clamp(1px, 0.3vh, 3px) solid #1976d2;
  border-radius: clamp(8px, 1.5vh, 18px);
  box-shadow: 0 0 24px #1976d288, 0 0 2px #fff8;
  padding: clamp(1rem, 3vh, 2rem);
  margin-bottom: clamp(1rem, 3vh, 2rem);
  width: 100%;
  box-sizing: border-box;
  transition: box-shadow 0.2s, border-color 0.2s;
}

.about-section:hover {
  border-color: #5ec3ff;
  box-shadow: 0 0 32px #5ec3ffcc, 0 0 8px #fff8;
}

.section-title {
  font-family: 'Xolonium', Arial, sans-serif;
  font-size: clamp(1rem, 3vh, 1.8rem);
  color: #5ec3ff;
  font-weight: bold;
  margin-bottom: clamp(0.5rem, 1.5vh, 1rem);
  text-shadow: 0 0 8px #5ec3ff88;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.section-text {
  font-family: 'Xolonium', Arial, sans-serif;
  font-size: clamp(0.8rem, 2vh, 1.2rem);
  color: #5ec3ff;
  opacity: 0.9;
  line-height: 1.6;
  text-align: left;
  margin: 0;
}

.back-row {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  gap: clamp(1rem, 3vw, 2rem);
  margin-top: clamp(0.5rem, 2vh, 1.5rem);
  box-sizing: border-box;
  flex-shrink: 0;
  padding-right: 4%;
}

.back-label {
  font-family: 'Xolonium', Arial, sans-serif;
  font-size: clamp(1rem, 3vh, 2rem);
  color: #5ec3ff;
  letter-spacing: 0.12em;
  text-shadow: 0 0 8px #5ec3ff88, 0 0 2px #fff8;
  text-transform: uppercase;
  outline: none;
  transition: color 0.2s;
  box-sizing: border-box;
  position: relative;
  z-index: 2;
  text-align: right;
  cursor: pointer;
}

.back-label:focus, .back-label:hover {
  color: #fff;
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
  
  .about-header {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
    padding-left: 4%;
  }
}

@media (max-width: 700px) {
  html, body {
    max-width: 100vw;
    overflow-x: hidden;
  }
  
  .crt-background {
    background: url('/CRT_bg.jpeg') 47.5% 55% no-repeat;
    background-size: 275%;
  }
  
  .tv-frame {
    width: 100vw;
    max-width: 100vw;
    min-width: 0;
    aspect-ratio: 4 / 3;
    border-width: 2vw;
    border-radius: 0.5rem;
    box-shadow: 0 0 24px 2px #00bfff33, 0 0 0 2vw #222b, 0 4px 16px #000c, 0 0 0 1px #222 inset;
  }
  
  .tv-frame::before {
    border-radius: 0.3rem;
  }
  
  .tv-frame::after {
    border-radius: 0.2rem;
  }
  
  .crt-overlay {
    border-radius: 0.3rem;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
  }
  
  .background-video {
    border-radius: 0.3rem;
    width: 100%;
    height: 100%;
    object-fit: cover;
    left: 0;
    top: 0;
  }
  
  .tv-stand {
    width: 60px;
    height: 10px;
    border-radius: 0 0 12px 12px / 0 0 6px 6px;
    top: 100%;
    left: 50%;
    transform: translate(-50%, 0);
  }
  
  .tv-base {
    width: 90px;
    height: 10px;
    border-radius: 0 0 18px 18px / 0 0 6px 6px;
    top: calc(100% + 8px);
    left: 50%;
    transform: translate(-50%, 0);
  }
  
  .tv-base::before {
    height: 2px;
    border-radius: 1px;
  }
  
  .about-header {
    font-size: 2rem;
    margin-left: 6vw;
  }
  
  .menu-bar {
    padding: clamp(0.5rem, 2vh, 1rem);
    max-width: 100%;
  }
  
  .about-section {
    padding: clamp(0.5rem, 2vh, 1rem);
    margin-bottom: clamp(0.5rem, 2vh, 1rem);
  }
  
  .section-title {
    font-size: clamp(0.8rem, 2.5vh, 1.2rem);
  }
  
  .section-text {
    font-size: clamp(0.6rem, 2vh, 0.9rem);
  }
  
  .back-row {
    gap: 0.5rem;
    margin-top: 1rem;
    padding-right: 2%;
  }
  
  .back-label {
    font-size: 1.2rem;
  }
  
  .menu-item {
    font-size: 0.9rem;
    padding: 0.25rem 0.5rem;
  }
  
  .menu-content,
  .section-text {
    font-size: 0.85rem;
    padding: 1rem 0 1rem 0;
  }
  
  .menu-vertical {
    height: 50%;
    padding-left: 0.5rem;
  }
  
  .about-icon-area {
    display: none;
  }
  
  .tv-frame .menu-bar,
  .tv-frame .advanced-menu {
    width: 100%;
    max-width: 100%;
    margin: 0;
    left: 0;
    right: 0;
    box-sizing: border-box;
  }
  
  .tv-frame .menu-vertical {
    padding-left: 0.2rem;
    padding-right: 0.2rem;
    max-width: 100%;
    width: 100%;
    box-sizing: border-box;
    max-height: 90vw;
    overflow-y: auto;
  }
  
  .tv-frame .menu-list,
  .tv-frame .menu-content {
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
  }
  
  .tv-frame .menu-item {
    font-size: 0.7rem;
    padding: 0.12rem 0.2rem;
  }
  
  .tv-frame .section-text {
    font-size: 0.7rem;
    padding: 0.5rem 0 0.5rem 0;
  }
  
  .about-bg .menu-item {
    font-size: 0.8rem;
    padding: 0.18rem 0.4rem;
  }
  
  .about-bg .menu-list {
    gap: 0.18rem;
  }
}

@media (max-width: 1000px) {
  .tv-frame {
    width: 98vw;
    max-width: 100vw;
    border-width: 6px;
    border-radius: 1.2rem;
  }
  
  .projects-header {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
    padding-left: 4%;
  }
  
  .about-icon-area {
    display: none !important;
  }
}

.advanced-menu {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  width: 100vw;
  max-width: 100vw;
  margin: 0;
  background: rgba(10, 20, 40, 0.85);
  box-shadow: 0 0 32px #1976d288, 0 0 2px #fff8;
  border-top: clamp(1px, 0.3vh, 3px) solid #1976d2;
  border-bottom: clamp(1px, 0.3vh, 3px) solid #1976d2;
  border-radius: 0;
  padding: 0;
  min-height: 320px;
  justify-content: flex-start;
}
.menu-vertical {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  max-width: 1000px;
  margin-left: 10%;
  padding: 0;
}
.menu-list {  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 100%;
  min-width: 0;
  max-width: 100%;
  margin-top: 0.7rem;
  gap: 0.3rem;
  background: none;
  box-shadow: none;
  border: none;
}
.menu-item {
  font-family: 'Xolonium', Arial, sans-serif;
  font-size: 1.35rem;
  color: #5ec3ff;
  background: rgba(20, 30, 50, 0.7);
  border: 2.5px solid #1976d2;
  border-radius: 1.5rem;
  padding: 0.45rem 1.2rem;
  margin: 0.1rem 0;
  cursor: pointer;
  outline: none;
  transition: background 0.2s, color 0.2s, border 0.2s;
  user-select: none;
  position: relative;
  width: 100%;
  min-width: 0;
  text-align: left;
  box-sizing: border-box;
}
.menu-item.selected, .menu-item:focus {
  background: #0a223a;
  color: #fff;
  border: 2.5px solid #5ec3ff;
  box-shadow: 0 0 8px #5ec3ff88;
}
.menu-item:active {
  background: #1976d2;
  color: #fff;
}
.menu-content {
  background: none;
  border-radius: 0;
  box-shadow: none;
  padding: 2rem 0 2rem 0;
  min-height: 120px;
  color: #5ec3ff;
  font-family: 'Xolonium', Arial, sans-serif;
  font-size: 1.1rem;
  margin-bottom: 0;
  margin-top: 0;
  white-space: pre-line;
  max-width: 100%;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: flex-start;
}

/* Non-CRT mode: make menu wider */
:global(.about-bg) .menu-vertical {
  max-width: 1000px;
}
:global(.about-bg) .menu-list {
  max-width: 100%;
}

.about-icon-area {
  flex: 1 1 0;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 120px;
  height: 100%;
  overflow: hidden;
  margin: auto;
}
.about-icon-svg {
  width: 80%;
  max-width: 240px;
  height: auto;
  max-height: 80vh;
  opacity: 0.8;
  margin: 0 auto;
}

body > :last-child {
  margin-bottom: 0 !important;
}

/* CRT mode containment for About page */
.tv-frame .menu-bar,
.tv-frame .advanced-menu,
.tv-frame .menu-vertical,
.tv-frame .about-icon-area {
  width: 100%;
  max-width: 100%;
  min-width: 0;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.tv-frame .menu-vertical {
  padding-left: 2rem;
}
</style> 