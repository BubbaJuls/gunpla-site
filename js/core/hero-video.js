/** Road to 50 prologue — local MP4 on localhost, YouTube on deployed hosts */
var HERO_VIDEO = {
  title: 'A boy with GUNDAM',
  subtitle: 'Official Road to 50 prologue — the 50th anniversary arrives in 2029',
  channel: 'GUNDAM CHANNEL INTL',
};

function heroVideoLocalSrc() {
  if (typeof VIDEO_HERO_LOCAL !== 'undefined') return VIDEO_HERO_LOCAL;
  return 'resources/videos/a-boy-with-gundam.mp4';
}

function heroVideoYoutubeId() {
  if (typeof VIDEO_HERO_YOUTUBE_ID !== 'undefined') return VIDEO_HERO_YOUTUBE_ID;
  return 'Zt62nsFLqA0';
}

function heroVideoWatchUrl() {
  if (typeof VIDEO_HERO_YOUTUBE_WATCH !== 'undefined') return VIDEO_HERO_YOUTUBE_WATCH;
  return 'https://www.youtube.com/watch?v=' + heroVideoYoutubeId();
}

function useLocalHeroVideo() {
  var params = new URLSearchParams(window.location.search);
  if (params.get('hero') === 'youtube') return false;
  if (params.get('hero') === 'local') return true;

  var host = window.location.hostname;
  return (
    host === 'localhost' ||
    host === '127.0.0.1' ||
    host === '::1' ||
    host === '[::1]' ||
    /\.local$/i.test(host)
  );
}

function buildHeroVideoMediaHtml() {
  var title = HERO_VIDEO.title || 'Featured video';

  if (useLocalHeroVideo()) {
    var src = heroVideoLocalSrc();
    return (
      '<video class="hero-video__player" src="' +
      src +
      '" title="' +
      title +
      '" autoplay muted loop playsinline controls preload="auto"></video>'
    );
  }

  var id = heroVideoYoutubeId();
  var embed =
    'https://www.youtube-nocookie.com/embed/' +
    id +
    '?autoplay=1&mute=1&playsinline=1&rel=0&modestbranding=1';

  return (
    '<iframe class="hero-video__player hero-video__player--embed" src="' +
    embed +
    '" title="' +
    title +
    '" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen loading="lazy"></iframe>'
  );
}

function buildHeroVideo(container, options) {
  if (!container) return;
  options = options || {};

  var title = HERO_VIDEO.title || 'Featured video';
  var useLocal = useLocalHeroVideo();
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
      (useLocal
        ? ''
        : ' Starts muted; use the player controls for sound.') +
      '</p>' +
      '</div>' +
      '<div class="hero-video__actions">' +
      '<a href="catalog.html" class="btn btn--primary">Shop Gunpla</a>' +
      (useLocal
        ? ''
        : '<a href="' +
          heroVideoWatchUrl() +
          '" class="btn btn--outline" target="_blank" rel="noopener noreferrer">Watch on YouTube</a>') +
      '</div></div>';

  container.innerHTML =
    '<section class="hero-video' +
    (options.shopCta ? ' hero-video--anniversary' : '') +
    (useLocal ? '' : ' hero-video--youtube') +
    '" aria-label="' +
    title +
    '">' +
    '<div class="hero-video__frame">' +
    buildHeroVideoMediaHtml() +
    '</div>' +
    captionHtml +
    '</section>';

  var video = container.querySelector('video.hero-video__player');
  if (video) {
    video.muted = true;
    var playAttempt = video.play();
    if (playAttempt && typeof playAttempt.catch === 'function') {
      playAttempt.catch(function () {});
    }
  }
}
