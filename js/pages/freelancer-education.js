document.addEventListener('DOMContentLoaded',()=> {
  const f=document.querySelector('#educationForm'),list=document.querySelector('#educationList');if(!f||!list)return;
  let items=AC.getStore().education||[];
  const render=()=> {
    list.innerHTML=items.map((x,i)=>`<div class="list-item"><div><strong>${AC.escapeHtml(x.degree||'Education')} — ${AC.escapeHtml(x.institution||'')}</strong><small>${AC.escapeHtml(x.field_of_study||'')} · ${AC.escapeHtml(x.start_year||'')}–${AC.escapeHtml(x.graduation_year||'')}</small></div><button class="icon-btn" data-remove="${i}">Remove</button></div>`).join('')||'<p class="hint">No education records added yet.</p>';
  };
  f.addEventListener('submit',e=> {
    e.preventDefault();items.push(AC.formToObject(f));AC.updateStore( {
      education:items
    }
    );f.reset();render();AC.toast('Education added')
  }
  );
  list.addEventListener('click',e=> {
    const b=e.target.closest('[data-remove]');if(!b)return;items.splice(Number(b.dataset.remove),1);AC.updateStore( {
      education:items
    }
    );render()
  }
  );render();
}
);
