/* RESET Pilates Studio - interactivity, dynamic content, validation (Part 3) */
(function () {
  'use strict';

  /* ---------- Settings you can change ---------- */
  // Recipient of the Contact form email (used to build the mailto link).
  var CONTACT_RECIPIENT = 'info@resetpilatesstudio.co.za';
  // AJAX endpoint for the enquiry form (e.g. a Formspree URL). Leave empty to simulate a submission.
  var ENQUIRY_ENDPOINT = '';

  var DATA = window.RESET_DATA || { classes: [], prices: {}, gallery: [] };
  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };
  var money = function (n) { return 'R' + String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' '); };

  document.documentElement.classList.remove('no-js');

  /* ---------- Mobile navigation ---------- */
  var toggle = $('.nav-toggle'), nav = $('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open);
    });
  }

  /* ---------- Scroll reveal animation ---------- */
  var reveals = $$('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('visible'); });
  }

  /* ---------- Gallery + lightbox ---------- */
  var galleryBox = $('[data-gallery]');
  if (galleryBox) {
    var lb = $('.lightbox'), lbImg = $('img', lb), lbCap = $('p', lb), current = 0, lastFocus = null;
    DATA.gallery.forEach(function (item, i) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.setAttribute('aria-label', 'Open photo ' + (i + 1) + ': ' + item.alt);
      var img = document.createElement('img');
      img.src = item.src; img.alt = item.alt; img.loading = 'lazy';
      btn.appendChild(img);
      btn.addEventListener('click', function () { openLb(i); });
      galleryBox.appendChild(btn);
    });
    var showLb = function () {
      lbImg.src = DATA.gallery[current].src;
      lbImg.alt = DATA.gallery[current].alt;
      lbCap.textContent = DATA.gallery[current].alt + ' (' + (current + 1) + '/' + DATA.gallery.length + ')';
    };
    var openLb = function (i) { lastFocus = document.activeElement; current = i; showLb(); lb.classList.add('open'); $('.lb-close', lb).focus(); };
    var closeLb = function () { lb.classList.remove('open'); if (lastFocus) lastFocus.focus(); };
    var step = function (d) { current = (current + d + DATA.gallery.length) % DATA.gallery.length; showLb(); };
    $('.lb-close', lb).addEventListener('click', closeLb);
    $('.lb-prev', lb).addEventListener('click', function () { step(-1); });
    $('.lb-next', lb).addEventListener('click', function () { step(1); });
    lb.addEventListener('click', function (e) { if (e.target === lb) closeLb(); });
    document.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('open')) return;
      if (e.key === 'Escape') closeLb();
      if (e.key === 'ArrowLeft') step(-1);
      if (e.key === 'ArrowRight') step(1);
    });
  }

  /* ---------- Accordion ---------- */
  $$('.accordion-trigger').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var panel = document.getElementById(btn.getAttribute('aria-controls'));
      var expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', !expanded);
      panel.classList.toggle('open', !expanded);
    });
  });

  /* ---------- Tabs ---------- */
  $$('.tabs').forEach(function (tabs) {
    var buttons = $$('[role="tab"]', tabs), panels = $$('[role="tabpanel"]', tabs);
    var select = function (btn) {
      buttons.forEach(function (b) { b.setAttribute('aria-selected', b === btn); b.tabIndex = b === btn ? 0 : -1; });
      panels.forEach(function (p) { p.hidden = p.id !== btn.getAttribute('aria-controls'); });
    };
    buttons.forEach(function (btn, i) {
      btn.addEventListener('click', function () { select(btn); });
      btn.addEventListener('keydown', function (e) {
        var n = null;
        if (e.key === 'ArrowRight') n = buttons[(i + 1) % buttons.length];
        if (e.key === 'ArrowLeft') n = buttons[(i - 1 + buttons.length) % buttons.length];
        if (n) { select(n); n.focus(); }
      });
    });
  });

  /* ---------- Modal ---------- */
  var openModal = null;
  $$('[data-modal-open]').forEach(function (trigger) {
    trigger.addEventListener('click', function () {
      var m = document.getElementById(trigger.getAttribute('data-modal-open'));
      if (!m) return;
      openModal = { el: m, from: trigger };
      m.classList.add('open');
      $('.modal-close', m).focus();
    });
  });
  var closeModal = function () {
    if (!openModal) return;
    openModal.el.classList.remove('open');
    openModal.from.focus();
    openModal = null;
  };
  $$('.modal').forEach(function (m) {
    $('.modal-close', m).addEventListener('click', closeModal);
    m.addEventListener('click', function (e) { if (e.target === m) closeModal(); });
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeModal(); });

  /* ---------- Dynamic timetable: render, search, filter, sort ---------- */
  var list = $('#class-list');
  if (list) {
    var search = $('#class-search'), typeSel = $('#class-type'), sortSel = $('#class-sort'), count = $('#class-count');
    var dayOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    var render = function () {
      var q = search.value.trim().toLowerCase(), type = typeSel.value;
      var items = DATA.classes.filter(function (c) {
        var hay = (c.name + ' ' + c.branch + ' ' + c.day + ' ' + c.level + ' ' + c.description).toLowerCase();
        return (!q || hay.indexOf(q) > -1) && (type === 'all' || c.type === type);
      });
      var by = sortSel.value;
      items.sort(function (a, b) {
        if (by === 'price-asc') return DATA.prices[a.type].single - DATA.prices[b.type].single;
        if (by === 'price-desc') return DATA.prices[b.type].single - DATA.prices[a.type].single;
        if (by === 'name') return a.name.localeCompare(b.name);
        return dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day) || a.time.localeCompare(b.time);
      });
      list.textContent = '';
      items.forEach(function (c) {
        var card = document.createElement('article');
        card.className = 'card class-card';
        var h = document.createElement('h3'); h.textContent = c.name;
        var tag = document.createElement('span'); tag.className = 'tag'; tag.textContent = DATA.prices[c.type].label;
        var when = document.createElement('p'); when.textContent = c.day + ' at ' + c.time + ' \u2013 ' + c.branch + ' (' + c.level + ')';
        var desc = document.createElement('p'); desc.textContent = c.description;
        var price = document.createElement('p'); price.className = 'price';
        price.textContent = money(DATA.prices[c.type].single) + ' \u00b7 ' + c.spots + (c.spots === 1 ? ' spot left' : ' spots left');
        card.append(h, tag, when, desc, price);
        list.appendChild(card);
      });
      count.textContent = items.length + (items.length === 1 ? ' class found' : ' classes found');
      if (!items.length) {
        var none = document.createElement('p'); none.className = 'no-results';
        none.textContent = 'No classes match your search. Try a different keyword or filter.';
        list.appendChild(none);
      }
    };
    [search, typeSel, sortSel].forEach(function (el) { el.addEventListener('input', render); });
    render();
  }

  /* ---------- Interactive map (Google Maps embed + links) ---------- */
  var mapFrame = $('#map-frame');
  if (mapFrame) {
    var branches = {
      rosebank: { q: 'Rosebank Mall, 50 Bath Avenue, Rosebank, Johannesburg' },
      midrand:  { q: 'Mall of Africa, Waterfall City, Midrand' }
    };
    var openLink = $('#map-open');
    $$('[data-map-go]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var k = btn.getAttribute('data-map-go'), q = encodeURIComponent(branches[k].q);
        mapFrame.src = 'https://www.google.com/maps?q=' + q + '&z=17&output=embed';
        if (openLink) { openLink.href = 'https://www.google.com/maps/search/?api=1&query=' + q; }
        $$('[data-map-go]').forEach(function (b2) { b2.setAttribute('aria-pressed', b2 === btn ? 'true' : 'false'); });
      });
    });
  }

  /* ---------- Form validation helpers ---------- */
  var phoneOk = function (v) { return /^(\+27|0)[1-8][0-9]{8}$/.test(v.replace(/[\s-]/g, '')); };
  var nameOk = function (v) { return /^[A-Za-z\u00C0-\u024F][A-Za-z\u00C0-\u024F '\u2019-]{1,59}$/.test(v); };
  var emailOk = function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v); };

  function setError(input, msg) {
    var field = input.closest('.field');
    var out = $('.error-msg', field);
    out.textContent = msg || '';
    field.classList.toggle('invalid', !!msg);
    field.classList.toggle('valid', !msg && input.value.trim() !== '');
    input.setAttribute('aria-invalid', msg ? 'true' : 'false');
    return !msg;
  }

  var rules = {
    name: function (v) { return !v ? 'Please enter your full name.' : !nameOk(v) ? 'Use letters only (2\u201360 characters).' : ''; },
    email: function (v) { return !v ? 'Please enter your email address.' : !emailOk(v) ? 'Enter a valid email, e.g. name@example.com.' : ''; },
    phone: function (v) { return !v ? 'Please enter your phone number.' : !phoneOk(v) ? 'Use a South African number, e.g. 082 123 4567 or +27 82 123 4567.' : ''; },
    phoneOptional: function (v) { return v && !phoneOk(v) ? 'Use a South African number, e.g. 082 123 4567.' : ''; },
    select: function (v) { return !v ? 'Please choose an option.' : ''; },
    date: function (v) {
      if (!v) return 'Please choose a preferred date.';
      var d = new Date(v + 'T00:00:00'), today = new Date(); today.setHours(0, 0, 0, 0);
      var max = new Date(today); max.setDate(max.getDate() + 90);
      if (isNaN(d)) return 'Enter a valid date.';
      if (d < today) return 'The date cannot be in the past.';
      if (d > max) return 'Please choose a date within the next 90 days.';
      if (d.getDay() === 0) return 'The studio is closed on Sundays. Please choose another day.';
      return '';
    },
    goals: function (v) { return !v ? 'Please tell us a little about your goals.' : v.length < 10 ? 'Please write at least 10 characters.' : v.length > 500 ? 'Maximum 500 characters.' : ''; },
    message: function (v) { return !v ? 'Please type your message.' : v.length < 10 ? 'Please write at least 10 characters.' : v.length > 500 ? 'Maximum 500 characters.' : ''; }
  };

  function attachValidation(form, map) {
    var inputs = Object.keys(map).map(function (id) { return document.getElementById(id); });
    inputs.forEach(function (input) {
      var check = function () { return setError(input, rules[map[input.id]](input.value.trim())); };
      input.addEventListener('blur', check);
      input.addEventListener('input', function () { if (input.closest('.field').classList.contains('invalid')) check(); });
      input.check = check;
    });
    return function validateAll() {
      var firstBad = null;
      inputs.forEach(function (i) { if (!i.check() && !firstBad) firstBad = i; });
      if (firstBad) firstBad.focus();
      return !firstBad;
    };
  }

  function charCounter(textarea, out) {
    var update = function () { out.textContent = textarea.value.length + ' / 500 characters'; };
    textarea.addEventListener('input', update); update();
  }

  function showStatus(box, kind, build) {
    box.className = 'form-status show ' + kind;
    box.textContent = '';
    build(box);
    box.setAttribute('tabindex', '-1');
    box.focus();
  }

  /* ---------- Enquiry form (validation + AJAX + response) ---------- */
  var enqForm = $('#enquiry-form');
  if (enqForm) {
    var dateInput = $('#date');
    var iso = function (d) { return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); };
    var t0 = new Date(); dateInput.min = iso(t0);
    var t1 = new Date(); t1.setDate(t1.getDate() + 90); dateInput.max = iso(t1);

    var validateEnq = attachValidation(enqForm, {
      name: 'name', email: 'email', phone: 'phone', class: 'select', branch: 'select',
      package: 'select', date: 'date', message: 'goals'
    });
    charCounter($('#message'), $('#message-count'));
    var enqStatus = $('#enquiry-status'), enqBtn = $('#enquiry-submit');

    enqForm.addEventListener('submit', function (e) {
      e.preventDefault();
      if ($('#website').value) return; // honeypot: bots fill this in
      if (!validateEnq()) return;

      var payload = {
        name: $('#name').value.trim(), email: $('#email').value.trim(), phone: $('#phone').value.trim(),
        class: $('#class').value, branch: $('#branch').value, package: $('#package').value,
        date: $('#date').value, message: $('#message').value.trim()
      };
      enqBtn.disabled = true; enqBtn.textContent = 'Sending\u2026';

      var send = ENQUIRY_ENDPOINT
        ? fetch(ENQUIRY_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }, body: JSON.stringify(payload) })
            .then(function (r) { if (!r.ok) throw new Error('Server responded ' + r.status); })
        : new Promise(function (res) { setTimeout(res, 900); }); // simulated AJAX

      send.then(function () {
        showStatus(enqStatus, 'success', function (box) { buildResponse(box, payload); });
        enqForm.reset();
        $$('.field', enqForm).forEach(function (f) { f.classList.remove('valid', 'invalid'); });
        $('#message-count').textContent = '0 / 500 characters';
      }).catch(function () {
        showStatus(enqStatus, 'fail', function (box) {
          box.textContent = 'Sorry, we could not send your enquiry. Please try again or call us on 011 123 4567.';
        });
      }).then(function () { enqBtn.disabled = false; enqBtn.textContent = 'Send Enquiry'; });
    });

    function buildResponse(box, p) {
      var h = document.createElement('h3'); h.textContent = 'Thank you, ' + p.name.split(' ')[0] + '!';
      box.appendChild(h);
      var cost = document.createElement('p');
      if (p.class === 'unsure') {
        cost.textContent = 'Our prices start at ' + money(DATA.prices.mat.single) + ' for a single Mat class, ' +
          money(DATA.prices.reformer.single) + ' for Reformer and ' + money(DATA.prices.private.single) + ' for a Private Session.';
      } else {
        var pr = DATA.prices[p.class];
        var amount = p.package === 'pack10' ? pr.pack10 : pr.single;
        var saving = p.package === 'pack10' ? pr.single * 10 - pr.pack10 : 0;
        cost.textContent = 'Estimated cost: ' + money(amount) + ' for ' + (p.package === 'pack10' ? 'a 10-class pack of ' : 'a single ') +
          pr.label + (saving ? ' (you save ' + money(saving) + ').' : '.');
      }
      box.appendChild(cost);

      var avail = DATA.classes.filter(function (c) {
        return (p.class === 'unsure' || c.type === p.class) && (p.branch === 'any' || c.branch.toLowerCase() === p.branch);
      }).slice(0, 3);
      var ap = document.createElement('p');
      if (avail.length) {
        ap.textContent = 'Availability: ' + avail.map(function (c) {
          return c.name + ' \u2013 ' + c.day + ' ' + c.time + ' (' + c.branch + ', ' + c.spots + ' spot' + (c.spots === 1 ? '' : 's') + ' left)';
        }).join('; ') + '.';
      } else {
        ap.textContent = 'We have no matching class at that branch right now, but we will contact you with alternatives.';
      }
      box.appendChild(ap);
      var next = document.createElement('p');
      next.textContent = 'We will confirm your request for ' + p.date + ' by email at ' + p.email + ' within one business day.';
      box.appendChild(next);
    }
  }

  /* ---------- Contact form (validation + compiled email) ---------- */
  var conForm = $('#contact-form');
  if (conForm) {
    var validateCon = attachValidation(conForm, {
      contactName: 'name', contactEmail: 'email', contactPhone: 'phoneOptional',
      contactType: 'select', contactMessage: 'message'
    });
    charCounter($('#contactMessage'), $('#contactMessage-count'));
    var conStatus = $('#contact-status');

    conForm.addEventListener('submit', function (e) {
      e.preventDefault();
      if ($('#website').value) return;
      if (!validateCon()) return;
      var typeSelEl = $('#contactType');
      var typeLabel = typeSelEl.options[typeSelEl.selectedIndex].text;
      var subject = 'Website message: ' + typeLabel;
      var body = 'Name: ' + $('#contactName').value.trim() + '\n' +
        'Email: ' + $('#contactEmail').value.trim() + '\n' +
        'Phone: ' + ($('#contactPhone').value.trim() || 'not provided') + '\n' +
        'Message type: ' + typeLabel + '\n\n' + $('#contactMessage').value.trim();
      var href = 'mailto:' + CONTACT_RECIPIENT + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);

      showStatus(conStatus, 'success', function (box) {
        var h = document.createElement('h3'); h.textContent = 'Your message is ready to send';
        var p = document.createElement('p'); p.textContent = 'Check the email below, then press the button to send it to ' + CONTACT_RECIPIENT + ' from your email app.';
        var pre = document.createElement('div'); pre.className = 'email-preview';
        pre.textContent = 'To: ' + CONTACT_RECIPIENT + '\nSubject: ' + subject + '\n\n' + body;
        var a = document.createElement('a'); a.className = 'btn'; a.href = href; a.textContent = 'Send email';
        box.append(h, p, pre, a);
      });
    });
  }
})();
