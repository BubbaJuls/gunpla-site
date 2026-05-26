function initLoginPage() {
  var form = document.getElementById('login-form');
  var errorEl = document.getElementById('login-error');

  if (isLoggedIn()) {
    window.location.replace(getLoginRedirect());
    return;
  }

  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (errorEl) {
      errorEl.hidden = true;
      errorEl.textContent = '';
    }

    var result = loginWithCredentials(form.email.value, form.password.value);
    if (!result.ok) {
      if (errorEl) {
        errorEl.textContent = result.error;
        errorEl.hidden = false;
      } else {
        showToast(result.error);
      }
      return;
    }

    showToast('Welcome back, ' + result.session.name + '!');
    window.location.href = getLoginRedirect();
  });

  var demoBtns = document.querySelectorAll('[data-demo-login]');
  demoBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      form.email.value = btn.getAttribute('data-email');
      form.password.value = btn.getAttribute('data-password');
      if (errorEl) errorEl.hidden = true;
    });
  });
}
