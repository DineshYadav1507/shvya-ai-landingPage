// Simple filtering + search behavior for the section
(function(){
  const pills = Array.from(document.querySelectorAll('#enrollment-section .pill'));
  const searchInput = document.getElementById('search-input');
  const cards = Array.from(document.querySelectorAll('#product-cards .card-link'));
  const noResults = document.getElementById('no-results');

  function normalize(s){ return (s||'').toString().toLowerCase().trim(); }

  function applyFilter(){
    const active = document.querySelector('#enrollment-section .pill.active');
    const filter = active ? active.dataset.filter : 'all';
    const q = normalize(searchInput.value);
    let visible = 0;
    cards.forEach(link => {
      const tags = normalize(link.dataset.tags || '');
      const text = normalize(link.innerText || link.textContent);
      const matchesFilter = filter === 'all' || tags.split(/\s+/).includes(filter);
      const matchesSearch = !q || text.includes(q);
      const show = matchesFilter && matchesSearch;
      link.style.display = show ? 'block' : 'none';
      if(show) visible++;
    });
    noResults.style.display = visible ? 'none' : 'block';
  }

  // pill click behavior
  pills.forEach(p => p.addEventListener('click', () => {
    pills.forEach(x => { x.classList.remove('active'); x.setAttribute('aria-pressed','false'); });
    p.classList.add('active');
    p.setAttribute('aria-pressed','true');
    applyFilter();
  }));

  // search input
  searchInput.addEventListener('input', applyFilter);

  // initial
  applyFilter();
})();
// index 1 js 

 tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        'shvya-navy': '#1a1d29',
                        'shvya-blue': '#0066ff',
                        'shvya-orange': '#ff6b35',
                        'shvya-charcoal': '#2d3748',
                        'shvya-green': '#10b981'
                    },
                    fontFamily: {
                        'inter': ['Inter', 'sans-serif'],
                        'mono': ['JetBrains Mono', 'monospace']
                    }
                }
            }
        }