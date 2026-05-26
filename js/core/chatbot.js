var CHATBOT_FAQ = [
  {
    keys: ['hello', 'hi', 'hey', 'help', 'start'],
    answer:
      'Hi! I\'m the Gunpla Hobby PH assistant. We\'re running a <strong>Road to 50 Flash Sale</strong> ahead of the Gundam 50th in 2029—ask about shipping, payments, grades in stock, or how to order.',
  },
  {
    keys: ['ship', 'shipping', 'delivery', 'courier', 'free shipping'],
    answer:
      'Shipping is ₱150 nationwide. Orders over ₱3,000 qualify for <strong>free shipping</strong>. We pack kits carefully to protect runners and v-fins.',
  },
  {
    keys: ['pay', 'payment', 'gcash', 'maya', 'cod', 'card'],
    answer:
      'We accept <strong>COD</strong>, <strong>GCash</strong>, <strong>Maya</strong>, bank transfer, and credit card at checkout.',
  },
  {
    keys: ['rg', 'real grade', 'in stock', 'available', 'catalog', 'shop'],
    answer:
      'We stock <strong>HG, RG, MG, and PG</strong> kits. Browse the <a href="catalog.html">shop</a> or filter by grade (e.g. <a href="catalog.html?grade=RG">RG</a>, <a href="catalog.html?grade=MG">MG</a>).',
  },
  {
    keys: ['hg', 'high grade', 'mg', 'master grade', 'pg', 'perfect grade'],
    answer:
      '<strong>HG</strong> (10 kits), <strong>MG</strong> (10 kits), and <strong>PG</strong> (5 kits) are in stock alongside RG. Use grade filters on the <a href="catalog.html">catalog</a> page.',
  },
  {
    keys: ['order', 'buy', 'checkout', 'cart', 'purchase', 'how to order'],
    answer:
      'Add kits to your <a href="cart.html">cart</a>, then proceed to <a href="checkout.html">checkout</a>. Your cart is saved in your browser until you check out.',
  },
  {
    keys: ['authentic', 'bandai', 'bootleg', 'fake', 'original'],
    answer:
      'All kits sold here are <strong>authentic Bandai Gunpla</strong>. We do not sell bootlegs or recasts.',
  },
  {
    keys: ['return', 'refund', 'exchange', 'damaged', 'broken'],
    answer:
      'For damaged or missing parts, email <a href="mailto:hello@gunplahobby.ph">hello@gunplahobby.ph</a> with your order details and photos. We\'ll help you as soon as we can.',
  },
  {
    keys: ['track', 'status', 'where is my order', 'order status'],
    answer:
      'Order tracking isn\'t automated on the site yet. For status updates, use the <a href="contact.html">contact form</a> and choose <strong>Order Status</strong>.',
  },
  {
    keys: ['contact', 'email', 'phone', 'human', 'agent', 'support'],
    answer:
      'Reach us at <a href="mailto:hello@gunplahobby.ph">hello@gunplahobby.ph</a> or via the <a href="contact.html">contact page</a>. Hours: Mon–Sat, 9:00 AM – 6:00 PM (PHT).',
  },
  {
    keys: ['hours', 'open', 'time', 'when'],
    answer: 'We reply Mon–Sat, <strong>9:00 AM – 6:00 PM (PHT)</strong>. Messages outside hours are answered on the next business day.',
  },
  {
    keys: ['review', 'rating', 'stars'],
    answer:
      'You can leave a star rating and review on any product page under <strong>Customer Reviews</strong>.',
  },
  {
    keys: ['sale', 'discount', 'flash sale', 'on sale'],
    answer:
      'We\'re running a <strong>Road to 50 Flash Sale</strong> ahead of the 50th in 2029. Many kits show round discounts (20%, 30%, 40%, 50%) on product cards and detail pages.',
  },
  {
    keys: ['price list', 'how much are', 'how much do', 'pricing'],
    answer:
      'Ask me about a specific kit—e.g. <em>How much is Strike Freedom RG?</em> or <em>HG Barbatos price</em>. Prices are in Philippine Pesos (₱) with flash-sale discounts on many kits.',
  },
];

