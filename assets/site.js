(() => {
  const title=document.getElementById('demo-title');if(!title)return;
  const kind=document.getElementById('demo-kind'),position=document.getElementById('demo-position'),prev=document.getElementById('demo-prev'),next=document.getElementById('demo-next'),card=document.getElementById('demo-card');
  const items=[{kind:'工具 / 一次新的发现',title:'把重复的小任务，\n交给一个顺手的工具。'},{kind:'教程 / 把经验留下来',title:'一个实测过的方法，\n下次还可以继续用。'},{kind:'截图 / 让分享更清楚',title:'把关键的那一步，\n一起截给群友看。'}];
  let index=0,busy=false;
  async function turn(delta){
    if(busy || index+delta<0 || index+delta>=items.length)return;
    busy=true;prev.disabled=next.disabled=true;
    const motion=!matchMedia('(prefers-reduced-motion: reduce)').matches && !!card.animate;
    if(motion)try{await card.animate([{opacity:1,transform:'rotateY(0)'},{opacity:0,transform:`rotateY(${delta*-35}deg)`}],{duration:120,easing:'ease-in'}).finished;}catch{}
    index+=delta;kind.textContent=items[index].kind;title.replaceChildren(...items[index].title.split('\n').flatMap((part,i)=>i?[document.createElement('br'),document.createTextNode(part)]:[document.createTextNode(part)]));position.textContent=`${index+1} / ${items.length}`;
    if(motion)try{await card.animate([{opacity:0,transform:`rotateY(${delta*35}deg)`},{opacity:1,transform:'rotateY(0)'}],{duration:190,easing:'ease-out'}).finished;}catch{}
    busy=false;prev.disabled=index===0;next.disabled=index===items.length-1;
  }
  prev.addEventListener('click',()=>turn(-1));next.addEventListener('click',()=>turn(1));
})();
