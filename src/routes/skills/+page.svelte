<script lang="ts">
  import { onMount } from 'svelte';
  let crtMode = false;

  // Skills data
  const skillCategories = [
    {
      title: 'Languages',
      skills: ['Go', 'Python', 'JavaScript', 'TypeScript', 'SQL', 'Java', 'PHP'],
      blurbs: [
        'Go for building fast, concurrent backend services and APIs.',
        'Python for data analysis, machine learning, and backend development.',
        'JavaScript for dynamic web applications and full-stack development.',
        'TypeScript for type-safe, scalable JavaScript applications.',
        'SQL for database design, queries, and data management.',
        'Java for enterprise applications and Android development.',
        'PHP for web development and server-side scripting.'
      ]
    },
    {
      title: 'Libraries',
      skills: ['FastAPI', 'Gin', 'Svelte', 'Next.js', 'React', 'PyTorch', 'OpenCV'],
      blurbs: [
        'FastAPI for building high-performance Python APIs with automatic documentation.',
        'Gin for creating fast, minimalist web services in Go.',
        'Svelte for building reactive, performant user interfaces.',
        'Next.js for full-stack React applications with SSR and routing.',
        'React for building component-based user interfaces.',
        'PyTorch for deep learning and neural network development.',
        'OpenCV for computer vision and image processing tasks.'
      ]
    },
    {
      title: 'Tools',
      skills: ['AWS', 'GCP', 'Docker', 'Git', 'Snowflake', 'PostgreSQL'],
      blurbs: [
        'AWS for cloud infrastructure, serverless computing, and scalable deployments.',
        'Google Cloud Platform for cloud services, ML APIs, and data analytics.',
        'Docker for containerization and consistent deployment environments.',
        'Git for version control, collaboration, and code management.',
        'Snowflake for cloud data warehousing and analytics.',
        'PostgreSQL for relational database design and management.'
      ]
    }
  ];
  let selectedSkillIdx = [0, 0, 0];
  let selectedCategory = 0;

  function prevSkill(catIdx: number) {
    selectedSkillIdx[catIdx] = (selectedSkillIdx[catIdx] - 1 + skillCategories[catIdx].skills.length) % skillCategories[catIdx].skills.length;
    selectedSkillIdx = [...selectedSkillIdx];
  }
  function nextSkill(catIdx: number) {
    selectedSkillIdx[catIdx] = (selectedSkillIdx[catIdx] + 1) % skillCategories[catIdx].skills.length;
    selectedSkillIdx = [...selectedSkillIdx];
  }
  function selectCategory(idx: number) {
    selectedCategory = idx;
  }
  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'ArrowUp') {
      selectedCategory = (selectedCategory - 1 + skillCategories.length) % skillCategories.length;
      e.preventDefault();
    } else if (e.key === 'ArrowDown') {
      selectedCategory = (selectedCategory + 1) % skillCategories.length;
      e.preventDefault();
    } else if (e.key === 'ArrowLeft') {
      prevSkill(selectedCategory);
      e.preventDefault();
    } else if (e.key === 'ArrowRight') {
      nextSkill(selectedCategory);
      e.preventDefault();
    }
  }

  onMount(() => {
    if (typeof window !== 'undefined') {
      crtMode = localStorage.getItem('crtMode') === 'true';
      const handleStorageChange = (e: StorageEvent) => {
        if (e.key === 'crtMode') {
          crtMode = e.newValue === 'true';
        }
      };
      window.addEventListener('storage', handleStorageChange);
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.removeEventListener('storage', handleStorageChange);
        window.removeEventListener('keydown', handleKeyDown);
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
      <div class="projects-header">Skills</div>
      <div class="menu-bar">
        <div class="skills-container">
          <div class="skills-list">
            {#each skillCategories as cat, i}
              <div class="skills-row {selectedCategory === i ? 'selected' : ''}"
                tabindex="0"
                on:click={() => selectCategory(i)}
                aria-selected={selectedCategory === i}
              >
                <span class="skills-category">{cat.title}</span>
                <div class="skills-arrows">
                  <button class="arrow-btn" on:click={(e) => { e.stopPropagation(); prevSkill(i); }} aria-label="Previous {cat.title} skill">
                    <svg class="arrow-triangle" viewBox="0 0 16 16" width="18" height="18" aria-hidden="true"><polygon points="12,2 4,8 12,14" fill="#5ec3ff"/></svg>
                  </button>
                  <span class="skills-skill">{cat.skills[selectedSkillIdx[i]]}</span>
                  <button class="arrow-btn" on:click={(e) => { e.stopPropagation(); nextSkill(i); }} aria-label="Next {cat.title} skill">
                    <svg class="arrow-triangle" viewBox="0 0 16 16" width="18" height="18" aria-hidden="true"><polygon points="4,2 12,8 4,14" fill="#5ec3ff"/></svg>
                  </button>
                </div>
              </div>
            {/each}
          </div>
          <div class="skills-blurb"><span>{skillCategories[selectedCategory].blurbs[selectedSkillIdx[selectedCategory]]}</span></div>
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
  <div class="projects-bg">
    <video autoplay loop muted playsinline class="background-video">
      <source src="/menu_background.webm" type="video/webm" />
      Your browser does not support the video tag.
    </video>
    <div class="projects-header">Skills</div>
    <div class="menu-bar">
      <div class="skills-container">
        <div class="skills-list">
          {#each skillCategories as cat, i}
            <div class="skills-row {selectedCategory === i ? 'selected' : ''}"
              tabindex="0"
              on:click={() => selectCategory(i)}
              aria-selected={selectedCategory === i}
            >
              <span class="skills-category">{cat.title}</span>
              <div class="skills-arrows">
                <button class="arrow-btn" on:click={(e) => { e.stopPropagation(); prevSkill(i); }} aria-label="Previous {cat.title} skill">
                  <svg class="arrow-triangle" viewBox="0 0 16 16" width="18" height="18" aria-hidden="true"><polygon points="12,2 4,8 12,14" fill="#5ec3ff"/></svg>
                </button>
                <span class="skills-skill">{cat.skills[selectedSkillIdx[i]]}</span>
                <button class="arrow-btn" on:click={(e) => { e.stopPropagation(); nextSkill(i); }} aria-label="Next {cat.title} skill">
                  <svg class="arrow-triangle" viewBox="0 0 16 16" width="18" height="18" aria-hidden="true"><polygon points="4,2 12,8 4,14" fill="#5ec3ff"/></svg>
                </button>
              </div>
            </div>
          {/each}
        </div>
        <div class="skills-blurb"><span>{skillCategories[selectedCategory].blurbs[selectedSkillIdx[selectedCategory]]}</span></div>
      </div>
    </div>
    <div class="back-row">
      <div class="back-label interactive" tabindex="0" role="button" aria-label="Back" on:click={() => history.back()}>= BACK</div>
    </div>
  </div>
{/if}

<style>


body {
  min-height: 100vh;
  background: radial-gradient(ellipse at center, #222 60%, #111 100%) fixed, url('data:image/svg+xml;utf8,<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg"><rect width="100" height="100" fill="%23111111"/><circle cx="50" cy="50" r="40" fill="%23222222" fill-opacity="0.08"/></svg>');
  background-blend-mode: multiply;
  background-size: cover;
  background-repeat: repeat;
  overflow-x: hidden;
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
  .projects-header {
    font-size: 1.1rem;
    margin-top: 0.5rem;
    padding-left: 4vw;
    padding-right: 4vw;
    width: 100%;
    box-sizing: border-box;
  }
  .menu-bar,
  .level-select-row,
  .level-card,
  .level-img-wrapper,
  .level-title,
  .level-desc {
    box-sizing: border-box;
    min-height: 0;
    max-width: 100%;
  }

  .menu-bar {
    flex-direction: column;
    width: 100%;
    height: auto;
    min-height: 0;
    flex: none;
    padding: clamp(0.3rem, 1vh, 0.5rem) 0;
    overflow: hidden;
    overflow-y: hidden;
    justify-content: left;
  }

  .level-select-row {
    display: flex;
    flex-direction: row;
    gap: clamp(0.5rem, 2vw, 1rem);
    width: 100%;
    padding: 0;
    height: auto;
    overflow-x: auto;
    overflow-y: hidden;
    scroll-snap-type: x mandatory;
    margin-top: 0;
    align-items: stretch;
    justify-content: flex-start;
    box-sizing: border-box;
  }

  .level-card {
    width: clamp(200px, 80%, 300px);
    max-width: 30%;
    min-width: 0;
    height: 100%;
    margin: 0;
    scroll-snap-align: start;
    flex: 1 1 0;
    font-size: clamp(0.4rem, 1.5vh, 0.8rem);
    padding: clamp(0.2em, 1vh, 0.4em) clamp(0.3em, 1vh, 0.5em) clamp(0.3em, 1vh, 0.5em);
    display: flex;
    flex-direction: column;
    align-items: stretch;
    overflow: hidden;
    margin-top: 0.2em;
    margin-bottom: 0.2em;
    box-sizing: border-box;
  }
  
  .level-card:first-child {
    margin-left: clamp(0.5rem, 2vw, 1rem);
  }
  
  .level-card:last-child {
    margin-right: clamp(0.5rem, 2vw, 1rem);
  }

  .level-img-wrapper {
    width: 100%;
    aspect-ratio: 16 / 9;
    height: auto;
    min-height: 0;
    border-radius: clamp(0.3em, 1vh, 0.6em);
    overflow: hidden;
    margin-bottom: clamp(0.1em, 0.5vh, 0.3em);
    border: clamp(0.05em, 0.1vh, 0.15em) solid #5ec3ff44;
    background: #111;
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1 1 auto;
  }
  .level-img {
    width: 100%;
    height: auto;
    object-fit: cover;
    display: block;
  }
  .level-title {
    font-family: 'Xolonium', Arial, sans-serif;
    font-size: clamp(0.6em, 2vh, 0.8em);
    color: #5ec3ff;
    font-weight: bold;
    margin-bottom: clamp(0.05em, 0.3vh, 0.1em);
    text-shadow: 0 0 8px #5ec3ff88;
    flex: 1 1 auto;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .level-desc {
    display: none;
  }
  .back-row {
    gap: clamp(0.1rem, 1vw, 0.3rem);
    margin-top: clamp(0.2rem, 1vh, 0.5rem);
    padding-right: clamp(1rem, 4vw, 2rem);
    width: 100%;
    box-sizing: border-box;
  }
  .back-label, .select-label {
    font-size: clamp(0.6rem, 2vh, 0.9rem);
  }
  .select-label {
    display: none;
  }
}
.projects-bg {
  min-height: 100vh;
  background: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
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
.projects-header {
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
  padding-left: 4%;
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
  justify-content: flex-start;
  z-index: 1;
  margin: 0 auto;
  box-sizing: border-box;
  max-width: 100%;
  padding: 0 clamp(1rem, 3vw, 2rem);
  overflow: hidden;
}
.level-select-row {
  display: flex;
  flex-direction: row;
  gap: clamp(0.5rem, 2vw, 2rem);
  justify-content: left;
  align-items: stretch;
  height: 100%;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  overflow-x: hidden;
  margin: 0;
  padding: clamp(0.2rem, 0.5vw, 0.5rem) clamp(0.2rem, 0.5vw, 0.5rem);
  padding-left: 2rem;
}
.level-card {
  background: rgba(10, 20, 40, 0.95);
  border: clamp(1px, 0.3vh, 3px) solid #1976d2;
  border-radius: clamp(8px, 1.5vh, 18px);
  box-shadow: 0 0 24px #1976d288, 0 0 2px #fff8;
  width: calc(100% / 3);
  min-width: 0;
  max-width: none;
  height: 100%;
  max-height: none;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: clamp(0.3rem, 1vh, 0.7rem) clamp(0.5rem, 1.5vh, 1rem) clamp(0.5rem, 1.5vh, 1rem);
  position: relative;
  transition: box-shadow 0.2s, border-color 0.2s;
  flex: 1 1 0;
  margin: 0;
  overflow: hidden;
}
.level-card:hover {
  border-color: #5ec3ff;
  box-shadow: 0 0 32px #5ec3ffcc, 0 0 8px #fff8;
}
.level-img-wrapper {
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: clamp(4px, 1vh, 10px);
  overflow: hidden;
  margin-bottom: clamp(0.5rem, 1.5vh, 1.2rem);
  border: clamp(1px, 0.2vh, 2px) solid #5ec3ff44;
  background: #111;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 1;
  min-height: 0;
}
.level-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.level-title {
  font-family: 'Xolonium', Arial, sans-serif;
  font-size: clamp(0.8rem, 2.5vh, 1.5rem);
  color: #5ec3ff;
  font-weight: bold;
  margin-bottom: clamp(0.3rem, 1vh, 0.7rem);
  text-shadow: 0 0 8px #5ec3ff88;
  flex-shrink: 1;
  min-height: 0;
}
.level-desc {
  font-family: 'Xolonium', Arial, sans-serif;
  font-size: clamp(0.6rem, 1.8vh, 1.05rem);
  color: #5ec3ff;
  opacity: 0.85;
  margin-bottom: clamp(0.5rem, 1.5vh, 1.2rem);
  text-align: left;
  flex-shrink: 1;
  min-height: 0;
}
.arrow {
  background: none;
  border: none;
  padding: 0 clamp(0.1rem, 0.2vw, 0.2rem);
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 2;
  transition: filter 0.2s;
  height: 100%;
  flex-shrink: 0;
}
.arrow:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}
.arrow-svg {
  display: block;
  height: clamp(120px, 25vh, 320px);
  max-height: 90vh;
  width: auto;
  filter: drop-shadow(0 0 8px #5ec3ff88);
  transition: filter 0.2s;
}
.arrow:hover:not(:disabled) .arrow-svg {
  filter: drop-shadow(0 0 16px #5ec3ffcc);
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
}
@media (max-width: 700px) {
  .projects-bg {
    justify-content: center;
    padding-top: 0;
  }
  .projects-header {
    font-size: 2rem;
    margin-bottom: 0.15rem;
    padding-left: 2%;
  }
  .arrow {
    display: none;
  }
  .arrow.left, .arrow.right {
    margin-left: 0;
    margin-right: 0;
  }
  .menu-bar {
    margin-top: 0;
    max-width: 100%;
  }
  .level-select-row {
    gap: 1.2rem;
    padding: 0 0.5rem;
    overflow-x: auto;
  }
  .level-card {
    min-width: clamp(200px, 28%, 280px);
    max-width: 28%;
    width: clamp(200px, 80%, 280px);
    height: auto;
    margin: 0;
    margin-bottom: 0;
    scroll-snap-align: start;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
  }
  .level-title {
    font-size: clamp(0.5rem, 2vh, 0.7rem);
  }
  /* Make skill items smaller in CRT mode on mobile */
  .tv-frame .skills-row {
    font-size: 0.7rem;
    padding: 0.2rem 0.4rem;
    border-radius: 0.5rem;
  }
  .tv-frame .skills-category {
    font-size: 0.8em;
  }
  .tv-frame .skills-skill {
    min-width: 40px;
    font-size: 0.8em;
  }
  .tv-frame .arrow-btn {
    font-size: 0.8em;
    padding: 0.05em 0.2em;
    border-radius: 0.3em;
  }
  .tv-frame .skills-blurb {
    font-size: 0.8rem;
    padding: 0.8rem 1rem;
    margin-top: 1rem;
  }
}
.level-card.selected {
  border-color: #5ec3ff;
  box-shadow: 0 0 32px #5ec3ff, 0 0 8px #5ec3ffcc;
  outline: 2px solid #5ec3ff;
  outline-offset: 2px;
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
}
.back-label, .select-label {
  font-family: 'Xolonium', Arial, sans-serif;
  font-size: clamp(1rem, 3vh, 2rem);
  color: #5ec3ff;
  letter-spacing: 0.12em;
  text-shadow: 0 0 8px #5ec3ff88, 0 0 2px #fff8;
  text-transform: uppercase;
  outline: none;
  transition: color 0.2s;
  box-sizing: border-box;
}
.back-label {
  position: relative;
  z-index: 2;
  text-align: right;
  cursor: pointer;
}
.back-label:focus, .back-label:hover {
  color: #fff;
}
.select-label {
  display: block;
  font-family: 'Xolonium', Arial, sans-serif;
  font-size: 2rem;
  color: #5ec3ff;
  letter-spacing: 0.12em;
  text-shadow: 0 0 8px #5ec3ff88, 0 0 2px #fff8;
  text-transform: uppercase;
}
@media (max-width: 700px) {
  .back-row {
    gap: 0.5rem;
    margin-top: 1rem;
    padding-right: 2%;
  }
  .back-label, .select-label {
    font-size: 1.2rem;
  }
  .select-label {
    display: none;
  }
}
.crt-overlay {
  pointer-events: none;
  position: absolute;
  left: 0; top: 0; right: 0; bottom: 0;
  z-index: 5;
  border-radius: inherit;
  mix-blend-mode: lighten;
  /* Scanlines */
  background:
    repeating-linear-gradient(
      to bottom,
      rgba(0,0,0,0.13) 0px,
      rgba(0,0,0,0.13) 2px,
      transparent 3px,
      transparent 6px
    ),
    /* RGB subpixel pattern */
    repeating-linear-gradient(
      to right,
      rgba(255,0,0,0.07) 0px, rgba(255,0,0,0.07) 1px,
      rgba(0,255,0,0.07) 1px, rgba(0,255,0,0.07) 2px,
      rgba(0,0,255,0.07) 2px, rgba(0,0,255,0.07) 3px
    ),
    /* Vignette */
    radial-gradient(ellipse at center, rgba(0,0,0,0) 60%, rgba(0,0,0,0.22) 100%);
  animation: crt-flicker 1.2s infinite steps(2);
}
@keyframes crt-flicker {
  0% { opacity: 0.97; }
  50% { opacity: 1; }
  100% { opacity: 0.97; }
}
.arrow.left {
  margin-left: clamp(1rem, 6vw, 3rem);
}
.arrow.right {
  margin-right: clamp(1rem, 6vw, 3rem);
}
.skills-list {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
  align-items: stretch;
  justify-content: center;
  padding: 2.2rem 0.5rem 2.2rem 0.5rem;
  box-sizing: border-box;
}
.skills-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background: rgba(20, 30, 50, 0.7);
  border-radius: 1.2rem;
  border: 2px solid #1976d2;
  box-shadow: 0 0 8px #1976d288;
  padding: 0.7rem 1.5rem;
  font-family: 'Xolonium', Arial, sans-serif;
  font-size: 1.2rem;
  color: #5ec3ff;
  margin: 0 auto;
  box-sizing: border-box;
}
.skills-category {
  font-weight: bold;
  letter-spacing: 0.08em;
  color: #5ec3ff;
  text-shadow: 0 0 6px #5ec3ff44;
  font-size: 1.1em;
}
.skills-arrows {
  display: flex;
  align-items: center;
  gap: 1.2rem;
}
.skills-skill {
  min-width: 90px;
  text-align: center;
  font-size: 1.1em;
  color: #fff;
  text-shadow: 0 0 8px #5ec3ff88;
}
.arrow-btn {
  background: none;
  border: none;
  color: #5ec3ff;
  cursor: pointer;
  padding: 0.1em 0.3em;
  border-radius: 0.7em;
  transition: background 0.2s, color 0.2s;
  outline: none;
  box-shadow: none;
  display: flex;
  align-items: center;
  justify-content: center;
}
.arrow-btn:hover .arrow-triangle, .arrow-btn:focus .arrow-triangle {
  filter: drop-shadow(0 0 4px #5ec3ffcc);
  fill: #fff;
}
.arrow-triangle {
  display: block;
  width: 1.2em;
  height: 1.2em;
  transition: fill 0.2s, filter 0.2s;
}
@media (max-width: 700px) {
  .skills-list {
    gap: 0.5rem;
    padding: 1rem 0.2rem 1rem 0.2rem;
  }
  .skills-row {
    font-size: 0.9rem;
    padding: 0.4rem 0.7rem;
    border-radius: 0.7rem;
  }
  .skills-category {
    font-size: 1em;
  }
  .skills-skill {
    min-width: 60px;
    font-size: 1em;
  }
  .arrow-btn {
    font-size: 1em;
    padding: 0.1em 0.4em;
    border-radius: 0.5em;
  }
}
.skills-blurb {
  margin-top: 2.2rem;
  color: #5ec3ff;
  font-family: 'Xolonium', Arial, sans-serif;
  font-size: 1.4rem;
  text-align: left;
  width: 100%;
  max-width: 700px;
  min-height: 2.5em;
  background: rgba(10, 20, 40, 0.7);
  border-radius: 1.2rem;
  box-shadow: 0 0 8px #1976d288;
  padding: 1.2rem 1.5rem;
  box-sizing: border-box;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  margin-bottom: 0;
}
.skills-list {
  align-items: flex-start;
  justify-content: flex-start;
}
.skills-row.selected {
  border: 2.5px solid #5ec3ff;
  background: #0a223a;
  color: #fff;
  box-shadow: 0 0 12px #5ec3ffcc;
}
.skills-row.selected .skills-category {
  color: #fff;
  text-shadow: 0 0 8px #5ec3ffcc;
}
.skills-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  justify-content: space-between;
  height: 100%;
  padding-bottom: 1rem;
}
@media (max-width: 700px) {
  .skills-blurb {
    display: none;
  }
}
</style>

