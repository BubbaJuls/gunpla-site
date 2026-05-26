var CHATBOT_FAQ = [
  {
    keys: ['hello', 'hi', 'hey', 'help', 'start'],
    answer:
      'Hi! I\'m the Gunpla Hobby PH assistant. Ask about shipping, payments, grades in stock, or how to order—or tap a quick question below.',
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
      '<strong>Real Grade (RG)</strong> kits are in stock now. Browse the <a href="catalog.html">shop</a> or filter by RG. HG, MG, and PG lines are coming soon.',
  },
  {
    keys: ['hg', 'high grade', 'mg', 'master grade', 'pg', 'perfect grade', 'coming soon'],
    answer:
      'HG, MG, and PG kits are marked <strong>Coming Soon</strong> while we prepare listings. RG kits are available to order today.',
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
    keys: ['price', 'cost', 'expensive', 'sale', 'discount'],
    answer:
      'Prices are listed in Philippine Pesos (₱) on each kit. Look for sale badges on product cards—some kits show an original price with a discount.',
  },
];

var CHATBOT_QUICK_REPLIES = [
  'Free shipping?',
  'What grades are in stock?',
  'How do I order?',
  'Payment methods',
  'Contact support',
];

function chatbotNormalize(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function chatbotFindAnswer(message) {
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
    'I\'m not sure about that yet. Try asking about <strong>shipping</strong>, <strong>payments</strong>, <strong>RG kits</strong>, or <strong>how to order</strong>—or <a href="contact.html">contact our team</a> for anything else.'
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
    '<img src="public/images/logo.png" alt="" width="28" height="28" class="chatbot-panel__logo" />' +
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
        'Hello! 👋 I can help with shipping, payments, RG kits in stock, and how to order. What would you like to know?',
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
