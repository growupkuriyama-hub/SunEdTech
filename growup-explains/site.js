(function(){
  const filters=document.querySelectorAll('[data-filter]');
  const cards=document.querySelectorAll('[data-topic]');
  const empty=document.getElementById('filter-empty');
  filters.forEach(btn=>btn.addEventListener('click',()=>{
    const chosen=btn.dataset.filter;
    let count=0;
    filters.forEach(b=>{const yes=b===btn;b.classList.toggle('active',yes);b.setAttribute('aria-pressed',String(yes));});
    cards.forEach(card=>{const show=chosen==='all'||card.dataset.topic===chosen;card.hidden=!show;if(show) count++;});
    if(empty) empty.hidden=count!==0;
  }));
  const experiments={
    zn:{status:'Reaction',no:false,equation:'Zn + H₂SO₄ → ZnSO₄ + H₂↑',oxidized:'Zinc: 0 → +2',reduced:'Hydrogen ions (H⁺)',explanation:'Zinc releases two electrons. Hydrogen ions accept them and form H₂ gas. The sulfate-containing ions do not change oxidation state.'},
    cu:{status:'No ordinary reaction',no:true,equation:'Cu + dilute H₂SO₄ → no appreciable reaction',oxidized:'None',reduced:'None',explanation:'Under ordinary conditions, H⁺ does not oxidize copper spontaneously to a useful extent. Copper is below hydrogen in the school reactivity series.'},
    hot:{status:'Reaction on heating',no:false,equation:'Cu + 2H₂SO₄ → CuSO₄ + SO₂↑ + 2H₂O',oxidized:'Copper: 0 → +2',reduced:'Sulfur: +6 → +4',explanation:'Under hot concentrated conditions, sulfur(VI) in sulfuric acid is reduced to sulfur(IV) in SO₂. The product gas is sulfur dioxide, not hydrogen.'}
  };
  const buttons=document.querySelectorAll('[data-reaction]');
  const status=document.getElementById('experiment-status');
  if(status) buttons.forEach(btn=>btn.addEventListener('click',()=>{
    const data=experiments[btn.dataset.reaction];if(!data)return;
    buttons.forEach(b=>{const yes=b===btn;b.classList.toggle('active',yes);b.setAttribute('aria-pressed',String(yes));});
    status.textContent=data.status;status.classList.toggle('no',data.no);
    document.getElementById('experiment-equation').textContent=data.equation;
    document.getElementById('experiment-oxidized').textContent=data.oxidized;
    document.getElementById('experiment-reduced').textContent=data.reduced;
    document.getElementById('experiment-explanation').textContent=data.explanation;
  }));
})();