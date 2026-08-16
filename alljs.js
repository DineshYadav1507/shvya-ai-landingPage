(() => {
  'use strict';

  const qs = (selector, root = document) => root.querySelector(selector);
  const qsa = (selector, root = document) => [...root.querySelectorAll(selector)];
  const normalize = (value) => String(value || '').trim().toLowerCase();

  function initMobileMenu() {
    const button = qs('#mobile-menu-btn');
    const menu = qs('#mobile-menu');
    if (!button || !menu || button.dataset.shvyaBound === 'true') return;
    button.dataset.shvyaBound = 'true';
    const setOpen = (open) => {
      menu.classList.toggle('hidden', !open);
      button.setAttribute('aria-expanded', String(open));
      button.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    };
    setOpen(false);
    button.addEventListener('click', () => setOpen(menu.classList.contains('hidden')));
    qsa('a', menu).forEach(link => link.addEventListener('click', () => setOpen(false)));
    document.addEventListener('keydown', event => { if (event.key === 'Escape') setOpen(false); });
  }

  function initLegacyProductFilter() {
    const section = qs('#enrollment-section');
    if (!section) return;
    const pills = qsa('.pill', section);
    const input = qs('#search-input');
    const cards = qsa('#product-cards .card-link');
    const empty = qs('#no-results');
    if (!cards.length) return;

    const apply = () => {
      const active = qs('.pill.active', section) || pills[0];
      const filter = normalize(active?.dataset.filter || 'all');
      const query = normalize(input?.value);
      let visible = 0;
      cards.forEach(card => {
        const tags = normalize(card.dataset.tags).split(/\s+/).filter(Boolean);
        const matchesFilter = filter === 'all' || tags.includes(filter);
        const matchesQuery = !query || normalize(card.textContent).includes(query);
        const show = matchesFilter && matchesQuery;
        card.hidden = !show;
        if (show) visible += 1;
      });
      if (empty) empty.hidden = visible > 0;
    };

    pills.forEach(pill => pill.addEventListener('click', () => {
      pills.forEach(item => {
        item.classList.toggle('active', item === pill);
        item.setAttribute('aria-pressed', String(item === pill));
      });
      apply();
    }));
    input?.addEventListener('input', apply);
    apply();
  }

  function initShvyaProductFilter() {
    const section = qs('#shv-section');
    if (!section) return;
    const pills = qsa('[data-shv-filter]', section).filter(el => el.tagName === 'BUTTON');
    const cards = qsa('#shv-product-cards .shv-card-link');
    const empty = qs('#shv-no-results');
    if (!pills.length || !cards.length) return;
    const apply = filter => {
      let visible = 0;
      cards.forEach(card => {
        const show = filter === 'all' || card.dataset.shvFilter === filter;
        card.hidden = !show;
        if (show) visible += 1;
      });
      if (empty) empty.hidden = visible > 0;
    };
    pills.forEach(pill => pill.addEventListener('click', () => {
      const filter = normalize(pill.dataset.shvFilter || 'all');
      pills.forEach(item => {
        item.classList.toggle('shv-pill--active', item === pill);
        item.setAttribute('aria-pressed', String(item === pill));
      });
      apply(filter);
    }));
    apply('all');
  }

  function initReveal() {
    const items = qsa('[data-reveal]');
    if (!items.length) return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      items.forEach(item => item.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: .12, rootMargin: '0px 0px -40px' });
    items.forEach(item => observer.observe(item));
  }

  function initHeaderState() {
    const header = qs('nav.fixed, [data-site-header]');
    if (!header) return;
    const sync = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
    sync();
    window.addEventListener('scroll', sync, { passive: true });
  }

  function initExpandableProblemCards() {
    qsa('#problem-gap .gap-card').forEach(card => {
      const details = qs('.details', card);
      const toggle = qs('.toggle-arrow', card);
      if (!details || !toggle || toggle.dataset.shvyaBound === 'true') return;
      toggle.dataset.shvyaBound = 'true';
      const setOpen = open => {
        card.classList.toggle('open', open);
        toggle.setAttribute('aria-expanded', String(open));
        details.setAttribute('aria-hidden', String(!open));
      };
      setOpen(false);
      toggle.addEventListener('click', event => { event.stopPropagation(); setOpen(!card.classList.contains('open')); });
      toggle.addEventListener('keydown', event => {
        if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); setOpen(!card.classList.contains('open')); }
      });
    });
  }

  function initAnalytics() {
    window.ShvyaAnalytics = window.ShvyaAnalytics || {
      track(name, payload = {}) {
        if (typeof window.gtag === 'function') window.gtag('event', name, payload);
        if (typeof window.fbq === 'function') window.fbq('trackCustom', name, payload);
      }
    };
    qsa('[data-track]').forEach(el => {
      if (el.dataset.shvyaTracked === 'true') return;
      el.dataset.shvyaTracked = 'true';
      el.addEventListener('click', () => window.ShvyaAnalytics.track(el.dataset.track, { location: el.dataset.trackLocation || 'site' }));
    });
  }

  function boot() {
    initMobileMenu();
    initLegacyProductFilter();
    initShvyaProductFilter();
    initReveal();
    initHeaderState();
    initExpandableProblemCards();
    initAnalytics();
    document.documentElement.dataset.shvyaReady = 'true';
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once: true });
  else boot();
})();