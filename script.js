/* =============================================
   TEMPLE DE MAHDI BEN JEBARA — Script Sacré
   ============================================= */

const SERMENT = "Je voue un culte à Mahdi Ben Jebara, je le respecte, et c'est la plus belle personne que ce monde ai connu";

// ---- GATE : Le Serment ----
const gate       = document.getElementById('gate');
const mainSite   = document.getElementById('main-site');
const oathInput  = document.getElementById('oath-input');
const oathBtn    = document.getElementById('oath-btn');
const oathError  = document.getElementById('oath-error');
const oathProgress = document.getElementById('oath-progress');

function normalize(s){ return s.trim().replace(/\s+/g,' ').toLowerCase(); }

oathInput.addEventListener('input', () => {
  const val = normalize(oathInput.value);
  const target = normalize(SERMENT);
  const pct = Math.min(100, Math.round((val.length / target.length) * 100));
  if(pct > 0) oathProgress.textContent = `Dévotion : ${pct}% — ${pct < 50 ? 'hérétique' : pct < 90 ? 'en chemin...' : 'presque digne !'}`;
  else oathProgress.textContent = '';
  oathError.hidden = true;
});

function tryEnter(){
  const val = normalize(oathInput.value);
  const target = normalize(SERMENT);
  if(val === target){
    gate.style.opacity = '0';
    gate.style.transition = 'opacity .8s ease';
    setTimeout(() => {
      gate.style.display = 'none';
      mainSite.classList.remove('hidden');
      mainSite.removeAttribute('aria-hidden');
      setTimeout(() => mainSite.classList.add('visible'), 50);
      initParticles();
      animateShameBar();
    }, 800);
  } else {
    oathError.hidden = false;
    oathInput.style.borderColor = 'var(--red)';
    oathInput.style.animation = 'shake .4s ease';
    setTimeout(() => { oathInput.style.borderColor = ''; oathInput.style.animation = ''; }, 500);
  }
}

oathBtn.addEventListener('click', tryEnter);
oathInput.addEventListener('keydown', e => { if(e.key === 'Enter' && !e.shiftKey){ e.preventDefault(); tryEnter(); } });

// ---- BURGER ----
const burger = document.getElementById('burger-btn');
const navLinks = document.querySelector('.nav-links');
burger?.addEventListener('click', () => {
  const exp = burger.getAttribute('aria-expanded') === 'true';
  burger.setAttribute('aria-expanded', String(!exp));
  navLinks.classList.toggle('nav-links--open');
});

// ---- PARTICLES ----
function initParticles(){
  const container = document.querySelector('.altar-particles');
  if(!container) return;
  for(let i=0;i<35;i++){
    const p = document.createElement('span');
    p.className = 'particle';
    p.style.cssText = `left:${Math.random()*100}%;top:${Math.random()*100}%;width:${Math.random()*5+2}px;height:${Math.random()*5+2}px;animation-delay:${Math.random()*8}s;animation-duration:${Math.random()*5+4}s`;
    container.appendChild(p);
  }
}

// ---- PRAYER COUNTER ----
const prayBtn    = document.getElementById('pray-btn');
const prayCount  = document.getElementById('prayer-count');
const prayStreak = document.getElementById('prayer-streak');

let prayers = parseInt(localStorage.getItem('mahdi_prayers') || '0');
let streak  = parseInt(localStorage.getItem('mahdi_streak') || '0');
let lastPray = parseInt(localStorage.getItem('mahdi_lastpray') || '0');
prayCount.textContent = prayers.toLocaleString('fr-FR');

const prayMessages = [
  '🙏 Mahdi est satisfait.',
  '✨ Une bénédiction de plus pour le monde.',
  '🌟 Le temple vibre de ta dévotion.',
  '⚔️ Le Chevalier te voit. Il approuve.',
  '🐴 Même le destrier est touché.',
  '👑 Ta dévotion est consignée dans les écritures.',
  '🔥 Mahdi accepte ton offrande.',
  '💫 Une larme de gloire coule sur ta joue.',
];

