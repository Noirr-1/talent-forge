document.addEventListener('DOMContentLoaded',()=> {
  const root=document.querySelector('#reviewContent');if(!root)return;const s=AC.getStore(),p=s.personal|| {
  },g=s.goals|| {
  },edu=s.education||[],skills=s.skills||[];
  root.innerHTML=`<div class="review-box"><h3>Personal profile</h3><p><strong>${AC.escapeHtml(p.full_name||'Not provided')}</strong></p><p>${AC.escapeHtml(p.location||'')}</p><p>${AC.escapeHtml(p.bio||'')}</p></div><div class="review-box"><h3>Experience</h3><p>${AC.escapeHtml(p.experience_level||'—')}</p><p>${AC.escapeHtml(p.years_of_experience||'—')} years</p></div><div class="review-box"><h3>Education</h3>${edu.map(x=>`<p><strong>$ {
    AC.escapeHtml(x.degree||'')
  }
  </strong>, $ {
    AC.escapeHtml(x.institution||'')
  }
  </p>`).join('')||'<p>None added</p>'}</div><div class="review-box"><h3>Skills</h3>${skills.map(x=>`<span class="tag">$ {
    AC.escapeHtml(x.name)
  }
  · $ {
    AC.escapeHtml(x.level)
  }
  </span>`).join('')||'<p>None added</p>'}</div><div class="review-box"><h3>Career goal</h3><p><strong>${AC.escapeHtml(g.target_role||'—')}</strong></p><p>${AC.escapeHtml(g.target_industry||'')}</p><p>${AC.escapeHtml(g.target_level||'')}</p></div><div class="review-box"><h3>Interests</h3>${(s.interests||[]).map(x=>`<span class="tag">$ {
    AC.escapeHtml(x)
  }
  </span>`).join('')||'<p>None selected</p>'}</div>`;
  document.querySelector('#completeProfile')?.addEventListener('click',()=> {
    AC.updateStore( {
      profileReadyForBackend:true
    }
    );location.href='ai-profile.html'
  }
  );
}
);
