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

  var discount = discountPercent(product.price, product.originalPrice);

  root.innerHTML =
    '<div class="product-detail__grid">' +
    '<div class="product-detail__gallery">' +
    '<div class="product-detail__image">' +
    '<img src="' + product.image + '" alt="' + product.name + ' — ' + product.grade + '" />' +
    '</div></div>' +
    '<div class="product-detail__info">' +
    '<span class="product-detail__grade">' + product.grade + '</span>' +
    '<p class="product-detail__sku">SKU: ' + product.slug + '</p>' +
    '<div class="product-detail__rating">' +
    renderStars(product.rating) +
    '<span>' + product.rating + '</span> · <span>' + product.sold + ' sold</span></div>' +
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
  root.querySelector('[data-add-detail]').addEventListener('click', function () {
    Cart.addItem(product.id, parseInt(qtyInput.value, 10));
    showToast('Added to cart!');
  });
  root.querySelector('[data-buy-now]').addEventListener('click', function () {
    Cart.addItem(product.id, parseInt(qtyInput.value, 10));
    window.location.href = 'checkout.html';
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
