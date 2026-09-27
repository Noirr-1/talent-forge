document.addEventListener('DOMContentLoaded',()=> {
  document.querySelectorAll('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());
  const current=location.pathname.split('/').pop();
  document.querySelectorAll('.nav-links a').forEach(a=> {
    if(a.getAttribute('href')?.endsWith(current))a.style.background='#eee'
  }
  );
}
);
