function initRegisterPage() {
  var form = document.getElementById('register-form');
  var errorEl = document.getElementById('register-error');

  if (isLoggedIn()) {
    window.location.replace(getRegisterRedirect());
    return;
  }

  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (errorEl) {
      errorEl.hidden = true;
      errorEl.textContent = '';
    }

    var result = registerUser(
      form.name.value,
      form.email.value,
      form.password.value,
      form.confirmPassword.value
    );

    if (!result.ok) {
      if (errorEl) {
        errorEl.textContent = result.error;
        errorEl.hidden = false;
      } else {
        showToast(result.error);
      }
      return;
    }

    showToast('Account created! Welcome, ' + result.session.name + '.');
    window.location.href = getRegisterRedirect();
  });
}
