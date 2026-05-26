/** Local hero video — Road to 50 prologue (50th anniversary in 2029) */
var HERO_VIDEO = {
  src: typeof VIDEO_HERO !== 'undefined' ? VIDEO_HERO : 'resources/videos/a-boy-with-gundam.mp4',
  title: 'A boy with GUNDAM',
  subtitle: 'Official Road to 50 prologue — the 50th anniversary arrives in 2029',
  channel: 'GUNDAM CHANNEL INTL',
};

function buildHeroVideo(container, options) {
  if (!container || !HERO_VIDEO.src) return;
  options = options || {};

  var title = HERO_VIDEO.title || 'Featured video';
  var src = HERO_VIDEO.src;
  var captionHtml = options.shopCta
    ? ''
    : '<div class="hero-video__caption container">' +
      '<div class="hero-video__copy">' +
      '<span class="hero-video__eyebrow">' +
      (HERO_VIDEO.channel || '') +
      '</span>' +
      '<h2>' +
      title +
      '</h2>' +
      '<p>' +
      (HERO_VIDEO.subtitle || '') +
      '</p>' +
      '</div>' +
      '<div class="hero-video__actions">' +
      '<a href="catalog.html" class="btn btn--primary">Shop Gunpla</a>' +
      '</div></div>';

  container.innerHTML =
    '<section class="hero-video' +
    (options.shopCta ? ' hero-video--anniversary' : '') +
    '" aria-label="' +
    title +
    '">' +
    '<div class="hero-video__frame">' +
    '<video class="hero-video__player" src="' +
    src +
    '" title="' +
    title +
    '" autoplay muted loop playsinline controls preload="auto"></video>' +
    '</div>' +
    captionHtml +
    '</section>';

  var video = container.querySelector('.hero-video__player');
  if (video) {
    video.muted = true;
    var playAttempt = video.play();
    if (playAttempt && typeof playAttempt.catch === 'function') {
      playAttempt.catch(function () {});
    }
  }
}
