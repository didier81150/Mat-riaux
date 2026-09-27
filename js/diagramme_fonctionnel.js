// =====================================================
// MODULE : LE DIAGRAMME FONCTIONNEL (4ÈME)
// =====================================================

const DF_QUESTIONS_DATA = {
    casque: [
        { q: "Donnez le type du système technique.", r: "C'est un <strong>système technique automatisé</strong> de type audio. Il convertit une énergie électrique en énergie acoustique." },
        { q: "Précisez la fonction d'usage d'un casque audio.", r: "<strong>Reproduire de la musique</strong> à partir d'un signal audio électrique." },
        { q: "Listez les fonctions techniques et les solutions technologiques.", r: "<strong>Fonctions techniques :</strong> S'adapter à la tête · S'adapter à l'oreille · Émettre le son · Contrôler le volume · Transmettre le signal.<br><br><strong>Solutions technologiques :</strong> Arche déformable · Coussins en mousse · Haut-parleurs · Potentiomètre · Fiche + cordon." },
        { q: "Identifiez le capteur et l'actionneur parmi les solutions technologiques.", r: "<strong>Capteur :</strong> le Potentiomètre — détecte la position de la molette et envoie un signal de commande pour régler le volume.<br><strong>Actionneur :</strong> les Haut-parleurs — convertissent l'énergie électrique en vibrations sonores." },
        { q: "Précisez l'énergie d'entrée et l'énergie de sortie de l'actionneur.", r: "<strong>Énergie d'entrée :</strong> électrique (signal audio).<br><strong>Énergie de sortie :</strong> acoustique (son / vibrations)." }
    ],
    lampe: [
        { q: "Donnez le type du système technique.", r: "C'est un <strong>système technique automatisé</strong> de type éclairage." },
        { q: "Identifiez la fonction d'usage dans la liste des fonctions proposées.", r: "<strong>Éclairer le bureau</strong> — c'est la fonction principale qui répond au besoin de l'utilisateur." },
        { q: "Recopiez puis complétez le diagramme fonctionnel de la lampe de bureau.", r: "Voir la correction ci-dessous. La fonction d'usage est 'Éclairer le bureau', décomposée en : Positionner l'éclairage → Abat-jour, Générer de la lumière → Ampoule, Distribuer l'énergie → Interrupteur + Fils, Stabiliser → Socle." },
        { q: "Identifiez le capteur et l'actionneur.", r: "<strong>Capteur :</strong> l'Interrupteur — détecte l'action ON/OFF de l'utilisateur.<br><strong>Actionneur :</strong> l'Ampoule — convertit l'énergie électrique en lumière (et chaleur)." },
        { q: "Précisez l'énergie d'entrée et de sortie de l'actionneur.", r: "<strong>Énergie d'entrée :</strong> électrique.<br><strong>Énergie de sortie :</strong> lumineuse (et thermique)." }
    ],
    portail: [
        { q: "Donnez le type du système technique.", r: "C'est un <strong>système automatisé</strong> de contrôle d'accès (portail motorisé)." },
        { q: "Identifiez la fonction d'usage dans la liste des fonctions proposées.", r: "<strong>Gérer les accès</strong> — permettre ou interdire l'ouverture du portail." },
        { q: "Recopiez puis complétez le diagramme fonctionnel du portail.", r: "Voir la correction ci-dessous. Fonctions techniques : Déterminer la position, Générer le mouvement, Transmettre le mouvement, Tenir et guider le portail." },
        { q: "Identifiez l'actionneur et l'effecteur de ce système.", r: "<strong>Actionneur :</strong> le Moteur électrique — génère le mouvement de rotation.<br><strong>Effecteur :</strong> le Portail — réalise l'action finale (ouvrir/fermer l'accès)." },
        { q: "Précisez l'énergie d'entrée et de sortie de l'actionneur.", r: "<strong>Énergie d'entrée :</strong> électrique.<br><strong>Énergie de sortie :</strong> mécanique (mouvement de rotation → translation du portail)." }
    ],
    alarme: [
        { q: "Donnez le type du système technique.", r: "C'est un <strong>système automatisé de surveillance</strong> (alarme centralisée)." },
        { q: "Identifiez la fonction d'usage dans la liste des fonctions proposées.", r: "<strong>Surveiller une zone d'habitation</strong> — c'est la fonction principale du système d'alarme." },
        { q: "Complétez le tableau de désignation des composants.", r: "① Unité centrale &nbsp;② Capteur magnétique &nbsp;③ Capteur infrarouge &nbsp;④ Clavier mural &nbsp;⑤ Télécommande &nbsp;⑥ Prise téléphonique &nbsp;⑦ Sirène avec flash" },
        { q: "Précisez l'énergie d'entrée et le type des signaux de sortie du composant ⑦ (sirène).", r: "<strong>Énergie d'entrée :</strong> électrique.<br><strong>Signaux de sortie :</strong> signal sonore (sirène) + signal lumineux (flash)." },
        { q: "Complétez le diagramme fonctionnel de l'alarme centralisée.", r: "Voir la correction ci-dessous. 6 fonctions techniques reliées aux 7 composants numérotés." }
    ]
};

