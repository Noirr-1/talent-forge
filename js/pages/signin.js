document.addEventListener('DOMContentLoaded',()=> {
  const f=document.querySelector('#signinForm');if(!f)return;f.addEventListener('submit',e=> {
    e.preventDefault();AC.toast('Frontend demo: ready to connect to POST /auth/signin');setTimeout(()=>location.href='../index.html',700)
  }
  );
}
);
