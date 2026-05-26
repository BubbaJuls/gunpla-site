function getCurrentPage() {
  var segment = window.location.pathname.split('/').filter(Boolean).pop() || '';
  return segment.includes('.') ? segment : segment ? segment + '.html' : 'index.html';
}

function renderSiteHeader() {
  var el = document.getElementById('site-header');
  if (!el) return;
  var page = getCurrentPage();
  var count = Cart.getItemCount();

  el.innerHTML =
    '<div class="top-bar">Authentic Bandai Gunpla · Free shipping on orders over ₱3,000</div>' +
    '<header class="header">' +
    '<div class="header__inner container">' +
    '<a href="index.html" class="logo">' +
    '<img src="' + IMG_BRAND + '" alt="Gunpla Hobby PH" />' +
    '<span>Gunpla Hobby <strong>PH</strong></span></a>' +
    '<form class="search" action="catalog.html" method="get" role="search">' +
    '<input type="search" name="q" placeholder="Search Gunpla kits…" aria-label="Search products" />' +
    '<button type="submit" aria-label="Search">' +
    '<svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>' +
    '</button></form>' +
    '<nav class="nav" aria-label="Main">' +
    navLink('index.html', 'Home', page) +
    navLink('catalog.html', 'Shop', page) +
    navLink('about.html', 'About', page) +
    navLink('contact.html', 'Contact', page) +
    '<a href="cart.html" class="nav__cart' + (page === 'cart.html' ? ' active' : '') + '" aria-label="Cart, ' + count + ' items">' +
    '<svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>' +
    '<span class="cart-badge' + (count > 0 ? '' : ' cart-badge--hidden') + '" data-cart-badge>' + (count > 99 ? '99+' : count) + '</span></a>' +
    '</nav>' +
    '<button type="button" class="nav-toggle" aria-label="Open menu" data-nav-toggle><span></span><span></span><span></span></button>' +
    '</div></header>';

  var toggle = el.querySelector('[data-nav-toggle]');
  var nav = el.querySelector('.nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('nav--open');
      toggle.classList.toggle('nav-toggle--open');
    });
  }
}

function navLink(href, label, page) {
  return '<a href="' + href + '"' + (page === href ? ' class="active"' : '') + '>' + label + '</a>';
}

function renderSiteFooter() {
  var el = document.getElementById('site-footer');
  if (!el) return;
  el.innerHTML =
    '<footer class="footer">' +
    '<div class="container footer__grid">' +
    '<div class="footer__col">' +
    '<h3>Gunpla Hobby PH</h3>' +
    '<p>Your trusted online shop for authentic Bandai Gunpla kits. HG, RG, MG, and PG — build, collect, display.</p>' +
    '</div>' +
    '<div class="footer__col">' +
    '<h4>Shop</h4>' +
    '<ul><li><a href="catalog.html">All Products</a></li>' +
    '<li><a href="catalog.html?grade=HG">High Grade</a></li>' +
    '<li><a href="catalog.html?grade=RG">Real Grade</a></li>' +
    '<li><a href="catalog.html?grade=MG">Master Grade</a></li>' +
    '<li><a href="catalog.html?grade=PG">Perfect Grade</a></li></ul>' +
    '</div>' +
    '<div class="footer__col">' +
    '<h4>Customer Care</h4>' +
    '<ul><li><a href="contact.html">Contact Us</a></li>' +
    '<li><a href="about.html">About Us</a></li>' +
    '<li><a href="#">Shipping Info</a></li>' +
    '<li><a href="#">Returns & Refunds</a></li></ul>' +
    '</div>' +
    '<div class="footer__col">' +
    '<h4>Payment</h4>' +
    '<p class="footer__payments">COD · GCash · Maya · Bank Transfer · Credit Card</p>' +
    '<div class="footer__social">' + socialLinks() + '</div>' +
    '</div></div>' +
    '<div class="footer__bottom container">' +
    '<p>&copy; ' + new Date().getFullYear() + ' Gunpla Hobby PH. All rights reserved.</p>' +
    '</div></footer>';
}

