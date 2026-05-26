function updateProductRatingUI(product) {
  var stats = getProductRatingDisplay(product);
  var ratingEl = document.querySelector('.product-detail__rating');
  if (ratingEl) {
    ratingEl.innerHTML = renderRatingLine(stats, product.sold);
  }
}

function initProductPage() {
  var id = getProductIdFromLocation();
  var slug = getProductSlugFromLocation();
  var product = id ? getProductById(id) : slug ? getProductBySlug(slug) : null;

  var heroEl = document.getElementById('product-hero');
  var root = document.getElementById('product-detail');

  if (!product) {
    if (heroEl) {
      heroEl.innerHTML =
        '<div class="container"><h1>Product not found</h1>' +
        '<p>Select a kit from the shop to view its details.</p></div>';
    }
    if (root) {
      root.innerHTML =
        '<p class="empty-state"><a href="catalog.html" class="btn btn--primary">Browse shop</a></p>';
    }
    return;
  }

  if (window.location.hash !== '#id=' + product.id) {
    history.replaceState(
      null,
      '',
      window.location.pathname + window.location.search + '#id=' + product.id
    );
  }

  document.title = product.name + ' (' + product.grade + ') — Gunpla Hobby PH';

  if (heroEl) {
    heroEl.innerHTML =
      '<div class="container">' +
      breadcrumbHTML([
        { label: 'Home', href: 'index.html' },
        { label: 'Shop', href: 'catalog.html' },
        { label: product.name },
      ]) +
      '<h1>' + product.name + '</h1>' +
      '<p>' + product.grade + ' · Authentic Bandai kit</p>' +
      '</div>';
  }

  var stats = getProductRatingDisplay(product);
  var discount = discountPercent(product.price, product.originalPrice);
  var modelSrc = productModelImage(product);
  var boxSrc = productBoxImage(product);
  var showBox = Boolean(product.boxImage) && boxSrc !== modelSrc;
  var galleryThumbs = showBox
    ? '<div class="product-detail__thumbs" role="tablist" aria-label="Product photos">' +
      '<button type="button" class="product-detail__thumb product-detail__thumb--active" data-gallery-src="' +
      modelSrc +
      '" data-gallery-label="Built kit" aria-selected="true">' +
      '<img src="' +
      modelSrc +
      '" alt="Built ' +
      product.name +
      '" /></button>' +
      '<button type="button" class="product-detail__thumb" data-gallery-src="' +
      boxSrc +
      '" data-gallery-label="Box art" aria-selected="false">' +
      '<img src="' +
      boxSrc +
      '" alt="' +
      product.name +
      ' box" /></button></div>'
    : '';

  root.innerHTML =
    '<div class="product-detail__grid">' +
    '<div class="product-detail__gallery">' +
    '<div class="product-detail__image">' +
    '<img id="product-gallery-main" src="' +
    modelSrc +
    '" alt="' +
    product.name +
    ' built kit — ' +
    product.grade +
    '" />' +
    '<span id="product-gallery-caption" class="product-detail__caption">Built kit</span>' +
    '</div>' +
    galleryThumbs +
    '</div>' +
    '<div class="product-detail__info">' +
    '<span class="product-detail__grade">' + product.grade + '</span>' +
    '<p class="product-detail__sku">SKU: ' + product.slug + '</p>' +
    '<div class="product-detail__rating">' +
    renderRatingLine(stats, product.sold) +
    '</div>' +
    '<p class="product-detail__review-link"><a href="#product-reviews">Write a review</a></p>' +
    '<div class="product-detail__prices">' +
    '<span class="product-detail__price">' + formatPrice(product.price) + '</span>' +
    (discount > 0
      ? '<span class="product-detail__original">' + formatPrice(product.originalPrice) + '</span>' +
        '<span class="product-detail__discount">Save ' + discount + '%</span>'
      : '') +
    '</div>' +
    '<div class="product-detail__desc-block">' +
    '<h2>About this kit</h2>' +
    '<p class="product-detail__desc">' + product.description + '</p>' +
    '</div>' +
    '<div class="product-detail__qty">' +
    '<label for="qty">Quantity</label>' +
    '<div class="qty-control">' +
    '<button type="button" data-qty-minus aria-label="Decrease quantity">−</button>' +
    '<input type="number" id="qty" min="1" max="99" value="1" aria-label="Quantity" />' +
    '<button type="button" data-qty-plus aria-label="Increase quantity">+</button>' +
    '</div></div>' +
    '<div class="product-detail__actions">' +
    '<button type="button" class="btn btn--primary btn--lg" data-add-detail>Add to Cart</button>' +
    '<button type="button" class="btn btn--outline btn--lg" data-buy-now>Buy Now</button>' +
    '</div>' +
    '<ul class="product-detail__perks">' +
    '<li>✓ Authentic Bandai ' + product.grade + ' kit</li>' +
    '<li>✓ Carefully packed for shipping</li>' +
    '<li>✓ Free shipping on orders over ₱3,000</li>' +
    '</ul></div></div>';

  var qtyInput = document.getElementById('qty');
  root.querySelector('[data-qty-minus]').addEventListener('click', function () {
    qtyInput.value = Math.max(1, parseInt(qtyInput.value, 10) - 1);
  });
  root.querySelector('[data-qty-plus]').addEventListener('click', function () {
    qtyInput.value = Math.min(99, parseInt(qtyInput.value, 10) + 1);
  });
  qtyInput.addEventListener('change', function () {
    qtyInput.value = Math.min(99, Math.max(1, parseInt(qtyInput.value, 10) || 1));
  });
  if (showBox) {
    var mainImg = document.getElementById('product-gallery-main');
    var caption = document.getElementById('product-gallery-caption');
    root.querySelectorAll('.product-detail__thumb').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var src = btn.getAttribute('data-gallery-src');
        var label = btn.getAttribute('data-gallery-label');
        if (mainImg && src) mainImg.src = src;
        if (caption && label) caption.textContent = label;
        root.querySelectorAll('.product-detail__thumb').forEach(function (b) {
          var active = b === btn;
          b.classList.toggle('product-detail__thumb--active', active);
          b.setAttribute('aria-selected', active ? 'true' : 'false');
        });
      });
    });
  }

  root.querySelector('[data-add-detail]').addEventListener('click', function () {
    Cart.addItem(product.id, parseInt(qtyInput.value, 10));
    showToast('Added to cart!');
  });
  root.querySelector('[data-buy-now]').addEventListener('click', function () {
    Cart.addItem(product.id, parseInt(qtyInput.value, 10));
    window.location.href = 'checkout.html';
  });

  initReviewsSection(product, function () {
    updateProductRatingUI(product);
    refreshRelatedRatings(product.id);
  });

  var related = document.getElementById('related-products');
  if (related) {
    var others = PRODUCTS.filter(function (p) {
      return p.id !== product.id;
    }).slice(0, 4);
    related.innerHTML = others.map(productCardHTML).join('');
    bindAddToCartButtons(related);
  }
}

function refreshRelatedRatings(currentProductId) {
  var related = document.getElementById('related-products');
  if (!related) return;
  related.querySelectorAll('.product-card').forEach(function (card) {
    var link = card.querySelector('.product-card__name');
    if (!link || !link.href) return;
    var match = link.href.match(/#id=([^&]+)/);
    if (!match || match[1] === currentProductId) return;
    var p = getProductById(match[1]);
    if (!p) return;
    var ratingEl = card.querySelector('.product-card__rating');
    if (ratingEl) {
      ratingEl.innerHTML = renderRatingLine(getProductRatingDisplay(p), p.sold);
    }
  });
}
