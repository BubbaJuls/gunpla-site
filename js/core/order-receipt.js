var LAST_ORDER_KEY = 'gunpla_last_order';

var PAYMENT_LABELS = {
  cod: 'Cash on Delivery (COD)',
  gcash: 'GCash',
  maya: 'Maya',
  bank: 'Bank Transfer',
};

function generateOrderId() {
  var d = new Date();
  var pad = function (n) {
    return String(n).padStart(2, '0');
  };
  var date = d.getFullYear() + pad(d.getMonth() + 1) + pad(d.getDate());
  var rand = String(Math.floor(Math.random() * 10000)).padStart(4, '0');
  return 'GHPH-' + date + '-' + rand;
}

function formatOrderDate(date) {
  var d = date instanceof Date ? date : new Date(date);
  return d.toLocaleString('en-PH', {
    weekday: 'short',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function getCheckoutFormData(form) {
  return {
    firstName: form.firstName.value.trim(),
    lastName: form.lastName.value.trim(),
    email: form.email.value.trim(),
    phone: form.phone.value.trim(),
    address: form.address.value.trim(),
    city: form.city.value.trim(),
    province: form.province.value.trim(),
    zip: form.zip.value.trim(),
    payment: form.payment.value,
  };
}

function buildOrderFromCart(items) {
  var lines = [];
  var subtotal = 0;

  items.forEach(function (item) {
    var p = getProductById(item.productId);
    if (!p) return;
    var lineTotal = p.price * item.quantity;
    subtotal += lineTotal;
    lines.push({
      productId: p.id,
      name: p.name,
      grade: p.grade,
      quantity: item.quantity,
      unitPrice: p.price,
      lineTotal: lineTotal,
      salePercent: p.salePercent || 0,
    });
  });

  var shipping = subtotal >= 3000 ? 0 : 150;
  return {
    lines: lines,
    subtotal: subtotal,
    shipping: shipping,
    total: subtotal + shipping,
    itemCount: lines.reduce(function (sum, l) {
      return sum + l.quantity;
    }, 0),
  };
}

function saveLastOrder(order) {
  var payload = Object.assign({}, order, {
    placedAt: order.placedAt instanceof Date ? order.placedAt.toISOString() : order.placedAt,
  });
  try {
    sessionStorage.setItem(LAST_ORDER_KEY, JSON.stringify(payload));
  } catch (err) {
    /* ignore quota errors in demo */
  }
}

function loadLastOrder() {
  try {
    var raw = sessionStorage.getItem(LAST_ORDER_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (err) {
    return null;
  }
}

function buildOrderReceiptHtml(order) {
  var customer = order.customer;
  var paymentLabel = PAYMENT_LABELS[customer.payment] || customer.payment;
  var fullName = customer.firstName + ' ' + customer.lastName;

  var rows = order.lines
    .map(function (line) {
      var discount =
        line.salePercent > 0
          ? '<span class="receipt__discount">-' + line.salePercent + '%</span>'
          : '';
      return (
        '<tr>' +
        '<td class="receipt__item-name">' +
        '<strong>' +
        escapeHtml(line.name) +
        '</strong> ' +
        '<span class="receipt__grade">' +
        escapeHtml(line.grade) +
        '</span>' +
        discount +
        '</td>' +
        '<td class="receipt__num">' +
        line.quantity +
        '</td>' +
        '<td class="receipt__num">' +
        formatPrice(line.unitPrice) +
        '</td>' +
        '<td class="receipt__num receipt__amount">' +
        formatPrice(line.lineTotal) +
        '</td>' +
        '</tr>'
      );
    })
    .join('');

  return (
    '<header class="receipt__header">' +
    '<div class="receipt__brand">' +
    '<img src="' +
    IMG_BRAND +
    '" alt="" width="48" height="48" />' +
    '<div>' +
    '<p class="receipt__store">Gunpla Hobby <strong>PH</strong></p>' +
    '<p class="receipt__tagline">Road to 50 Flash Sale · 50th in 2029</p>' +
    '</div></div>' +
    '<div class="receipt__title-block">' +
    '<h2 class="receipt__title">Order Confirmation</h2>' +
    '<p class="receipt__status"><span class="receipt__status-dot" aria-hidden="true"></span>Confirmed</p>' +
    '</div></header>' +
    '<div class="receipt__meta">' +
    '<div class="receipt__meta-item"><span class="receipt__label">Order number</span><strong class="receipt__order-id">' +
    escapeHtml(order.id) +
    '</strong></div>' +
    '<div class="receipt__meta-item"><span class="receipt__label">Date placed</span><strong>' +
    escapeHtml(formatOrderDate(order.placedAt)) +
    '</strong></div>' +
    '<div class="receipt__meta-item"><span class="receipt__label">Items</span><strong>' +
    order.itemCount +
    '</strong></div>' +
    '</div>' +
    '<div class="receipt__columns">' +
    '<section class="receipt__section">' +
    '<h3>Ship to</h3>' +
    '<p class="receipt__address">' +
    '<strong>' +
    escapeHtml(fullName) +
    '</strong><br />' +
    escapeHtml(customer.address) +
    '<br />' +
    escapeHtml(customer.city) +
    ', ' +
    escapeHtml(customer.province) +
    ' ' +
    escapeHtml(customer.zip) +
    '<br />' +
    escapeHtml(customer.phone) +
    '<br />' +
    '<a href="mailto:' +
    escapeHtml(customer.email) +
    '">' +
    escapeHtml(customer.email) +
    '</a></p></section>' +
    '<section class="receipt__section">' +
    '<h3>Payment</h3>' +
    '<p><strong>' +
    escapeHtml(paymentLabel) +
    '</strong></p>' +
    '<p class="receipt__note-inline">Payment instructions will be sent to your email for this school project demo.</p>' +
    '</section></div>' +
    '<section class="receipt__section receipt__section--items">' +
    '<h3>Order details</h3>' +
    '<div class="receipt__table-wrap">' +
    '<table class="receipt__table">' +
    '<thead><tr>' +
    '<th scope="col">Item</th>' +
    '<th scope="col">Qty</th>' +
    '<th scope="col">Unit</th>' +
    '<th scope="col">Amount</th>' +
    '</tr></thead><tbody>' +
    rows +
    '</tbody></table></div></section>' +
    '<footer class="receipt__totals">' +
    '<div class="receipt__total-row"><span>Subtotal</span><span>' +
    formatPrice(order.subtotal) +
    '</span></div>' +
    '<div class="receipt__total-row"><span>Shipping</span><span>' +
    (order.shipping === 0 ? 'FREE' : formatPrice(order.shipping)) +
    '</span></div>' +
    '<div class="receipt__total-row receipt__total-row--grand"><span>Total</span><span>' +
    formatPrice(order.total) +
    '</span></div></footer>' +
    '<p class="receipt__footer-note">' +
    '<strong>School project demo.</strong> This receipt confirms your order details only — no real payment was charged and no inventory was reserved. ' +
    'Save or print this page for your project submission.</p>'
  );
}