prayBtn?.addEventListener('click', () => {
  prayers++;
  streak++;
  localStorage.setItem('mahdi_prayers', prayers);
  localStorage.setItem('mahdi_streak', streak);
  localStorage.setItem('mahdi_lastpray', Date.now());
  prayCount.textContent = prayers.toLocaleString('fr-FR');

  const msg = prayMessages[Math.floor(Math.random()*prayMessages.length)];
  prayStreak.textContent = streak >= 5 ? `🔥 Combo x${streak} — La foi est absolue !` : msg;

  prayBtn.style.transform = 'scale(0.9)';
  setTimeout(() => prayBtn.style.transform = '', 150);

  // Confetti-like burst
  const altar = document.querySelector('.altar');
  if(altar && prayers % 10 === 0){
    const emojis = ['⚔️','👑','🌟','✨','🙏','🐴'];
    for(let i=0;i<8;i++){
      const el = document.createElement('span');
      el.style.cssText = `position:fixed;top:50%;left:50%;font-size:${Math.random()*1.5+1}rem;pointer-events:none;z-index:9998;animation:burst .8s ease forwards;transform:translate(-50%,-50%)`;
      el.textContent = emojis[Math.floor(Math.random()*emojis.length)];
      el.style.setProperty('--dx', (Math.random()-0.5)*300+'px');
      el.style.setProperty('--dy', (Math.random()-0.5)*300+'px');
      document.body.appendChild(el);
      setTimeout(()=>el.remove(),900);
    }
  }
});

// ---- DESTINY WHEEL ----
const spinBtn    = document.getElementById('spin-btn');
const wheel      = document.getElementById('destiny-wheel');
const wheelResult = document.getElementById('wheel-result');

const destinyMessages = [
  { icon:'🏆', label:'Génie Absolu', msg:'La roue a parlé : tu es un génie. Mahdi confirme.' },
  { icon:'👑', label:'Roi Éternel', msg:'Le royaume t\'appartient. Par décret de Mahdi.' },
  { icon:'⚔️', label:'Chevalier', msg:'Tu rejoins la chevalerie de Mahdi. Honneur suprême.' },
  { icon:'🌟', label:'Légende', msg:'Ta légende sera chantée. Mahdi a dit "pas mal".' },
  { icon:'💅', label:'Icône de Style', msg:'Le style coule dans tes veines. Mahdi approuve.' },
  { icon:'🐴', label:'Cavalier Destrier', msg:'Le destrier te reconnaît. Tu peux partir.' },
];

let spinning = false;
let rotation = 0;
spinBtn?.addEventListener('click', () => {
  if(spinning) return;
  spinning = true;
  spinBtn.disabled = true;
  wheelResult.textContent = '';
  const idx = Math.floor(Math.random() * destinyMessages.length);
  const extra = 1080 + idx * 60;
  rotation += extra;
  wheel.style.transform = `rotate(${rotation}deg)`;
  setTimeout(() => {
    const d = destinyMessages[idx];
    wheelResult.textContent = `${d.icon} ${d.label}`;
    const sub = document.createElement('p');
    sub.style.cssText = 'color:var(--muted);font-size:.85rem;margin-top:.3rem';
    sub.textContent = d.msg;
    wheelResult.after(sub);
    setTimeout(()=>sub.remove(), 4000);
    spinning = false;
    spinBtn.disabled = false;
  }, 1600);
});

// ---- SHAME BAR (prof) ----
function animateShameBar(){
  const bar = document.getElementById('shame-bar');
  if(!bar) return;
  setTimeout(()=>{ bar.style.width = '94%'; }, 600);
}

