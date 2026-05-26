/** Local hero video — Gundam 50th Anniversary prologue */
var HERO_VIDEO = {
  src: typeof VIDEO_HERO !== 'undefined' ? VIDEO_HERO : 'resources/videos/a-boy-with-gundam.mp4',
  title: 'A boy with GUNDAM',
  subtitle: 'Mobile Suit Gundam 50th Anniversary — Road to 50 prologue',
  channel: 'GUNDAM CHANNEL INTL',
};

function buildHeroVideo(container) {
  if (!container || !HERO_VIDEO.src) return;

  var title = HERO_VIDEO.title || 'Featured video';
  var src = HERO_VIDEO.src;

  container.innerHTML =
    '<section class="hero-video" aria-label="' +
    title +
    '">' +
    '<div class="hero-video__frame">' +
    '<video class="hero-video__player" src="' +
    src +
    '" title="' +
    title +
    '" autoplay muted loop playsinline controls preload="auto"></video>' +
    '</div>' +
    '<div class="hero-video__caption container">' +
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
    '</div></div></section>';

  var video = container.querySelector('.hero-video__player');
  if (video) {
    video.muted = true;
    var playAttempt = video.play();
    if (playAttempt && typeof playAttempt.catch === 'function') {
      playAttempt.catch(function () {});
    }
  }
}
