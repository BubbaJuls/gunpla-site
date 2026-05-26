var COMING_SOON_GRADES = ['HG', 'MG', 'PG'];

function initShopPage() {
  var grid = document.getElementById('product-grid');
  var countEl = document.getElementById('result-count');
  var searchInput = document.getElementById('shop-search');
  var sortSelect = document.getElementById('shop-sort');
  var gradeFilters = document.querySelectorAll('[data-grade-filter]');
  var params = new URLSearchParams(window.location.search);
  var query = (params.get('q') || '').toLowerCase();
  var grade = (params.get('grade') || 'all').toUpperCase();
  var category = params.get('category') || 'all';

  if (searchInput && query) searchInput.value = params.get('q');

  gradeFilters.forEach(function (btn) {
    var g = btn.getAttribute('data-grade-filter');
    if (g === 'all' && !params.get('grade')) btn.classList.add('active');
    else if (g === grade || g === category) btn.classList.add('active');
    btn.addEventListener('click', function () {
      var url = new URL(window.location.href);
      if (g === 'all') {
        url.searchParams.delete('grade');
        url.searchParams.delete('category');
      } else if (['HG', 'RG', 'MG', 'PG'].indexOf(g) >= 0) {
        url.searchParams.set('grade', g);
        url.searchParams.delete('category');
      } else {
        url.searchParams.set('category', g);
        url.searchParams.delete('grade');
      }
      window.location.href = url.toString();
    });
  });

  function getFiltered() {
    var q = (searchInput ? searchInput.value : query).toLowerCase().trim();
    var sort = sortSelect ? sortSelect.value : 'popular';
    var list = PRODUCTS.slice();

    if (grade && grade !== 'ALL') {
      list = list.filter(function (p) {
        return p.grade === grade;
      });
    } else if (category && category !== 'all') {
      list = list.filter(function (p) {
        return p.category === category;
      });
    }

    if (q) {
      list = list.filter(function (p) {
        return p.name.toLowerCase().indexOf(q) >= 0 || p.grade.toLowerCase().indexOf(q) >= 0;
      });
    }

    if (sort === 'price-asc') list.sort(function (a, b) { return a.price - b.price; });
    else if (sort === 'price-desc') list.sort(function (a, b) { return b.price - a.price; });
    else if (sort === 'rating') {
      list.sort(function (a, b) {
        return getProductRatingDisplay(b).average - getProductRatingDisplay(a).average;
      });
    }
    else list.sort(function (a, b) { return b.sold - a.sold; });

    return list;
  }

  function render() {
    var list = getFiltered();
    if (countEl) countEl.textContent = list.length + ' product' + (list.length === 1 ? '' : 's');
    if (!grid) return;
    if (list.length === 0) {
      if (COMING_SOON_GRADES.indexOf(grade) >= 0) {
        grid.innerHTML =
          '<div class="empty-state">' +
          '<h3>' + grade + ' kits coming soon</h3>' +
          '<p>We are preparing photos and listings for ' + grade + ' grade. Browse our Real Grade kits in the meantime.</p>' +
          '<a href="catalog.html?grade=RG" class="btn btn--primary">Shop RG Kits</a></div>';
      } else {
        grid.innerHTML =
          '<p class="empty-state">No kits found. Try a different search or filter.</p>';
      }
      return;
    }
    grid.innerHTML = list.map(function (p) {
      return productCardHTML(p);
    }).join('');
    bindAddToCartButtons(grid);
  }

  if (searchInput) {
    searchInput.addEventListener('input', render);
    var form = searchInput.closest('form');
    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var url = new URL(window.location.href);
        if (searchInput.value.trim()) url.searchParams.set('q', searchInput.value.trim());
        else url.searchParams.delete('q');
        window.history.replaceState({}, '', url);
        render();
      });
    }
  }
  if (sortSelect) sortSelect.addEventListener('change', render);
  render();
}
