const themeButtons = document.querySelectorAll('.theme-toggle');
const savedTheme = localStorage.getItem('it-theme');
if (savedTheme) document.documentElement.dataset.theme = savedTheme;

function updateThemeButtons(){
  const dark = document.documentElement.dataset.theme === 'dark';
  themeButtons.forEach(btn => {
    btn.textContent = dark ? 'Light Mode' : 'Dark Mode';
    btn.setAttribute('aria-pressed', String(dark));
  });
}

updateThemeButtons();

themeButtons.forEach(btn => btn.addEventListener('click', () => {
  const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = next;
  localStorage.setItem('it-theme', next);
  updateThemeButtons();
}));

const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('#nav-menu');
if(menuToggle && navMenu){
  menuToggle.addEventListener('click',()=>{
    const open = navMenu.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(open));
  });
}

const heroTrack = document.querySelector('.hero-track');
const heroSlides = document.querySelectorAll('.hero-slide');
const heroPrev = document.querySelector('.hero-prev');
const heroNext = document.querySelector('.hero-next');
let heroIndex = 0;
let heroAutoTimer = null;
let heroResumeTimer = null;

function setHeroSlide(index){
  if(!heroTrack || heroSlides.length === 0) return;
  heroIndex = (index + heroSlides.length) % heroSlides.length;
  heroTrack.style.transform = `translateX(-${heroIndex * 100}%)`;
}

function startHeroAuto(){
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  clearInterval(heroAutoTimer);
  heroAutoTimer = setInterval(()=> setHeroSlide(heroIndex + 1), 10000);
}

function pauseHeroAuto(){
  clearInterval(heroAutoTimer);
  clearTimeout(heroResumeTimer);
  heroResumeTimer = setTimeout(startHeroAuto, 40000);
}

if(heroTrack && heroSlides.length){
  setHeroSlide(0);
  startHeroAuto();
  heroPrev?.addEventListener('click',()=>{ pauseHeroAuto(); setHeroSlide(heroIndex - 1); });
  heroNext?.addEventListener('click',()=>{ pauseHeroAuto(); setHeroSlide(heroIndex + 1); });
}
