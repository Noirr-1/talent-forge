document.addEventListener('DOMContentLoaded',()=> {
  const f=document.querySelector('#clientForm');if(!f)return;f.addEventListener('submit',e=> {
    e.preventDefault();AC.updateStore( {
      client:AC.formToObject(f)
    }
    );location.href='../success.html'
  }
  );
}
);
