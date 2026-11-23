/* Bộ đếm lượt truy cập leading.ai.vn – ghi vào Google Sheet của người vận hành.
   Không dùng cookie, không lưu dữ liệu cá nhân: chỉ mã phiên ngẫu nhiên (mất khi đóng tab). */
(function () { try {
  var API = 'https://script.google.com/macros/s/AKfycbxireXB52iFZlMyWaDHaRkDwjJ65PHEt6_9rrEel7MWOLIrNeJ5VGp-30Mk2gky1Aaw/exec';
  var q = new URLSearchParams(location.search), S = window.sessionStorage;
  function g(k) { try { return S.getItem(k) || ''; } catch (e) { return ''; } }
  function s(k, v) { try { S.setItem(k, v); } catch (e) {} }
  var src = q.get('src') || q.get('utm_source') || '';
  if (src) s('lai_src', src); else src = g('lai_src');
  var sid = g('lai_sid'), nv = 0;
  if (!sid) { sid = Math.random().toString(36).slice(2, 12); s('lai_sid', sid); nv = 1; }
  var ref = '';
  try { if (document.referrer) { var h = new URL(document.referrer).hostname; if (h !== location.hostname) ref = h; } } catch (e) {}
  var base = { p: location.pathname, src: src, ref: ref, vid: sid, nv: nv,
    dev: /Mobi|Android|iPhone/i.test(navigator.userAgent) ? 'mobile' : 'desktop', cmp: q.get('utm_campaign') || '' };
  function send(ev, x) {
    var a = {}, k; for (k in base) a[k] = base[k]; a.ev = ev; if (x) for (k in x) a[k] = x[k];
    var b = JSON.stringify({ fn: 'hit', arg: a });
    try { if (navigator.sendBeacon && navigator.sendBeacon(API, new Blob([b], { type: 'text/plain;charset=utf-8' }))) return; } catch (e) {}
    try { fetch(API, { method: 'POST', mode: 'no-cors', keepalive: true, body: b }); } catch (e) {}
  }
  var t0 = Date.now(), mx = 0, done = 0;
  addEventListener('scroll', function () {
    var d = document.documentElement, h = d.scrollHeight - innerHeight;
    if (h > 0) mx = Math.max(mx, Math.round(100 * scrollY / h));
  }, { passive: true });
  function leave() { if (done) return; done = 1; send('leave', { t: Math.round((Date.now() - t0) / 1000), sc: Math.min(100, mx) }); }
  addEventListener('pagehide', leave);
  document.addEventListener('visibilitychange', function () { if (document.visibilityState === 'hidden') leave(); });
  send('view');
} catch (e) {} })();
