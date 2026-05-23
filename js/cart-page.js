function initCartPage() {
  var root = document.getElementById('cart-content');
  var summary = document.getElementById('cart-summary');
  if (!root) return;

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

    var lines = items
      .map(function (item) {
        var product = getProductById(item.productId);
        if (!product) return '';
        var lineTotal = product.price * item.quantity;
        return (
          '<li class="cart-item">' +
          '<a href="' + productDetailUrl(product) + '" class="cart-item__img">' +
          '<img src="' + product.image + '" alt="' + product.name + '" /></a>' +
          '<div class="cart-item__info">' +
          '<a href="' + productDetailUrl(product) + '" class="cart-item__name">' + product.name + '</a>' +
          '<span class="cart-item__grade">' + product.grade + '</span>' +
          '<span class="cart-item__unit">' + formatPrice(product.price) + ' each</span>' +
          '</div>' +
          '<div class="cart-item__qty">' +
          '<button type="button" data-cart-minus="' + product.id + '" aria-label="Decrease">−</button>' +
          '<input type="number" min="1" max="99" value="' + item.quantity + '" data-cart-qty="' + product.id + '" />' +
          '<button type="button" data-cart-plus="' + product.id + '" aria-label="Increase">+</button>' +
          '</div>' +
          '<span class="cart-item__total">' + formatPrice(lineTotal) + '</span>' +
          '<button type="button" class="cart-item__remove" data-cart-remove="' + product.id + '">Remove</button>' +
          '</li>'
        );
      })
      .join('');

    root.innerHTML = '<ul class="cart-list">' + lines + '</ul>';
    bindCartEvents();
    root.querySelectorAll('.cart-item').forEach(function (item, i) {
      item.classList.add('animate-card-in');
      item.style.animationDelay = i * 0.06 + 's';
    });

    if (summary) {
      var subtotal = Cart.getSubtotal();
      var shipping = subtotal >= 3000 ? 0 : 150;
      summary.innerHTML =
        '<div class="order-summary">' +
        '<h2>Order Summary</h2>' +
        '<div class="order-summary__row"><span>Subtotal (' + Cart.getItemCount() + ' items)</span><span>' + formatPrice(subtotal) + '</span></div>' +
        '<div class="order-summary__row"><span>Shipping</span><span>' + (shipping === 0 ? 'FREE' : formatPrice(shipping)) + '</span></div>' +
        (subtotal < 3000 ? '<p class="order-summary__note">Add ' + formatPrice(3000 - subtotal) + ' more for free shipping!</p>' : '') +
        '<div class="order-summary__row order-summary__total"><span>Total</span><span>' + formatPrice(subtotal + shipping) + '</span></div>' +
        '<a href="checkout.html" class="btn btn--primary btn--full">Proceed to Checkout</a>' +
        '<a href="catalog.html" class="btn btn--outline btn--full">Continue Shopping</a>' +
        '</div>';
    }
  }

  function bindCartEvents() {
    root.querySelectorAll('[data-cart-minus]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var id = btn.getAttribute('data-cart-minus');
        var item = Cart.getItems().find(function (i) { return i.productId === id; });
        if (item) Cart.updateQuantity(id, item.quantity - 1);
        render();
      });
    });
    root.querySelectorAll('[data-cart-plus]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var id = btn.getAttribute('data-cart-plus');
        var item = Cart.getItems().find(function (i) { return i.productId === id; });
        if (item) Cart.updateQuantity(id, item.quantity + 1);
        render();
      });
    });
    root.querySelectorAll('[data-cart-qty]').forEach(function (input) {
      input.addEventListener('change', function () {
        var id = input.getAttribute('data-cart-qty');
        var v = parseInt(input.value, 10);
        Cart.updateQuantity(id, isNaN(v) ? 1 : v);
        render();
      });
    });
    root.querySelectorAll('[data-cart-remove]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        Cart.removeItem(btn.getAttribute('data-cart-remove'));
        render();
      });
    });
  }

  render();
}
