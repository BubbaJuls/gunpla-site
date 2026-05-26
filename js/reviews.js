var REVIEWS_KEY = 'gunpla-reviews';

function getSeedReviewsForProduct(productId) {
  if (typeof SEED_REVIEWS === 'undefined') return [];
  return SEED_REVIEWS.filter(function (r) {
    return r.productId === String(productId);
  });
}

var Reviews = {
  getAll: function () {
    try {
      var raw = localStorage.getItem(REVIEWS_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  },

  saveAll: function (reviews) {
    localStorage.setItem(REVIEWS_KEY, JSON.stringify(reviews));
  },

  getUserReviewsForProduct: function (productId) {
    return this.getAll().filter(function (r) {
      return r.productId === String(productId);
    });
  },

  getForProduct: function (productId) {
    var user = this.getUserReviewsForProduct(productId);
    var seed = getSeedReviewsForProduct(productId);
    return user
      .concat(seed)
      .sort(function (a, b) {
        return new Date(b.date) - new Date(a.date);
      });
  },

  add: function (productId, data) {
    var reviews = this.getAll();
    var review = {
      id: String(Date.now()),
      productId: String(productId),
      rating: Math.min(5, Math.max(1, Math.round(data.rating))),
      author: (data.author || 'Anonymous').trim().slice(0, 40) || 'Anonymous',
      title: (data.title || '').trim().slice(0, 80),
      body: (data.body || '').trim().slice(0, 1000),
      date: new Date().toISOString(),
    };
    reviews.unshift(review);
    this.saveAll(reviews);
    return review;
  },

  getStats: function (productId, catalogRating) {
    var reviews = this.getForProduct(productId);
    if (reviews.length === 0) {
      return {
        average: catalogRating,
        count: 0,
        reviews: [],
        hasReviews: false,
      };
    }
    var sum = reviews.reduce(function (s, r) {
      return s + r.rating;
    }, 0);
    return {
      average: Math.round((sum / reviews.length) * 10) / 10,
      count: reviews.length,
      reviews: reviews,
      hasReviews: true,
    };
  },
};

function escapeHtml(text) {
  var div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function formatReviewDate(iso) {
  try {
    return new Date(iso).toLocaleDateString('en-PH', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch (e) {
    return '';
  }
}

function renderStarInput(name, required) {
  var html =
    '<div class="star-input" data-star-input role="radiogroup" aria-label="Your rating">' +
    '<input type="hidden" name="' +
    name +
    '" value="0"' +
    (required ? ' required' : '') +
    ' data-rating-input />';
  for (var i = 1; i <= 5; i++) {
    html +=
      '<button type="button" class="star-input__btn" data-star-btn="' +
      i +
      '" aria-label="' +
      i +
      ' star' +
      (i === 1 ? '' : 's') +
      '">★</button>';
  }
  html += '<span class="star-input__hint">Select a rating</span></div>';
  return html;
}

function initStarInput(container) {
  if (!container) return;
  var hidden = container.querySelector('[data-rating-input]');
  var buttons = container.querySelectorAll('.star-input__btn');
  var hint = container.querySelector('.star-input__hint');

  function setValue(value) {
    var v = parseInt(value, 10) || 0;
    hidden.value = v;
    buttons.forEach(function (btn) {
      var star = parseInt(btn.getAttribute('data-star-btn'), 10);
      btn.classList.toggle('star-input__btn--active', star <= v && v > 0);
    });
    if (hint) {
      hint.textContent = v > 0 ? v + ' star' + (v === 1 ? '' : 's') : 'Select a rating';
    }
  }

  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      setValue(btn.getAttribute('data-star-btn'));
    });
    btn.addEventListener('mouseenter', function () {
      var hover = parseInt(btn.getAttribute('data-star-btn'), 10);
      buttons.forEach(function (b) {
        var star = parseInt(b.getAttribute('data-star-btn'), 10);
        b.classList.toggle('star-input__btn--hover', star <= hover);
      });
    });
  });

  container.addEventListener('mouseleave', function () {
    buttons.forEach(function (b) {
      b.classList.remove('star-input__btn--hover');
    });
    setValue(hidden.value);
  });

  setValue(0);
}

function getProductRatingDisplay(product) {
  if (typeof Reviews === 'undefined') {
    return {
      average: product.rating,
      count: 0,
      reviews: [],
      hasReviews: false,
    };
  }
  return Reviews.getStats(product.id, product.rating);
}

function renderRatingLine(stats, sold) {
  var soldText = sold != null ? ' · <span>' + sold + ' sold</span>' : '';
  if (stats.hasReviews && stats.count > 0) {
    return (
      renderStars(stats.average) +
      '<span><strong>' +
      stats.average +
      '</strong></span> · <span>' +
      stats.count +
      ' review' +
      (stats.count === 1 ? '' : 's') +
      '</span>' +
      soldText
    );
  }
  return (
    renderStars(stats.average) +
    '<span>' +
    stats.average +
    '</span>' +
    soldText
  );
}

function buildReviewsSection(product) {
  var stats = Reviews.getStats(product.id, product.rating);

  var listHtml = '';
  if (stats.reviews.length === 0) {
    listHtml = '<p class="reviews__empty">No reviews yet. Be the first to share your build experience!</p>';
  } else {
    listHtml =
      '<ul class="reviews__list">' +
      stats.reviews
        .map(function (r) {
          return (
            '<li class="review-card">' +
            '<div class="review-card__head">' +
            '<div class="review-card__stars" aria-label="' +
            r.rating +
            ' out of 5 stars">' +
            renderStars(r.rating) +
            '</div>' +
            '<time class="review-card__date" datetime="' +
            r.date +
            '">' +
            formatReviewDate(r.date) +
            '</time></div>' +
            (r.title ? '<h3 class="review-card__title">' + escapeHtml(r.title) + '</h3>' : '') +
            (r.body ? '<p class="review-card__body">' + escapeHtml(r.body) + '</p>' : '') +
            '<p class="review-card__author">— ' +
            escapeHtml(r.author) +
            '</p></li>'
          );
        })
        .join('') +
      '</ul>';
  }

  return (
    '<section class="product-reviews content-card" id="product-reviews" aria-labelledby="reviews-heading">' +
    '<div class="product-reviews__head">' +
    '<div><h2 id="reviews-heading">Customer Reviews</h2>' +
    '<p class="product-reviews__summary">' +
    (stats.hasReviews
      ? '<span class="product-reviews__avg">' +
        stats.average +
        '</span> out of 5 · ' +
        stats.count +
        ' review' +
        (stats.count === 1 ? '' : 's')
      : 'Share your rating and help other builders.') +
    '</p></div>' +
    (stats.hasReviews
      ? '<div class="product-reviews__summary-stars" aria-hidden="true">' +
        renderStars(stats.average) +
        '</div>'
      : '') +
    '</div>' +
    listHtml +
    '<div class="review-form-wrap">' +
    '<h3 class="review-form__title">Write a review</h3>' +
    '<form class="review-form" id="review-form" novalidate>' +
    '<div class="review-form__field">' +
    '<label>Your rating <span class="required">*</span></label>' +
    renderStarInput('rating', true) +
    '</div>' +
    '<div class="review-form__row">' +
    '<div class="review-form__field">' +
    '<label for="review-author">Your name</label>' +
    '<input type="text" id="review-author" name="author" maxlength="40" placeholder="Builder name" autocomplete="name" />' +
    '</div>' +
    '<div class="review-form__field">' +
    '<label for="review-title">Review title</label>' +
    '<input type="text" id="review-title" name="title" maxlength="80" placeholder="e.g. Great articulation!" />' +
    '</div></div>' +
    '<div class="review-form__field">' +
    '<label for="review-body">Your review</label>' +
    '<textarea id="review-body" name="body" rows="4" maxlength="1000" placeholder="How was the build quality, parts fit, and final look?"></textarea>' +
    '</div>' +
    '<button type="submit" class="btn btn--primary">Submit Review</button>' +
    '</form></div></section>'
  );
}

function initReviewsSection(product, onUpdate) {
  var mount = document.getElementById('product-reviews-mount');
  if (!mount) return;

  mount.innerHTML = buildReviewsSection(product);

  var starInput = mount.querySelector('[data-star-input]');
  initStarInput(starInput);

  var form = mount.querySelector('#review-form');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var rating = parseInt(form.querySelector('[data-rating-input]').value, 10);
    if (!rating || rating < 1) {
      showToast('Please select a star rating.');
      return;
    }
    var author = form.querySelector('#review-author').value.trim();
    var title = form.querySelector('#review-title').value.trim();
    var body = form.querySelector('#review-body').value.trim();
    if (!body && !title) {
      showToast('Please add a title or review text.');
      return;
    }

    Reviews.add(product.id, {
      rating: rating,
      author: author,
      title: title,
      body: body,
    });

    showToast('Thank you for your review!');
    if (onUpdate) onUpdate();
    initReviewsSection(product, onUpdate);
  });
}