function openDiagrammeFonctionnelModule(activity) {
    document.getElementById('dashboardScreen').style.display = 'none';
    const container = document.getElementById('activityContent');
    document.getElementById('activityScreen').style.display = 'block';

    renderDiagrammeFonctionnelContent(container);
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderDiagrammeFonctionnelContent(container) {
    container.innerHTML = `
<style>
:root{
  --df-bg:#f0f2f8;
  --df-surface:#ffffff;
  --df-border:#d8dce8;
  --df-accent:#e67e22;
  --df-fu-color:#f39c12;
  --df-ft-color:#e74c3c;
  --df-st-color:#27ae60;
  --df-cap-color:#8e44ad;
  --df-act-color:#2980b9;
  --df-text:#1a1d2e;
  --df-muted:#7a82a0;
  --df-radius:10px;
  --df-shadow:0 2px 14px rgba(0,0,0,0.07);
}

.df-module-body {
  background: var(--df-bg);
  color: var(--df-text);
  font-family: 'Syne', 'Plus Jakarta Sans', sans-serif;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: var(--shadow-md);
  margin-bottom: 20px;
}

.df-module-body header{
  background:linear-gradient(135deg,#1a1d2e 0%,#2c3157 100%);
  padding:38px 5vw 30px;position:relative;overflow:hidden;
}
.df-module-body header::after{
  content:'';position:absolute;right:-80px;top:-80px;
  width:360px;height:360px;border-radius:50%;
  background:radial-gradient(circle,rgba(230,126,34,0.15) 0%,transparent 70%);
  pointer-events:none;
}
.df-module-body .badge{
  display:inline-block;
  background:rgba(230,126,34,0.2);border:1px solid rgba(230,126,34,0.5);
  color:#f39c12;font-family:monospace;
  font-size:0.74rem;letter-spacing:2px;
  padding:4px 14px;border-radius:20px;margin-bottom:18px;text-transform:uppercase;
}
.df-module-body header h1{font-size:clamp(1.8rem,4vw,3rem);font-weight:800;color:#fff;line-height:1.1;}
.df-module-body header h1 span{color:#f39c12;}
.df-module-body header p{margin-top:12px;color:rgba(255,255,255,0.75);font-size:0.93rem;max-width:500px;line-height:1.65;font-weight:400;}

.df-tabs-bar{
  display:flex;gap:0;background:#fff;
  border-bottom:2px solid var(--df-border);padding:0 4vw;
  position:sticky;top:0;z-index:100;
  box-shadow:0 2px 10px rgba(0,0,0,0.07);
  overflow-x:auto;
}
.df-tab-btn{
  background:none;border:none;color:var(--df-muted);
  padding:15px 20px;font-family:'Syne',sans-serif;
  font-size:0.84rem;font-weight:700;cursor:pointer;
  border-bottom:3px solid transparent;margin-bottom:-2px;
  white-space:nowrap;transition:all 0.2s;
}
.df-tab-btn:hover{color:var(--df-accent);}
.df-tab-btn.active{color:var(--df-accent);border-bottom-color:var(--df-accent);}

.df-panel{display:none;padding:32px 5vw 60px;max-width:1100px;margin:0 auto;}
.df-panel.active{display:block;}

.df-sec-title{
  font-size:1.35rem;font-weight:800;color:#1a1d2e;
  margin-bottom:22px;display:flex;align-items:center;gap:12px;
}
.df-sec-title::before{
  content:'';display:block;width:5px;height:26px;
  border-radius:3px;background:var(--df-accent);flex-shrink:0;
}

.df-card{
  background:var(--df-surface);border:1px solid var(--df-border);
  border-radius:var(--df-radius);padding:22px 26px;
  box-shadow:var(--df-shadow);margin-bottom:18px;
  line-height:1.75;color:#3a3f5c;font-size:0.93rem;
}
.df-card strong{color:var(--df-text);font-weight:700;}
.df-card-highlight{
  background:#fff8e6;border-left:4px solid var(--df-fu-color);
  border-radius:0 8px 8px 0;
  padding:11px 16px;margin-top:14px;
  color:#7a5500;font-style:italic;font-size:0.9rem;font-weight:600;
}

.df-three-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-bottom:20px;}
@media(max-width:700px){.df-three-grid{grid-template-columns:1fr;}}
.df-info-card{
  background:var(--df-surface);border:1px solid var(--df-border);
  border-radius:var(--df-radius);padding:20px;box-shadow:var(--df-shadow);
}
.df-info-card .ico{font-size:1.6rem;margin-bottom:8px;}
.df-info-card .lbl{
  font-size:0.68rem;letter-spacing:2px;text-transform:uppercase;
  font-family:monospace;font-weight:700;margin-bottom:8px;
}
.df-info-card p{font-size:0.85rem;line-height:1.6;color:#5a6080;}
.df-info-card p strong{color:var(--df-text);}

.df-fast-wrap{
  background:var(--df-surface);border:1px solid var(--df-border);
  border-radius:var(--df-radius);padding:26px 18px;
  box-shadow:var(--df-shadow);overflow-x:auto;margin-bottom:18px;
}
.df-fast-label{
  font-size:0.7rem;font-family:monospace;
  color:var(--df-muted);letter-spacing:2px;text-transform:uppercase;margin-bottom:18px;
}
.df-fast-wrap svg{width:100%;min-width:640px;}

.df-read-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:16px;}
@media(max-width:560px){.df-read-grid{grid-template-columns:1fr;}}
.df-read-card{
  background:var(--df-surface);border:1px solid var(--df-border);
  border-radius:var(--df-radius);padding:16px 18px;box-shadow:var(--df-shadow);
}
.df-read-card .dir{
  font-size:0.68rem;letter-spacing:2px;text-transform:uppercase;
  font-family:monospace;color:var(--df-accent);
  margin-bottom:7px;font-weight:700;
}
.df-read-card p{color:#5a6080;font-size:0.86rem;line-height:1.6;}
.df-read-card p em{color:var(--df-text);font-style:normal;font-weight:700;}

.df-exo-grid{display:grid;grid-template-columns:210px 1fr;gap:20px;align-items:start;margin-bottom:22px;}
@media(max-width:660px){.df-exo-grid{grid-template-columns:1fr;}}

.df-exo-photo{
  background:var(--df-surface);border:1px solid var(--df-border);
  border-radius:var(--df-radius);padding:12px;box-shadow:var(--df-shadow);text-align:center;
}
.df-exo-photo img{width:100%;border-radius:6px;display:block;}
.df-exo-photo .cap{font-size:0.72rem;color:var(--df-muted);font-family:monospace;margin-top:8px;}

.df-res-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:16px;}
@media(max-width:540px){.df-res-grid{grid-template-columns:1fr;}}
.df-res-block{
  background:var(--df-surface);border:1px solid var(--df-border);
  border-radius:var(--df-radius);padding:14px 16px;box-shadow:var(--df-shadow);
}
.df-res-block h4{font-size:0.68rem;letter-spacing:2px;text-transform:uppercase;font-family:monospace;margin-bottom:9px;}
.df-res-block.ft h4{color:var(--df-ft-color);}
.df-res-block.st h4{color:var(--df-st-color);}
.df-res-block ul{list-style:none;}
.df-res-block ul li{
  font-size:0.83rem;padding:4px 0;
  display:flex;align-items:center;gap:7px;
  color:#5a6080;border-bottom:1px solid #eef0f5;
}
.df-res-block ul li:last-child{border-bottom:none;}
.df-res-block.ft ul li::before{content:'◆';color:var(--df-ft-color);font-size:0.42rem;}
.df-res-block.st ul li::before{content:'●';color:var(--df-st-color);font-size:0.42rem;}

.df-questions{list-style:none;display:flex;flex-direction:column;gap:7px;}
.df-q-item{background:var(--df-surface);border:1px solid var(--df-border);border-radius:var(--df-radius);overflow:hidden;box-shadow:var(--df-shadow);}
.df-q-head{display:flex;align-items:center;gap:11px;padding:12px 15px;cursor:pointer;transition:background 0.15s;}
.df-q-head:hover{background:#f7f8fc;}
.df-q-num{background:#f0f2f8;border:1px solid #d0d4e8;color:var(--df-accent);font-family:monospace;font-size:0.73rem;font-weight:700;padding:2px 8px;border-radius:5px;white-space:nowrap;}
.df-q-text{flex:1;font-size:0.86rem;color:#3a3f5c;font-weight:600;}
.df-q-chev{color:var(--df-muted);font-size:0.85rem;transition:transform 0.25s;}
.df-q-chev.open{transform:rotate(180deg);}
.df-q-body{display:none;padding:11px 15px 13px 38px;font-size:0.84rem;color:#5a6080;line-height:1.7;border-top:1px solid #eef0f5;}
.df-q-body.open{display:block;}
.df-q-body strong{color:#1a7a40;font-weight:700;}

.df-corr-btn-wrap{margin-top:22px;text-align:center;}
.df-corr-btn{
  display:inline-flex;align-items:center;gap:9px;
  background:#1a1d2e;color:#fff;border:none;border-radius:8px;
  padding:13px 28px;font-family:'Syne',sans-serif;
  font-size:0.88rem;font-weight:700;cursor:pointer;
  transition:all 0.2s;box-shadow:0 4px 14px rgba(26,29,46,0.22);
}
.df-corr-btn:hover{background:var(--df-accent);box-shadow:0 4px 18px rgba(230,126,34,0.32);transform:translateY(-1px);}

.df-corr-panel{display:none;margin-top:22px;background:#fafbff;border:1px solid var(--df-border);border-radius:var(--df-radius);overflow:hidden;box-shadow:var(--df-shadow);}
.df-corr-panel.open{display:block;}
.df-corr-hdr{background:#1a1d2e;padding:13px 20px;display:flex;align-items:center;justify-content:space-between;}
.df-corr-hdr span{color:#fff;font-size:0.86rem;font-weight:700;display:flex;align-items:center;gap:8px;}
.df-corr-close{background:none;border:none;color:rgba(255,255,255,0.45);cursor:pointer;font-size:1.1rem;transition:color 0.2s;}
.df-corr-close:hover{color:#fff;}
.df-corr-body{padding:20px;overflow-x:auto;}
.df-corr-body svg{width:100%;min-width:560px;}

.df-leg-row{display:flex;gap:16px;flex-wrap:wrap;margin-top:12px;padding:9px 13px;background:#f4f5f8;border-radius:7px;font-size:0.75rem;}
.df-leg-item{display:flex;align-items:center;gap:6px;color:#5a6080;font-weight:600;}
.df-leg-dot{width:12px;height:12px;border-radius:3px;border-width:2px;border-style:solid;flex-shrink:0;}

.df-footer{border-top:1px solid var(--df-border);padding:22px 5vw;text-align:center;color:var(--df-muted);font-size:0.78rem;font-family:monospace;background:#ffffff;}
.df-footer a{color:var(--df-accent);text-decoration:none;}
</style>

<div class="df-module-body">

<header>
  <div class="badge">Automatisme · Cycle 4</div>
  <h1>Le Diagramme <span>Fonctionnel</span></h1>
  <p>Méthode FAST — cours interactif, exercices et corrections détaillées.</p>
</header>

<div class="df-tabs-bar">
  <button class="df-tab-btn active" onclick="showDfTab('rappels',this)">📖 Rappels</button>
  <button class="df-tab-btn" onclick="showDfTab('cours',this)">📐 Cours FAST</button>
  <button class="df-tab-btn" onclick="showDfTab('casque',this)">🎧 Casque audio</button>
  <button class="df-tab-btn" onclick="showDfTab('lampe',this)">💡 Lampe de bureau</button>
  <button class="df-tab-btn" onclick="showDfTab('portail',this)">🚪 Portail</button>
  <button class="df-tab-btn" onclick="showDfTab('alarme',this)">🔔 Alarme</button>
</div>

<!-- ===== RAPPELS ===== -->
<div class="df-panel active" id="df-panel-rappels">
  <div class="df-sec-title">Rappels — Analyse fonctionnelle</div>
  <div class="df-card">
    <p>L'<strong>analyse fonctionnelle</strong> est une démarche qui consiste à <strong>rechercher</strong>, <strong>lister</strong> et <strong>classer</strong> les différentes <strong>fonctions</strong> assurées par un système technique pour satisfaire les besoins de l'utilisateur.</p>
    <div class="df-card-highlight">📌 Une fonction commence toujours par un <strong>verbe à l'infinitif</strong> et peut être suivie d'un complément.</div>
  </div>

  <div class="df-sec-title" style="margin-top:30px;">Les trois niveaux du diagramme FAST</div>
  <div class="df-three-grid">
    <div class="df-info-card" style="border-top:3px solid var(--df-fu-color);">
      <div class="ico">🎯</div>
      <div class="lbl" style="color:var(--df-fu-color);">Fonction d'usage</div>
      <p>Répond au <strong>besoin principal</strong> de l'utilisateur. Elle est <strong>unique</strong> et se situe à gauche du diagramme.</p>
    </div>
    <div class="df-info-card" style="border-top:3px solid var(--df-ft-color);">
      <div class="ico">⚙️</div>
      <div class="lbl" style="color:var(--df-ft-color);">Fonctions techniques</div>
      <p>Actions <strong>internes</strong> au système assurant la fonction d'usage. Placées au centre. Plusieurs niveaux possibles.</p>
    </div>
    <div class="df-info-card" style="border-top:3px solid var(--df-st-color);">
      <div class="ico">🔧</div>
      <div class="lbl" style="color:var(--df-st-color);">Solutions technologiques</div>
      <p><strong>Composants physiques</strong> du système qui réalisent les fonctions techniques. À droite du diagramme.</p>
    </div>
  </div>

  <div class="df-sec-title">Capteur, Actionneur, Effecteur</div>
  <div class="df-three-grid">
    <div class="df-info-card" style="border-left:4px solid var(--df-cap-color);">
      <div class="lbl" style="color:var(--df-cap-color);">📡 Capteur</div>
      <p><strong>Détecte</strong> une information physique (lumière, position, température…) et la convertit en signal électrique utilisable par l'unité de commande.</p>
      <p style="margin-top:8px;font-size:0.78rem;color:var(--df-muted);">Ex : interrupteur, photorésistance, fin de course, capteur infrarouge</p>
    </div>
    <div class="df-info-card" style="border-left:4px solid var(--df-act-color);">
      <div class="lbl" style="color:var(--df-act-color);">⚡ Actionneur</div>
      <p><strong>Convertit</strong> l'énergie électrique en une autre forme d'énergie pour agir sur le système.</p>
      <p style="margin-top:8px;font-size:0.78rem;color:var(--df-muted);">Ex : moteur (→ mécanique), haut-parleur (→ acoustique), ampoule (→ lumineuse)</p>
    </div>
    <div class="df-info-card" style="border-left:4px solid var(--df-ft-color);">
      <div class="lbl" style="color:var(--df-ft-color);">🎯 Effecteur</div>
      <p><strong>Réalise l'action finale</strong> directement sur la matière d'œuvre. Il est entraîné par l'actionneur.</p>
      <p style="margin-top:8px;font-size:0.78rem;color:var(--df-muted);">Ex : portail, toile d'un store, bras robot, foret d'une perceuse</p>
    </div>
  </div>
</div>

<!-- ===== COURS FAST ===== -->
<div class="df-panel" id="df-panel-cours">
  <div class="df-sec-title">Le diagramme FAST</div>
  <div class="df-card">
    <p><strong>F</strong>unctional <strong>A</strong>nalysis <strong>S</strong>ystem <strong>T</strong>echnique — Analyse fonctionnelle d'un système technique.</p>
    <br>
    <p>Le diagramme FAST représente graphiquement la <strong>structure fonctionnelle</strong> d'un système technique. Il associe des fonctions et des solutions, et se construit <strong>de gauche à droite</strong> en décomposant la fonction d'usage en fonctions techniques puis en solutions technologiques.</p>
  </div>

  <div class="df-fast-wrap">
    <div class="df-fast-label">Schéma de principe — Construction d'un diagramme FAST</div>
    <svg viewBox="0 0 820 300" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="ar" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 z" fill="#aab0c8"/>
        </marker>
        <marker id="arO" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 z" fill="#e67e22"/>
        </marker>
      </defs>
      <!-- Guide arrows -->
      <line x1="18" y1="22" x2="590" y2="22" stroke="#e67e22" stroke-width="1.2" marker-end="url(#arO)" stroke-dasharray="5,3"/>
      <text x="295" y="15" text-anchor="middle" fill="#e67e22" font-family="monospace" font-size="9" letter-spacing="1.5">COMMENT ? →</text>
      <line x1="590" y1="278" x2="18" y2="278" stroke="#aab0c8" stroke-width="1.2" marker-end="url(#ar)" stroke-dasharray="5,3"/>
      <text x="295" y="272" text-anchor="middle" fill="#aab0c8" font-family="monospace" font-size="9" letter-spacing="1.5">← POURQUOI ?</text>

      <!-- FU -->
      <rect x="12" y="112" width="158" height="66" rx="8" fill="#fff8e6" stroke="#f39c12" stroke-width="2"/>
      <text x="91" y="141" text-anchor="middle" fill="#c06a00" font-family="Syne" font-weight="700" font-size="11">Fonction</text>
      <text x="91" y="158" text-anchor="middle" fill="#c06a00" font-family="Syne" font-weight="700" font-size="11">d'usage</text>
      <text x="91" y="172" text-anchor="middle" fill="#aab0c8" font-family="monospace" font-size="8">Satisfaire le besoin</text>
      <line x1="170" y1="145" x2="207" y2="145" stroke="#aab0c8" stroke-width="1.5" marker-end="url(#ar)"/>

      <!-- vertical bar 1 -->
      <line x1="209" y1="46" x2="209" y2="244" stroke="#d0d4e8" stroke-width="2"/>

      <!-- FT1 y=66 -->
      <line x1="209" y1="66" x2="244" y2="66" stroke="#aab0c8" stroke-width="1.5" marker-end="url(#ar)"/>
      <rect x="246" y="34" width="152" height="64" rx="8" fill="#fff0f0" stroke="#e74c3c" stroke-width="1.5"/>
      <text x="322" y="62" text-anchor="middle" fill="#b71c1c" font-family="Syne" font-weight="700" font-size="10">Fonction</text>
      <text x="322" y="77" text-anchor="middle" fill="#b71c1c" font-family="Syne" font-weight="700" font-size="10">technique 1</text>
      <text x="322" y="91" text-anchor="middle" fill="#aab0c8" font-family="monospace" font-size="8">Action interne</text>
      <line x1="398" y1="66" x2="433" y2="66" stroke="#aab0c8" stroke-width="1.5" marker-end="url(#ar)"/>
      <rect x="435" y="34" width="152" height="64" rx="8" fill="#f0fff4" stroke="#27ae60" stroke-width="1.5"/>
      <text x="511" y="62" text-anchor="middle" fill="#145a32" font-family="Syne" font-weight="700" font-size="10">Solution</text>
      <text x="511" y="77" text-anchor="middle" fill="#145a32" font-family="Syne" font-weight="700" font-size="10">technologique 1</text>
      <text x="511" y="91" text-anchor="middle" fill="#aab0c8" font-family="monospace" font-size="8">Composant</text>

      <!-- FT2 y=145 -->
      <line x1="209" y1="145" x2="244" y2="145" stroke="#aab0c8" stroke-width="1.5" marker-end="url(#ar)"/>
      <rect x="246" y="112" width="152" height="66" rx="8" fill="#fff0f0" stroke="#e74c3c" stroke-width="1.5"/>
      <text x="322" y="141" text-anchor="middle" fill="#b71c1c" font-family="Syne" font-weight="700" font-size="10">Fonction</text>
      <text x="322" y="157" text-anchor="middle" fill="#b71c1c" font-family="Syne" font-weight="700" font-size="10">technique 2</text>
      <text x="322" y="171" text-anchor="middle" fill="#aab0c8" font-family="monospace" font-size="8">Action interne</text>

      <!-- bar 2 for multiple solutions -->
      <line x1="398" y1="125" x2="398" y2="215" stroke="#d0d4e8" stroke-width="2"/>
      <line x1="398" y1="136" x2="433" y2="136" stroke="#aab0c8" stroke-width="1.5" marker-end="url(#ar)"/>
      <rect x="435" y="108" width="150" height="54" rx="8" fill="#f0fff4" stroke="#27ae60" stroke-width="1.5"/>
      <text x="510" y="132" text-anchor="middle" fill="#145a32" font-family="Syne" font-weight="700" font-size="10">Solution</text>
      <text x="510" y="147" text-anchor="middle" fill="#145a32" font-family="Syne" font-weight="700" font-size="10">technologique 2a</text>
      <line x1="398" y1="204" x2="433" y2="204" stroke="#aab0c8" stroke-width="1.5" marker-end="url(#ar)"/>
      <rect x="435" y="176" width="150" height="54" rx="8" fill="#f0fff4" stroke="#27ae60" stroke-width="1.5"/>
      <text x="510" y="200" text-anchor="middle" fill="#145a32" font-family="Syne" font-weight="700" font-size="10">Solution</text>
      <text x="510" y="215" text-anchor="middle" fill="#145a32" font-family="Syne" font-weight="700" font-size="10">technologique 2b</text>

      <!-- FT3 y=224 -->
      <line x1="209" y1="224" x2="244" y2="224" stroke="#aab0c8" stroke-width="1.5" marker-end="url(#ar)"/>
      <rect x="246" y="192" width="152" height="64" rx="8" fill="#fff0f0" stroke="#e74c3c" stroke-width="1.5"/>
      <text x="322" y="220" text-anchor="middle" fill="#b71c1c" font-family="Syne" font-weight="700" font-size="10">Fonction</text>
      <text x="322" y="236" text-anchor="middle" fill="#b71c1c" font-family="Syne" font-weight="700" font-size="10">technique 3</text>
      <text x="322" y="250" text-anchor="middle" fill="#aab0c8" font-family="monospace" font-size="8">Action interne</text>
      <line x1="398" y1="224" x2="433" y2="224" stroke="#aab0c8" stroke-width="1.5" marker-end="url(#ar)"/>
      <rect x="435" y="192" width="150" height="64" rx="8" fill="#f0fff4" stroke="#27ae60" stroke-width="1.5"/>
      <text x="510" y="220" text-anchor="middle" fill="#145a32" font-family="Syne" font-weight="700" font-size="10">Solution</text>
      <text x="510" y="236" text-anchor="middle" fill="#145a32" font-family="Syne" font-weight="700" font-size="10">technologique 3</text>

      <!-- Legend -->
      <rect x="625" y="46" width="12" height="12" rx="2" fill="#fff8e6" stroke="#f39c12" stroke-width="1.5"/>
      <text x="643" y="56" fill="#7a6000" font-family="Syne" font-size="9" font-weight="700">Fonction d'usage</text>
      <rect x="625" y="66" width="12" height="12" rx="2" fill="#fff0f0" stroke="#e74c3c" stroke-width="1.5"/>
      <text x="643" y="76" fill="#b71c1c" font-family="Syne" font-size="9" font-weight="700">Fonctions techniques</text>
      <rect x="625" y="86" width="12" height="12" rx="2" fill="#f0fff4" stroke="#27ae60" stroke-width="1.5"/>
      <text x="643" y="96" fill="#145a32" font-family="Syne" font-size="9" font-weight="700">Solutions technologiques</text>
    </svg>
  </div>

  <div class="df-read-grid">
    <div class="df-read-card">
      <div class="dir">→ Lecture gauche à droite</div>
      <p><em>Comment</em> réaliser la fonction technique ?<br><em>Grâce</em> à la solution technologique.</p>
    </div>
    <div class="df-read-card">
      <div class="dir">← Lecture droite à gauche</div>
      <p><em>Pourquoi</em> la solution technologique existe-t-elle ?<br><em>Pour</em> réaliser la fonction technique.</p>
    </div>
  </div>
  <div class="df-card" style="margin-top:14px;">
    <p>Lecture <strong>verticale</strong> : les fonctions techniques peuvent être classées <strong>de haut en bas</strong> par ordre d'importance ou d'intervention dans le fonctionnement du système. Une même fonction technique peut être réalisée par <strong>plusieurs solutions technologiques</strong> (branche verticale à droite).</p>
  </div>
</div>

<!-- ===== CASQUE ===== -->
<div class="df-panel" id="df-panel-casque">
  <div class="df-sec-title">Exercice — Le casque audio</div>
  <div class="df-exo-grid">
    <div class="df-exo-photo">
      <img src="data:image/jpeg;base64,/9j/4QDCRXhpZgAASUkqAAgAAAAHABIBAwABAAAAAQAAABoBBQABAAAAYgAAABsBBQABAAAAagAAACgBAwABAAAAAgAAADEBAgAOAAAAcgAAADIBAgAUAAAAgAAAAGmHBAABAAAAlAAAAAAAAABYAgAAAQAAAFgCAAABAAAAUGhvdG9GaWx0cmUgNwAyMDE5OjA0OjE4IDIyOjE5OjQ5AAMAAJAHAAQAAAAwMjEwAqADAAEAAAD0AQAAA6ADAAEAAAD0AQAA/9sAQwADAgIDAgIDAwMDBAMDBAUIBQUEBAUKBwcGCAwKDAwLCgsLDQ4SEA0OEQ4LCxAWEBETFBUVFQwPFxgWFBgSFBUU/9sAQwEDBAQFBAUJBQUJFA0LDRQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQU/8AAEQgB9AH0AwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/aAAwDAQACEQMRAD8A/VTooigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAprotocol="https" src="casque-audio.jpg" alt="Casque audio">
      <div class="cap">Casque audio stéréo avec composants légendés</div>
    </div>
    <div>
      <div class="df-card">
        <p>Afin de reproduire de la musique, un casque audio est équipé de :</p>
        <br>
        <p>• <strong>2 coussins en mousse</strong> pour s'adapter à l'oreille<br>
        • Une <strong>arche déformable</strong> pour s'adapter à la tête<br>
        • <strong>2 haut-parleurs</strong> pour émettre le son<br>
        • Un <strong>potentiomètre</strong> pour contrôler le volume<br>
        • Une <strong>fiche et un cordon</strong> pour transmettre le signal</p>
      </div>
      <ul class="df-questions" id="df-q-casque"></ul>
    </div>
  </div>
  <div class="df-corr-btn-wrap">
    <button class="df-corr-btn" onclick="toggleDfCorr('casque')">
      <span>💡</span> Voir la correction — Diagramme FAST complet
    </button>
  </div>
  <div class="df-corr-panel" id="df-corr-casque">
    <div class="df-corr-hdr">
      <span>✅ Correction — Diagramme FAST du casque audio</span>
      <button class="df-corr-close" onclick="toggleDfCorr('casque')">✕</button>
    </div>
    <div class="df-corr-body">
      <svg viewBox="0 0 790 340" xmlns="http://www.w3.org/2000/svg">
        <defs><marker id="ac" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 z" fill="#aab0c8"/></marker></defs>
        <rect x="8" y="134" width="144" height="62" rx="7" fill="#fff8e6" stroke="#f39c12" stroke-width="2"/>
        <text x="80" y="161" text-anchor="middle" fill="#c06a00" font-family="Syne" font-weight="800" font-size="10">Reproduire</text>
        <text x="80" y="176" text-anchor="middle" fill="#c06a00" font-family="Syne" font-weight="800" font-size="10">de la musique</text>
        <line x1="152" y1="165" x2="184" y2="165" stroke="#aab0c8" stroke-width="1.5" marker-end="url(#ac)"/>
        <line x1="186" y1="38" x2="186" y2="318" stroke="#d0d4e8" stroke-width="2"/>

        <line x1="186" y1="52" x2="218" y2="52" stroke="#aab0c8" stroke-width="1.5" marker-end="url(#ac)"/>
        <rect x="220" y="22" width="144" height="60" rx="7" fill="#fff0f0" stroke="#e74c3c" stroke-width="1.5"/>
        <text x="292" y="49" text-anchor="middle" fill="#b71c1c" font-family="Syne" font-weight="700" font-size="10">S'adapter</text>
        <text x="292" y="64" text-anchor="middle" fill="#b71c1c" font-family="Syne" font-weight="700" font-size="10">à la tête</text>
        <line x1="364" y1="52" x2="396" y2="52" stroke="#aab0c8" stroke-width="1.5" marker-end="url(#ac)"/>
        <rect x="398" y="22" width="144" height="60" rx="7" fill="#f0fff4" stroke="#27ae60" stroke-width="1.5"/>
        <text x="470" y="49" text-anchor="middle" fill="#145a32" font-family="Syne" font-weight="700" font-size="10">Arche</text>
        <text x="470" y="64" text-anchor="middle" fill="#145a32" font-family="Syne" font-weight="700" font-size="10">déformable</text>

        <line x1="186" y1="108" x2="218" y2="108" stroke="#aab0c8" stroke-width="1.5" marker-end="url(#ac)"/>
        <rect x="220" y="78" width="144" height="60" rx="7" fill="#fff0f0" stroke="#e74c3c" stroke-width="1.5"/>
        <text x="292" y="105" text-anchor="middle" fill="#b71c1c" font-family="Syne" font-weight="700" font-size="10">S'adapter</text>
        <text x="292" y="120" text-anchor="middle" fill="#b71c1c" font-family="Syne" font-weight="700" font-size="10">à l'oreille</text>
        <line x1="364" y1="108" x2="396" y2="108" stroke="#aab0c8" stroke-width="1.5" marker-end="url(#ac)"/>
        <rect x="398" y="78" width="144" height="60" rx="7" fill="#f0fff4" stroke="#27ae60" stroke-width="1.5"/>
        <text x="470" y="105" text-anchor="middle" fill="#145a32" font-family="Syne" font-weight="700" font-size="10">Coussins</text>
        <text x="470" y="120" text-anchor="middle" fill="#145a32" font-family="Syne" font-weight="700" font-size="10">en mousse</text>

        <line x1="186" y1="164" x2="218" y2="164" stroke="#aab0c8" stroke-width="1.5" marker-end="url(#ac)"/>
        <rect x="220" y="134" width="144" height="60" rx="7" fill="#fff0f0" stroke="#e74c3c" stroke-width="1.5"/>
        <text x="292" y="161" text-anchor="middle" fill="#b71c1c" font-family="Syne" font-weight="700" font-size="10">Émettre</text>
        <text x="292" y="176" text-anchor="middle" fill="#b71c1c" font-family="Syne" font-weight="700" font-size="10">le son</text>
        <line x1="364" y1="164" x2="396" y2="164" stroke="#aab0c8" stroke-width="1.5" marker-end="url(#ac)"/>
        <rect x="398" y="134" width="144" height="60" rx="7" fill="#e8f4ff" stroke="#2980b9" stroke-width="2"/>
        <text x="470" y="160" text-anchor="middle" fill="#1a4a7a" font-family="Syne" font-weight="700" font-size="10">Haut-parleurs</text>
        <text x="470" y="176" text-anchor="middle" fill="#2980b9" font-family="monospace" font-size="8">⚡ ACTIONNEUR</text>

        <line x1="186" y1="220" x2="218" y2="220" stroke="#aab0c8" stroke-width="1.5" marker-end="url(#ac)"/>
        <rect x="220" y="190" width="144" height="60" rx="7" fill="#fff0f0" stroke="#e74c3c" stroke-width="1.5"/>
        <text x="292" y="217" text-anchor="middle" fill="#b71c1c" font-family="Syne" font-weight="700" font-size="10">Contrôler</text>
        <text x="292" y="232" text-anchor="middle" fill="#b71c1c" font-family="Syne" font-weight="700" font-size="10">le volume</text>
        <line x1="364" y1="220" x2="396" y2="220" stroke="#aab0c8" stroke-width="1.5" marker-end="url(#ac)"/>
        <rect x="398" y="190" width="144" height="60" rx="7" fill="#f8f0ff" stroke="#8e44ad" stroke-width="2"/>
        <text x="470" y="217" text-anchor="middle" fill="#5b2c6f" font-family="Syne" font-weight="700" font-size="10">Potentiomètre</text>
        <text x="470" y="232" text-anchor="middle" fill="#8e44ad" font-family="monospace" font-size="8">📡 CAPTEUR</text>

        <line x1="186" y1="282" x2="218" y2="282" stroke="#aab0c8" stroke-width="1.5" marker-end="url(#ac)"/>
        <rect x="220" y="254" width="144" height="56" rx="7" fill="#fff0f0" stroke="#e74c3c" stroke-width="1.5"/>
        <text x="292" y="280" text-anchor="middle" fill="#b71c1c" font-family="Syne" font-weight="700" font-size="10">Transmettre</text>
        <text x="292" y="295" text-anchor="middle" fill="#b71c1c" font-family="Syne" font-weight="700" font-size="10">le signal</text>
        <line x1="364" y1="282" x2="396" y2="282" stroke="#aab0c8" stroke-width="1.5" marker-end="url(#ac)"/>
        <rect x="398" y="254" width="144" height="56" rx="7" fill="#f0fff4" stroke="#27ae60" stroke-width="1.5"/>
        <text x="470" y="280" text-anchor="middle" fill="#145a32" font-family="Syne" font-weight="700" font-size="10">Fiche</text>
        <text x="470" y="295" text-anchor="middle" fill="#145a32" font-family="Syne" font-weight="700" font-size="10">et cordon</text>

        <rect x="578" y="128" width="196" height="82" rx="7" fill="#fff8e6" stroke="#f39c12" stroke-width="1.5"/>
        <text x="676" y="148" text-anchor="middle" fill="#7a5500" font-family="Syne" font-weight="700" font-size="9">Q.5 — Actionneur (haut-parleur)</text>
        <line x1="586" y1="158" x2="768" y2="158" stroke="#f0e0a0" stroke-width="1"/>
        <text x="586" y="171" fill="#7a5500" font-family="Syne" font-size="9">⚡ Entrée : Énergie électrique</text>
        <text x="586" y="188" fill="#7a5500" font-family="Syne" font-size="9">🔊 Sortie : Énergie acoustique</text>
        <line x1="542" y1="164" x2="578" y2="164" stroke="#f39c12" stroke-width="1.3" stroke-dasharray="4,3" marker-end="url(#ac)"/>
      </svg>
      <div class="df-leg-row">
        <div class="df-leg-item"><div class="df-leg-dot" style="border-color:#f39c12;background:#fff8e6;"></div>Fonction d'usage</div>
        <div class="df-leg-item"><div class="df-leg-dot" style="border-color:#e74c3c;background:#fff0f0;"></div>Fonctions techniques</div>
        <div class="df-leg-item"><div class="df-leg-dot" style="border-color:#27ae60;background:#f0fff4;"></div>Solutions technologiques</div>
        <div class="df-leg-item"><div class="df-leg-dot" style="border-color:#2980b9;background:#e8f4ff;"></div>Actionneur</div>
        <div class="df-leg-item"><div class="df-leg-dot" style="border-color:#8e44ad;background:#f8f0ff;"></div>Capteur</div>
      </div>
    </div>
  </div>
</div>

<!-- ===== LAMPE ===== -->
<div class="df-panel" id="df-panel-lampe">
  <div class="df-sec-title">Exercice — La lampe de bureau</div>
  <div class="df-exo-grid">
    <div class="df-exo-photo">
      <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAGQAXIDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/aAAwDAQACEQMRAD8A/U6iii..." alt="Lampe de bureau">
      <div class="cap">Lampe de bureau articulée</div>
    </div>
    <div>
      <div class="df-res-grid">
        <div class="df-res-block ft">
          <h4>Fonctions proposées</h4>
          <ul>
            <li>Distribuer l'énergie</li>
            <li>Éclairer le bureau</li>
            <li>Générer de la lumière</li>
            <li>Positionner l'éclairage</li>
          </ul>
        </div>
        <div class="df-res-block st">
          <h4>Solutions proposées</h4>
          <ul>
            <li>Abat-jour</li>
            <li>Fils électriques</li>
            <li>Socle</li>
          </ul>
        </div>
      </div>
      <ul class="df-questions" id="df-q-lampe"></ul>
    </div>
  </div>
  <div class="df-corr-btn-wrap">
    <button class="df-corr-btn" onclick="toggleDfCorr('lampe')">
      <span>💡</span> Voir la correction — Diagramme FAST complet
    </button>
  </div>
  <div class="df-corr-panel" id="df-corr-lampe">
    <div class="df-corr-hdr">
      <span>✅ Correction — Diagramme FAST de la lampe de bureau</span>
      <button class="df-corr-close" onclick="toggleDfCorr('lampe')">✕</button>
    </div>
    <div class="df-corr-body">
      <svg viewBox="0 0 700 270" xmlns="http://www.w3.org/2000/svg">
        <defs><marker id="al" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 z" fill="#aab0c8"/></marker></defs>
        <rect x="8" y="100" width="144" height="62" rx="7" fill="#fff8e6" stroke="#f39c12" stroke-width="2"/>
        <text x="80" y="127" text-anchor="middle" fill="#c06a00" font-family="Syne" font-weight="800" font-size="10">Éclairer</text>
        <text x="80" y="142" text-anchor="middle" fill="#c06a00" font-family="Syne" font-weight="800" font-size="10">le bureau</text>
        <line x1="152" y1="131" x2="184" y2="131" stroke="#aab0c8" stroke-width="1.5" marker-end="url(#al)"/>
        <line x1="186" y1="28" x2="186" y2="248" stroke="#d0d4e8" stroke-width="2"/>

        <line x1="186" y1="44" x2="218" y2="44" stroke="#aab0c8" stroke-width="1.5" marker-end="url(#al)"/>
        <rect x="220" y="18" width="142" height="52" rx="7" fill="#fff0f0" stroke="#e74c3c" stroke-width="1.5"/>
        <text x="291" y="42" text-anchor="middle" fill="#b71c1c" font-family="Syne" font-weight="700" font-size="10">Positionner</text>
        <text x="291" y="57" text-anchor="middle" fill="#b71c1c" font-family="Syne" font-weight="700" font-size="10">l'éclairage</text>
        <line x1="362" y1="44" x2="394" y2="44" stroke="#aab0c8" stroke-width="1.5" marker-end="url(#al)"/>
        <rect x="396" y="18" width="142" height="52" rx="7" fill="#f0fff4" stroke="#27ae60" stroke-width="1.5"/>
        <text x="467" y="42" text-anchor="middle" fill="#145a32" font-family="Syne" font-weight="700" font-size="10">Abat-jour +</text>
        <text x="467" y="57" text-anchor="middle" fill="#145a32" font-family="Syne" font-weight="700" font-size="10">bras articulé</text>

        <line x1="186" y1="100" x2="218" y2="100" stroke="#aab0c8" stroke-width="1.5" marker-end="url(#al)"/>
        <rect x="220" y="74" width="142" height="52" rx="7" fill="#fff0f0" stroke="#e74c3c" stroke-width="1.5"/>
        <text x="291" y="98" text-anchor="middle" fill="#b71c1c" font-family="Syne" font-weight="700" font-size="10">Générer</text>
        <text x="291" y="113" text-anchor="middle" fill="#b71c1c" font-family="Syne" font-weight="700" font-size="10">de la lumière</text>
        <line x1="362" y1="100" x2="394" y2="100" stroke="#aab0c8" stroke-width="1.5" marker-end="url(#al)"/>
        <rect x="396" y="74" width="142" height="52" rx="7" fill="#e8f4ff" stroke="#2980b9" stroke-width="2"/>
        <text x="467" y="98" text-anchor="middle" fill="#1a4a7a" font-family="Syne" font-weight="700" font-size="10">Ampoule</text>
        <text x="467" y="113" text-anchor="middle" fill="#2980b9" font-family="monospace" font-size="8">⚡ ACTIONNEUR</text>

        <line x1="186" y1="158" x2="218" y2="158" stroke="#aab0c8" stroke-width="1.5" marker-end="url(#al)"/>
        <rect x="220" y="132" width="142" height="52" rx="7" fill="#fff0f0" stroke="#e74c3c" stroke-width="1.5"/>
        <text x="291" y="156" text-anchor="middle" fill="#b71c1c" font-family="Syne" font-weight="700" font-size="10">Distribuer</text>
        <text x="291" y="171" text-anchor="middle" fill="#b71c1c" font-family="Syne" font-weight="700" font-size="10">l'énergie</text>
        <line x1="362" y1="158" x2="394" y2="158" stroke="#aab0c8" stroke-width="1.5" marker-end="url(#al)"/>
        <line x1="396" y1="142" x2="396" y2="212" stroke="#d0d4e8" stroke-width="2"/>
        <line x1="396" y1="148" x2="428" y2="148" stroke="#aab0c8" stroke-width="1.5" marker-end="url(#al)"/>
        <rect x="430" y="124" width="142" height="48" rx="7" fill="#f8f0ff" stroke="#8e44ad" stroke-width="2"/>
        <text x="501" y="147" text-anchor="middle" fill="#5b2c6f" font-family="Syne" font-weight="700" font-size="10">Interrupteur</text>
        <text x="501" y="162" text-anchor="middle" fill="#8e44ad" font-family="monospace" font-size="8">📡 CAPTEUR</text>
        <line x1="396" y1="206" x2="428" y2="206" stroke="#aab0c8" stroke-width="1.5" marker-end="url(#al)"/>
        <rect x="430" y="182" width="142" height="48" rx="7" fill="#f0fff4" stroke="#27ae60" stroke-width="1.5"/>
        <text x="501" y="205" text-anchor="middle" fill="#145a32" font-family="Syne" font-weight="700" font-size="10">Fils</text>
        <text x="501" y="220" text-anchor="middle" fill="#145a32" font-family="Syne" font-weight="700" font-size="10">électriques</text>

        <line x1="186" y1="228" x2="218" y2="228" stroke="#aab0c8" stroke-width="1.5" marker-end="url(#al)"/>
        <rect x="220" y="202" width="142" height="52" rx="7" fill="#fff0f0" stroke="#e74c3c" stroke-width="1.5"/>
        <text x="291" y="226" text-anchor="middle" fill="#b71c1c" font-family="Syne" font-weight="700" font-size="10">Stabiliser</text>
        <text x="291" y="241" text-anchor="middle" fill="#b71c1c" font-family="Syne" font-weight="700" font-size="10">la lampe</text>
        <line x1="362" y1="228" x2="394" y2="228" stroke="#aab0c8" stroke-width="1.5" marker-end="url(#al)"/>
        <rect x="396" y="202" width="142" height="52" rx="7" fill="#f0fff4" stroke="#27ae60" stroke-width="1.5"/>
        <text x="467" y="226" text-anchor="middle" fill="#145a32" font-family="Syne" font-weight="700" font-size="10">Socle</text>
      </svg>
      <div class="df-leg-row">
        <div class="df-leg-item"><div class="df-leg-dot" style="border-color:#f39c12;background:#fff8e6;"></div>Fonction d'usage</div>
        <div class="df-leg-item"><div class="df-leg-dot" style="border-color:#e74c3c;background:#fff0f0;"></div>Fonctions techniques</div>
        <div class="df-leg-item"><div class="df-leg-dot" style="border-color:#27ae60;background:#f0fff4;"></div>Solutions technologiques</div>
        <div class="df-leg-item"><div class="df-leg-dot" style="border-color:#2980b9;background:#e8f4ff;"></div>Actionneur</div>
        <div class="df-leg-item"><div class="df-leg-dot" style="border-color:#8e44ad;background:#f8f0ff;"></div>Capteur</div>
      </div>
    </div>
  </div>
</div>

<!-- ===== PORTAIL ===== -->
<div class="df-panel" id="df-panel-portail">
  <div class="df-sec-title">Exercice — Le portail automatique</div>
  <div class="df-exo-grid">
    <div class="df-exo-photo">
      <img src="data:image/jpeg;base64,/9j/4QDCRXhpZgAASUkqAAgAAAAHABIBAwABAAAAAQAAABoBBQABAAAAYgAAABsBBQABAAAAagAAACgBAwABAAAAAgAAADEBAgAOAAAAcgAAADIBAgAUAAAAgAAAAGmHBAABAAAAlAAAAP////9YAgAAAQAAAFgCAAABAAAAUGhvdG9GaWx0cmUgNwAyMDE5OjA0OjE4IDAwOjA6MTcAAMAAJAHAAQAAAAwMjEwAqADAAEAAAD0AQAAA6ADAAEAAAD0AQAA/9sAQwADAgIDAgIDAwMDBAMDBAUIBQUEBAUKBwcGCAwKDAwLCgsLDQ4SEA0OEQ4LCxAWEBETFBUVFQwPFxgWFBgSFBUU/9sAQwEDBAQFBAUJBQUJFA0LDRQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQU/8AAEQgB9AH0AwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/aAAwDAQACEQMRAD8A/U6iii..." alt="Portail automatique">
      <div class="cap">Portail automatique avec composants légendés</div>
    </div>
    <div>
      <div class="df-res-block ft" style="margin-bottom:14px;">
        <h4>Fonctions proposées</h4>
        <ul>
          <li>Déterminer la position du portail</li>
          <li>Générer le mouvement</li>
          <li>Gérer les accès</li>
          <li>Tenir et guider le portail</li>
          <li>Transmettre le mouvement au portail</li>
        </ul>
      </div>
      <ul class="df-questions" id="df-q-portail"></ul>
    </div>
  </div>
  <div class="df-corr-btn-wrap">
    <button class="df-corr-btn" onclick="toggleDfCorr('portail')">
      <span>💡</span> Voir la correction — Diagramme FAST complet
    </button>
  </div>
  <div class="df-corr-panel" id="df-corr-portail">
    <div class="df-corr-hdr">
      <span>✅ Correction — Diagramme FAST du portail</span>
      <button class="df-corr-close" onclick="toggleDfCorr('portail')">✕</button>
    </div>
    <div class="df-corr-body">
      <svg viewBox="0 0 700 248" xmlns="http://www.w3.org/2000/svg">
        <defs><marker id="ap" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 z" fill="#aab0c8"/></marker></defs>
        <rect x="8" y="90" width="144" height="62" rx="7" fill="#fff8e6" stroke="#f39c12" stroke-width="2"/>
        <text x="80" y="117" text-anchor="middle" fill="#c06a00" font-family="Syne" font-weight="800" font-size="10">Gérer</text>
        <text x="80" y="132" text-anchor="middle" fill="#c06a00" font-family="Syne" font-weight="800" font-size="10">les accès</text>
        <line x1="152" y1="121" x2="184" y2="121" stroke="#aab0c8" stroke-width="1.5" marker-end="url(#ap)"/>
        <line x1="186" y1="28" x2="186" y2="228" stroke="#d0d4e8" stroke-width="2"/>

        <line x1="186" y1="42" x2="218" y2="42" stroke="#aab0c8" stroke-width="1.5" marker-end="url(#ap)"/>
        <rect x="220" y="16" width="142" height="52" rx="7" fill="#fff0f0" stroke="#e74c3c" stroke-width="1.5"/>
        <text x="291" y="40" text-anchor="middle" fill="#b71c1c" font-family="Syne" font-weight="700" font-size="10">Déterminer</text>
        <text x="291" y="55" text-anchor="middle" fill="#b71c1c" font-family="Syne" font-weight="700" font-size="10">la position</text>
        <line x1="362" y1="42" x2="394" y2="42" stroke="#aab0c8" stroke-width="1.5" marker-end="url(#ap)"/>
        <rect x="396" y="16" width="142" height="52" rx="7" fill="#f8f0ff" stroke="#8e44ad" stroke-width="2"/>
        <text x="467" y="40" text-anchor="middle" fill="#5b2c6f" font-family="Syne" font-weight="700" font-size="10">Came</text>
        <text x="467" y="55" text-anchor="middle" fill="#8e44ad" font-family="monospace" font-size="8">📡 CAPTEUR</text>

        <line x1="186" y1="98" x2="218" y2="98" stroke="#aab0c8" stroke-width="1.5" marker-end="url(#ap)"/>
        <rect x="220" y="72" width="142" height="52" rx="7" fill="#fff0f0" stroke="#e74c3c" stroke-width="1.5"/>
        <text x="291" y="96" text-anchor="middle" fill="#b71c1c" font-family="Syne" font-weight="700" font-size="10">Générer</text>
        <text x="291" y="111" text-anchor="middle" fill="#b71c1c" font-family="Syne" font-weight="700" font-size="10">le mouvement</text>
        <line x1="362" y1="98" x2="394" y2="98" stroke="#aab0c8" stroke-width="1.5" marker-end="url(#ap)"/>
        <rect x="396" y="72" width="142" height="52" rx="7" fill="#e8f4ff" stroke="#2980b9" stroke-width="2"/>
        <text x="467" y="96" text-anchor="middle" fill="#1a4a7a" font-family="Syne" font-weight="700" font-size="10">Moteur</text>
        <text x="467" y="111" text-anchor="middle" fill="#2980b9" font-family="monospace" font-size="8">⚡ ACTIONNEUR</text>

        <line x1="186" y1="154" x2="218" y2="154" stroke="#aab0c8" stroke-width="1.5" marker-end="url(#ap)"/>
        <rect x="220" y="128" width="142" height="52" rx="7" fill="#fff0f0" stroke="#e74c3c" stroke-width="1.5"/>
        <text x="291" y="152" text-anchor="middle" fill="#b71c1c" font-family="Syne" font-weight="700" font-size="10">Transmettre</text>
        <text x="291" y="167" text-anchor="middle" fill="#b71c1c" font-family="Syne" font-weight="700" font-size="10">le mouvement</text>
        <line x1="362" y1="154" x2="394" y2="154" stroke="#aab0c8" stroke-width="1.5" marker-end="url(#ap)"/>
        <rect x="396" y="128" width="142" height="52" rx="7" fill="#f0fff4" stroke="#27ae60" stroke-width="1.5"/>
        <text x="467" y="151" text-anchor="middle" fill="#145a32" font-family="Syne" font-weight="700" font-size="10">Bielle moteur</text>
        <text x="467" y="166" text-anchor="middle" fill="#145a32" font-family="Syne" font-weight="700" font-size="10">+ bielle porte</text>

        <line x1="186" y1="210" x2="218" y2="210" stroke="#aab0c8" stroke-width="1.5" marker-end="url(#ap)"/>
        <rect x="220" y="184" width="142" height="52" rx="7" fill="#fff0f0" stroke="#e74c3c" stroke-width="1.5"/>
        <text x="291" y="208" text-anchor="middle" fill="#b71c1c" font-family="Syne" font-weight="700" font-size="10">Tenir et guider</text>
        <text x="291" y="223" text-anchor="middle" fill="#b71c1c" font-family="Syne" font-weight="700" font-size="10">le portail</text>
        <line x1="362" y1="210" x2="394" y2="210" stroke="#aab0c8" stroke-width="1.5" marker-end="url(#ap)"/>
        <rect x="396" y="184" width="142" height="52" rx="7" fill="#f0fff4" stroke="#27ae60" stroke-width="1.5"/>
        <text x="467" y="208" text-anchor="middle" fill="#145a32" font-family="Syne" font-weight="700" font-size="10">Charnière</text>
        <text x="467" y="223" text-anchor="middle" fill="#145a32" font-family="Syne" font-weight="700" font-size="10">+ fixation</text>

        <rect x="565" y="184" width="126" height="52" rx="7" fill="#fff0e0" stroke="#e67e22" stroke-width="1.5"/>
        <text x="628" y="205" text-anchor="middle" fill="#7a3300" font-family="Syne" font-weight="700" font-size="9">Effecteur :</text>
        <text x="628" y="220" text-anchor="middle" fill="#7a3300" font-family="Syne" font-size="9">Le portail</text>
      </svg>
      <div class="df-leg-row">
        <div class="df-leg-item"><div class="df-leg-dot" style="border-color:#f39c12;background:#fff8e6;"></div>Fonction d'usage</div>
        <div class="df-leg-item"><div class="df-leg-dot" style="border-color:#e74c3c;background:#fff0f0;"></div>Fonctions techniques</div>
        <div class="df-leg-item"><div class="df-leg-dot" style="border-color:#27ae60;background:#f0fff4;"></div>Solutions technologiques</div>
        <div class="df-leg-item"><div class="df-leg-dot" style="border-color:#2980b9;background:#e8f4ff;"></div>Actionneur</div>
        <div class="df-leg-item"><div class="df-leg-dot" style="border-color:#8e44ad;background:#f8f0ff;"></div>Capteur</div>
        <div class="df-leg-item"><div class="df-leg-dot" style="border-color:#e67e22;background:#fff0e0;"></div>Effecteur</div>
      </div>
    </div>
  </div>
</div>

<!-- ===== ALARME ===== -->
<div class="df-panel" id="df-panel-alarme">
  <div class="df-sec-title">Exercice — L'alarme centralisée</div>
  <div class="df-exo-grid">
    <div class="df-exo-photo">
      <img src="data:image/jpeg;base64,/9j/4QDCRXhpZgAASUkqAAgAAAAHABIBAwABAAAAAQAAABoBBQABAAAAYgAAABsBBQABAAAAagAAACgBAwABAAAAAgAAADEBAgAOAAAAcgAAADIBAgAUAAAAgAAAAGmHBAABAAAAlAAAAAAAAQBYAgAAAQAAAFgCAAABAAAAUGhvdG9GaWx0cmUgNwAyMDE5OjA0OjIyIDE1OjI1OjA5AAMAAJAHAAQAAAAwMjEwAqADAAEAAABYAgAAA6ADAAEAAAB8AQAA/9sAQwADAgIDAgIDAwMDBAMDBAUIBQUEBAUKBwcGCAwKDAwLCgsLDQ4SEA0OEQ4LCxAWEBETFBUVFQwPFxgWFBgSFBUU/9sAQwEDBAQFBAUJBQUJFA0LDRQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQU/8AAEQgBfAJYAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/aAAwDAQACEQMRAD8A/U6iii..." alt="Alarme centralisée">
      <div class="cap">Système d'alarme centralisée — composants numérotés ①→⑦</div>
    </div>
    <div>
      <div class="df-res-grid">
        <div class="df-res-block ft">
          <h4>Fonctions proposées</h4>
          <ul>
            <li>Alerter le voisinage</li>
            <li>Communiquer par le réseau</li>
            <li>Configurer l'activation</li>
            <li>Détecter l'ouverture d'une issue</li>
            <li>Détecter la présence</li>
            <li>Mettre l'alarme en veille</li>
            <li>Surveiller une zone</li>
            <li>Traiter les informations</li>
          </ul>
        </div>
        <div class="df-res-block st">
          <h4>Solutions (composants)</h4>
          <ul>
            <li>① Unité centrale</li>
            <li>② Capteur magnétique</li>
            <li>③ Capteur infrarouge</li>
            <li>④ Clavier mural</li>
            <li>⑤ Télécommande</li>
            <li>⑥ Prise téléphonique</li>
            <li>⑦ Sirène avec flash</li>
          </ul>
        </div>
      </div>
      <ul class="df-questions" id="df-q-alarme"></ul>
    </div>
  </div>
  <div class="df-corr-btn-wrap">
    <button class="df-corr-btn" onclick="toggleDfCorr('alarme')">
      <span>💡</span> Voir la correction — Diagramme FAST complet
    </button>
  </div>
  <div class="df-corr-panel" id="df-corr-alarme">
    <div class="df-corr-hdr">
      <span>✅ Correction — Diagramme FAST de l'alarme centralisée</span>
      <button class="df-corr-close" onclick="toggleDfCorr('alarme')">✕</button>
    </div>
    <div class="df-corr-body">
      <svg viewBox="0 0 700 400" xmlns="http://www.w3.org/2000/svg">
        <defs><marker id="aa" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 z" fill="#aab0c8"/></marker></defs>
        <rect x="8" y="172" width="144" height="62" rx="7" fill="#fff8e6" stroke="#f39c12" stroke-width="2"/>
        <text x="80" y="199" text-anchor="middle" fill="#c06a00" font-family="Syne" font-weight="800" font-size="10">Surveiller</text>
        <text x="80" y="214" text-anchor="middle" fill="#c06a00" font-family="Syne" font-weight="800" font-size="10">une zone</text>
        <line x1="152" y1="203" x2="184" y2="203" stroke="#aab0c8" stroke-width="1.5" marker-end="url(#aa)"/>
        <line x1="186" y1="28" x2="186" y2="384" stroke="#d0d4e8" stroke-width="2"/>

        <line x1="186" y1="44" x2="218" y2="44" stroke="#aab0c8" stroke-width="1.5" marker-end="url(#aa)"/>
        <rect x="220" y="18" width="142" height="52" rx="7" fill="#fff0f0" stroke="#e74c3c" stroke-width="1.5"/>
        <text x="291" y="42" text-anchor="middle" fill="#b71c1c" font-family="Syne" font-weight="700" font-size="10">Traiter</text>
        <text x="291" y="57" text-anchor="middle" fill="#b71c1c" font-family="Syne" font-weight="700" font-size="10">les informations</text>
        <line x1="362" y1="44" x2="394" y2="44" stroke="#aab0c8" stroke-width="1.5" marker-end="url(#aa)"/>
        <rect x="396" y="18" width="142" height="52" rx="7" fill="#e8f4ff" stroke="#2980b9" stroke-width="2"/>
        <text x="467" y="42" text-anchor="middle" fill="#1a4a7a" font-family="Syne" font-weight="700" font-size="10">① Unité centrale</text>
        <text x="467" y="57" text-anchor="middle" fill="#2980b9" font-family="monospace" font-size="8">TRAITEMENT</text>

        <line x1="186" y1="100" x2="218" y2="100" stroke="#aab0c8" stroke-width="1.5" marker-end="url(#aa)"/>
        <rect x="220" y="74" width="142" height="52" rx="7" fill="#fff0f0" stroke="#e74c3c" stroke-width="1.5"/>
        <text x="291" y="98" text-anchor="middle" fill="#b71c1c" font-family="Syne" font-weight="700" font-size="10">Détecter</text>
        <text x="291" y="113" text-anchor="middle" fill="#b71c1c" font-family="Syne" font-weight="700" font-size="10">l'ouverture</text>
        <line x1="362" y1="100" x2="394" y2="100" stroke="#aab0c8" stroke-width="1.5" marker-end="url(#aa)"/>
        <rect x="396" y="74" width="142" height="52" rx="7" fill="#f8f0ff" stroke="#8e44ad" stroke-width="2"/>
        <text x="467" y="98" text-anchor="middle" fill="#5b2c6f" font-family="Syne" font-weight="700" font-size="10">② Capteur</text>
        <text x="467" y="113" text-anchor="middle" fill="#8e44ad" font-family="monospace" font-size="8">📡 CAPTEUR MAGNÉTIQUE</text>

        <line x1="186" y1="156" x2="218" y2="156" stroke="#aab0c8" stroke-width="1.5" marker-end="url(#aa)"/>
        <rect x="220" y="130" width="142" height="52" rx="7" fill="#fff0f0" stroke="#e74c3c" stroke-width="1.5"/>
        <text x="291" y="154" text-anchor="middle" fill="#b71c1c" font-family="Syne" font-weight="700" font-size="10">Détecter</text>
        <text x="291" y="169" text-anchor="middle" fill="#b71c1c" font-family="Syne" font-weight="700" font-size="10">la présence</text>
        <line x1="362" y1="156" x2="394" y2="156" stroke="#aab0c8" stroke-width="1.5" marker-end="url(#aa)"/>
        <rect x="396" y="130" width="142" height="52" rx="7" fill="#f8f0ff" stroke="#8e44ad" stroke-width="2"/>
        <text x="467" y="154" text-anchor="middle" fill="#5b2c6f" font-family="Syne" font-weight="700" font-size="10">③ Capteur</text>
        <text x="467" y="169" text-anchor="middle" fill="#8e44ad" font-family="monospace" font-size="8">📡 CAPTEUR INFRAROUGE</text>

        <line x1="186" y1="228" x2="218" y2="228" stroke="#aab0c8" stroke-width="1.5" marker-end="url(#aa)"/>
        <rect x="220" y="200" width="142" height="56" rx="7" fill="#fff0f0" stroke="#e74c3c" stroke-width="1.5"/>
        <text x="291" y="224" text-anchor="middle" fill="#b71c1c" font-family="Syne" font-weight="700" font-size="10">Configurer /</text>
        <text x="291" y="239" text-anchor="middle" fill="#b71c1c" font-family="Syne" font-weight="700" font-size="10">Mettre en veille</text>
        <line x1="362" y1="228" x2="394" y2="228" stroke="#aab0c8" stroke-width="1.5" marker-end="url(#aa)"/>
        <line x1="396" y1="210" x2="396" y2="278" stroke="#d0d4e8" stroke-width="2"/>
        <line x1="396" y1="218" x2="428" y2="218" stroke="#aab0c8" stroke-width="1.5" marker-end="url(#aa)"/>
        <rect x="430" y="194" width="142" height="48" rx="7" fill="#f8f0ff" stroke="#8e44ad" stroke-width="2"/>
        <text x="501" y="216" text-anchor="middle" fill="#5b2c6f" font-family="Syne" font-weight="700" font-size="10">④ Clavier mural</text>
        <text x="501" y="231" text-anchor="middle" fill="#8e44ad" font-family="monospace" font-size="8">📡 CAPTEUR</text>
        <line x1="396" y1="272" x2="428" y2="272" stroke="#aab0c8" stroke-width="1.5" marker-end="url(#aa)"/>
        <rect x="430" y="248" width="142" height="48" rx="7" fill="#f8f0ff" stroke="#8e44ad" stroke-width="2"/>
        <text x="501" y="270" text-anchor="middle" fill="#5b2c6f" font-family="Syne" font-weight="700" font-size="10">⑤ Télécommande</text>
        <text x="501" y="285" text-anchor="middle" fill="#8e44ad" font-family="monospace" font-size="8">📡 CAPTEUR</text>

        <line x1="186" y1="316" x2="218" y2="316" stroke="#aab0c8" stroke-width="1.5" marker-end="url(#aa)"/>
        <rect x="220" y="290" width="142" height="52" rx="7" fill="#fff0f0" stroke="#e74c3c" stroke-width="1.5"/>
        <text x="291" y="314" text-anchor="middle" fill="#b71c1c" font-family="Syne" font-weight="700" font-size="10">Communiquer</text>
        <text x="291" y="329" text-anchor="middle" fill="#b71c1c" font-family="Syne" font-weight="700" font-size="10">par le réseau</text>
        <line x1="362" y1="316" x2="394" y2="316" stroke="#aab0c8" stroke-width="1.5" marker-end="url(#aa)"/>
        <rect x="396" y="290" width="142" height="52" rx="7" fill="#f0fff4" stroke="#27ae60" stroke-width="1.5"/>
        <text x="467" y="314" text-anchor="middle" fill="#145a32" font-family="Syne" font-weight="700" font-size="10">⑥ Prise</text>
        <text x="467" y="329" text-anchor="middle" fill="#145a32" font-family="Syne" font-weight="700" font-size="10">téléphonique</text>

        <line x1="186" y1="368" x2="218" y2="368" stroke="#aab0c8" stroke-width="1.5" marker-end="url(#aa)"/>
        <rect x="220" y="342" width="142" height="52" rx="7" fill="#fff0f0" stroke="#e74c3c" stroke-width="1.5"/>
        <text x="291" y="366" text-anchor="middle" fill="#b71c1c" font-family="Syne" font-weight="700" font-size="10">Alerter</text>
        <text x="291" y="381" text-anchor="middle" fill="#b71c1c" font-family="Syne" font-weight="700" font-size="10">le voisinage</text>
        <line x1="362" y1="368" x2="394" y2="368" stroke="#aab0c8" stroke-width="1.5" marker-end="url(#aa)"/>
        <rect x="396" y="342" width="142" height="52" rx="7" fill="#e8f4ff" stroke="#2980b9" stroke-width="2"/>
        <text x="467" y="366" text-anchor="middle" fill="#1a4a7a" font-family="Syne" font-weight="700" font-size="10">⑦ Sirène + flash</text>
        <text x="467" y="381" text-anchor="middle" fill="#2980b9" font-family="monospace" font-size="8">⚡ ACTIONNEUR</text>
      </svg>
      <div class="df-leg-row">
        <div class="df-leg-item"><div class="df-leg-dot" style="border-color:#f39c12;background:#fff8e6;"></div>Fonction d'usage</div>
        <div class="df-leg-item"><div class="df-leg-dot" style="border-color:#e74c3c;background:#fff0f0;"></div>Fonctions techniques</div>
        <div class="df-leg-item"><div class="df-leg-dot" style="border-color:#27ae60;background:#f0fff4;"></div>Solutions technologiques</div>
        <div class="df-leg-item"><div class="df-leg-dot" style="border-color:#2980b9;background:#e8f4ff;"></div>Actionneur</div>
        <div class="df-leg-item"><div class="df-leg-dot" style="border-color:#8e44ad;background:#f8f0ff;"></div>Capteur</div>
      </div>
    </div>
  </div>
</div>

<div class="df-footer">
  Contenu adapté de <a href="https://www.techno-logique.com/AUT-diagramme-fonctionnel.shtml" target="_blank" rel="noopener noreferrer">Techno-Logique</a> — Automatisme · Cycle 4
</div>

</div>
    `;

    renderDfQuestions('casque');
    renderDfQuestions('lampe');
    renderDfQuestions('portail');
    renderDfQuestions('alarme');
}

function renderDfQuestions(exoId) {
    const ul = document.getElementById('df-q-' + exoId);
    if (!ul || !DF_QUESTIONS_DATA[exoId]) return;
    ul.innerHTML = '';
    DF_QUESTIONS_DATA[exoId].forEach((item, i) => {
        const li = document.createElement('li');
        li.className = 'df-q-item';
        li.innerHTML = `
            <div class="df-q-head" onclick="toggleDfQ(this)">
                <span class="df-q-num">Q.${i + 1}</span>
                <span class="df-q-text">${item.q}</span>
                <span class="df-q-chev">▾</span>
            </div>
            <div class="df-q-body">${item.r}</div>`;
        ul.appendChild(li);
    });
}

function showDfTab(id, btn) {
    document.querySelectorAll('.df-panel').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.df-tab-btn').forEach(b => b.classList.remove('active'));
    const targetPanel = document.getElementById('df-panel-' + id);
    if (targetPanel) {
        targetPanel.classList.add('active');
    }
    if (btn) {
        btn.classList.add('active');
    }
}

function toggleDfQ(header) {
    const body = header.nextElementSibling;
    const chev = header.querySelector('.df-q-chev');
    if (body) body.classList.toggle('open');
    if (chev) chev.classList.toggle('open');
}

function toggleDfCorr(id) {
    const panel = document.getElementById('df-corr-' + id);
    if (!panel) return;
    panel.classList.toggle('open');
    if (panel.classList.contains('open')) {
        setTimeout(() => panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 50);
    }
}
