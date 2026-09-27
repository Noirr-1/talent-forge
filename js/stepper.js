document.addEventListener('DOMContentLoaded',()=> {
  const root=document.querySelector('[data-step]'); if(!root)return;
  const step=Number(root.dataset.step||1), total=6, names=['Welcome','Personal Info','Education','Skills','Goals','Review'];
  const label=document.querySelector('[data-step-label]'),bar=document.querySelector('[data-progress-bar]'),pct=document.querySelector('[data-progress-pct]');
  if(label)label.textContent=`Step ${step} of ${total} — ${names[step-1]}`;
  if(bar)bar.style.width=`${(step/total)*100}%`; if(pct)pct.textContent=`${Math.round((step/total)*100)}%`;
}
);
