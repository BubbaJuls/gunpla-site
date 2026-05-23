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
          '<span>' + p.name + ' × ' + item.quantity + '</span>' +
          '<span>' + formatPrice(p.price * item.quantity) + '</span></div>'
        );
      })
      .join('');

    summary.innerHTML =
      lines +
      '<div class="checkout-line"><span>Subtotal</span><span>' + formatPrice(subtotal) + '</span></div>' +
      '<div class="checkout-line"><span>Shipping</span><span>' + (shipping === 0 ? 'FREE' : formatPrice(shipping)) + '</span></div>' +
      '<div class="checkout-line checkout-line--total"><span>Total</span><span>' + formatPrice(subtotal + shipping) + '</span></div>';
  }

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      Cart.clear();
      document.getElementById('checkout-success').hidden = false;
      form.hidden = true;
      if (summary) summary.hidden = true;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}
