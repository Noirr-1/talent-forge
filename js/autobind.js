document.addEventListener('DOMContentLoaded',()=> {
  const io=new IntersectionObserver(entries=>entries.forEach(e=> {
    if(e.isIntersecting)e.target.classList.add('visible')
  }
  ), {
    threshold:.12
  }
  );
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
  document.querySelectorAll('[data-store-form]').forEach(form=> {
    const key=form.dataset.storeForm, store=AC.getStore(), saved=store[key]|| {
    };
    [...form.elements].forEach(el=> {
      if(!el.name)return;if(saved[el.name]!==undefined) {
        if(el.type==='checkbox')el.checked=!!saved[el.name];else el.value=saved[el.name]
      }
    }
    );
    form.addEventListener('input',()=> {
      const data= {
      };[...form.elements].forEach(el=> {
        if(el.name)data[el.name]=el.type==='checkbox'?el.checked:el.value
      }
      );AC.updateStore( {
        [key]:data
      }
      )
    }
    );
  }
  );
}
);