var CHATBOT_QUICK_REPLIES = [
  'How much is Strike Freedom RG?',
  'HG Barbatos price',
  'Free shipping?',
  'What grades are in stock?',
  'How do I order?',
];

var CHATBOT_GRADE_ALIASES = {
  hg: 'HG',
  'high grade': 'HG',
  rg: 'RG',
  'real grade': 'RG',
  mg: 'MG',
  'master grade': 'MG',
  pg: 'PG',
  'perfect grade': 'PG',
};

var CHATBOT_STOP_WORDS =
  'how much is how much are how much does how much do what is whats what s the a an is are for of price cost worth at in stock do you have can i get tell me about kit gunpla gundam mobile suit';

function chatbotNormalize(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function chatbotExtractGrade(norm) {
  var found = null;
  Object.keys(CHATBOT_GRADE_ALIASES).forEach(function (alias) {
    if (norm.indexOf(alias) >= 0) found = CHATBOT_GRADE_ALIASES[alias];
  });
  return found;
}

function chatbotQueryTokens(norm) {
  var grade = chatbotExtractGrade(norm);
  var cleaned = norm;

  Object.keys(CHATBOT_GRADE_ALIASES).forEach(function (alias) {
    cleaned = cleaned.replace(new RegExp('\\b' + alias.replace(/ /g, '\\s+') + '\\b', 'g'), ' ');
  });

  CHATBOT_STOP_WORDS.split(' ').forEach(function (word) {
    if (word.length < 2) return;
    cleaned = cleaned.replace(new RegExp('\\b' + word + '\\b', 'g'), ' ');
  });

  return {
    grade: grade,
    tokens: cleaned
      .replace(/\s+/g, ' ')
      .trim()
      .split(' ')
      .filter(function (t) {
        return t.length > 1;
      }),
  };
}

function chatbotScoreProduct(product, tokens) {
  if (!tokens.length) return 0;

  var haystack = (product.name + ' ' + product.slug.replace(/-/g, ' ')).toLowerCase();
  var score = 0;

  tokens.forEach(function (token) {
    if (haystack.indexOf(token) >= 0) score += token.length >= 4 ? 3 : 2;
  });

  if (tokens.length >= 2) {
    var phrase = tokens.join(' ');
    if (haystack.indexOf(phrase) >= 0) score += 6;
  }

  return score;
}

function chatbotFindProductMatches(norm) {
  if (typeof PRODUCTS === 'undefined') return [];

  var parsed = chatbotQueryTokens(norm);
  var tokens = parsed.tokens;
  var gradeFilter = parsed.grade;

  if (tokens.length === 0) return [];

  var matches = PRODUCTS.map(function (product) {
    return { product: product, score: chatbotScoreProduct(product, tokens) };
  })
    .filter(function (m) {
      return m.score > 0;
    })
    .sort(function (a, b) {
      return b.score - a.score;
    });

  if (gradeFilter) {
    var gradeMatches = matches.filter(function (m) {
      return m.product.grade === gradeFilter;
    });
    if (gradeMatches.length) return gradeMatches.slice(0, 4);
    return matches.slice(0, 4);
  }

  return matches.slice(0, 4);
}

function chatbotFormatProductPrice(product) {
  var discount = discountPercent(product);
  var priceLine =
    '<strong>' +
    formatPrice(product.price) +
    '</strong>' +
    (discount > 0
      ? ' <span class="chatbot-price__was">was ' +
        formatPrice(product.originalPrice) +
        '</span> <span class="chatbot-price__off">-' +
        discount +
        '% flash sale</span>'
      : '');

  return (
    '<p class="chatbot-product-line">' +
    '<a href="' +
    productDetailUrl(product) +
    '"><strong>' +
    product.name +
    '</strong> (' +
    product.grade +
    ')</a><br />' +
    priceLine +
    '</p>'
  );
}

function chatbotAnswerProductQuery(message) {
  var norm = chatbotNormalize(message);
  if (!norm) return null;

  var wantsPrice =
    /\b(price|cost|how much|worth|peso|php|₱)\b/.test(norm) ||
    norm.indexOf('how much') >= 0;

  if (!wantsPrice && chatbotExtractGrade(norm) && chatbotQueryTokens(norm).tokens.length >= 2) {
    wantsPrice = true;
  }

  if (!wantsPrice) return null;

  var parsed = chatbotQueryTokens(norm);
  var gradeFilter = parsed.grade;
  var matches = chatbotFindProductMatches(norm);

  if (!matches.length) {
    if (parsed.tokens.length < 2) return null;
    return (
      'I couldn\'t find a kit matching <strong>' +
      parsed.tokens.join(' ') +
      '</strong>' +
      (gradeFilter ? ' in <strong>' + gradeFilter + '</strong>' : '') +
      '. Try the <a href="catalog.html">catalog</a> or ask like <em>How much is Nu Gundam HG?</em>'
    );
  }

  var top = matches[0];
  var sameName = matches.filter(function (m) {
    return m.product.name === top.product.name;
  });

  if (gradeFilter) {
    var exactGrade = matches.filter(function (m) {
      return m.product.grade === gradeFilter && m.score >= top.score - 1;
    });
    if (!exactGrade.length) {
      var available = sameName.length ? sameName : matches;
      var grades = [];
      available.forEach(function (m) {
        if (grades.indexOf(m.product.grade) < 0) grades.push(m.product.grade);
      });
      return (
        'We don\'t have <strong>' +
        top.product.name +
        '</strong> in <strong>' +
        gradeFilter +
        '</strong>. We stock it in <strong>' +
        grades.join(', ') +
        '</strong>:<br />' +
        available
          .map(function (m) {
            return chatbotFormatProductPrice(m.product);
          })
          .join('')
      );
    }
    if (exactGrade.length === 1) {
      return (
        'Here\'s the price for <strong>' +
        exactGrade[0].product.name +
        ' (' +
        gradeFilter +
        ')</strong>:<br />' +
        chatbotFormatProductPrice(exactGrade[0].product)
      );
    }
    return (
      'Matches for <strong>' +
      parsed.tokens.join(' ') +
      ' (' +
      gradeFilter +
      ')</strong>:<br />' +
      exactGrade
        .map(function (m) {
          return chatbotFormatProductPrice(m.product);
        })
        .join('')
    );
  }

  if (sameName.length > 1 && sameName[0].score >= 4) {
    return (
      '<strong>' +
      top.product.name +
      '</strong> is available in several grades:<br />' +
      sameName
        .map(function (m) {
          return chatbotFormatProductPrice(m.product);
        })
        .join('')
    );
  }

  if (top.score >= 4) {
    return (
      'Here\'s what I found for <strong>' +
      parsed.tokens.join(' ') +
      '</strong>:<br />' +
      chatbotFormatProductPrice(top.product)
    );
  }

  return (
    'Did you mean one of these?<br />' +
    matches
      .slice(0, 3)
      .map(function (m) {
        return chatbotFormatProductPrice(m.product);
      })
      .join('')
  );
}

function chatbotFindAnswer(message) {
  var productAnswer = chatbotAnswerProductQuery(message);
  if (productAnswer) return productAnswer;

  var norm = chatbotNormalize(message);
  if (!norm) return null;

  var best = null;
  var bestScore = 0;

  CHATBOT_FAQ.forEach(function (entry) {
    var score = 0;
    entry.keys.forEach(function (key) {
      if (norm.indexOf(key) >= 0) score += key.split(' ').length;
    });
    if (score > bestScore) {
      bestScore = score;
      best = entry.answer;
    }
  });

  return bestScore > 0 ? best : null;
}

function chatbotDefaultAnswer() {
  return (
    'I\'m not sure about that yet. Try asking <em>How much is Strike Freedom RG?</em> or about <strong>shipping</strong>, <strong>payments</strong>, and <strong>how to order</strong>—or <a href="contact.html">contact our team</a>.'
  );
}

function initChatbot() {
  if (document.getElementById('chatbot-root')) return;

  var root = document.createElement('div');
  root.id = 'chatbot-root';
  root.innerHTML =
    '<button type="button" class="chatbot-toggle" id="chatbot-toggle" aria-expanded="false" aria-controls="chatbot-panel" aria-label="Open chat assistant">' +
    '<span class="chatbot-toggle__icon" aria-hidden="true">💬</span>' +
    '<span class="chatbot-toggle__label">Chat</span></button>' +
    '<div class="chatbot-panel" id="chatbot-panel" role="dialog" aria-label="Gunpla Hobby PH assistant" hidden>' +
    '<header class="chatbot-panel__head">' +
    '<div class="chatbot-panel__title">' +
    '<img src="resources/brand/logo.png" alt="" width="28" height="28" class="chatbot-panel__logo" />' +
    '<div><strong>Gunpla Hobby PH</strong><span>Usually replies instantly</span></div></div>' +
    '<button type="button" class="chatbot-panel__close" id="chatbot-close" aria-label="Close chat">&times;</button>' +
    '</header>' +
    '<div class="chatbot-panel__messages" id="chatbot-messages" role="log" aria-live="polite"></div>' +
    '<div class="chatbot-panel__quick" id="chatbot-quick"></div>' +
    '<form class="chatbot-panel__form" id="chatbot-form">' +
    '<input type="text" id="chatbot-input" autocomplete="off" placeholder="Ask about shipping, orders, kits…" aria-label="Your message" maxlength="400" />' +
    '<button type="submit" class="btn btn--primary btn--sm">Send</button>' +
    '</form></div>';

  document.body.appendChild(root);

  var toggle = document.getElementById('chatbot-toggle');
  var panel = document.getElementById('chatbot-panel');
  var closeBtn = document.getElementById('chatbot-close');
  var messages = document.getElementById('chatbot-messages');
  var quick = document.getElementById('chatbot-quick');
  var form = document.getElementById('chatbot-form');
  var input = document.getElementById('chatbot-input');

  function renderQuickReplies() {
    quick.innerHTML = CHATBOT_QUICK_REPLIES.map(function (label) {
      return (
        '<button type="button" class="chatbot-quick__btn" data-quick="' +
        label.replace(/"/g, '&quot;') +
        '">' +
        label +
        '</button>'
      );
    }).join('');
  }

  function appendMessage(text, role) {
    var bubble = document.createElement('div');
    bubble.className = 'chatbot-msg chatbot-msg--' + role;
    bubble.innerHTML = text;
    messages.appendChild(bubble);
    messages.scrollTop = messages.scrollHeight;
  }

  function botReply(userText) {
    window.setTimeout(function () {
      var answer = chatbotFindAnswer(userText) || chatbotDefaultAnswer();
      appendMessage(answer, 'bot');
    }, 350);
  }

  function sendUserMessage(text) {
    var trimmed = (text || '').trim();
    if (!trimmed) return;
    appendMessage(trimmed.replace(/</g, '&lt;').replace(/>/g, '&gt;'), 'user');
    input.value = '';
    botReply(trimmed);
  }

  function openChat() {
    panel.hidden = false;
    toggle.setAttribute('aria-expanded', 'true');
    if (!messages.dataset.ready) {
      messages.dataset.ready = '1';
      appendMessage(
        'Hello! 👋 Ask me kit prices (e.g. <em>How much is Strike Freedom RG?</em>), or about shipping, payments, and how to order.',
        'bot'
      );
      renderQuickReplies();
    }
    input.focus();
  }

  function closeChat() {
    panel.hidden = true;
    toggle.setAttribute('aria-expanded', 'false');
    toggle.focus();
  }

  toggle.addEventListener('click', function () {
    if (panel.hidden) openChat();
    else closeChat();
  });
  closeBtn.addEventListener('click', closeChat);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !panel.hidden) closeChat();
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    sendUserMessage(input.value);
  });

  quick.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-quick]');
    if (!btn) return;
    sendUserMessage(btn.getAttribute('data-quick'));
  });
}
