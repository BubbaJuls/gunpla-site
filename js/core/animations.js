/**
 * Animation policy (Gunpla Hobby PH)
 *
 * YES — user-initiated feedback:
 *   • Hover/focus on buttons, cards, chips, links
 *   • Carousel slide crossfade (hero only)
 *   • Toast when adding to cart
 *   • Cart badge pulse when an item is added (not on qty change or page load)
 *   • Header shadow when scrolling
 *
 * NO — layout reload / navigation feel:
 *   • Page-enter fades (header, main, footer)
 *   • Staggered product-card entrance on load
 *   • Scroll-reveal (sections starting hidden)
 *   • Re-rendering cart rows or product grids with entrance animations
 *   • Carousel caption pop-in per slide
 */

function initPageAnimations() {
  var header = document.querySelector('.header');
  if (!header) return;

  window.addEventListener(
    'scroll',
    function () {
      header.classList.toggle('header--scrolled', window.scrollY > 6);
    },
    { passive: true }
  );
}
