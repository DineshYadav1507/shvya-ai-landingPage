export function initModernExperience(root=document){
  if(root.documentElement?.dataset.shvyaModernized==='true') return;
  if(root.documentElement) root.documentElement.dataset.shvyaModernized='true';

  if(!root.querySelector('.shvya-skip-link')){
    const skip=root.createElement('a');
    skip.className='shvya-skip-link'; skip.href='#main'; skip.textContent='Skip to content';
    root.body?.prepend(skip);
  }

  const main=root.querySelector('main, #main, [role="main"]');
  if(main && !main.id) main.id='main';

  root.querySelectorAll('img').forEach((img,index)=>{
    if(!img.hasAttribute('loading')) img.loading=index<2?'eager':'lazy';
    if(!img.hasAttribute('decoding')) img.decoding='async';
    if(!img.hasAttribute('width') && !img.hasAttribute('height')) img.style.contentVisibility='auto';
  });

  root.querySelectorAll('a[target="_blank"]').forEach(link=>{
    const rel=new Set((link.getAttribute('rel')||'').split(/\s+/).filter(Boolean));
    rel.add('noopener'); rel.add('noreferrer'); link.setAttribute('rel',[...rel].join(' '));
  });

  root.querySelectorAll('a[href^="#"]').forEach(link=>{
    link.addEventListener('click',()=>{
      const id=link.getAttribute('href'); if(!id||id==='#') return;
      const target=root.querySelector(id); if(target) target.setAttribute('tabindex','-1');
    },{passive:true});
  });

  if(!root.querySelector('.shvya-backtop')){
    const button=root.createElement('button');
    button.className='shvya-backtop'; button.type='button'; button.setAttribute('aria-label','Back to top'); button.textContent='↑';
    root.body?.append(button);
    const sync=()=>button.classList.toggle('is-visible',window.scrollY>600);
    window.addEventListener('scroll',sync,{passive:true}); sync();
    button.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
  }

  root.querySelectorAll('form').forEach(form=>{
    form.addEventListener('submit',()=>{
      form.querySelectorAll('input,textarea,select').forEach(field=>{
        if(field.required && !String(field.value||'').trim()) field.setAttribute('aria-invalid','true');
        else field.removeAttribute('aria-invalid');
      });
    });
  });

  if('requestIdleCallback' in window){
    window.requestIdleCallback(()=>document.documentElement.dataset.shvyaIdle='true',{timeout:1500});
  }else setTimeout(()=>document.documentElement.dataset.shvyaIdle='true',0);
}
