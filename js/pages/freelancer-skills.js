document.addEventListener('DOMContentLoaded',()=> {
  const skillInput=document.querySelector('#skillInput'),level=document.querySelector('#skillLevel'),add=document.querySelector('#addSkill'),list=document.querySelector('#skillList');
  let skills=AC.getStore().skills||[]; const render=()=>list.innerHTML=skills.map((s,i)=>`<span class="tag">${AC.escapeHtml(s.name)} · ${AC.escapeHtml(s.level)} <button data-rm="${i}" style="all:unset;cursor:pointer;margin-left:6px">×</button></span>`).join('')||'<span class="hint">Add at least one skill.</span>';
  add?.addEventListener('click',()=> {
    const name=skillInput.value.trim();if(!name)return;if(skills.some(s=>s.name.toLowerCase()===name.toLowerCase()))return AC.toast('Skill already added');skills.push( {
      name,level:level.value
    }
    );AC.updateStore( {
      skills
    }
    );skillInput.value='';render()
  }
  );
  list?.addEventListener('click',e=> {
    const b=e.target.closest('[data-rm]');if(!b)return;skills.splice(Number(b.dataset.rm),1);AC.updateStore( {
      skills
    }
    );render()
  }
  );render();
  document.querySelectorAll('.chip').forEach(c=>c.addEventListener('click',()=>c.classList.toggle('active')));
  const next=document.querySelector('#skillsNext');next?.addEventListener('click',()=> {
    const interests=[...document.querySelectorAll('.chip.active')].map(x=>x.dataset.value);AC.updateStore( {
      interests
    }
    );location.href='goals.html'
  }
  );
}
);
