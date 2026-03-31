// ═══════════════════════════════════════
//  BHARANI PORTFOLIO — Shared JS
//  Theme toggle + Mobile hamburger
// ═══════════════════════════════════════

(function () {
  // ── 1. THEME ──────────────────────────
  function applyTheme(dark) {
    document.body.classList.toggle('dark-mode', dark);
    const sw = document.getElementById('switch');
    if (sw) sw.checked = dark;
  }

  const savedTheme = localStorage.getItem('bh-theme');
  // Default = dark if no preference saved
  const isDark = savedTheme === null ? true : savedTheme === 'dark';
  applyTheme(isDark);

  document.addEventListener('DOMContentLoaded', function () {
    const sw = document.getElementById('switch');
    if (sw) {
      sw.checked = document.body.classList.contains('dark-mode');
      sw.addEventListener('change', function () {
        applyTheme(this.checked);
        localStorage.setItem('bh-theme', this.checked ? 'dark' : 'light');
      });
    }

    // ── 2. HAMBURGER ──────────────────────
    const burger = document.getElementById('hamburger');
    const drawer = document.getElementById('mobileDrawer');
    if (burger && drawer) {
      burger.addEventListener('click', function () {
        const open = drawer.classList.toggle('open');
        burger.classList.toggle('open', open);
        document.body.style.overflow = open ? 'hidden' : '';
      });
      // Close on link click
      drawer.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
          drawer.classList.remove('open');
          burger.classList.remove('open');
          document.body.style.overflow = '';
        });
      });
    }

    // ── 3. SCROLL-IN ANIMATIONS ──────────
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          const delay = parseFloat(e.target.dataset.delay || 0);
          setTimeout(() => {
            e.target.style.opacity = '1';
            e.target.style.transform = 'translateY(0) translateX(0)';
          }, delay * 1000);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('[data-anim]').forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(24px)';
      el.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
      observer.observe(el);
    });
  });
})();
