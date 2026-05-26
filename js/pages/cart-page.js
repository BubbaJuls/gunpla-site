function initCartPage() {
  var root = document.getElementById('cart-content');
  var summary = document.getElementById('cart-summary');
  if (!root) return;

  function cartItemHTML(item) {
    var product = getProductById(item.productId);
    if (!product) return '';
    var lineTotal = product.price * item.quantity;
    return (
      '<li class="cart-item" data-product-id="' + product.id + '">' +
      '<a href="' + productDetailUrl(product) + '" class="cart-item__img">' +
      '<img src="' + productBoxImage(product) + '" alt="' + product.name + '" /></a>' +
      '<div class="cart-item__info">' +
      '<a href="' + productDetailUrl(product) + '" class="cart-item__name">' + product.name + '</a>' +
      '<span class="cart-item__grade">' + product.grade + '</span>' +
      '<span class="cart-item__unit">' + formatPrice(product.price) + ' each</span>' +
      '</div>' +
      '<div class="cart-item__qty">' +
      '<button type="button" data-cart-minus="' + product.id + '" aria-label="Decrease quantity">−</button>' +
      '<input type="number" min="1" max="99" value="' + item.quantity + '" data-cart-qty="' + product.id + '" aria-label="Quantity" />' +
      '<button type="button" data-cart-plus="' + product.id + '" aria-label="Increase quantity">+</button>' +
      '</div>' +
      '<span class="cart-item__total" data-line-total="' + product.id + '">' + formatPrice(lineTotal) + '</span>' +
      '<button type="button" class="cart-item__remove" data-cart-remove="' + product.id + '">Remove</button>' +
      '</li>'
    );
  }

  function renderSummary() {
    if (!summary) return;

    var items = Cart.getItems();
    if (items.length === 0) {
      summary.innerHTML = '';
      return;
    }

    var subtotal = Cart.getSubtotal();
    var shipping = subtotal >= 3000 ? 0 : 150;
    var itemCount = Cart.getItemCount();
    var total = subtotal + shipping;

    var el = summary.querySelector('.order-summary');
    if (!el) {
      summary.innerHTML =
        '<div class="order-summary">' +
        '<h2>Order Summary</h2>' +
        '<div class="order-summary__row"><span data-summary-items>Subtotal (0 items)</span><span data-summary-subtotal>' + formatPrice(0) + '</span></div>' +
        '<div class="order-summary__row"><span>Shipping</span><span data-summary-shipping>' + formatPrice(0) + '</span></div>' +
        '<p class="order-summary__note" data-summary-note hidden></p>' +
        '<div class="order-summary__row order-summary__total"><span>Total</span><span data-summary-total>' + formatPrice(0) + '</span></div>' +
        '<a href="checkout.html" class="btn btn--primary btn--full">Proceed to Checkout</a>' +
        '<a href="catalog.html" class="btn btn--outline btn--full">Continue Shopping</a>' +
        '</div>';
      el = summary.querySelector('.order-summary');
    }

    var itemsLabel = el.querySelector('[data-summary-items]');
    var subtotalEl = el.querySelector('[data-summary-subtotal]');
    var shippingEl = el.querySelector('[data-summary-shipping]');
    var noteEl = el.querySelector('[data-summary-note]');
    var totalEl = el.querySelector('[data-summary-total]');

    if (itemsLabel) itemsLabel.textContent = 'Subtotal (' + itemCount + ' item' + (itemCount === 1 ? '' : 's') + ')';
    if (subtotalEl) subtotalEl.textContent = formatPrice(subtotal);
    if (shippingEl) shippingEl.textContent = shipping === 0 ? 'FREE' : formatPrice(shipping);
    if (totalEl) totalEl.textContent = formatPrice(total);

    if (noteEl) {
      if (subtotal < 3000) {
        noteEl.textContent = 'Add ' + formatPrice(3000 - subtotal) + ' more for free shipping!';
        noteEl.removeAttribute('hidden');
      } else {
        noteEl.setAttribute('hidden', '');
        noteEl.textContent = '';
      }
    }
  }

  function removeRow(productId) {
    var row = root.querySelector('[data-product-id="' + productId + '"]');
    if (row) row.remove();
    if (Cart.getItems().length === 0) {
      render();
    } else {
      renderSummary();
    }
  }

  function updateLineItem(productId) {
    var product = getProductById(productId);
    var item = Cart.getItems().find(function (i) {
      return i.productId === productId;
    });
    var row = root.querySelector('[data-product-id="' + productId + '"]');

    if (!product || !item || !row) return;

    var qtyInput = row.querySelector('[data-cart-qty]');
    var totalEl = row.querySelector('[data-line-total]');

    if (qtyInput) qtyInput.value = item.quantity;
    if (totalEl) totalEl.textContent = formatPrice(product.price * item.quantity);

    renderSummary();
  }

  function render() {
    var items = Cart.getItems();

    if (items.length === 0) {
      root.innerHTML =
        '<div class="empty-cart">' +
        '<div class="empty-cart__icon">🛒</div>' +
        '<h2>Your cart is empty</h2>' +
        '<p>Add some Gunpla kits and they will show up here.</p>' +
        '<a href="catalog.html" class="btn btn--primary">Start Shopping</a></div>';
      if (summary) summary.innerHTML = '';
      return;
    }

    var lines = items.map(cartItemHTML).join('');
    root.innerHTML = '<ul class="cart-list">' + lines + '</ul>';

    renderSummary();
  }

  root.addEventListener('click', function (e) {
    var minus = e.target.closest('[data-cart-minus]');
    if (minus) {
      var id = minus.getAttribute('data-cart-minus');
      var item = Cart.getItems().find(function (i) {
        return i.productId === id;
      });
      if (item) {
        Cart.updateQuantity(id, item.quantity - 1);
        if (!Cart.getItems().find(function (i) { return i.productId === id; })) {
          removeRow(id);
        } else {
          updateLineItem(id);
        }
      }
      return;
    }

    var plus = e.target.closest('[data-cart-plus]');
    if (plus) {
      var plusId = plus.getAttribute('data-cart-plus');
      var plusItem = Cart.getItems().find(function (i) {
        return i.productId === plusId;
      });
      if (plusItem) {
        Cart.updateQuantity(plusId, plusItem.quantity + 1);
        updateLineItem(plusId);
      }
      return;
    }

    var removeBtn = e.target.closest('[data-cart-remove]');
    if (removeBtn) {
      var removeId = removeBtn.getAttribute('data-cart-remove');
      Cart.removeItem(removeId);
      removeRow(removeId);
    }
  });

  root.addEventListener('change', function (e) {
    var input = e.target.closest('[data-cart-qty]');
    if (!input) return;
    var id = input.getAttribute('data-cart-qty');
    var v = parseInt(input.value, 10);
    Cart.updateQuantity(id, isNaN(v) ? 1 : v);
    if (!Cart.getItems().find(function (i) { return i.productId === id; })) {
      removeRow(id);
    } else {
      updateLineItem(id);
    }
  });

  render();
}
