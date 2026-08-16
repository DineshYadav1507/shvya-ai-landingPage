import { SHVYA_CONFIG } from '../core/site-config.js';

const normalizePath = (value) => String(value || '').split('?')[0].split('#')[0].split('/').pop().toLowerCase();

export function initSiteShell(root = document) {
  const nav = root.querySelector('[data-shvya-nav]');
  if (!nav) return;

  const current = normalizePath(location.pathname || 'index.html');
  nav.querySelectorAll('[data-nav-key]').forEach(link => {
    const active = normalizePath(link.getAttribute('href')) === current;
    link.classList.toggle('is-active', active);
    link.setAttribute('aria-current', active ? 'page' : 'false');
  });

  const menuButton = nav.querySelector('[data-menu-toggle]');
  const menu = nav.querySelector('[data-mobile-menu]');
  if (!menuButton || !menu || menuButton.dataset.bound === 'true') return;
  menuButton.dataset.bound = 'true';

  const setOpen = (open) => {
    menu.hidden = !open;
    menuButton.setAttribute('aria-expanded', String(open));
  };
  setOpen(false);
  menuButton.addEventListener('click', () => setOpen(menu.hidden));
  menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setOpen(false)));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') setOpen(false);
  });

  window.addEventListener('scroll', () => {
    nav.classList.toggle('is-scrolled', window.scrollY > 8);
  }, { passive: true });
}

export function buildNavigation(container) {
  if (!container) return;
  container.innerHTML = SHVYA_CONFIG.navigation.map(item =>
    `<a data-nav-key="${item.key}" href="${item.href}">${item.label}</a>`
  ).join('');
}
