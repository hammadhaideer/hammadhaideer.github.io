(function () {
  const heroLayoutStyle = document.createElement('style');
  heroLayoutStyle.textContent = `
    @media (min-width: 981px) {
      .hero-content {
        grid-template-areas:
          "identity profile"
          "details profile"
          "actions actions";
        grid-template-columns: minmax(0, 1.05fr) minmax(22rem, .95fr);
      }
      .hero-profile-column { justify-self: end; }
      .profile-portrait { justify-self: end; }
    }
  `;
  document.head.appendChild(heroLayoutStyle);

  const year = document.querySelector('[data-year]');
  if (year) year.textContent = new Date().getFullYear();

  const copyButton = document.querySelector('[data-copy-email]');
  const copyStatus = document.querySelector('[data-copy-status]');
  if (!copyButton) return;

  copyButton.addEventListener('click', async function () {
    const email = copyButton.getAttribute('data-copy-email');
    if (!email) return;
    let copied = false;

    try {
      await navigator.clipboard.writeText(email);
      copied = true;
    } catch (_) {
      const field = document.createElement('textarea');
      field.value = email;
      field.setAttribute('readonly', '');
      field.style.position = 'fixed';
      field.style.left = '-9999px';
      document.body.appendChild(field);
      field.select();
      try { copied = document.execCommand('copy'); } catch (_) {}
      field.remove();
    }

    copyButton.classList.toggle('is-copied', copied);
    copyButton.setAttribute('aria-label', copied ? 'Email copied' : 'Copy email');
    if (copyStatus) copyStatus.textContent = copied ? 'Email address copied to clipboard.' : 'Could not copy email address.';

    window.setTimeout(function () {
      copyButton.classList.remove('is-copied');
      copyButton.setAttribute('aria-label', 'Copy email address');
    }, 1800);
  });
})();
