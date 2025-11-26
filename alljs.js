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

        <!-- MOBILE FIXES (add just before </head>) -->
<style>
/* 1. Stop horizontal overflow caused by long words / URLs */
body{overflow-x:hidden;word-break:break-word}

/* 2. Make the policy card truly responsive */
.cookie-wrapper{
    width:95%;
    max-width:100%;
    padding:25px 18px;
    margin:auto;
    box-sizing:border-box;
}

/* 3. Shrink headings so they never stick out */
.cookie-wrapper h1{font-size:24px}
.cookie-wrapper h2{font-size:17px}

/* 4. Footer grid collapses to single column on small screens */
@media (max-width:640px){
    footer .md\:grid-cols-4{grid-template-columns:1fr}
}
</style>