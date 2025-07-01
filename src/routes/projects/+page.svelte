<script lang="ts">
  import { onMount } from 'svelte';
  const projects = [
    { title: 'Project 1', image: 'https://picsum.photos/400/250?random=1', description: 'Description for Project 1.' },
    { title: 'Project 2', image: 'https://picsum.photos/400/250?random=2', description: 'Description for Project 2.' },
    { title: 'Project 3', image: 'https://picsum.photos/400/250?random=3', description: 'Description for Project 3.' },
    { title: 'Project 4', image: 'https://picsum.photos/400/250?random=4', description: 'Description for Project 4.' },
    { title: 'Project 5', image: 'https://picsum.photos/400/250?random=5', description: 'Description for Project 5.' },
    { title: 'Project 6', image: 'https://picsum.photos/400/250?random=6', description: 'Description for Project 6.' }
  ];
  let start = 0;
  const visibleCount = 3;
  function prev() {
    if (start > 0) start -= 1;
  }
  function next() {
    if (start + visibleCount < projects.length) start += 1;
  }
  $: visibleProjects = projects.slice(start, start + visibleCount);
</script>

<div class="projects-bg">
  <video autoplay loop muted playsinline class="background-video">
    <source src="/menu_background.webm" type="video/webm" />
    Your browser does not support the video tag.
  </video>
  <div class="projects-header">Projects</div>
  <div class="menu-bar">
    <button class="arrow left" on:click={prev} aria-label="Previous Projects" disabled={start === 0}>
      <svg viewBox="0 0 32 120" class="arrow-svg" xmlns="http://www.w3.org/2000/svg">
        <polygon points="32,0 13,60 32,120" fill="#5ec3ff"/>
        <polygon points="30,6 17,60 30,114" fill="#1976d2"/>
      </svg>
    </button>
    <div class="level-select-row">
      {#each visibleProjects as project}
        <div class="level-card">
          <div class="level-img-wrapper">
            <img src={project.image} alt={project.title} class="level-img" />
          </div>
          <div class="level-title">{project.title}</div>
          <div class="level-desc">{project.description}</div>
        </div>
      {/each}
    </div>
    <button class="arrow right" on:click={next} aria-label="Next Projects" disabled={start + visibleCount >= projects.length}>
      <svg viewBox="0 0 32 120" class="arrow-svg" xmlns="http://www.w3.org/2000/svg">
        <polygon points="0,0 19,60 0,120" fill="#5ec3ff"/>
        <polygon points="2,6 15,60 2,114" fill="#1976d2"/>
      </svg>
    </button>
  </div>
</div>

<style>
.projects-bg {
  min-height: 100vh;
  background: transparent;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  position: relative;
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
.projects-header {
  position: absolute;
  left: 17vw;
  top: 7vh;
  font-family: 'Xolonium', Arial, sans-serif;
  font-size: 3.8rem;
  color: #5ec3ff;
  letter-spacing: 0.15em;
  z-index: 2;
  text-shadow: 0 0 8px #5ec3ff88, 0 0 2px #fff8;
  text-transform: uppercase;
}
.menu-bar {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100vw;
  height: 75vh;
  background: rgba(10, 20, 40, 0.85);
  border-top: 3px solid #1976d2;
  border-bottom: 3px solid #1976d2;
  border-left: none;
  border-right: none;
  border-radius: 0;
  box-shadow: 0 0 32px #1976d288, 0 0 2px #fff8;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  z-index: 1;
  padding: 2.5vw 0;
}
.level-select-row {
  display: flex;
  flex-direction: row;
  gap: 2vw;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.level-card {
  background: rgba(10, 20, 40, 0.95);
  border: 3px solid #1976d2;
  border-radius: 18px;
  box-shadow: 0 0 24px #1976d288, 0 0 2px #fff8;
  width: 480px;
  height: calc(100% - 2.5rem);
  max-height: none;
  min-height: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.7rem 1rem 1rem 1rem;
  position: relative;
  transition: box-shadow 0.2s, border-color 0.2s;
}
.level-card:hover {
  border-color: #5ec3ff;
  box-shadow: 0 0 32px #5ec3ffcc, 0 0 8px #fff8;
}
.level-img-wrapper {
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 1.2rem;
  border: 2px solid #5ec3ff44;
  background: #111;
  display: flex;
  align-items: center;
  justify-content: center;
}
.level-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.level-title {
  font-family: 'Xolonium', Arial, sans-serif;
  font-size: 1.5rem;
  color: #5ec3ff;
  font-weight: bold;
  margin-bottom: 0.7rem;
  text-shadow: 0 0 8px #5ec3ff88;
}
.level-desc {
  font-family: 'Xolonium', Arial, sans-serif;
  font-size: 1.05rem;
  color: #5ec3ff;
  opacity: 0.85;
  margin-bottom: 1.2rem;
  text-align: left;
}
.arrow {
  background: none;
  border: none;
  padding: 0;
  margin: 0 2vw;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 2;
  transition: filter 0.2s;
  height: 100%;
}
.arrow:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}
.arrow-svg {
  display: block;
  height: 50vh;
  max-height: 50%;
  width: auto;
  filter: drop-shadow(0 0 8px #5ec3ff88);
  transition: filter 0.2s;
}
.arrow:hover:not(:disabled) .arrow-svg {
  filter: drop-shadow(0 0 16px #5ec3ffcc);
}
@media (max-width: 1000px) {
  .menu-bar {
    flex-direction: column;
    width: 100vw;
    height: auto;
    min-height: 0;
    padding: 4vw 0 4vw 0;
  }
  .level-select-row {
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    height: auto;
  }
  .level-card {
    width: 98vw;
    min-width: 0;
    max-width: 98vw;
  }
  .arrow {
    margin: 2vw 0;
    height: 60px;
  }
  .arrow-svg {
    height: 60px;
    max-height: 60px;
  }
  .projects-header {
    top: 4vw;
    left: 4vw;
    font-size: 1.5rem;
  }
}
</style>
