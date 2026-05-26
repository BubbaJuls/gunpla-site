document.addEventListener('DOMContentLoaded', function () {
  initSiteChrome();
  initPageAnimations();

  var page = document.body.getAttribute('data-page');

  if (page === 'anniversary') initAnniversaryPage();
  else if (page === 'home') initHomePage();
  else if (page === 'shop') initShopPage();
  else if (page === 'product') {
    initProductPage();
    window.addEventListener('hashchange', initProductPage);
  }
  else if (page === 'cart') initCartPage();
  else if (page === 'checkout') initCheckoutPage();
  else if (page === 'contact') initContactForm();
});

function initContactForm() {
  var form = document.getElementById('contact-form');
  if (!form) return;
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    showToast('Message sent! We will get back to you soon.');
    form.reset();
  });
}
