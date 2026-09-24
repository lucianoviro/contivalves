/* Mobile menu, Escape closes desktop menus, click-to-load YouTube. */
(function () {
  const burger = document.querySelector('.burger');
  const panel = document.getElementById('mobile-nav');
  if (burger && panel) {
    burger.addEventListener('click', () => {
      const open = burger.getAttribute('aria-expanded') === 'true';
      burger.setAttribute('aria-expanded', String(!open));
      panel.hidden = open;
      document.body.classList.toggle('nav-open', !open);
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.activeElement instanceof HTMLElement && document.activeElement.closest('.has-menu')) {
      document.activeElement.blur();
    }
  });
  document.querySelectorAll('.yt').forEach((el) => {
    const btn = el.querySelector('button');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const iframe = document.createElement('iframe');
      iframe.src = 'https://www.youtube-nocookie.com/embed/' + el.dataset.id + '?autoplay=1&rel=0';
      iframe.title = el.dataset.title || '';
      iframe.allow = 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture';
      iframe.allowFullscreen = true;
      el.replaceChildren(iframe);
    });
  });
  document.querySelectorAll('[data-print]').forEach((b) => b.addEventListener('click', () => window.print()));
})();
