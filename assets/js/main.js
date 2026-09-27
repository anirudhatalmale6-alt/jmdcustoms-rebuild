/* JMD Customs Brokers Inc. — static rebuild
   Mobile nav, dropdowns, quote modal, client-side form validation. */
(function () {
  'use strict';

  var MOBILE = 980;
  var isMobile = function () { return window.innerWidth <= MOBILE; };

  /* ---------- Mobile drawer ---------- */
  var burger = document.querySelector('.burger');
  var nav    = document.getElementById('primary-nav');

  if (burger && nav) {
    burger.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  /* ---------- Dropdowns: hover on desktop (CSS), tap on mobile ---------- */
  Array.prototype.forEach.call(document.querySelectorAll('.has-sub > a'), function (link) {
    link.addEventListener('click', function (e) {
      if (!isMobile()) return;           // desktop keeps the CSS hover behaviour
      e.preventDefault();
      var li = link.parentNode;
      // close siblings so only one submenu is open at a time
      Array.prototype.forEach.call(document.querySelectorAll('.has-sub'), function (other) {
        if (other !== li) other.classList.remove('open');
      });
      li.classList.toggle('open');
    });
  });

  // Reset drawer/submenu state when crossing the breakpoint
  var wasMobile = isMobile();
  window.addEventListener('resize', function () {
    var now = isMobile();
    if (now === wasMobile) return;
    wasMobile = now;
    if (nav) nav.classList.remove('open');
    if (burger) burger.setAttribute('aria-expanded', 'false');
    Array.prototype.forEach.call(document.querySelectorAll('.has-sub'), function (li) {
      li.classList.remove('open');
    });
  });

  /* ---------- Quote modal ---------- */
  var modal   = document.getElementById('quote-modal');
  var lastFocus = null;

  function openModal() {
    if (!modal) return;
    lastFocus = document.activeElement;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    var first = modal.querySelector('input, select, textarea, button');
    if (first) first.focus();
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('open');
    document.body.style.overflow = '';
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  Array.prototype.forEach.call(document.querySelectorAll('.js-quote'), function (btn) {
    btn.addEventListener('click', function () {
      if (nav) nav.classList.remove('open');           // close drawer if open
      if (burger) burger.setAttribute('aria-expanded', 'false');
      openModal();
    });
  });

  if (modal) {
    var closeBtn = modal.querySelector('.modal-close');
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    // click the backdrop (not the dialog box) to dismiss
    modal.addEventListener('click', function (e) { if (e.target === modal) closeModal(); });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal && modal.classList.contains('open')) closeModal();
  });

  /* ---------- Form validation ---------- */
  var form = document.getElementById('quote-form');

  function setError(field, msg) {
    var slot = form.querySelector('.err[data-for="' + field.id + '"]');
    if (slot) slot.textContent = msg || '';
    if (msg) field.setAttribute('aria-invalid', 'true');
    else field.removeAttribute('aria-invalid');
  }

  function validateField(field) {
    var val = (field.value || '').trim();

    if (field.hasAttribute('required') && !val) {
      setError(field, 'This field is required.');
      return false;
    }
    if (field.type === 'email' && val && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(val)) {
      setError(field, 'Please enter a valid email address.');
      return false;
    }
    if (field.type === 'tel' && val && val.replace(/\D/g, '').length < 7) {
      setError(field, 'Please enter a valid phone number.');
      return false;
    }
    setError(field, '');
    return true;
  }

  if (form) {
    var fields = form.querySelectorAll('input, select, textarea');

    Array.prototype.forEach.call(fields, function (f) {
      f.addEventListener('blur', function () { validateField(f); });
      f.addEventListener('input', function () {
        if (f.getAttribute('aria-invalid') === 'true') validateField(f);
      });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = true, firstBad = null;

      Array.prototype.forEach.call(fields, function (f) {
        if (!validateField(f)) { ok = false; if (!firstBad) firstBad = f; }
      });

      if (!ok) { if (firstBad) firstBad.focus(); return; }

      // No backend wired yet — confirm in place so the flow is testable.
      var body = modal.querySelector('.modal-body');
      body.innerHTML =
        '<div style="text-align:center;padding:26px 6px">' +
          '<div style="width:70px;height:70px;border-radius:50%;background:#0D9746;' +
               'display:grid;place-items:center;margin:0 auto 20px">' +
            '<svg viewBox="0 0 512 512" style="width:32px;height:32px;fill:#fff">' +
            '<path d="M173 439L7 273a24 24 0 0 1 0-34l34-34a24 24 0 0 1 34 0l115 115L437 79a24 24 0 0 1 34 0l34 34a24 24 0 0 1 0 34L207 439a24 24 0 0 1-34 0z"/></svg>' +
          '</div>' +
          '<h3 style="margin-bottom:10px">Thank you</h3>' +
          '<p style="color:#7A7A7A;margin-bottom:22px">Your request has been captured. Once the form is ' +
            'connected to your inbox, submissions will arrive at pars@jmdcustoms.com.</p>' +
          '<button class="btn" type="button" id="q-done">Close</button>' +
        '</div>';
      var done = document.getElementById('q-done');
      if (done) { done.addEventListener('click', closeModal); done.focus(); }
    });
  }
})();
