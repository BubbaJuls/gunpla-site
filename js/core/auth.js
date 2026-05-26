/** Temporary client-side auth for school project demo — not secure. */
var AUTH_SESSION_KEY = 'gunpla_auth_session';
var AUTH_USERS_KEY = 'gunpla_registered_users';

var DEMO_USERS = [
  {
    email: 'demo@gunplahobby.ph',
    password: 'demo123',
    name: 'Demo Builder',
  },
  {
    email: 'student@example.com',
    password: 'build2029',
    name: 'Student Account',
  },
];

function normalizeEmail(email) {
  return String(email || '')
    .trim()
    .toLowerCase();
}

function getRegisteredUsers() {
  try {
    var raw = localStorage.getItem(AUTH_USERS_KEY);
    if (!raw) return [];
    var list = JSON.parse(raw);
    return Array.isArray(list) ? list : [];
  } catch (err) {
    return [];
  }
}

function saveRegisteredUsers(users) {
  localStorage.setItem(AUTH_USERS_KEY, JSON.stringify(users));
}

function emailExists(email) {
  var norm = normalizeEmail(email);
  var i;
  for (i = 0; i < DEMO_USERS.length; i++) {
    if (DEMO_USERS[i].email === norm) return true;
  }
  var registered = getRegisteredUsers();
  for (i = 0; i < registered.length; i++) {
    if (registered[i].email === norm) return true;
  }
  return false;
}

function findUser(email, password) {
  var norm = normalizeEmail(email);
  var all = DEMO_USERS.concat(getRegisteredUsers());
  for (var i = 0; i < all.length; i++) {
    var user = all[i];
    if (user.email === norm && user.password === password) return user;
  }
  return null;
}

function getAuthSession() {
  try {
    var raw = sessionStorage.getItem(AUTH_SESSION_KEY);
    if (!raw) return null;
    var session = JSON.parse(raw);
    if (!session || !session.email) return null;
    return session;
  } catch (err) {
    return null;
  }
}

function isLoggedIn() {
  return !!getAuthSession();
}

function setAuthSession(user) {
  var session = {
    email: user.email,
    name: user.name,
    loggedInAt: new Date().toISOString(),
  };
  sessionStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(session));
  document.dispatchEvent(new CustomEvent('auth-changed', { detail: { session: session } }));
  return session;
}

function clearAuthSession() {
  sessionStorage.removeItem(AUTH_SESSION_KEY);
  document.dispatchEvent(new CustomEvent('auth-changed', { detail: { session: null } }));
}

function loginWithCredentials(email, password) {
  var user = findUser(email, password);
  if (!user) {
    return {
      ok: false,
      error: 'Invalid email or password. Try again or use a demo account on the sign-in page.',
    };
  }
  return { ok: true, session: setAuthSession(user) };
}

function registerUser(name, email, password, confirmPassword) {
  name = String(name || '').trim();
  email = normalizeEmail(email);
  password = String(password || '');
  confirmPassword = String(confirmPassword || '');

  if (name.length < 2) {
    return { ok: false, error: 'Please enter your full name (at least 2 characters).' };
  }
  if (!email || email.indexOf('@') < 1) {
    return { ok: false, error: 'Please enter a valid email address.' };
  }
  if (password.length < 6) {
    return { ok: false, error: 'Password must be at least 6 characters.' };
  }
  if (password !== confirmPassword) {
    return { ok: false, error: 'Passwords do not match.' };
  }
  if (emailExists(email)) {
    return { ok: false, error: 'An account with this email already exists. Try signing in instead.' };
  }

  var user = { name: name, email: email, password: password };
  var users = getRegisteredUsers();
  users.push(user);
  saveRegisteredUsers(users);

  return { ok: true, session: setAuthSession(user) };
}

function logout() {
  clearAuthSession();
}

function getAuthRedirect(defaultPage) {
  try {
    var params = new URLSearchParams(window.location.search);
    var next = params.get('next');
    if (
      next &&
      next.indexOf('login') < 0 &&
      next.indexOf('register') < 0 &&
      !/^https?:/i.test(next)
    ) {
      return next;
    }
  } catch (err) {
    /* ignore */
  }
  return defaultPage || 'shop.html';
}

function getLoginRedirect() {
  return getAuthRedirect('shop.html');
}

function getRegisterRedirect() {
  return getAuthRedirect('shop.html');
}
