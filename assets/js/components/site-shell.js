import { SHVYA_CONFIG } from '../core/site-config.js';

const normalizePath = (value) => String(value || '').split('?')[0].split('#')[0].split('/').pop().toLowerCase() || 'index.html';

function decorateExistingNav(nav) {
  if (!nav) return null;
  nav.dataset.shvyaNav = 'true';
  return nav;
}

export function initSiteShell(root = document) {
  let nav = root.querySelector('[data-shvya-nav]');
  if (!nav) nav = decorateExistingNav(root.querySelector('nav.fixed, nav[role="navigation"], header nav'));
  if (!nav) return;

  const current = normalizePath(location.pathname);
  nav.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('http')) return;
    const active = normalizePath(href) === current;
    link.classList.toggle('is-active', active);
    if (active) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });

  const menuButton = nav.querySelector('[data-menu-toggle]') || nav.querySelector('#mobile-menu-btn');
  const menu = nav.querySelector('[data-mobile-menu]') || nav.querySelector('#mobile-menu');
  if (menuButton && menu && menuButton.dataset.shvyaShellBound !== 'true') {
    menuButton.dataset.shvyaShellBound = 'true';
    const setOpen = (open) => {
      menu.hidden = !open;
      menu.classList.toggle('hidden', !open);
      menuButton.setAttribute('aria-expanded', String(open));
      menuButton.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    };
    setOpen(false);
    menuButton.addEventListener('click', () => setOpen(menu.hidden));
    menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setOpen(false)));
    document.addEventListener('keydown', event => { if (event.key === 'Escape') setOpen(false); });
  }

  const sync = () => nav.classList.toggle('is-scrolled', window.scrollY > 8);
  sync();
  if (!nav.dataset.shvyaScrollBound) {
    nav.dataset.shvyaScrollBound = 'true';
    window.addEventListener('scroll', sync, { passive: true });
  }
}

export function buildNavigation(container) {
  if (!container) return;
  container.innerHTML = SHVYA_CONFIG.navigation.map(item =>
    `<a data-nav-key="${item.key}" href="${item.href}">${item.label}</a>`
  ).join('');
}
