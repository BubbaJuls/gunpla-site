function searchProducts(query, limit) {
  var q = String(query || '')
    .toLowerCase()
    .trim();
  if (!q || typeof PRODUCTS === 'undefined') return [];

  return PRODUCTS.filter(function (p) {
    return (
      p.name.toLowerCase().indexOf(q) >= 0 ||
      p.grade.toLowerCase().indexOf(q) >= 0 ||
      p.slug.indexOf(q) >= 0 ||
      (p.category && p.category.toLowerCase().indexOf(q) >= 0)
    );
  }).slice(0, limit || 8);
}

function initSearchAutocomplete(input, options) {
  if (!input || input.getAttribute('data-autocomplete-init') === 'true') return;
  options = options || {};

  input.setAttribute('data-autocomplete-init', 'true');
  input.setAttribute('autocomplete', 'off');
  input.setAttribute('role', 'combobox');
  input.setAttribute('aria-autocomplete', 'list');
  input.setAttribute('aria-expanded', 'false');
  input.setAttribute('aria-controls', input.id ? input.id + '-suggestions' : 'search-suggestions');

  var form = input.closest('.search');
  if (form) form.classList.add('search--autocomplete');

  var inner = input.parentElement;
  if (!inner || !inner.classList.contains('search__inner')) {
    inner = document.createElement('div');
    inner.className = 'search__inner';
    input.parentNode.insertBefore(inner, input);
    inner.appendChild(input);
  }

  var listId = input.id ? input.id + '-suggestions' : 'search-suggestions-' + Math.random().toString(36).slice(2, 8);
  if (!input.id) input.id = listId.replace('-suggestions', '-input');

  var list = inner.querySelector('.search-suggestions');
  if (!list) {
    list = document.createElement('ul');
    list.className = 'search-suggestions';
    list.id = listId;
    list.setAttribute('role', 'listbox');
    list.hidden = true;
    inner.appendChild(list);
  }

  input.setAttribute('aria-controls', list.id);

  var activeIndex = -1;
  var debounceTimer;
  var maxResults = options.maxResults || 8;

  function hideList() {
    list.hidden = true;
    list.innerHTML = '';
    activeIndex = -1;
    input.setAttribute('aria-expanded', 'false');
  }

  function getMatches() {
    if (typeof options.getResults === 'function') {
      return options.getResults(input.value);
    }
    return searchProducts(input.value, maxResults);
  }

  function selectProduct(product) {
    hideList();
    if (typeof options.onSelect === 'function') {
      options.onSelect(product);
      return;
    }
    window.location.href = productDetailUrl(product);
  }

  function renderList() {
    var matches = getMatches();
    activeIndex = -1;

    if (!input.value.trim() || matches.length === 0) {
      hideList();
      return;
    }

    list.innerHTML = matches
      .map(function (p, i) {
        var img = productBoxImage(p);
        return (
          '<li role="option" class="search-suggestions__item" data-index="' +
          i +
          '" data-product-id="' +
          p.id +
          '" id="' +
          list.id +
          '-option-' +
          i +
          '">' +
          '<img class="search-suggestions__thumb" src="' +
          img +
          '" alt="" loading="lazy" />' +
          '<span class="search-suggestions__text">' +
          '<span class="search-suggestions__name">' +
          p.name +
          '</span>' +
          '<span class="search-suggestions__meta">' +
          p.grade +
          ' · ' +
          formatPrice(p.price) +
          '</span></span></li>'
        );
      })
      .join('');

    list.hidden = false;
    input.setAttribute('aria-expanded', 'true');

    list.querySelectorAll('.search-suggestions__item').forEach(function (item) {
      item.addEventListener('mousedown', function (e) {
        e.preventDefault();
        var product = getProductById(item.getAttribute('data-product-id'));
        if (product) selectProduct(product);
      });
    });
  }

  function setActive(index) {
    var items = list.querySelectorAll('.search-suggestions__item');
    if (!items.length) return;

    items.forEach(function (el) {
      el.classList.remove('search-suggestions__item--active');
      el.removeAttribute('aria-selected');
    });

    if (index < 0) {
      activeIndex = -1;
      input.removeAttribute('aria-activedescendant');
      return;
    }

    activeIndex = Math.max(0, Math.min(index, items.length - 1));
    var active = items[activeIndex];
    active.classList.add('search-suggestions__item--active');
    active.setAttribute('aria-selected', 'true');
    input.setAttribute('aria-activedescendant', active.id);
    active.scrollIntoView({ block: 'nearest' });
  }

  input.addEventListener('input', function () {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(renderList, 120);
  });

  input.addEventListener('focus', function () {
    if (input.value.trim()) renderList();
  });

  input.addEventListener('blur', function () {
    setTimeout(hideList, 150);
  });

  input.addEventListener('keydown', function (e) {
    var items = list.querySelectorAll('.search-suggestions__item');

    if (e.key === 'ArrowDown') {
      if (list.hidden) renderList();
      e.preventDefault();
      setActive(activeIndex + 1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive(activeIndex - 1);
    } else if (e.key === 'Enter' && activeIndex >= 0 && items[activeIndex]) {
      e.preventDefault();
      var product = getProductById(items[activeIndex].getAttribute('data-product-id'));
      if (product) selectProduct(product);
    } else if (e.key === 'Escape') {
      hideList();
    }
  });

  document.addEventListener('click', function (e) {
    if (!form || !form.contains(e.target)) hideList();
  });
}
