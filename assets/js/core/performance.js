export function initPerformance() {
  document.querySelectorAll('img').forEach((img, index) => {
    if (!img.hasAttribute('decoding')) img.decoding = 'async';
    if (index > 0 && !img.hasAttribute('loading')) img.loading = 'lazy';
  });

  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href') || '';
    if (/^(https?:\/\/|\/\/)/i.test(href) && link.hostname && link.hostname !== location.hostname) {
      link.target ||= '_blank';
      link.rel = `${link.rel ? `${link.rel} ` : ''}noopener noreferrer`;
    }
  });

  const heroImage = document.querySelector('section img, picture img');
  if (heroImage && heroImage.getAttribute('loading') === 'lazy') heroImage.removeAttribute('loading');
}
