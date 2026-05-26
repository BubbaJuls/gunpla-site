function initCheckoutPage() {
  var form = document.getElementById('checkout-form');
  var summary = document.getElementById('checkout-summary');
  var items = Cart.getItems();

  if (items.length === 0) {
    window.location.href = 'cart.html';
    return;
  }

  var subtotal = Cart.getSubtotal();
  var shipping = subtotal >= 3000 ? 0 : 150;

  if (summary) {
    var lines = items
      .map(function (item) {
        var p = getProductById(item.productId);
        if (!p) return '';
        return (
          '<div class="checkout-line">' +
          '<span>' +
          p.name +
          ' (' +
          p.grade +
          ') × ' +
          item.quantity +
          '</span>' +
          '<span>' +
          formatPrice(p.price * item.quantity) +
          '</span></div>'
        );
      })
      .join('');

    summary.innerHTML =
      '<h2>Order Summary</h2>' +
      lines +
      '<div class="checkout-line"><span>Subtotal</span><span>' +
      formatPrice(subtotal) +
      '</span></div>' +
      '<div class="checkout-line"><span>Shipping</span><span>' +
      (shipping === 0 ? 'FREE' : formatPrice(shipping)) +
      '</span></div>' +
      '<div class="checkout-line checkout-line--total"><span>Total</span><span>' +
      formatPrice(subtotal + shipping) +
      '</span></div>';
  }

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var cartSnapshot = Cart.getItems();
      var orderData = buildOrderFromCart(cartSnapshot);
      var customer = getCheckoutFormData(form);

      var order = {
        id: generateOrderId(),
        placedAt: new Date(),
        customer: customer,
        lines: orderData.lines,
        subtotal: orderData.subtotal,
        shipping: orderData.shipping,
        total: orderData.total,
        itemCount: orderData.itemCount,
      };

      saveLastOrder(order);
      Cart.clear();
      window.location.href = 'order-confirmation.html';
    });
  }
}
