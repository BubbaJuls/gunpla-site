function encodeAssetPath(path) {
  return path
    .split('/')
    .map(function (part, i) {
      if (i === 0 && part.indexOf(':') === -1 && part !== '') return part;
      return encodeURIComponent(part);
    })
    .join('/');
}

function initCarousel(root) {
  if (!root) return;

  var slides = root.querySelectorAll('.carousel__slide');
  var dots = root.querySelectorAll('.carousel__dot');
  var prev = root.querySelector('.carousel__prev');
  var next = root.querySelector('.carousel__next');
  var counterCurrent = root.querySelector('.carousel__counter-current');
  var current = 0;
  var interval = parseInt(root.getAttribute('data-interval') || '5000', 10);
  var timer;

  function goTo(index) {
    if (slides.length === 0) return;
    current = (index + slides.length) % slides.length;
    slides.forEach(function (s, i) {
      s.classList.toggle('carousel__slide--active', i === current);
    });
    dots.forEach(function (d, i) {
      d.classList.toggle('carousel__dot--active', i === current);
      d.setAttribute('aria-current', i === current ? 'true' : 'false');
    });
    if (counterCurrent) {
      counterCurrent.textContent = String(current + 1);
    }
  }

  function startAutoplay() {
    if (interval <= 0 || slides.length <= 1) return;
    stopAutoplay();
    timer = setInterval(function () {
      goTo(current + 1);
    }, interval);
  }

  function stopAutoplay() {
    clearInterval(timer);
  }

  if (prev) {
    prev.addEventListener('click', function () {
      stopAutoplay();
      goTo(current - 1);
      startAutoplay();
    });
  }
  if (next) {
    next.addEventListener('click', function () {
      stopAutoplay();
      goTo(current + 1);
      startAutoplay();
    });
  }
  dots.forEach(function (dot, i) {
    dot.addEventListener('click', function () {
      stopAutoplay();
      goTo(i);
      startAutoplay();
    });
  });

  root.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      stopAutoplay();
      goTo(current - 1);
      startAutoplay();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      stopAutoplay();
      goTo(current + 1);
      startAutoplay();
    }
  });

  root.addEventListener('mouseenter', stopAutoplay);
  root.addEventListener('mouseleave', startAutoplay);
  root.addEventListener('focusin', stopAutoplay);
  root.addEventListener('focusout', function (e) {
    if (!root.contains(e.relatedTarget)) startAutoplay();
  });

  goTo(0);
  startAutoplay();
}

function buildSlideHTML(slide, isActive) {
  var mediaHtml = '';
  if (slide.image) {
    var src = encodeAssetPath(slide.image);
    mediaHtml =
      '<div class="carousel__slide-media">' +
      '<img src="' +
      src +
      '" alt="' +
      (slide.alt || '') +
      '" loading="' +
      (isActive ? 'eager' : 'lazy') +
      '" decoding="async" />' +
      '</div>';
  }

  var caption =
    slide.title || slide.subtitle || slide.cta
      ? '<div class="carousel__caption">' +
        (slide.title ? '<h2>' + slide.title + '</h2>' : '') +
        (slide.subtitle ? '<p>' + slide.subtitle + '</p>' : '') +
        (slide.cta
          ? '<a href="' + slide.cta.href + '" class="btn btn--primary">' + slide.cta.label + '</a>'
          : '') +
        '</div>'
      : '';

  return (
    '<div class="carousel__slide' +
    (isActive ? ' carousel__slide--active' : '') +
    '" role="group" aria-roledescription="slide" aria-label="' +
    (slide.title || 'Slide') +
    '">' +
    mediaHtml +
    caption +
    '</div>'
  );
}

function buildHeroCarousel(container) {
  if (!container || !HERO_SLIDES || HERO_SLIDES.length === 0) return;

  var slidesHtml = HERO_SLIDES.map(function (slide, i) {
    return buildSlideHTML(slide, i === 0);
  }).join('');

  var dotsHtml = HERO_SLIDES.map(function (slide, i) {
    return (
      '<button type="button" class="carousel__dot' +
      (i === 0 ? ' carousel__dot--active' : '') +
      '" aria-label="Go to slide ' +
      (i + 1) +
      ' of ' +
      HERO_SLIDES.length +
      '"' +
      (i === 0 ? ' aria-current="true"' : '') +
      '></button>'
    );
  }).join('');

  container.innerHTML =
    '<div class="carousel carousel--hero" role="region" aria-label="Featured promotions" tabindex="0" data-interval="5000">' +
    '<div class="carousel__track" aria-live="polite">' +
    slidesHtml +
    '</div>' +
    '<button type="button" class="carousel__prev" aria-label="Previous slide">&lsaquo;</button>' +
    '<button type="button" class="carousel__next" aria-label="Next slide">&rsaquo;</button>' +
    '<div class="carousel__dots">' +
    dotsHtml +
    '</div>' +
    '<div class="carousel__counter" aria-hidden="true">' +
    '<span class="carousel__counter-current">1</span> / ' +
    HERO_SLIDES.length +
    '</div></div>';

  initCarousel(container.querySelector('.carousel'));
}
