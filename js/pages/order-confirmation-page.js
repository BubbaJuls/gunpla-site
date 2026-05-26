function initOrderConfirmationPage() {
  var receiptEl = document.getElementById('order-receipt');
  var orderIdEl = document.getElementById('confirmation-order-id');
  var printBtn = document.getElementById('print-receipt');
  var order = loadLastOrder();

  if (!order || !order.lines || order.lines.length === 0) {
    window.location.href = 'catalog.html';
    return;
  }

  if (receiptEl) {
    receiptEl.innerHTML = buildOrderReceiptHtml(order);
  }

  if (orderIdEl) {
    orderIdEl.textContent = order.id;
  }

  document.title = 'Order ' + order.id + ' — Gunpla Hobby PH';

  if (printBtn) {
    printBtn.addEventListener('click', function () {
      window.print();
    });
  }
}