function socialLinks() {
  return (
    '<a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">' +
    '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12a10 10 0 10-11.5 9.9v-7h-2.2v-2.9h2.2V9.4c0-2.2 1.3-3.4 3.3-3.4.95 0 1.95.17 1.95.17v2.1h-1.07c-1.05 0-1.38.66-1.38 1.34v1.6h2.35l-.38 2.9h-1.97v7A10 10 0 0022 12z"/></svg></a>' +
    '<a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">' +
    '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><path d="M17.5 6.5h.01"/></svg></a>' +
    '<a href="https://x.com" target="_blank" rel="noopener noreferrer" aria-label="X">' +
    '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M21.6 7.2c.2-.6-.1-1.3-.7-1.5-.6-.2-1.3.1-1.5.7L15.8 18.2c-.2.6.1 1.3.7 1.5.1.1.3.1.4.1.5 0 1-.3 1.2-.8l4.6-12zM2.4 16.8c-.2.6.1 1.3.7 1.5.2.1.4.1.6.1.4 0 .8-.2 1-.6L8.6 6.8c.2-.6-.1-1.3-.7-1.5-.6-.2-1.3.1-1.5.7L2.4 16.8zM17.9 3.6c-.6-.2-1.3.1-1.5.7L11.9 14.2c-.2.6.1 1.3.7 1.5.1.1.2.1.4.1.5 0 1-.3 1.2-.8l4.6-12c.2-.6-.1-1.3-.7-1.5z"/></svg></a>'
  );
}

function updateCartBadge(pulse) {
  var count = Cart.getItemCount();
  document.querySelectorAll('[data-cart-badge]').forEach(function (badge) {
    badge.textContent = count > 99 ? '99+' : count;
    badge.classList.toggle('cart-badge--hidden', count === 0);
    if (pulse && count > 0) {
      badge.classList.remove('cart-badge--pulse');
      void badge.offsetWidth;
      badge.classList.add('cart-badge--pulse');
    }
  });
}

function productCardHTML(product, variant) {
  variant = variant || 'grid';
  var discount = discountPercent(product.price, product.originalPrice);
  var link = productDetailUrl(product);
  return (
    '<article class="product-card">' +
    (discount > 0 ? '<span class="product-card__badge">-' + discount + '%</span>' : '') +
    '<span class="product-card__grade">' + product.grade + '</span>' +
    '<a href="' + link + '" class="product-card__img">' +
    '<img src="' + productBoxImage(product) + '" alt="' + product.name + ' box art" loading="lazy" /></a>' +
    '<div class="product-card__body">' +
    '<a href="' + link + '" class="product-card__name">' + product.name + '</a>' +
    '<div class="product-card__rating">' +
    renderRatingLine(getProductRatingDisplay(product), product.sold) +
    '</div>' +
    '<div class="product-card__prices">' +
    '<span class="product-card__price">' + formatPrice(product.price) + '</span>' +
    (discount > 0 ? '<span class="product-card__original">' + formatPrice(product.originalPrice) + '</span>' : '') +
    '</div>' +
    '<div class="product-card__actions">' +
    '<a href="' + link + '" class="btn btn--outline btn--sm">View</a>' +
    '<button type="button" class="btn btn--primary btn--sm" data-add-cart="' + product.id + '">Add to Cart</button>' +
    '</div></div></article>'
  );
}

function bindAddToCartButtons(root) {
  (root || document).querySelectorAll('[data-add-cart]').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      Cart.addItem(btn.getAttribute('data-add-cart'), 1);
      showToast('Added to cart!');
    });
  });
}

function showToast(message) {
  var existing = document.querySelector('.toast');
  if (existing) existing.remove();
  var toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  document.body.appendChild(toast);
  requestAnimationFrame(function () {
    toast.classList.add('toast--visible');
  });
  setTimeout(function () {
    toast.classList.remove('toast--visible');
    setTimeout(function () { toast.remove(); }, 300);
  }, 2200);
}

function initSiteChrome() {
  renderSiteHeader();
  renderSiteFooter();
  updateCartBadge(false);
  document.addEventListener('cart-updated', function (e) {
    updateCartBadge(e.detail && e.detail.pulse);
  });
  if (typeof initChatbot === 'function') initChatbot();
}

function pageHero(title, subtitle, breadcrumb) {
  return (
    '<section class="page-hero">' +
    '<div class="container">' +
    (breadcrumb || '') +
    '<h1>' + title + '</h1>' +
    (subtitle ? '<p>' + subtitle + '</p>' : '') +
    '</div></section>'
  );
}

function breadcrumbHTML(items) {
  var html = '<nav class="breadcrumb" aria-label="Breadcrumb"><ol>';
  items.forEach(function (item, i) {
    html += '<li>';
    if (item.href) html += '<a href="' + item.href + '">' + item.label + '</a>';
    else html += '<span aria-current="page">' + item.label + '</span>';
    if (i < items.length - 1) {
      html += '<span class="breadcrumb__sep" aria-hidden="true">&gt;</span>';
    }
    html += '</li>';
  });
  return html + '</ol></nav>';
}