// ---- ROAST GENERATOR ----
const roastLines = [
  '« Señor Developer ». Deux mots. Un t-shirt. Une vie entière de décisions discutables.',
  'Il porte des lunettes de soleil à l\'intérieur. Au cas où le plafond s\'ouvre d\'un coup.',
  'Son café est froid depuis 9h17. Il n\'a toujours pas remarqué. Personne n\'ose lui dire.',
  'Il enseigne le développement web sur un MacBook à des gens sur Windows. Pédagogie à l\'état pur.',
  'La chaîne autour du cou : cadeau d\'un élève qui voulait une meilleure note ? Enquête en cours.',
  'Il fixe son écran avec l\'intensité d\'un homme qui cherche une parenthèse fermante depuis 2017.',
  'Il a dit aux élèves : "Mettez une photo gênante de vous-mêmes pour un point bonus." Mahdi a sorti un chevalier sur destrier. Résultat : chef-d\'œuvre involontaire.',
  'Son bureau ressemble à celui de quelqu\'un qui "allait ranger juste après". C\'était en septembre.',
  'Señor Developer. C\'est le titre. Le rêve. Le destin. La crise de mi-carrière en trois mots.',
  'Il a un mug. Le mug est là pour décorer. Comme lui certains lundis matin.',
  'Il tape sur son clavier comme si chaque touche devait se repentir d\'un péché passé.',
  'Les lunettes de soleil sur le bureau signifient une chose : il est prêt à partir à tout moment.',
  'Il a donné ce projet. Mahdi a créé un temple. La situation lui a échappé il y a longtemps.',
];

const genBtn = document.getElementById('gen-btn');
const genResult = document.getElementById('gen-result');
let lastRoastIdx = -1;

genBtn?.addEventListener('click', () => {
  let idx;
  do { idx = Math.floor(Math.random() * roastLines.length); } while(idx === lastRoastIdx);
  lastRoastIdx = idx;
  genResult.style.opacity = '0';
  setTimeout(() => {
    genResult.textContent = roastLines[idx];
    genResult.style.opacity = '1';
    genResult.style.transition = 'opacity .4s ease';
  }, 200);
});

// ---- CONFESSION ----
const confessionForm = document.getElementById('confession-form');
const confessionReply = document.getElementById('confession-reply');

const absolutions = [
  name => `Ô ${name||'pécheur anonyme'}, Mahdi a considéré ton péché pendant 0,3 secondes puis il a haussé les épaules. Tu es pardonné. N'recommence pas.`,
  name => `Mahdi a lu ta confession, ${name||'toi'}. Il a souri de sa grâce divine. Le pardon t'est accordé. Mais il s'en souvient.`,
  name => `${name||'Hérétique'}, ton péché est consigné dans les archives sacrées du Temple. Le pardon viendra... peut-être. Prie encore 3 fois pour accélérer le processus.`,
  name => `Par le pouvoir de la Bannière du Chevalier, ${name||'toi'}, tu es absous. Mais le destin garde un œil ouvert.`,
];

confessionForm?.addEventListener('submit', e => {
  e.preventDefault();
  const name = document.getElementById('sinner-name').value.trim();
  const sin  = document.getElementById('sin-text').value.trim();
  if(!sin){ document.getElementById('sin-text').focus(); return; }
  const msg = absolutions[Math.floor(Math.random()*absolutions.length)](name);
  confessionReply.textContent = msg;
  confessionReply.hidden = false;
  confessionForm.reset();
});

// ---- CSS KEYFRAME pour burst ----
const style = document.createElement('style');
style.textContent = `
@keyframes shake{0%,100%{transform:translateX(0)}25%{transform:translateX(-8px)}75%{transform:translateX(8px)}}
@keyframes burst{0%{opacity:1;transform:translate(-50%,-50%) scale(1)}100%{opacity:0;transform:translate(calc(-50% + var(--dx)),calc(-50% + var(--dy))) scale(0)}}
`;
document.head.appendChild(style);
