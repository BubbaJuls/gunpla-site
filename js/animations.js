var scrollObserver = null;

function initPageAnimations() {
  document.body.classList.add('page-loaded');

  scrollObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          scrollObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -32px 0px' }
  );

  var selectors = [
    '.section',
    '.categories',
    '.spotlight',
    '.promo-banner',
    '.coming-soon-card',
    '.trust-item',
    '.page-hero',
    '.shop-sidebar',
    '.shop-toolbar',
    '.content-card',
    '.order-summary',
    '.checkout-summary',
    '.product-detail__grid',
    '.empty-state',
    '.empty-cart',
  ];

  selectors.forEach(function (sel) {
    document.querySelectorAll(sel).forEach(function (el) {
      registerScrollElement(el);
    });
  });

  document.querySelectorAll('.category-chip').forEach(function (el, i) {
    registerScrollElement(el, i * 0.05);
  });

  document.querySelectorAll('.coming-soon-card').forEach(function (el, i) {
    registerScrollElement(el, i * 0.08);
  });

  var header = document.querySelector('.header');
  if (header) {
    window.addEventListener(
      'scroll',
      function () {
        header.classList.toggle('header--scrolled', window.scrollY > 6);
      },
      { passive: true }
    );
  }
}

function registerScrollElement(el, delaySec) {
  if (!el || el.classList.contains('animate-on-scroll')) return;
  el.classList.add('animate-on-scroll');
  if (delaySec) el.style.setProperty('--animate-delay', delaySec + 's');
  if (scrollObserver) scrollObserver.observe(el);
}

function registerScrollAnimations(root) {
  if (!root) return;
  root.querySelectorAll('.animate-on-scroll:not(.is-visible)').forEach(function (el) {
    if (scrollObserver) scrollObserver.observe(el);
  });
}

function animateProductGrid(container) {
  if (!container) return;
  var cards = container.querySelectorAll('.product-card');
  cards.forEach(function (card, i) {
    card.classList.add('animate-card-in');
    card.style.animationDelay = i * 0.07 + 's';
  });
}

function refreshDynamicAnimations() {
  animateProductGrid(document.getElementById('featured-products'));
  animateProductGrid(document.getElementById('bestseller-products'));
  animateProductGrid(document.getElementById('weekly-picks-products'));
  animateProductGrid(document.getElementById('product-grid'));
  animateProductGrid(document.getElementById('related-products'));
}
