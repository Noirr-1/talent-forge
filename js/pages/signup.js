document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#signupForm');
  if (!form) return;

  const roleSelect = form.querySelector('[name="role"]');
  const requestedRole = new URLSearchParams(window.location.search).get('role');

  if (roleSelect && ['freelancer', 'client'].includes(requestedRole)) {
    roleSelect.value = requestedRole;
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const data = AC.formToObject(form);

    if (data.password !== data.confirmPassword) {
      AC.toast('Passwords do not match');
      return;
    }

    AC.updateStore({
      account: {
        email: data.email,
        role: data.role
      }
    });

    location.href = data.role === 'client'
      ? 'client/signup.html'
      : 'freelancer/welcome.html';
  });
});
