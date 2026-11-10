// Formulář: demo režim neodesílá nic, ostrý režim posílá na endpoint ze site.json (data-endpoint).
(function () {
  document.querySelectorAll('form.formular').forEach(function (f) {
    var stav = f.querySelector('.formular-stav');
    f.addEventListener('submit', function (e) {
      var endpoint = f.getAttribute('data-endpoint');
      var demo = f.getAttribute('data-demo') === '1';
      if (f.querySelector('.past input').value) { e.preventDefault(); return; }   // robot
      if (demo || !endpoint) {
        e.preventDefault();
        stav.textContent = 'Ukázka formuláře: nic se neodesílá. Po spuštění webu bude zpráva doručena na e-mail firmy.';
        return;
      }
      e.preventDefault();
      stav.textContent = 'Odesílám…';
      fetch(endpoint, { method: 'POST', body: new FormData(f), headers: { Accept: 'application/json' } })
        .then(function (r) { if (!r.ok) throw new Error(r.status); f.reset(); stav.textContent = 'Děkujeme, zpráva byla odeslána.'; })
        .catch(function () { stav.textContent = 'Odeslání se nepodařilo. Napište nám prosím e-mailem.'; });
    });
  });
})();

// Mobilní menu + zvednutí vzorku ve vzorníku (dotyk)
(function () {
  var tl = document.querySelector('.menu-tl'), nav = document.getElementById('nav');
  if (tl && nav) tl.addEventListener('click', function () {
    var o = nav.classList.toggle('otevrene'); tl.setAttribute('aria-expanded', o ? 'true' : 'false');
  });
  document.querySelectorAll('.vzorek').forEach(function (v) {
    v.addEventListener('click', function () {
      document.querySelectorAll('.vzorek.zvednuty').forEach(function (x) { if (x !== v) x.classList.remove('zvednuty'); });
      v.classList.toggle('zvednuty');
    });
  });
})();
