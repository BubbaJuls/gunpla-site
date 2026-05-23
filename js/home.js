function initHomePage() {
  buildHeroCarousel(document.getElementById('hero-carousel'));

  var featured = document.getElementById('featured-products');
  if (featured) {
    featured.innerHTML = getFeaturedProducts().map(productCardHTML).join('');
    bindAddToCartButtons(featured);
    animateProductGrid(featured);
  }

  var bestsellers = document.getElementById('bestseller-products');
  if (bestsellers) {
    var sorted = PRODUCTS.slice().sort(function (a, b) {
      return b.sold - a.sold;
    }).slice(0, 4);
    bestsellers.innerHTML = sorted.map(productCardHTML).join('');
    bindAddToCartButtons(bestsellers);
    animateProductGrid(bestsellers);
  }

  var weekly = document.getElementById('weekly-picks-products');
  if (weekly) {
    var deals = PRODUCTS.filter(function (p) {
      return p.originalPrice > p.price;
    }).slice(0, 4);
    weekly.innerHTML = deals.map(productCardHTML).join('');
    bindAddToCartButtons(weekly);
    animateProductGrid(weekly);
  }
}
