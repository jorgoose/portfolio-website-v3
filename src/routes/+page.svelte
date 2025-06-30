<script>
// You can add interactivity here later if needed
const menuItems = [
  { label: 'ABOUT', link: '#about' },
  { label: 'PROJECTS', link: '#projects' },
  { label: 'SKILLS', link: '#skills' },
  { label: 'CONTACT', link: '#contact' },
  { label: 'RESUME', link: '#resume' }
];
</script>

<div class="halo-bg">
  <h1 class="halo-title">HALO</h1>
  <ul class="menu">
    {#each menuItems as item}
      <li><a href={item.link}>{item.label}</a></li>
    {/each}
  </ul>
</div>

<style>
.halo-bg {
  min-height: 100vh;
  background: radial-gradient(ellipse at center, #222 0%, #111 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #b8d0ff;
}
.halo-title {
  font-size: 6rem;
  letter-spacing: 1rem;
  color: #e0eaff;
  text-shadow: 0 0 40px #5ec3ff, 0 0 10px #fff, 0 0 2px #5ec3ff;
  margin-bottom: 2rem;
  font-family: 'Halo', 'Halo Outline', sans-serif;
}
.menu {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}
.menu li a {
  font-size: 2rem;
  color: #5ec3ff;
  text-decoration: none;
  letter-spacing: 0.2rem;
  text-shadow: 0 0 10px #5ec3ff, 0 0 2px #fff;
  transition: color 0.2s, text-shadow 0.2s;
  font-family: 'Segoe UI', Arial, sans-serif;
}
.menu li a:hover {
  color: #fff;
  text-shadow: 0 0 20px #fff, 0 0 10px #5ec3ff;
}
</style>
