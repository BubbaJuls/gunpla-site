var CATALOG_PAGE_SIZE = 12;

function initShopPage() {
  var grid = document.getElementById('product-grid');
  var countEl = document.getElementById('result-count');
  var paginationEl = document.getElementById('catalog-pagination');
  var searchInput = document.getElementById('shop-search');
  var sortSelect = document.getElementById('shop-sort');
  var gradeFilters = document.querySelectorAll('[data-grade-filter]');
  var params = new URLSearchParams(window.location.search);
  var query = (params.get('q') || '').toLowerCase();
  var grade = (params.get('grade') || 'all').toUpperCase();
  var category = params.get('category') || 'all';
  var currentPage = parseInt(params.get('page') || '1', 10);
  if (isNaN(currentPage) || currentPage < 1) currentPage = 1;

  if (searchInput && query) searchInput.value = params.get('q');

  var headerSearch = document.querySelector('#site-header .search__input');
  if (headerSearch && params.get('q')) headerSearch.value = params.get('q');

  if (searchInput && typeof initSearchAutocomplete === 'function') {
    initSearchAutocomplete(searchInput, {
      onSelect: function (product) {
        window.location.href = productDetailUrl(product);
      },
    });
  }

  gradeFilters.forEach(function (btn) {
    var g = btn.getAttribute('data-grade-filter');
    if (g === 'all' && !params.get('grade')) btn.classList.add('active');
    else if (g === grade || g === category) btn.classList.add('active');
    btn.addEventListener('click', function () {
      var url = new URL(window.location.href);
      url.searchParams.delete('page');
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

  function syncPageInUrl(page) {
    var url = new URL(window.location.href);
    if (page <= 1) url.searchParams.delete('page');
    else url.searchParams.set('page', String(page));
    window.history.replaceState({}, '', url);
  }

  function goToPage(page, scroll) {
    currentPage = page;
    syncPageInUrl(page);
    render(false);
    if (scroll && grid) {
      grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

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
    } else list.sort(function (a, b) { return b.sold - a.sold; });

    return list;
  }

  function renderPagination(totalPages) {
    if (!paginationEl) return;
    if (totalPages <= 1) {
      paginationEl.hidden = true;
      paginationEl.innerHTML = '';
      return;
    }

    paginationEl.hidden = false;
    var html =
      '<button type="button" class="pagination__btn pagination__prev"' +
      (currentPage <= 1 ? ' disabled' : '') +
      ' aria-label="Previous page">Previous</button>' +
      '<div class="pagination__pages" role="group" aria-label="Page numbers">';

    for (var p = 1; p <= totalPages; p++) {
      html +=
        '<button type="button" class="pagination__page' +
        (p === currentPage ? ' pagination__page--active' : '') +
        '" data-page="' +
        p +
        '"' +
        (p === currentPage ? ' aria-current="page"' : '') +
        '>' +
        p +
        '</button>';
    }

    html +=
      '</div>' +
      '<button type="button" class="pagination__btn pagination__next"' +
      (currentPage >= totalPages ? ' disabled' : '') +
      ' aria-label="Next page">Next</button>';

    paginationEl.innerHTML = html;

    paginationEl.querySelector('.pagination__prev').addEventListener('click', function () {
      if (currentPage > 1) goToPage(currentPage - 1, true);
    });
    paginationEl.querySelector('.pagination__next').addEventListener('click', function () {
      if (currentPage < totalPages) goToPage(currentPage + 1, true);
    });
    paginationEl.querySelectorAll('.pagination__page').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var page = parseInt(btn.getAttribute('data-page'), 10);
        if (page !== currentPage) goToPage(page, true);
      });
    });
  }

  function render(resetPage) {
    if (resetPage) {
      currentPage = 1;
      syncPageInUrl(1);
    }

    var list = getFiltered();
    var totalPages = Math.max(1, Math.ceil(list.length / CATALOG_PAGE_SIZE));

    if (currentPage > totalPages) {
      currentPage = totalPages;
      syncPageInUrl(currentPage);
    }

    if (countEl) {
      if (list.length === 0) {
        countEl.textContent = '0 products';
      } else {
        var start = (currentPage - 1) * CATALOG_PAGE_SIZE + 1;
        var end = Math.min(currentPage * CATALOG_PAGE_SIZE, list.length);
        countEl.textContent =
          'Showing ' + start + '–' + end + ' of ' + list.length + ' products';
      }
    }

    if (!grid) return;

    if (list.length === 0) {
      grid.innerHTML =
        '<p class="empty-state">No kits found. Try a different search or filter.</p>';
      renderPagination(0);
      return;
    }

    var startIdx = (currentPage - 1) * CATALOG_PAGE_SIZE;
    var pageItems = list.slice(startIdx, startIdx + CATALOG_PAGE_SIZE);

    grid.innerHTML = pageItems
      .map(function (p) {
        return productCardHTML(p);
      })
      .join('');
    bindAddToCartButtons(grid);
    renderPagination(totalPages);
  }

  if (searchInput) {
    searchInput.addEventListener('input', function () {
      render(true);
    });
    var form = searchInput.closest('form');
    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var url = new URL(window.location.href);
        url.searchParams.delete('page');
        if (searchInput.value.trim()) url.searchParams.set('q', searchInput.value.trim());
        else url.searchParams.delete('q');
        window.history.replaceState({}, '', url);
        render(true);
      });
    }
  }
  if (sortSelect) {
    sortSelect.addEventListener('change', function () {
      render(true);
    });
  }
  render(false);
}
