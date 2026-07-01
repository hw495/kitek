(function(){
  function getLang(){
    var saved = null;
    try{ saved = localStorage.getItem('kitek-lang'); }catch(e){}
    return saved || 'en';
  }
  function setLang(lang){
    document.body.classList.remove('lang-en','lang-zh');
    document.body.classList.add('lang-' + lang);
    document.documentElement.setAttribute('lang', lang === 'zh' ? 'zh-Hant' : 'en');
    try{ localStorage.setItem('kitek-lang', lang); }catch(e){}
    var btns = document.querySelectorAll('.lang-switch button');
    btns.forEach(function(b){
      b.classList.toggle('active', b.getAttribute('data-lang') === lang);
    });
  }
  document.addEventListener('DOMContentLoaded', function(){
    setLang(getLang());

    document.querySelectorAll('.lang-switch button').forEach(function(btn){
      btn.addEventListener('click', function(){
        setLang(btn.getAttribute('data-lang'));
      });
    });

    var navToggle = document.querySelector('.nav-toggle');
    var navLinks = document.querySelector('.nav-links');
    if(navToggle && navLinks){
      navToggle.addEventListener('click', function(){
        navLinks.classList.toggle('open');
      });
    }

    // mark active nav link
    var path = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(function(a){
      var href = a.getAttribute('href');
      if(href === path || (path === '' && href === 'index.html')){
        a.classList.add('active');
      }
    });

    // product tabs (products.html)
    var tabbar = document.querySelector('.tabbar');
    if(tabbar){
      var buttons = tabbar.querySelectorAll('button');
      var activateTab = function(target){
        buttons.forEach(function(b){ b.classList.toggle('active', b.getAttribute('data-tab') === target); });
        document.querySelectorAll('.tab-panel').forEach(function(panel){
          panel.classList.toggle('active', panel.getAttribute('data-panel') === target);
        });
      };
      buttons.forEach(function(btn){
        btn.addEventListener('click', function(){
          activateTab(btn.getAttribute('data-tab'));
        });
      });
      // deep-link support: products.html#mvalve should open that tab
      var hash = window.location.hash.replace('#', '');
      if(hash && document.querySelector('.tab-panel[data-panel="' + hash + '"]')){
        activateTab(hash);
      }
    }

    // contact form (static, no backend) - prevent submit, show confirmation
    var form = document.querySelector('#inquiry-form');
    if(form){
      form.addEventListener('submit', function(e){
        e.preventDefault();
        var box = document.querySelector('#form-confirm');
        if(box){ box.style.display = 'block'; }
        form.reset();
      });
    }
  });
})();
