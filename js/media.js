// =====================================================
// VISIONNEUSES DE MÉDIAS (PDF ET VIDÉO UNIFIÉES)
// =====================================================

function openPdfViewer(activity) {
    document.getElementById('dashboardScreen').style.display = 'none';
    const container = document.getElementById('activityContent');

    const safeTitle = escapeHTML(activity.titre);
    const safeDesc = escapeHTML(activity.description);

    if (activity.pdfList && Array.isArray(activity.pdfList) && activity.pdfList.length > 0) {
        const cardsHTML = activity.pdfList.map((doc, idx) => {
            const rawUrl = doc.url || '';
            const previewUrl = typeof formatGoogleDriveUrl === 'function' ? formatGoogleDriveUrl(rawUrl, "preview") : rawUrl;
            const viewUrl = typeof formatGoogleDriveUrl === 'function' ? formatGoogleDriveUrl(rawUrl, "view") : rawUrl;
            const safeDocTitle = escapeHTML(doc.titre || `Document ${idx + 1}`);

            return `
                <div class="stage-doc-card" style="background: white; border: 1px solid var(--border); border-radius: 12px; padding: 18px; display: flex; flex-direction: column; justify-space-between; gap: 12px; box-shadow: var(--shadow-sm);">
                    <div style="display: flex; items-center; gap: 10px;">
                        <span style="font-size: 2rem;">📄</span>
                        <div>
                            <h4 style="margin: 0; color: var(--navy); font-size: 1.05rem; font-weight: 700;">${safeDocTitle}</h4>
                            <p style="margin: 4px 0 0 0; color: var(--text-muted); font-size: 0.85rem;">Fiche de synthèse PDF</p>
                        </div>
                    </div>
                    <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-top: 10px;">
                        <a href="${escapeHTML(viewUrl)}" target="_blank" class="btn-primary" style="flex: 1; text-align: center; text-decoration: none; padding: 8px 12px; font-size: 0.88rem; background: var(--primary); color: white; border-radius: 6px;">
                            👁️ Consulter
                        </a>
                        <a href="${escapeHTML(viewUrl)}" target="_blank" download class="btn-download-doc" style="flex: 1; text-align: center; text-decoration: none; padding: 8px 12px; font-size: 0.88rem; background: var(--accent); color: white; border-radius: 6px;">
                            ⬇️ Télécharger
                        </a>
                    </div>
                </div>
            `;
        }).join('');

        let videoHTML = '';
        if (activity.youtubeVideo) {
            const safeVidTitle = escapeHTML(activity.youtubeVideo.title);
            const safeEmbedUrl = escapeHTML(activity.youtubeVideo.embedUrl);
            const safeVidUrl = escapeHTML(activity.youtubeVideo.url);

            videoHTML = `
                <div style="background: white; border-radius: 16px; padding: 22px; margin-bottom: 25px; box-shadow: var(--shadow-md); border: 1px solid var(--border);">
                    <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px; margin-bottom: 15px;">
                        <h3 style="margin: 0; color: var(--navy); font-size: 1.2rem; font-weight: 800; display: flex; align-items: center; gap: 8px;">
                            <span style="background: #EF4444; color: white; padding: 4px 10px; border-radius: 6px; font-size: 0.85rem;">🎬 Vidéo YouTube</span>
                            ${safeVidTitle}
                        </h3>
                        <a href="${safeVidUrl}" target="_blank" rel="noopener noreferrer" class="btn-primary" style="text-decoration: none; padding: 8px 16px; border-radius: 20px; font-size: 0.88rem; background: #FF0000; color: white; font-weight: 700; display: inline-flex; align-items: center; gap: 6px;">
                            ▶️ Voir la vidéo : ${safeVidTitle}
                        </a>
                    </div>
                    <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: 12px; background: #000;">
                        <iframe
                            src="${safeEmbedUrl}"
                            title="${safeVidTitle}"
                            style="position: absolute; top:0; left:0; width: 100%; height: 100%; border:0;"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen
                        ></iframe>
                    </div>
                </div>
            `;
        }

        container.innerHTML = `
            <div class="media-container" style="max-width: 950px; margin: 0 auto;">
                <div class="media-header" style="margin-bottom: 25px;">
                    <div>
                        <h2 class="media-title">📚 ${safeTitle}</h2>
                        <p style="color: var(--text-muted); font-size: 0.95rem; margin-top: 4px;">${safeDesc}</p>
                    </div>
                </div>
                ${videoHTML}
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px;">
                    ${cardsHTML}
                </div>
                <div style="margin-top: 30px; text-align: center;">
                    <button class="btn-menu" onclick="showDashboard(currentStudent ? currentStudent.niveau : '4eme')" style="padding: 10px 24px; border-radius: 20px; background: #64748B; color: white; border: none; font-weight: 700; cursor: pointer;">
                        ↩️ Retour au tableau de bord
                    </button>
                </div>
            </div>
        `;
    } else {
        const safePdfUrl = escapeHTML(activity.pdfUrl || '');
        container.innerHTML = `
            <div class="media-container">
                <div class="media-header">
                    <div>
                        <h2 class="media-title">📄 ${safeTitle}</h2>
                        <p style="color: var(--text-muted); font-size: 0.9rem; margin-top: 4px;">${safeDesc}</p>
                    </div>
                    <a href="${safePdfUrl}" target="_blank" download class="btn-start-activity" style="text-decoration: none;">
                        ⬇️ Télécharger le PDF
                    </a>
                </div>
                <iframe class="pdf-viewer-frame" src="${safePdfUrl}">
                    <p>Votre navigateur ne prend pas en charge l'affichage direct des PDF.
                    <a href="${safePdfUrl}">Cliquez ici pour télécharger le document.</a></p>
                </iframe>
            </div>
        `;
    }

    document.getElementById('activityScreen').style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// =====================================================
// MODULE : À LA DÉCOUVERTE DU MBOT
// =====================================================

const MBOT_VIDEOS = [
    {
        num: 1,
        titre: "1 - Présentation de mBot, robot programmable",
        embedUrl: "https://www.youtube.com/embed/EWs8s4jpgag"
    },
    {
        num: 2,
        titre: "2 - Constitution de mBot, robot programmable",
        embedUrl: "https://www.youtube.com/embed/IzBJlIKpPWo?start=42"
    },
    {
        num: 3,
        titre: "3 - Les actionneurs de mBot, robot programmable",
        embedUrl: "https://www.youtube.com/embed/t9htG1XMEzA"
    },
    {
        num: 4,
        titre: "4 - Les capteurs de mBot, robot programmable",
        embedUrl: "https://www.youtube.com/embed/lNie493d7oE?start=12"
    },
    {
        num: 5,
        titre: "5 - Piloter manuellement mBot, robot programmable",
        embedUrl: "https://www.youtube.com/embed/7V8-Y7hDejk"
    },
    {
        num: 6,
        titre: "6 - Fonctionnement de mBot, chaîne d'énergie et chaîne d'information",
        embedUrl: "https://www.youtube.com/embed/BhbyP-C--I0?start=117"
    }
];

let currentMbotVideoIndex = 0;

function openMbotModule(activity) {
    document.getElementById('dashboardScreen').style.display = 'none';
    const container = document.getElementById('activityContent');

    currentMbotVideoIndex = 0;
    renderMbotModuleView(container);

    document.getElementById('activityScreen').style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderMbotModuleView(container) {
    if (!container) container = document.getElementById('activityContent');
    const activeVideo = MBOT_VIDEOS[currentMbotVideoIndex] || MBOT_VIDEOS[0];

    const buttonsHTML = MBOT_VIDEOS.map((vid, idx) => {
        const isActive = idx === currentMbotVideoIndex;
        return `
            <button
                onclick="selectMbotVideo(${idx})"
                style="padding: 12px 16px; border-radius: 12px; border: 2px solid ${isActive ? 'var(--primary)' : 'var(--border)'}; background: ${isActive ? 'var(--primary)' : 'white'}; color: ${isActive ? 'white' : 'var(--navy)'}; font-weight: 700; text-align: left; cursor: pointer; transition: all 0.2s; font-size: 0.92rem; display: flex; align-items: center; gap: 8px; box-shadow: ${isActive ? 'var(--shadow-md)' : 'none'};"
            >
                <span style="background: ${isActive ? 'rgba(255,255,255,0.2)' : 'var(--bg-main)'}; padding: 4px 8px; border-radius: 6px; font-size: 0.85rem;">🎬 ${vid.num}</span>
                <span>${escapeHTML(vid.titre)}</span>
            </button>
        `;
    }).join('');

    container.innerHTML = `
        <div class="media-container" style="max-width: 950px; margin: 0 auto; padding: 25px 15px;">
            <div class="media-header" style="text-align: center; margin-bottom: 25px; background: linear-gradient(135deg, #0F172A, #1E293B); padding: 25px; border-radius: 16px; color: white;">
                <h1 style="margin: 0; font-size: 1.8rem; font-weight: 800;">🤖 À la découverte du MBOT</h1>
                <p style="margin: 6px 0 0 0; opacity: 0.9; font-size: 1.1rem; color: #5EEAD4; font-weight: 600;">Mais comment ça marche ?</p>
                <p style="margin: 10px 0 0 0; opacity: 0.8; font-size: 0.88rem;">Suivez les 6 capsules vidéo dans l'ordre pour tout comprendre sur le robot mBot.</p>
            </div>

            <!-- Boutons de sélection des vidéos -->
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 12px; margin-bottom: 25px;">
                ${buttonsHTML}
            </div>

            <!-- Lecteur Vidéo Principal -->
            <div style="background: white; border-radius: 16px; padding: 20px; box-shadow: var(--shadow-md); border: 1px solid var(--border);">
                <h3 style="margin: 0 0 15px 0; color: var(--navy); font-size: 1.2rem; font-weight: 700; display: flex; align-items: center; gap: 8px;">
                    <span style="background: var(--accent); color: white; padding: 4px 10px; border-radius: 8px; font-size: 0.85rem;">Vidéo en cours</span>
                    ${escapeHTML(activeVideo.titre)}
                </h3>
                <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: 12px; background: #000;">
                    <iframe
                        src="${escapeHTML(activeVideo.embedUrl)}"
                        title="${escapeHTML(activeVideo.titre)}"
                        style="position: absolute; top:0; left:0; width: 100%; height: 100%; border:0;"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen
                    ></iframe>
                </div>
            </div>

            <div style="margin-top: 30px; text-align: center;">
                <button class="btn-menu" onclick="showDashboard(currentStudent ? currentStudent.niveau : '4eme')" style="padding: 10px 24px; border-radius: 20px; background: #64748B; color: white; border: none; font-weight: 700; cursor: pointer;">
                    ↩️ Retour au tableau de bord
                </button>
            </div>
        </div>
    `;
}

function selectMbotVideo(index) {
    currentMbotVideoIndex = index;
    const container = document.getElementById('activityContent');
    renderMbotModuleView(container);
}

// =====================================================
// MODULE : LES ROBOTS (FICHE ÉLÈVE INTERACTIVE)
// =====================================================

const ROBOTS_TOTAL_QUESTIONS = 45;

const ROBOTS_FILL_ANSWERS = {
    blank1: "programmé",
    blank2: "dangereuses",
    blank3: "précisément",
    blank4: "capteurs",
    blank5: "intelligence",
    blank6: "environnement",
    blank7: "apprentissage",
    blank8: "performants",
    blank9: "industrie"
};

const ROBOTS_TABLE_ANSWERS = {
    asimo:       { pays: "Japon (2000)",          type: "Humanoïde",    secteur: "Domestique / Service",  tache: "Accueillir, marcher, interagir" },
    bigdog:      { pays: "États-Unis (2005)",     type: "Quadrupède",   secteur: "Militaire",              tache: "Transporter du matériel" },
    pepper:      { pays: "Japon (2014)",          type: "Humanoïde",    secteur: "Domestique / Service",   tache: "Accueillir, interagir" },
    unimate:     { pays: "États-Unis (1961)",     type: "Bras robotisé",secteur: "Industriel",             tache: "Souder, assembler" },
    nao:         { pays: "France (2006)",         type: "Humanoïde",    secteur: "Éducatif / Service",     tache: "Interagir, éduquer" },
    kodomoroid:  { pays: "Japon (2014)",          type: "Androïde",     secteur: "Médical / Service",      tache: "Lire les informations, interagir" },
    curiosity:   { pays: "États-Unis (2012)",     type: "Rover",        secteur: "Spatial",                tache: "Explorer le sol martien" },
    rosa:        { pays: "France (2014)",         type: "Humanoïde",    secteur: "Médical / Service",      tache: "Assister l'humain" },
    hulc:        { pays: "États-Unis (2009)",     type: "Exosquelette", secteur: "Militaire",              tache: "Transporter du matériel" }
};

function getRobotsStorageKey() {
    if (typeof currentStudent !== 'undefined' && currentStudent) {
        return `robots_sheet_data_${currentStudent.niveau}_${currentStudent.classe}_${currentStudent.nom}_${currentStudent.prenom}`.toLowerCase().replace(/\s+/g, '_');
    }
    return 'robots_sheet_data_guest';
}

function getRobotsStudentInfo() {
    if (typeof currentStudent !== 'undefined' && currentStudent) {
        return {
            nom: currentStudent.nom || "Inconnu",
            prenom: currentStudent.prenom || "",
            classe: currentStudent.classe || "",
            email: currentStudent.email || "",
            id: currentStudent.id || ""
        };
    }
    try {
        const stored = localStorage.getItem("studentInfo") || localStorage.getItem("eleve") || localStorage.getItem("user");
        if (stored) {
            const parsed = JSON.parse(stored);
            return {
                nom: parsed.nom || parsed.name || "Inconnu",
                prenom: parsed.prenom || parsed.firstName || "",
                classe: parsed.classe || parsed.class || "",
                email: parsed.email || "",
                id: parsed.id || ""
            };
        }
    } catch (e) { /* ignore */ }
    return { nom: "Inconnu", prenom: "", classe: "", email: "", id: "" };
}

function computeRobotsScore() {
    let score = 0;
    for (let i = 1; i <= 9; i++) {
        const select = document.getElementById("blank" + i);
        if (select && select.value === ROBOTS_FILL_ANSWERS["blank" + i]) {
            score += 1;
        }
    }
    document.querySelectorAll('.robot-select').forEach(sel => {
        const robot = sel.dataset.robot;
        const field = sel.dataset.field;
        if (ROBOTS_TABLE_ANSWERS[robot] && ROBOTS_TABLE_ANSWERS[robot][field] === sel.value) {
            score += 1;
        }
    });
    return score;
}

function saveRobotsState(submitted = false) {
    const key = getRobotsStorageKey();
    const data = {
        submitted: submitted,
        selects: {},
        textareas: {
            frise: document.getElementById("robotsFrise")?.value || "",
            raisons: document.getElementById("raisons")?.value || "",
            lithium: document.getElementById("lithium")?.value || ""
        }
    };
    for (let i = 1; i <= 9; i++) {
        const sel = document.getElementById("blank" + i);
        if (sel) data.selects["blank" + i] = sel.value;
    }
    document.querySelectorAll('.robot-select').forEach(sel => {
        const robot = sel.dataset.robot;
        const field = sel.dataset.field;
        data.selects[`${robot}_${field}`] = sel.value;
    });
    localStorage.setItem(key, JSON.stringify(data));
}

function loadRobotsState() {
    const key = getRobotsStorageKey();
    try {
        const raw = localStorage.getItem(key);
        if (!raw) return null;
        return JSON.parse(raw);
    } catch (e) {
        return null;
    }
}

function restoreRobotsState() {
    const saved = loadRobotsState();
    if (!saved) return false;

    if (saved.selects) {
        for (let i = 1; i <= 9; i++) {
            const sel = document.getElementById("blank" + i);
            if (sel && saved.selects["blank" + i] !== undefined) {
                sel.value = saved.selects["blank" + i];
            }
        }
        document.querySelectorAll('.robot-select').forEach(sel => {
            const robot = sel.dataset.robot;
            const field = sel.dataset.field;
            const savedVal = saved.selects[`${robot}_${field}`];
            if (savedVal !== undefined) {
                sel.value = savedVal;
            }
        });
    }

    if (saved.textareas) {
        if (saved.textareas.frise !== undefined) {
            const el = document.getElementById("robotsFrise");
            if (el) el.value = saved.textareas.frise;
        }
        if (saved.textareas.raisons !== undefined) {
            const el = document.getElementById("raisons");
            if (el) el.value = saved.textareas.raisons;
        }
        if (saved.textareas.lithium !== undefined) {
            const el = document.getElementById("lithium");
            if (el) el.value = saved.textareas.lithium;
        }
    }

    if (saved.submitted) {
        applyRobotsCorrectionUI();
    }
    return saved.submitted;
}

function applyRobotsHighlights() {
    for (let i = 1; i <= 9; i++) {
        const sel = document.getElementById("blank" + i);
        if (!sel) continue;
        const correct = ROBOTS_FILL_ANSWERS["blank" + i];
        sel.classList.remove("correct-highlight", "wrong-highlight");
        if (sel.value === correct) sel.classList.add("correct-highlight");
        else if (sel.value !== "") sel.classList.add("wrong-highlight");
    }
    document.querySelectorAll('.robot-select').forEach(sel => {
        sel.classList.remove("correct-highlight", "wrong-highlight");
        const robot = sel.dataset.robot;
        const field = sel.dataset.field;
        if (ROBOTS_TABLE_ANSWERS[robot]) {
            const correct = ROBOTS_TABLE_ANSWERS[robot][field];
            if (sel.value === correct) sel.classList.add("correct-highlight");
            else if (sel.value !== "") sel.classList.add("wrong-highlight");
        }
    });
}

function updateRobotsDetailPanel() {
    const panel = document.getElementById("robotsDetailContent");
    if (!panel) return;
    let html = "";

    html += "<strong>Définition (9 points) :</strong><br>";
    html += "<table style='width:100%; border-collapse:collapse; margin:8px 0;'><tr><th>Trou</th><th>Votre réponse</th><th>Bonne réponse</th><th></th></tr>";
    for (let i = 1; i <= 9; i++) {
        const sel = document.getElementById("blank" + i);
        const val = sel ? sel.value : "";
        const correct = ROBOTS_FILL_ANSWERS["blank" + i];
        const ok = val === correct;
        html += `<tr><td>Trou ${i}</td><td>${escapeHTML(val) || "—"}</td><td>${escapeHTML(correct)}</td><td class="${ok ? 'ok' : 'ko'}">${ok ? '✓' : '✗'}</td></tr>`;
    }
    html += "</table>";

    html += "<strong>Tableau des robots (36 points) :</strong><br>";
    html += "<table style='width:100%; border-collapse:collapse; margin:8px 0;'><tr><th>Robot</th><th>Colonne</th><th>Votre réponse</th><th>Bonne réponse</th><th></th></tr>";
    document.querySelectorAll('.robot-select').forEach(sel => {
        const robot = sel.dataset.robot;
        const field = sel.dataset.field;
        const val = sel.value;
        const correct = ROBOTS_TABLE_ANSWERS[robot] ? ROBOTS_TABLE_ANSWERS[robot][field] : "?";
        const ok = val === correct;
        const robotName = sel.closest('tr')?.querySelector('td')?.textContent || robot;
        html += `<tr><td>${escapeHTML(robotName)}</td><td>${escapeHTML(field)}</td><td>${escapeHTML(val) || "—"}</td><td>${escapeHTML(correct)}</td><td class="${ok ? 'ok' : 'ko'}">${ok ? '✓' : '✗'}</td></tr>`;
    });
    html += "</table>";

    panel.innerHTML = html;
}

function applyRobotsCorrectionUI() {
    applyRobotsHighlights();

    const scoreBar = document.getElementById("robotsScoreBar");
    if (scoreBar) scoreBar.style.display = "flex";

    const score = computeRobotsScore();
    const display = document.getElementById("robotsScoreDisplay");
    if (display) {
        display.textContent = score + " / " + ROBOTS_TOTAL_QUESTIONS;
        const pct = (score / ROBOTS_TOTAL_QUESTIONS) * 100;
        display.classList.remove("good", "mid", "bad");
        if (pct >= 80) display.classList.add("good");
        else if (pct >= 50) display.classList.add("mid");
        else display.classList.add("bad");
    }

    const badge = document.getElementById("robotsResultBadge");
    if (badge) {
        badge.textContent = `✅ Score : ${score} / ${ROBOTS_TOTAL_QUESTIONS}`;
        badge.classList.add("show");
    }

    updateRobotsDetailPanel();
}

function toggleRobotsDetail() {
    const panel = document.getElementById("robotsDetailPanel");
    if (!panel) return;
    panel.classList.toggle("show");
    if (panel.classList.contains("show")) updateRobotsDetailPanel();
}

function toggleRobotsSheet(targetSectionId) {
    const container = document.getElementById("robotsSheetContainer");
    if (!container) return;

    if (container.style.display === "none" || container.style.display === "") {
        container.style.display = "block";
        if (targetSectionId) {
            const targetEl = document.getElementById(targetSectionId);
            if (targetEl) {
                targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
            } else {
                container.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        } else {
            container.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    } else {
        // If already visible and target section requested, scroll to it, or collapse if same link clicked
        if (targetSectionId) {
            const targetEl = document.getElementById(targetSectionId);
            if (targetEl) {
                targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
                return;
            }
        }
        container.style.display = "none";
    }
}

async function sendRobotsToSheet() {
    const student = getRobotsStudentInfo();

    if (!student.nom || student.nom === "Inconnu") {
        const proceed = confirm("⚠️ Impossible de récupérer votre identité automatiquement.\n\nVoulez-vous continuer l'envoi sans identification ? (Les résultats seront marqués 'Inconnu')");
        if (!proceed) return;
    }

    const score = computeRobotsScore();

    // Enregistrer l'état comme soumis et appliquer l'UI de correction
    saveRobotsState(true);
    applyRobotsCorrectionUI();

    const details = {
        definition: {},
        tableau: {},
        reponses_libres: {
            frise: document.getElementById('robotsFrise')?.value || "",
            raisons: document.getElementById("raisons")?.value || "",
            lithium: document.getElementById("lithium")?.value || ""
        }
    };
    for (let i = 1; i <= 9; i++) {
        const sel = document.getElementById("blank" + i);
        details.definition["blank" + i] = sel ? sel.value : "";
    }
    document.querySelectorAll('.robot-select').forEach(sel => {
        const robot = sel.dataset.robot;
        const field = sel.dataset.field;
        if (!details.tableau[robot]) details.tableau[robot] = {};
        details.tableau[robot][field] = sel.value;
    });

    const payload = {
        nom: student.nom,
        prenom: student.prenom,
        classe: student.classe,
        email: student.email,
        id_eleve: student.id,
        score: score,
        total: ROBOTS_TOTAL_QUESTIONS,
        resultats: `${score} / ${ROBOTS_TOTAL_QUESTIONS}`,
        details: JSON.stringify(details),
        date: new Date().toISOString(),
        timestamp: new Date().toISOString(),
        page: "Vous avez dit robot"
    };

    const targetUrl = CONFIG.ROBOTS_WEB_APP_URL || CONFIG.SYSTEMES_AUTOMATIQUES_WEB_APP_URL || CONFIG.GOOGLE_APPS_SCRIPT_URL;

    try {
        await fetch(targetUrl, {
            method: "POST",
            mode: "no-cors",
            headers: { "Content-Type": "text/plain;charset=utf-8" },
            body: JSON.stringify(payload)
        });
        alert("✅ Résultats envoyés ! Score : " + score + "/" + ROBOTS_TOTAL_QUESTIONS);
    } catch (error) {
        console.error("Erreur d'envoi :", error);
        alert("❌ Erreur lors de l'envoi.\nScore local : " + score + "/" + ROBOTS_TOTAL_QUESTIONS);
    }
}

function openRobotsModule(activity) {
    document.getElementById('dashboardScreen').style.display = 'none';
    const container = document.getElementById('activityContent');

    const studentInfo = getRobotsStudentInfo();

    container.innerHTML = `
        <div class="media-container" style="max-width: 1050px; margin: 0 auto; padding: 25px 15px; font-family: 'Plus Jakarta Sans', sans-serif;">

            <!-- En-tête de la séquence -->
            <div style="background: linear-gradient(135deg, #0F172A, #1E293B); color: white; padding: 35px 25px; border-radius: 16px; text-align: center; margin-bottom: 25px; box-shadow: var(--shadow-md);">
                <h1 style="margin: 0 0 6px 0; font-size: 2.2rem; font-weight: 800; font-family: 'Outfit', sans-serif;">🤖 Les Robots</h1>
                <p style="margin: 0; opacity: 0.9; font-size: 1.05rem;">Découverte, histoire, impact sociétal et environnemental</p>
            </div>

            <!-- Introduction -->
            <div style="background: white; border-left: 5px solid var(--accent, #F97316); padding: 20px 24px; margin-bottom: 30px; border-radius: 12px; box-shadow: var(--shadow-sm); border: 1px solid var(--border);">
                <p style="margin: 0; color: var(--navy); line-height: 1.7; font-size: 1rem;">
                    Aujourd'hui, les robots sont partout : dans les champs, les usines, l'espace, les fonds marins, nos jardins et même nos salons. Leur importance scientifique, industrielle et sociétale ne cesse de grandir. Certains pensent qu'au XXIe siècle, le robot occupera une place comparable à celle qu'a tenue l'automobile au siècle dernier.
                </p>
            </div>

            <!-- ACTIVITÉ 1 -->
            <div style="background: white; border-radius: 14px; padding: 24px; margin-bottom: 24px; box-shadow: var(--shadow-sm); border: 1px solid var(--border);">
                <h2 style="font-family: 'Outfit', sans-serif; font-size: 1.25rem; font-weight: 700; color: var(--navy); margin-top: 0; display: flex; align-items: center; gap: 10px;">
                    <span style="background: var(--primary, #0F172A); color: white; width: 32px; height: 32px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 1rem; font-weight: 800; flex-shrink: 0;">1</span>
                    Qu'est-ce qu'un robot ?
                </h2>
                <p style="margin: 10px 0; font-size: 1.02rem; line-height: 1.6;">
                    ✏️ Complète le tableau dans le document suivant et valide tes réponses ( <a href="javascript:void(0)" onclick="toggleRobotsSheet('robots_section_1')" style="color: #2563EB; font-weight: 700; text-decoration: underline;">lien cliquable</a> ).
                </p>
                <p style="margin: 10px 0 6px 0; font-weight: 700; color: var(--navy);">Robots à découvrir <small style="font-weight: 400; color: var(--text-muted);">(clique sur un nom pour ouvrir l'article)</small> :</p>
                <ul style="margin: 8px 0 0 20px; padding: 0; display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 10px; list-style: none;">
                    <li><a href="https://www.usinenouvelle.com/article/asimo-le-coureur.N1855052" target="_blank" rel="noopener noreferrer" style="color: var(--primary); text-decoration: none; font-weight: 600;">🤖 Asimo, le coureur</a></li>
                    <li><a href="https://www.usinenouvelle.com/article/bios-de-robots-unimate-le-premier-ouvrier-mecanique.N276769" target="_blank" rel="noopener noreferrer" style="color: var(--primary); text-decoration: none; font-weight: 600;">🏭 Unimate, le premier ouvrier mécanique</a></li>
                    <li><a href="https://www.usinenouvelle.com/article/qui-est-rosa-one-le-robot-qui-repare-les-colonnes-vertebrales.N603558" target="_blank" rel="noopener noreferrer" style="color: var(--primary); text-decoration: none; font-weight: 600;">🏥 Rosa One, le réparateur de colonnes vertébrales</a></li>
                    <li><a href="https://www.usinenouvelle.com/article/nao-la-mascotte.N1855082" target="_blank" rel="noopener noreferrer" style="color: var(--primary); text-decoration: none; font-weight: 600;">🤖 Nao, la mascotte</a></li>
                    <li><a href="https://www.usinenouvelle.com/article/hulc-le-gi.N1855182" target="_blank" rel="noopener noreferrer" style="color: var(--primary); text-decoration: none; font-weight: 600;">🎖️ HULC, le G.I.</a></li>
                    <li><a href="https://www.usinenouvelle.com/article/big-dog-le-mulet.N1855202" target="_blank" rel="noopener noreferrer" style="color: var(--primary); text-decoration: none; font-weight: 600;">🐕 Big Dog, le mulet</a></li>
                    <li><a href="https://www.usinenouvelle.com/article/pepper-l-accompagnant.N1855067" target="_blank" rel="noopener noreferrer" style="color: var(--primary); text-decoration: none; font-weight: 600;">🤝 Pepper, l'accompagnant</a></li>
                    <li><a href="https://www.usinenouvelle.com/article/kodomoroid-plus-vrai-que-nature.N1854887" target="_blank" rel="noopener noreferrer" style="color: var(--primary); text-decoration: none; font-weight: 600;">👤 Kodomoroid, plus vrai que nature</a></li>
                    <li><a href="https://www.usinenouvelle.com/article/curiosity-le-scientifique.N1855127" target="_blank" rel="noopener noreferrer" style="color: var(--primary); text-decoration: none; font-weight: 600;">🚀 Curiosity, le scientifique</a></li>
                </ul>
            </div>

            <!-- ACTIVITÉ 2 -->
            <div style="background: white; border-radius: 14px; padding: 24px; margin-bottom: 24px; box-shadow: var(--shadow-sm); border: 1px solid var(--border);">
                <h2 style="font-family: 'Outfit', sans-serif; font-size: 1.25rem; font-weight: 700; color: var(--navy); margin-top: 0; display: flex; align-items: center; gap: 10px;">
                    <span style="background: var(--primary, #0F172A); color: white; width: 32px; height: 32px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 1rem; font-weight: 800; flex-shrink: 0;">2</span>
                    La robotique hier et aujourd'hui
                </h2>
                <p style="margin: 10px 0; font-size: 1.02rem; line-height: 1.6;">
                    ✏️ Complète le document suivant et valide tes réponses ( <a href="javascript:void(0)" onclick="toggleRobotsSheet('robots_section_2')" style="color: #2563EB; font-weight: 700; text-decoration: underline;">lien cliquable</a> ).
                </p>
            </div>

            <!-- EMBEDDED INTERACTIVE SHEET CONTAINER -->
            <div id="robotsSheetContainer" style="display: none; background: #f0f4f8; border-radius: 24px; padding: 30px 25px; margin: 30px 0; box-shadow: 0 10px 25px rgba(0,0,0,0.1); border: 2px solid #3b82f6;">

                <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px; margin-bottom: 20px; border-bottom: 2px solid #cbd5e1; padding-bottom: 12px;">
                    <span style="font-size: 1.3rem; font-weight: 800; color: #1e3a5f;">📄 Fiche élève interactive</span>
                    <button onclick="toggleRobotsSheet()" style="background: #ef4444; color: white; border: none; padding: 8px 16px; border-radius: 20px; font-weight: 700; cursor: pointer; font-size: 0.9rem;">
                        ✖️ Fermer le document
                    </button>
                </div>

                <!-- BARRE DE SCORE FLOTTANTE (Visuelle après soumission) -->
                <div class="score-bar" id="robotsScoreBar" style="display: none;">
                    <span>🤖 Score :</span>
                    <span class="score-value" id="robotsScoreDisplay">0 / 45</span>
                    <button class="detail-toggle" id="robotsToggleDetail" onclick="toggleRobotsDetail()">Voir le détail</button>
                </div>

                <!-- PANNEAU DE DÉTAIL -->
                <div class="detail-panel" id="robotsDetailPanel">
                    <strong>Détail de la correction :</strong>
                    <div id="robotsDetailContent"></div>
                </div>

                <!-- INFO ÉLÈVE (récupérée automatiquement) -->
                <div class="user-info" id="robotsUserInfo">
                    <span>👤 <strong id="robotsUserName">${escapeHTML(studentInfo.prenom ? studentInfo.prenom + ' ' + studentInfo.nom : studentInfo.nom)}</strong></span>
                    <span id="robotsUserClass">${escapeHTML(studentInfo.classe ? 'Classe : ' + studentInfo.classe : '')}</span>
                </div>

                <h1 style="color: #1e3a5f; font-size: 1.8rem; border-bottom: 3px solid #3b82f6; padding-bottom: 10px; margin-top: 0;">🤖 Vous avez dit robot ? — Fiche élève</h1>

                <!-- SECTION 1 : EXEMPLES DE ROBOTS -->
                <div id="robots_section_1">
                    <h2 style="color: #0f2b4b; font-size: 1.3rem; margin-top: 25px; margin-bottom: 15px; background: #e6f0ff; padding: 8px 15px; border-radius: 12px;">1. Exemples de robots</h2>
                    <p>Compléter le tableau :</p>
                    <div style="overflow-x: auto;">
                        <table class="robot-table" style="width: 100%; border-collapse: collapse; margin: 15px 0; font-size: 0.95rem;">
                            <thead>
                                <tr>
                                    <th style="border: 1px solid #cbd5e1; padding: 10px 8px; background: #1e3a5f; color: white;">Nom</th>
                                    <th style="border: 1px solid #cbd5e1; padding: 10px 8px; background: #1e3a5f; color: white;">Pays (année)</th>
                                    <th style="border: 1px solid #cbd5e1; padding: 10px 8px; background: #1e3a5f; color: white;">Type</th>
                                    <th style="border: 1px solid #cbd5e1; padding: 10px 8px; background: #1e3a5f; color: white;">Secteur</th>
                                    <th style="border: 1px solid #cbd5e1; padding: 10px 8px; background: #1e3a5f; color: white;">Tâche(s)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td style="border: 1px solid #cbd5e1; padding: 10px 8px; font-weight: bold; background: white;">Asimo</td>
                                    <td style="border: 1px solid #cbd5e1; padding: 6px; background: white;">
                                        <select class="robot-select" data-robot="asimo" data-field="pays" onchange="saveRobotsState(false)" style="width:100%; padding:6px; border-radius:8px; border:1px solid #94a3b8;">
                                            <option value="">--</option>
                                            <option value="Japon (2000)">Japon (2000)</option>
                                            <option value="Japon (2011)">Japon (2011)</option>
                                            <option value="États-Unis (2005)">États-Unis (2005)</option>
                                            <option value="Japon (2014)">Japon (2014)</option>
                                            <option value="Bolivie (2020)">Bolivie (2020)</option>
                                            <option value="France (2014)">France (2014)</option>
                                            <option value="États-Unis (2012)">États-Unis (2012)</option>
                                        </select>
                                    </td>
                                    <td style="border: 1px solid #cbd5e1; padding: 6px; background: white;">
                                        <select class="robot-select" data-robot="asimo" data-field="type" onchange="saveRobotsState(false)" style="width:100%; padding:6px; border-radius:8px; border:1px solid #94a3b8;">
                                            <option value="">--</option>
                                            <option value="Humanoïde">Humanoïde</option>
                                            <option value="Quadrupède">Quadrupède</option>
                                            <option value="Exosquelette">Exosquelette</option>
                                            <option value="Bras robotisé">Bras robotisé</option>
                                            <option value="Rover">Rover</option>
                                            <option value="Androïde">Androïde</option>
                                        </select>
                                    </td>
                                    <td style="border: 1px solid #cbd5e1; padding: 6px; background: white;">
                                        <select class="robot-select" data-robot="asimo" data-field="secteur" onchange="saveRobotsState(false)" style="width:100%; padding:6px; border-radius:8px; border:1px solid #94a3b8;">
                                            <option value="">--</option>
                                            <option value="Domestique / Service">Domestique / Service</option>
                                            <option value="Militaire">Militaire</option>
                                            <option value="Industriel">Industriel</option>
                                            <option value="Médical">Médical</option>
                                            <option value="Spatial">Spatial</option>
                                            <option value="Loisirs">Loisirs</option>
                                        </select>
                                    </td>
                                    <td style="border: 1px solid #cbd5e1; padding: 6px; background: white;">
                                        <select class="robot-select" data-robot="asimo" data-field="tache" onchange="saveRobotsState(false)" style="width:100%; padding:6px; border-radius:8px; border:1px solid #94a3b8;">
                                            <option value="">--</option>
                                            <option value="Accueillir, marcher, interagir">Accueillir, marcher, interagir</option>
                                            <option value="Transporter du matériel">Transporter du matériel</option>
                                            <option value="Assister l'humain">Assister l'humain</option>
                                            <option value="Souder, assembler">Souder, assembler</option>
                                            <option value="Explorer le sol martien">Explorer le sol martien</option>
                                            <option value="Tenir compagnie, divertir">Tenir compagnie, divertir</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="border: 1px solid #cbd5e1; padding: 10px 8px; font-weight: bold; background: white;">Big Dog</td>
                                    <td style="border: 1px solid #cbd5e1; padding: 6px; background: white;">
                                        <select class="robot-select" data-robot="bigdog" data-field="pays" onchange="saveRobotsState(false)" style="width:100%; padding:6px; border-radius:8px; border:1px solid #94a3b8;">
                                            <option value="">--</option>
                                            <option value="États-Unis (2005)">États-Unis (2005)</option>
                                            <option value="Japon (2000)">Japon (2000)</option>
                                            <option value="Japon (2011)">Japon (2011)</option>
                                            <option value="France (2014)">France (2014)</option>
                                            <option value="Bolivie (2020)">Bolivie (2020)</option>
                                            <option value="États-Unis (2012)">États-Unis (2012)</option>
                                        </select>
                                    </td>
                                    <td style="border: 1px solid #cbd5e1; padding: 6px; background: white;">
                                        <select class="robot-select" data-robot="bigdog" data-field="type" onchange="saveRobotsState(false)" style="width:100%; padding:6px; border-radius:8px; border:1px solid #94a3b8;">
                                            <option value="">--</option>
                                            <option value="Quadrupède">Quadrupède</option>
                                            <option value="Humanoïde">Humanoïde</option>
                                            <option value="Exosquelette">Exosquelette</option>
                                            <option value="Bras robotisé">Bras robotisé</option>
                                            <option value="Rover">Rover</option>
                                            <option value="Androïde">Androïde</option>
                                        </select>
                                    </td>
                                    <td style="border: 1px solid #cbd5e1; padding: 6px; background: white;">
                                        <select class="robot-select" data-robot="bigdog" data-field="secteur" onchange="saveRobotsState(false)" style="width:100%; padding:6px; border-radius:8px; border:1px solid #94a3b8;">
                                            <option value="">--</option>
                                            <option value="Militaire">Militaire</option>
                                            <option value="Domestique / Service">Domestique / Service</option>
                                            <option value="Industriel">Industriel</option>
                                            <option value="Médical">Médical</option>
                                            <option value="Spatial">Spatial</option>
                                            <option value="Loisirs">Loisirs</option>
                                        </select>
                                    </td>
                                    <td style="border: 1px solid #cbd5e1; padding: 6px; background: white;">
                                        <select class="robot-select" data-robot="bigdog" data-field="tache" onchange="saveRobotsState(false)" style="width:100%; padding:6px; border-radius:8px; border:1px solid #94a3b8;">
                                            <option value="">--</option>
                                            <option value="Transporter du matériel">Transporter du matériel</option>
                                            <option value="Accueillir, marcher, interagir">Accueillir, marcher, interagir</option>
                                            <option value="Assister l'humain">Assister l'humain</option>
                                            <option value="Souder, assembler">Souder, assembler</option>
                                            <option value="Explorer le sol martien">Explorer le sol martien</option>
                                            <option value="Tenir compagnie, divertir">Tenir compagnie, divertir</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="border: 1px solid #cbd5e1; padding: 10px 8px; font-weight: bold; background: white;">Pepper</td>
                                    <td style="border: 1px solid #cbd5e1; padding: 6px; background: white;">
                                        <select class="robot-select" data-robot="pepper" data-field="pays" onchange="saveRobotsState(false)" style="width:100%; padding:6px; border-radius:8px; border:1px solid #94a3b8;">
                                            <option value="">--</option>
                                            <option value="Japon (2014)">Japon (2014)</option>
                                            <option value="Japon (2000)">Japon (2000)</option>
                                            <option value="Japon (2011)">Japon (2011)</option>
                                            <option value="États-Unis (2005)">États-Unis (2005)</option>
                                            <option value="France (2014)">France (2014)</option>
                                            <option value="Bolivie (2020)">Bolivie (2020)</option>
                                            <option value="États-Unis (2012)">États-Unis (2012)</option>
                                        </select>
                                    </td>
                                    <td style="border: 1px solid #cbd5e1; padding: 6px; background: white;">
                                        <select class="robot-select" data-robot="pepper" data-field="type" onchange="saveRobotsState(false)" style="width:100%; padding:6px; border-radius:8px; border:1px solid #94a3b8;">
                                            <option value="">--</option>
                                            <option value="Humanoïde">Humanoïde</option>
                                            <option value="Quadrupède">Quadrupède</option>
                                            <option value="Exosquelette">Exosquelette</option>
                                            <option value="Bras robotisé">Bras robotisé</option>
                                            <option value="Rover">Rover</option>
                                            <option value="Androïde">Androïde</option>
                                        </select>
                                    </td>
                                    <td style="border: 1px solid #cbd5e1; padding: 6px; background: white;">
                                        <select class="robot-select" data-robot="pepper" data-field="secteur" onchange="saveRobotsState(false)" style="width:100%; padding:6px; border-radius:8px; border:1px solid #94a3b8;">
                                            <option value="">--</option>
                                            <option value="Domestique / Service">Domestique / Service</option>
                                            <option value="Militaire">Militaire</option>
                                            <option value="Industriel">Industriel</option>
                                            <option value="Médical">Médical</option>
                                            <option value="Spatial">Spatial</option>
                                            <option value="Loisirs">Loisirs</option>
                                        </select>
                                    </td>
                                    <td style="border: 1px solid #cbd5e1; padding: 6px; background: white;">
                                        <select class="robot-select" data-robot="pepper" data-field="tache" onchange="saveRobotsState(false)" style="width:100%; padding:6px; border-radius:8px; border:1px solid #94a3b8;">
                                            <option value="">--</option>
                                            <option value="Accueillir, interagir">Accueillir, interagir</option>
                                            <option value="Transporter du matériel">Transporter du matériel</option>
                                            <option value="Assister l'humain">Assister l'humain</option>
                                            <option value="Souder, assembler">Souder, assembler</option>
                                            <option value="Explorer le sol martien">Explorer le sol martien</option>
                                            <option value="Tenir compagnie, divertir">Tenir compagnie, divertir</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="border: 1px solid #cbd5e1; padding: 10px 8px; font-weight: bold; background: white;">Unimate</td>
                                    <td style="border: 1px solid #cbd5e1; padding: 6px; background: white;">
                                        <select class="robot-select" data-robot="unimate" data-field="pays" onchange="saveRobotsState(false)" style="width:100%; padding:6px; border-radius:8px; border:1px solid #94a3b8;">
                                            <option value="">--</option>
                                            <option value="États-Unis (1961)">États-Unis (1961)</option>
                                            <option value="Japon (2000)">Japon (2000)</option>
                                            <option value="Japon (2011)">Japon (2011)</option>
                                            <option value="États-Unis (2005)">États-Unis (2005)</option>
                                            <option value="France (2014)">France (2014)</option>
                                        </select>
                                    </td>
                                    <td style="border: 1px solid #cbd5e1; padding: 6px; background: white;">
                                        <select class="robot-select" data-robot="unimate" data-field="type" onchange="saveRobotsState(false)" style="width:100%; padding:6px; border-radius:8px; border:1px solid #94a3b8;">
                                            <option value="">--</option>
                                            <option value="Bras robotisé">Bras robotisé</option>
                                            <option value="Humanoïde">Humanoïde</option>
                                            <option value="Quadrupède">Quadrupède</option>
                                            <option value="Exosquelette">Exosquelette</option>
                                            <option value="Rover">Rover</option>
                                            <option value="Androïde">Androïde</option>
                                        </select>
                                    </td>
                                    <td style="border: 1px solid #cbd5e1; padding: 6px; background: white;">
                                        <select class="robot-select" data-robot="unimate" data-field="secteur" onchange="saveRobotsState(false)" style="width:100%; padding:6px; border-radius:8px; border:1px solid #94a3b8;">
                                            <option value="">--</option>
                                            <option value="Industriel">Industriel</option>
                                            <option value="Domestique / Service">Domestique / Service</option>
                                            <option value="Militaire">Militaire</option>
                                            <option value="Médical">Médical</option>
                                            <option value="Spatial">Spatial</option>
                                            <option value="Loisirs">Loisirs</option>
                                        </select>
                                    </td>
                                    <td style="border: 1px solid #cbd5e1; padding: 6px; background: white;">
                                        <select class="robot-select" data-robot="unimate" data-field="tache" onchange="saveRobotsState(false)" style="width:100%; padding:6px; border-radius:8px; border:1px solid #94a3b8;">
                                            <option value="">--</option>
                                            <option value="Souder, assembler">Souder, assembler</option>
                                            <option value="Accueillir, interagir">Accueillir, interagir</option>
                                            <option value="Transporter du matériel">Transporter du matériel</option>
                                            <option value="Assister l'humain">Assister l'humain</option>
                                            <option value="Explorer le sol martien">Explorer le sol martien</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="border: 1px solid #cbd5e1; padding: 10px 8px; font-weight: bold; background: white;">Nao</td>
                                    <td style="border: 1px solid #cbd5e1; padding: 6px; background: white;">
                                        <select class="robot-select" data-robot="nao" data-field="pays" onchange="saveRobotsState(false)" style="width:100%; padding:6px; border-radius:8px; border:1px solid #94a3b8;">
                                            <option value="">--</option>
                                            <option value="France (2006)">France (2006)</option>
                                            <option value="Japon (2000)">Japon (2000)</option>
                                            <option value="Japon (2011)">Japon (2011)</option>
                                            <option value="États-Unis (2005)">États-Unis (2005)</option>
                                            <option value="France (2014)">France (2014)</option>
                                        </select>
                                    </td>
                                    <td style="border: 1px solid #cbd5e1; padding: 6px; background: white;">
                                        <select class="robot-select" data-robot="nao" data-field="type" onchange="saveRobotsState(false)" style="width:100%; padding:6px; border-radius:8px; border:1px solid #94a3b8;">
                                            <option value="">--</option>
                                            <option value="Humanoïde">Humanoïde</option>
                                            <option value="Quadrupède">Quadrupède</option>
                                            <option value="Exosquelette">Exosquelette</option>
                                            <option value="Bras robotisé">Bras robotisé</option>
                                            <option value="Rover">Rover</option>
                                            <option value="Androïde">Androïde</option>
                                        </select>
                                    </td>
                                    <td style="border: 1px solid #cbd5e1; padding: 6px; background: white;">
                                        <select class="robot-select" data-robot="nao" data-field="secteur" onchange="saveRobotsState(false)" style="width:100%; padding:6px; border-radius:8px; border:1px solid #94a3b8;">
                                            <option value="">--</option>
                                            <option value="Éducatif / Service">Éducatif / Service</option>
                                            <option value="Domestique / Service">Domestique / Service</option>
                                            <option value="Militaire">Militaire</option>
                                            <option value="Industriel">Industriel</option>
                                            <option value="Médical">Médical</option>
                                            <option value="Spatial">Spatial</option>
                                        </select>
                                    </td>
                                    <td style="border: 1px solid #cbd5e1; padding: 6px; background: white;">
                                        <select class="robot-select" data-robot="nao" data-field="tache" onchange="saveRobotsState(false)" style="width:100%; padding:6px; border-radius:8px; border:1px solid #94a3b8;">
                                            <option value="">--</option>
                                            <option value="Interagir, éduquer">Interagir, éduquer</option>
                                            <option value="Accueillir, interagir">Accueillir, interagir</option>
                                            <option value="Transporter du matériel">Transporter du matériel</option>
                                            <option value="Assister l'humain">Assister l'humain</option>
                                            <option value="Souder, assembler">Souder, assembler</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="border: 1px solid #cbd5e1; padding: 10px 8px; font-weight: bold; background: white;">Kodomoroid</td>
                                    <td style="border: 1px solid #cbd5e1; padding: 6px; background: white;">
                                        <select class="robot-select" data-robot="kodomoroid" data-field="pays" onchange="saveRobotsState(false)" style="width:100%; padding:6px; border-radius:8px; border:1px solid #94a3b8;">
                                            <option value="">--</option>
                                            <option value="Japon (2014)">Japon (2014)</option>
                                            <option value="Japon (2000)">Japon (2000)</option>
                                            <option value="Japon (2011)">Japon (2011)</option>
                                            <option value="États-Unis (2005)">États-Unis (2005)</option>
                                            <option value="France (2014)">France (2014)</option>
                                        </select>
                                    </td>
                                    <td style="border: 1px solid #cbd5e1; padding: 6px; background: white;">
                                        <select class="robot-select" data-robot="kodomoroid" data-field="type" onchange="saveRobotsState(false)" style="width:100%; padding:6px; border-radius:8px; border:1px solid #94a3b8;">
                                            <option value="">--</option>
                                            <option value="Androïde">Androïde</option>
                                            <option value="Humanoïde">Humanoïde</option>
                                            <option value="Quadrupède">Quadrupède</option>
                                            <option value="Exosquelette">Exosquelette</option>
                                            <option value="Bras robotisé">Bras robotisé</option>
                                            <option value="Rover">Rover</option>
                                        </select>
                                    </td>
                                    <td style="border: 1px solid #cbd5e1; padding: 6px; background: white;">
                                        <select class="robot-select" data-robot="kodomoroid" data-field="secteur" onchange="saveRobotsState(false)" style="width:100%; padding:6px; border-radius:8px; border:1px solid #94a3b8;">
                                            <option value="">--</option>
                                            <option value="Médical / Service">Médical / Service</option>
                                            <option value="Domestique / Service">Domestique / Service</option>
                                            <option value="Militaire">Militaire</option>
                                            <option value="Industriel">Industriel</option>
                                            <option value="Spatial">Spatial</option>
                                            <option value="Loisirs">Loisirs</option>
                                        </select>
                                    </td>
                                    <td style="border: 1px solid #cbd5e1; padding: 6px; background: white;">
                                        <select class="robot-select" data-robot="kodomoroid" data-field="tache" onchange="saveRobotsState(false)" style="width:100%; padding:6px; border-radius:8px; border:1px solid #94a3b8;">
                                            <option value="">--</option>
                                            <option value="Lire les informations, interagir">Lire les informations, interagir</option>
                                            <option value="Accueillir, interagir">Accueillir, interagir</option>
                                            <option value="Transporter du matériel">Transporter du matériel</option>
                                            <option value="Assister l'humain">Assister l'humain</option>
                                            <option value="Souder, assembler">Souder, assembler</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="border: 1px solid #cbd5e1; padding: 10px 8px; font-weight: bold; background: white;">Rover Curiosity</td>
                                    <td style="border: 1px solid #cbd5e1; padding: 6px; background: white;">
                                        <select class="robot-select" data-robot="curiosity" data-field="pays" onchange="saveRobotsState(false)" style="width:100%; padding:6px; border-radius:8px; border:1px solid #94a3b8;">
                                            <option value="">--</option>
                                            <option value="États-Unis (2012)">États-Unis (2012)</option>
                                            <option value="Japon (2000)">Japon (2000)</option>
                                            <option value="Japon (2011)">Japon (2011)</option>
                                            <option value="États-Unis (2005)">États-Unis (2005)</option>
                                            <option value="France (2014)">France (2014)</option>
                                        </select>
                                    </td>
                                    <td style="border: 1px solid #cbd5e1; padding: 6px; background: white;">
                                        <select class="robot-select" data-robot="curiosity" data-field="type" onchange="saveRobotsState(false)" style="width:100%; padding:6px; border-radius:8px; border:1px solid #94a3b8;">
                                            <option value="">--</option>
                                            <option value="Rover">Rover</option>
                                            <option value="Humanoïde">Humanoïde</option>
                                            <option value="Quadrupède">Quadrupède</option>
                                            <option value="Exosquelette">Exosquelette</option>
                                            <option value="Bras robotisé">Bras robotisé</option>
                                            <option value="Androïde">Androïde</option>
                                        </select>
                                    </td>
                                    <td style="border: 1px solid #cbd5e1; padding: 6px; background: white;">
                                        <select class="robot-select" data-robot="curiosity" data-field="secteur" onchange="saveRobotsState(false)" style="width:100%; padding:6px; border-radius:8px; border:1px solid #94a3b8;">
                                            <option value="">--</option>
                                            <option value="Spatial">Spatial</option>
                                            <option value="Domestique / Service">Domestique / Service</option>
                                            <option value="Militaire">Militaire</option>
                                            <option value="Industriel">Industriel</option>
                                            <option value="Médical">Médical</option>
                                            <option value="Loisirs">Loisirs</option>
                                        </select>
                                    </td>
                                    <td style="border: 1px solid #cbd5e1; padding: 6px; background: white;">
                                        <select class="robot-select" data-robot="curiosity" data-field="tache" onchange="saveRobotsState(false)" style="width:100%; padding:6px; border-radius:8px; border:1px solid #94a3b8;">
                                            <option value="">--</option>
                                            <option value="Explorer le sol martien">Explorer le sol martien</option>
                                            <option value="Accueillir, interagir">Accueillir, interagir</option>
                                            <option value="Transporter du matériel">Transporter du matériel</option>
                                            <option value="Assister l'humain">Assister l'humain</option>
                                            <option value="Souder, assembler">Souder, assembler</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="border: 1px solid #cbd5e1; padding: 10px 8px; font-weight: bold; background: white;">Rosa</td>
                                    <td style="border: 1px solid #cbd5e1; padding: 6px; background: white;">
                                        <select class="robot-select" data-robot="rosa" data-field="pays" onchange="saveRobotsState(false)" style="width:100%; padding:6px; border-radius:8px; border:1px solid #94a3b8;">
                                            <option value="">--</option>
                                            <option value="France (2014)">France (2014)</option>
                                            <option value="Japon (2000)">Japon (2000)</option>
                                            <option value="Japon (2011)">Japon (2011)</option>
                                            <option value="États-Unis (2005)">États-Unis (2005)</option>
                                            <option value="Bolivie (2020)">Bolivie (2020)</option>
                                            <option value="États-Unis (2012)">États-Unis (2012)</option>
                                        </select>
                                    </td>
                                    <td style="border: 1px solid #cbd5e1; padding: 6px; background: white;">
                                        <select class="robot-select" data-robot="rosa" data-field="type" onchange="saveRobotsState(false)" style="width:100%; padding:6px; border-radius:8px; border:1px solid #94a3b8;">
                                            <option value="">--</option>
                                            <option value="Humanoïde">Humanoïde</option>
                                            <option value="Quadrupède">Quadrupède</option>
                                            <option value="Exosquelette">Exosquelette</option>
                                            <option value="Bras robotisé">Bras robotisé</option>
                                            <option value="Rover">Rover</option>
                                            <option value="Androïde">Androïde</option>
                                        </select>
                                    </td>
                                    <td style="border: 1px solid #cbd5e1; padding: 6px; background: white;">
                                        <select class="robot-select" data-robot="rosa" data-field="secteur" onchange="saveRobotsState(false)" style="width:100%; padding:6px; border-radius:8px; border:1px solid #94a3b8;">
                                            <option value="">--</option>
                                            <option value="Médical / Service">Médical / Service</option>
                                            <option value="Domestique / Service">Domestique / Service</option>
                                            <option value="Militaire">Militaire</option>
                                            <option value="Industriel">Industriel</option>
                                            <option value="Spatial">Spatial</option>
                                            <option value="Loisirs">Loisirs</option>
                                        </select>
                                    </td>
                                    <td style="border: 1px solid #cbd5e1; padding: 6px; background: white;">
                                        <select class="robot-select" data-robot="rosa" data-field="tache" onchange="saveRobotsState(false)" style="width:100%; padding:6px; border-radius:8px; border:1px solid #94a3b8;">
                                            <option value="">--</option>
                                            <option value="Assister l'humain">Assister l'humain</option>
                                            <option value="Accueillir, interagir">Accueillir, interagir</option>
                                            <option value="Transporter du matériel">Transporter du matériel</option>
                                            <option value="Souder, assembler">Souder, assembler</option>
                                            <option value="Explorer le sol martien">Explorer le sol martien</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="border: 1px solid #cbd5e1; padding: 10px 8px; font-weight: bold; background: white;">Hulc</td>
                                    <td style="border: 1px solid #cbd5e1; padding: 6px; background: white;">
                                        <select class="robot-select" data-robot="hulc" data-field="pays" onchange="saveRobotsState(false)" style="width:100%; padding:6px; border-radius:8px; border:1px solid #94a3b8;">
                                            <option value="">--</option>
                                            <option value="États-Unis (2009)">États-Unis (2009)</option>
                                            <option value="Japon (2000)">Japon (2000)</option>
                                            <option value="Japon (2011)">Japon (2011)</option>
                                            <option value="États-Unis (2005)">États-Unis (2005)</option>
                                            <option value="France (2014)">France (2014)</option>
                                        </select>
                                    </td>
                                    <td style="border: 1px solid #cbd5e1; padding: 6px; background: white;">
                                        <select class="robot-select" data-robot="hulc" data-field="type" onchange="saveRobotsState(false)" style="width:100%; padding:6px; border-radius:8px; border:1px solid #94a3b8;">
                                            <option value="">--</option>
                                            <option value="Exosquelette">Exosquelette</option>
                                            <option value="Humanoïde">Humanoïde</option>
                                            <option value="Quadrupède">Quadrupède</option>
                                            <option value="Bras robotisé">Bras robotisé</option>
                                            <option value="Rover">Rover</option>
                                            <option value="Androïde">Androïde</option>
                                        </select>
                                    </td>
                                    <td style="border: 1px solid #cbd5e1; padding: 6px; background: white;">
                                        <select class="robot-select" data-robot="hulc" data-field="secteur" onchange="saveRobotsState(false)" style="width:100%; padding:6px; border-radius:8px; border:1px solid #94a3b8;">
                                            <option value="">--</option>
                                            <option value="Militaire">Militaire</option>
                                            <option value="Domestique / Service">Domestique / Service</option>
                                            <option value="Industriel">Industriel</option>
                                            <option value="Médical">Médical</option>
                                            <option value="Spatial">Spatial</option>
                                            <option value="Loisirs">Loisirs</option>
                                        </select>
                                    </td>
                                    <td style="border: 1px solid #cbd5e1; padding: 6px; background: white;">
                                        <select class="robot-select" data-robot="hulc" data-field="tache" onchange="saveRobotsState(false)" style="width:100%; padding:6px; border-radius:8px; border:1px solid #94a3b8;">
                                            <option value="">--</option>
                                            <option value="Transporter du matériel">Transporter du matériel</option>
                                            <option value="Accueillir, interagir">Accueillir, interagir</option>
                                            <option value="Assister l'humain">Assister l'humain</option>
                                            <option value="Souder, assembler">Souder, assembler</option>
                                            <option value="Explorer le sol martien">Explorer le sol martien</option>
                                        </select>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- SECTION 2 : DÉFINITION DE LA ROBOTIQUE -->
                <div id="robots_section_2">
                    <h2 style="color: #0f2b4b; font-size: 1.3rem; margin-top: 25px; margin-bottom: 15px; background: #e6f0ff; padding: 8px 15px; border-radius: 12px;">2. Définition de la robotique</h2>
                    <div class="word-bank" style="background: #eff6ff; border-radius: 14px; padding: 12px 18px; margin: 15px 0; font-size: 0.9rem; color: #1e40af; display: flex; flex-wrap: wrap; gap: 8px 16px; align-items: center;">
                        <strong>Banque de mots :</strong>
                        <span style="background: white; padding: 4px 12px; border-radius: 30px; border: 1px solid #bfdbfe; font-weight: 500;">programmé</span>
                        <span style="background: white; padding: 4px 12px; border-radius: 30px; border: 1px solid #bfdbfe; font-weight: 500;">dangereuses</span>
                        <span style="background: white; padding: 4px 12px; border-radius: 30px; border: 1px solid #bfdbfe; font-weight: 500;">précisément</span>
                        <span style="background: white; padding: 4px 12px; border-radius: 30px; border: 1px solid #bfdbfe; font-weight: 500;">capteurs</span>
                        <span style="background: white; padding: 4px 12px; border-radius: 30px; border: 1px solid #bfdbfe; font-weight: 500;">intelligence</span>
                        <span style="background: white; padding: 4px 12px; border-radius: 30px; border: 1px solid #bfdbfe; font-weight: 500;">environnement</span>
                        <span style="background: white; padding: 4px 12px; border-radius: 30px; border: 1px solid #bfdbfe; font-weight: 500;">apprentissage</span>
                        <span style="background: white; padding: 4px 12px; border-radius: 30px; border: 1px solid #bfdbfe; font-weight: 500;">performants</span>
                        <span style="background: white; padding: 4px 12px; border-radius: 30px; border: 1px solid #bfdbfe; font-weight: 500;">industrie</span>
                    </div>
                    <p style="line-height: 2.4; font-size: 1.05rem;">
                        Un robot est un dispositif (mécanique, électronique et informatique) capable d'accomplir des tâches pour lesquelles il a été
                        <span class="inline-select">
                            <select id="blank1" data-answer="programmé" onchange="saveRobotsState(false)" style="padding: 4px 8px; border-radius: 20px; border: 1.5px solid #3b82f6; background: #eef6ff; font-size: 0.95rem; font-weight: 500; color: #0c4a6e; min-width: 130px;">
                                <option value="">--</option>
                                <option value="programmé">programmé</option>
                                <option value="dangereuses">dangereuses</option>
                                <option value="précisément">précisément</option>
                                <option value="capteurs">capteurs</option>
                                <option value="intelligence">intelligence</option>
                                <option value="environnement">environnement</option>
                                <option value="apprentissage">apprentissage</option>
                                <option value="performants">performants</option>
                                <option value="industrie">industrie</option>
                            </select>
                        </span>.
                        Ces tâches peuvent être
                        <span class="inline-select">
                            <select id="blank2" data-answer="dangereuses" onchange="saveRobotsState(false)" style="padding: 4px 8px; border-radius: 20px; border: 1.5px solid #3b82f6; background: #eef6ff; font-size: 0.95rem; font-weight: 500; color: #0c4a6e; min-width: 130px;">
                                <option value="">--</option>
                                <option value="programmé">programmé</option>
                                <option value="dangereuses">dangereuses</option>
                                <option value="précisément">précisément</option>
                                <option value="capteurs">capteurs</option>
                                <option value="intelligence">intelligence</option>
                                <option value="environnement">environnement</option>
                                <option value="apprentissage">apprentissage</option>
                                <option value="performants">performants</option>
                                <option value="industrie">industrie</option>
                            </select>
                        </span>,
                        pénibles, répétitives ou impossibles pour les humains, ou tout simplement exécutées plus rapidement, plus
                        <span class="inline-select">
                            <select id="blank3" data-answer="précisément" onchange="saveRobotsState(false)" style="padding: 4px 8px; border-radius: 20px; border: 1.5px solid #3b82f6; background: #eef6ff; font-size: 0.95rem; font-weight: 500; color: #0c4a6e; min-width: 130px;">
                                <option value="">--</option>
                                <option value="programmé">programmé</option>
                                <option value="dangereuses">dangereuses</option>
                                <option value="précisément">précisément</option>
                                <option value="capteurs">capteurs</option>
                                <option value="intelligence">intelligence</option>
                                <option value="environnement">environnement</option>
                                <option value="apprentissage">apprentissage</option>
                                <option value="performants">performants</option>
                                <option value="industrie">industrie</option>
                            </select>
                        </span>.
                        Un robot est une machine qui possède des
                        <span class="inline-select">
                            <select id="blank4" data-answer="capteurs" onchange="saveRobotsState(false)" style="padding: 4px 8px; border-radius: 20px; border: 1.5px solid #3b82f6; background: #eef6ff; font-size: 0.95rem; font-weight: 500; color: #0c4a6e; min-width: 130px;">
                                <option value="">--</option>
                                <option value="programmé">programmé</option>
                                <option value="dangereuses">dangereuses</option>
                                <option value="précisément">précisément</option>
                                <option value="capteurs">capteurs</option>
                                <option value="intelligence">intelligence</option>
                                <option value="environnement">environnement</option>
                                <option value="apprentissage">apprentissage</option>
                                <option value="performants">performants</option>
                                <option value="industrie">industrie</option>
                            </select>
                        </span>
                        et une
                        <span class="inline-select">
                            <select id="blank5" data-answer="intelligence" onchange="saveRobotsState(false)" style="padding: 4px 8px; border-radius: 20px; border: 1.5px solid #3b82f6; background: #eef6ff; font-size: 0.95rem; font-weight: 500; color: #0c4a6e; min-width: 130px;">
                                <option value="">--</option>
                                <option value="programmé">programmé</option>
                                <option value="dangereuses">dangereuses</option>
                                <option value="précisément">précisément</option>
                                <option value="capteurs">capteurs</option>
                                <option value="intelligence">intelligence</option>
                                <option value="environnement">environnement</option>
                                <option value="apprentissage">apprentissage</option>
                                <option value="performants">performants</option>
                                <option value="industrie">industrie</option>
                            </select>
                        </span>
                        qui lui permettent de s'adapter à son
                        <span class="inline-select">
                            <select id="blank6" data-answer="environnement" onchange="saveRobotsState(false)" style="padding: 4px 8px; border-radius: 20px; border: 1.5px solid #3b82f6; background: #eef6ff; font-size: 0.95rem; font-weight: 500; color: #0c4a6e; min-width: 130px;">
                                <option value="">--</option>
                                <option value="programmé">programmé</option>
                                <option value="dangereuses">dangereuses</option>
                                <option value="précisément">précisément</option>
                                <option value="capteurs">capteurs</option>
                                <option value="intelligence">intelligence</option>
                                <option value="environnement">environnement</option>
                                <option value="apprentissage">apprentissage</option>
                                <option value="performants">performants</option>
                                <option value="industrie">industrie</option>
                            </select>
                        </span>.
                        Certains robots sont même équipés d'un logiciel d'
                        <span class="inline-select">
                            <select id="blank7" data-answer="apprentissage" onchange="saveRobotsState(false)" style="padding: 4px 8px; border-radius: 20px; border: 1.5px solid #3b82f6; background: #eef6ff; font-size: 0.95rem; font-weight: 500; color: #0c4a6e; min-width: 130px;">
                                <option value="">--</option>
                                <option value="programmé">programmé</option>
                                <option value="dangereuses">dangereuses</option>
                                <option value="précisément">précisément</option>
                                <option value="capteurs">capteurs</option>
                                <option value="intelligence">intelligence</option>
                                <option value="environnement">environnement</option>
                                <option value="apprentissage">apprentissage</option>
                                <option value="performants">performants</option>
                                <option value="industrie">industrie</option>
                            </select>
                        </span>
                        qui leur permet d'être encore plus
                        <span class="inline-select">
                            <select id="blank8" data-answer="performants" onchange="saveRobotsState(false)" style="padding: 4px 8px; border-radius: 20px; border: 1.5px solid #3b82f6; background: #eef6ff; font-size: 0.95rem; font-weight: 500; color: #0c4a6e; min-width: 130px;">
                                <option value="">--</option>
                                <option value="programmé">programmé</option>
                                <option value="dangereuses">dangereuses</option>
                                <option value="précisément">précisément</option>
                                <option value="capteurs">capteurs</option>
                                <option value="intelligence">intelligence</option>
                                <option value="environnement">environnement</option>
                                <option value="apprentissage">apprentissage</option>
                                <option value="performants">performants</option>
                                <option value="industrie">industrie</option>
                            </select>
                        </span>.
                        Les robots sont souvent utilisés dans l'
                        <span class="inline-select">
                            <select id="blank9" data-answer="industrie" onchange="saveRobotsState(false)" style="padding: 4px 8px; border-radius: 20px; border: 1.5px solid #3b82f6; background: #eef6ff; font-size: 0.95rem; font-weight: 500; color: #0c4a6e; min-width: 130px;">
                                <option value="">--</option>
                                <option value="programmé">programmé</option>
                                <option value="dangereuses">dangereuses</option>
                                <option value="précisément">précisément</option>
                                <option value="capteurs">capteurs</option>
                                <option value="intelligence">intelligence</option>
                                <option value="environnement">environnement</option>
                                <option value="apprentissage">apprentissage</option>
                                <option value="performants">performants</option>
                                <option value="industrie">industrie</option>
                            </select>
                        </span>
                        mais aussi dans les domaines militaire, médical, les services, les loisirs, à la maison...
                    </p>
                </div>

                <!-- SECTION 3 : FRISE CHRONOLOGIQUE -->
                <h2 style="color: #0f2b4b; font-size: 1.3rem; margin-top: 25px; margin-bottom: 15px; background: #e6f0ff; padding: 8px 15px; border-radius: 12px;">3. Évolution de la robotique</h2>
                <div class="frise" style="background: #fff7ed; border: 2px dashed #f97316; border-radius: 16px; padding: 20px; margin: 15px 0; text-align: center; color: #9a3412; font-weight: 500;">
                    <p>🕰️ <strong>Réaliser une frise chronologique</strong> présentant l'évolution des robots.</p>
                    <p style="font-size:0.9rem; color:#7c2d12;">(Zone de saisie libre — non notée automatiquement)</p>
                    <textarea id="robotsFrise" oninput="saveRobotsState(false)" style="width: 100%; min-height: 70px; border-radius: 10px; border: 1px solid #fdba74; padding: 10px; font-family: inherit; font-size: 0.95rem; margin-top: 10px;" placeholder="Ex: 1961 - Unimate, 2000 - Asimo, 2005 - Big Dog, 2012 - Curiosity, 2014 - Pepper..."></textarea>
                </div>

                <!-- SECTION 4 : IMPACTS -->
                <h2 style="color: #0f2b4b; font-size: 1.3rem; margin-top: 25px; margin-bottom: 15px; background: #e6f0ff; padding: 8px 15px; border-radius: 12px;">4. Étapes du cycle de vie d'un produit</h2>
                <p>Rappeler quelles sont les étapes du cycle de vie d'un produit :</p>
                <div class="word-bank" style="background:#fef9c3; border-radius: 14px; padding: 12px 18px; margin: 15px 0; font-size: 0.9rem; color: #854d0e; display: flex; flex-wrap: wrap; gap: 8px 16px;">
                    <span style="background: white; padding: 4px 12px; border-radius: 30px; border: 1px solid #fef08a; font-weight: 500;">Extraction des matières premières</span>
                    <span style="background: white; padding: 4px 12px; border-radius: 30px; border: 1px solid #fef08a; font-weight: 500;">Fabrication</span>
                    <span style="background: white; padding: 4px 12px; border-radius: 30px; border: 1px solid #fef08a; font-weight: 500;">Transport</span>
                    <span style="background: white; padding: 4px 12px; border-radius: 30px; border: 1px solid #fef08a; font-weight: 500;">Utilisation</span>
                    <span style="background: white; padding: 4px 12px; border-radius: 30px; border: 1px solid #fef08a; font-weight: 500;">Fin de vie / Recyclage</span>
                </div>

                <h2 style="color: #0f2b4b; font-size: 1.3rem; margin-top: 25px; margin-bottom: 15px; background: #e6f0ff; padding: 8px 15px; border-radius: 12px;">5. Pourquoi remplace-t-on un objet ?</h2>
                <p>Donner au moins deux raisons qui expliquent pourquoi on remplace un objet.</p>
                <textarea id="raisons" rows="3" oninput="saveRobotsState(false)" style="width:100%; border-radius:12px; border:1.5px solid #cbd5e1; padding:12px; font-size:0.95rem;" placeholder="1. ...&#10;2. ..."></textarea>

                <h2 style="color: #0f2b4b; font-size: 1.3rem; margin-top: 25px; margin-bottom: 15px; background: #e6f0ff; padding: 8px 15px; border-radius: 12px;">6. Réduire les impacts d'un objet technique sur l'environnement</h2>
                <p>Comment peut-on réduire les impacts d'un objet technique sur l'environnement ?</p>
                <div class="info-block" style="background: #f8fafc; border-left: 6px solid #3b82f6; padding: 15px 20px; border-radius: 12px; margin: 20px 0; box-shadow: 0 2px 8px rgba(0,0,0,0.03);">
                    <p><strong>L'éco-conception permet de :</strong></p>
                    <ul class="definition-list" style="list-style-type: none; padding-left: 0;">
                        <li style="margin-bottom: 8px; padding-left: 20px; position: relative;">• Choisir des matériaux recyclables ou valorisables</li>
                        <li style="margin-bottom: 8px; padding-left: 20px; position: relative;">• Augmenter l'efficacité énergétique</li>
                        <li style="margin-bottom: 8px; padding-left: 20px; position: relative;">• Favoriser les énergies renouvelables</li>
                        <li style="margin-bottom: 8px; padding-left: 20px; position: relative;">• Réduire les distances de transport et limiter les emballages</li>
                        <li style="margin-bottom: 8px; padding-left: 20px; position: relative;">• Faciliter le reconditionnement en fin de vie…</li>
                    </ul>
                </div>

                <h2 style="color: #0f2b4b; font-size: 1.3rem; margin-top: 25px; margin-bottom: 15px; background: #e6f0ff; padding: 8px 15px; border-radius: 12px;">7. Impacts de l'extraction du lithium</h2>
                <p>Résumer en quelques lignes l'impact sur l'environnement et sur la société bolivienne de l'extraction du lithium.</p>
                <textarea id="lithium" rows="4" oninput="saveRobotsState(false)" style="width:100%; border-radius:12px; border:1.5px solid #cbd5e1; padding:12px; font-size:0.95rem;" placeholder="Votre réponse..."></textarea>

                <!-- BOUTON D'ENVOI -->
                <button class="btn-submit" id="submitRobotsBtn" onclick="sendRobotsToSheet()" style="background: #1e3a5f; color: white; border: none; padding: 16px 30px; font-size: 1.2rem; font-weight: 600; border-radius: 50px; cursor: pointer; transition: background 0.2s, transform 0.1s; display: block; margin: 30px auto 10px; box-shadow: 0 6px 14px rgba(30,58,95,0.3); width: 100%; max-width: 400px;">
                    📤 Envoyer mes réponses
                </button>
                <div id="robotsResultBadge" class="result-badge" style="background: #dcfce7; color: #166534; padding: 12px 20px; border-radius: 40px; font-weight: 700; text-align: center; font-size: 1.1rem; margin: 15px 0; display: none;"></div>
                <p style="font-size: 0.9rem; color: #475569; background: #f1f5f9; padding: 12px 18px; border-radius: 12px; margin-top: 15px; text-align: center;">
                    🔗 Les résultats seront envoyés vers le Google Sheet « Les robots » avec votre identité de connexion.
                </p>

                <div style="text-align: center; margin-top: 20px;">
                    <button onclick="toggleRobotsSheet()" style="background: #64748B; color: white; border: none; padding: 10px 24px; border-radius: 20px; font-weight: 700; cursor: pointer;">
                        ✖️ Masquer le document
                    </button>
                </div>
            </div>

            <!-- ACTIVITÉ 3 -->
            <div style="background: white; border-radius: 14px; padding: 24px; margin-bottom: 24px; box-shadow: var(--shadow-sm); border: 1px solid var(--border);">
                <h2 style="font-family: 'Outfit', sans-serif; font-size: 1.25rem; font-weight: 700; color: var(--navy); margin-top: 0; display: flex; align-items: center; gap: 10px;">
                    <span style="background: var(--primary, #0F172A); color: white; width: 32px; height: 32px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 1rem; font-weight: 800; flex-shrink: 0;">3</span>
                    Frise chronologique de l'évolution des robots
                </h2>
                <p style="margin: 10px 0;">✏️ Réalise une frise chronologique présentant l'évolution des robots à l'aide des vignettes distribuées par ton professeur.</p>
                <ul style="margin: 10px 0 0 20px; padding: 0;">
                    <li style="margin-bottom: 6px;">Commence par compléter les vignettes à l'aide de <a href="https://www.gotronic.fr/blog/articles/histoire-de-la-robotique" target="_blank" rel="noopener noreferrer" style="color: #2563EB; font-weight: 600; text-decoration: underline;">l'histoire de la robotique</a>.</li>
                    <li style="margin-bottom: 6px;">Réalise la frise (attention au calcul de l'échelle).</li>
                    <li style="margin-bottom: 6px;">Place sur la frise 3 <a href="https://drive.google.com/file/d/1xaRUQEXyg5c8JRXusNPeBil1sXLe6SLQ/view?usp=sharing" target="_blank" rel="noopener noreferrer" style="color: #2563EB; font-weight: 600; text-decoration: underline;">inventions majeures</a> qui ont permis l'évolution de la robotique.</li>
                </ul>
            </div>

            <!-- ACTIVITÉ 4 -->
            <div style="background: white; border-radius: 14px; padding: 24px; margin-bottom: 24px; box-shadow: var(--shadow-sm); border: 1px solid var(--border);">
                <h2 style="font-family: 'Outfit', sans-serif; font-size: 1.25rem; font-weight: 700; color: var(--navy); margin-top: 0; display: flex; align-items: center; gap: 10px;">
                    <span style="background: var(--primary, #0F172A); color: white; width: 32px; height: 32px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 1rem; font-weight: 800; flex-shrink: 0;">4</span>
                    Impacts de la robotisation sur la société
                </h2>
                <p style="margin: 10px 0;">✏️ Rappelle quelles sont <a href="https://www.youtube.com/watch?v=SJq7i_3UODM" target="_blank" rel="noopener noreferrer" style="color: #2563EB; font-weight: 700; text-decoration: underline;">les étapes du cycle de vie d'un produit</a>.</p>
            </div>

            <!-- ACTIVITÉ 5 -->
            <div style="background: white; border-radius: 14px; padding: 24px; margin-bottom: 24px; box-shadow: var(--shadow-sm); border: 1px solid var(--border);">
                <h2 style="font-family: 'Outfit', sans-serif; font-size: 1.25rem; font-weight: 700; color: var(--navy); margin-top: 0; display: flex; align-items: center; gap: 10px;">
                    <span style="background: var(--primary, #0F172A); color: white; width: 32px; height: 32px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 1rem; font-weight: 800; flex-shrink: 0;">5</span>
                    Pourquoi remplacer un objet ?
                </h2>
                <p style="margin: 10px 0;">✏️ Donne au moins deux raisons qui expliquent pourquoi on remplace un objet.</p>
            </div>

            <!-- ACTIVITÉ 6 -->
            <div style="background: white; border-radius: 14px; padding: 24px; margin-bottom: 24px; box-shadow: var(--shadow-sm); border: 1px solid var(--border);">
                <h2 style="font-family: 'Outfit', sans-serif; font-size: 1.25rem; font-weight: 700; color: var(--navy); margin-top: 0; display: flex; align-items: center; gap: 10px;">
                    <span style="background: var(--primary, #0F172A); color: white; width: 32px; height: 32px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 1rem; font-weight: 800; flex-shrink: 0;">6</span>
                    Réduire les impacts environnementaux
                </h2>
                <p style="margin: 10px 0;">✏️ Comment peut-on réduire les impacts d'un objet technique sur l'environnement ?</p>
            </div>

            <!-- ACTIVITÉ 7 -->
            <div style="background: white; border-radius: 14px; padding: 24px; margin-bottom: 30px; box-shadow: var(--shadow-sm); border: 1px solid var(--border);">
                <h2 style="font-family: 'Outfit', sans-serif; font-size: 1.25rem; font-weight: 700; color: var(--navy); margin-top: 0; display: flex; align-items: center; gap: 10px;">
                    <span style="background: var(--primary, #0F172A); color: white; width: 32px; height: 32px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 1rem; font-weight: 800; flex-shrink: 0;">7</span>
                    Le cas du lithium
                </h2>
                <p style="margin: 10px 0; font-style: italic; color: var(--text-muted);">
                    Comme la plupart des appareils mobiles, les robots Pepper et Nao fonctionnent grâce à une batterie au lithium — un métal disponible en grande quantité, mais dont l'extraction est source de tensions.
                </p>
                <p style="margin: 10px 0;">✏️ Résume en quelques lignes l'impact sur l'environnement et sur la société bolivienne de <a href="https://vivredemain.fr/2019/01/10/le-lithium-un-fleau-pour-lenvironnement/" target="_blank" rel="noopener noreferrer" style="color: #2563EB; font-weight: 700; text-decoration: underline;">l'extraction du lithium</a>.</p>
            </div>

            <!-- TEST DE CONNAISSANCES -->
            <div style="background: linear-gradient(135deg, #1E1B4B, #312E81); color: white; border-radius: 16px; padding: 28px; text-align: center; margin-bottom: 30px; box-shadow: var(--shadow-md);">
                <h2 style="font-family: 'Outfit', sans-serif; font-size: 1.4rem; font-weight: 800; margin-top: 0; margin-bottom: 12px; color: #38BDF8;">🧠 Je teste mes connaissances</h2>
                <p style="margin: 0 0 20px 0; opacity: 0.9;">Entraîne-toi avec le QCM interactif en ligne :</p>
                <a href="https://learningapps.org/watch?v=pdj6h9dz521" target="_blank" rel="noopener noreferrer" style="background: #10B981; color: white; text-decoration: none; padding: 12px 28px; border-radius: 25px; font-weight: 800; font-size: 1.05rem; display: inline-flex; align-items: center; gap: 8px; box-shadow: var(--shadow-sm);">
                    ▶️ Faire le QCM interactif
                </a>
            </div>

            <!-- POUR ALLER PLUS LOIN -->
            <div style="background: white; border-radius: 14px; padding: 24px; margin-bottom: 30px; box-shadow: var(--shadow-sm); border: 1px solid var(--border);">
                <h2 style="font-family: 'Outfit', sans-serif; font-size: 1.25rem; font-weight: 700; color: var(--navy); margin-top: 0; margin-bottom: 15px; display: flex; align-items: center; gap: 8px;">
                    🚀 Pour aller plus loin
                </h2>
                <ul style="margin: 0; padding-left: 20px; display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 10px;">
                    <li><a href="https://www.youtube.com/watch?v=BbwfTex0hk8" target="_blank" rel="noopener noreferrer" style="color: #2563EB; font-weight: 600;">🎬 L'histoire des robots en 4 minutes</a></li>
                    <li><a href="https://ladigitale.dev/digiview/#/v/02b985e7a3b2f33f" target="_blank" rel="noopener noreferrer" style="color: #2563EB; font-weight: 600;">💻 Robotique (Digiview)</a></li>
                    <li><a href="https://www.francetvinfo.fr/sciences/high-tech/technologie-faut-il-avoir-peur-des-robots_2660458.html" target="_blank" rel="noopener noreferrer" style="color: #2563EB; font-weight: 600;">📰 Faut-il avoir peur des robots ?</a></li>
                    <li><a href="https://www.youtube.com/watch?v=tF4DML7FIWk" target="_blank" rel="noopener noreferrer" style="color: #2563EB; font-weight: 600;">🤖 Atlas, le robot de Boston Dynamics</a></li>
                    <li><a href="https://www.lumni.fr/video/c-est-quoi-le-developpement-durable" target="_blank" rel="noopener noreferrer" style="color: #2563EB; font-weight: 600;">🌱 C'est quoi le développement durable ?</a></li>
                    <li><a href="https://www.lumni.fr/jeu/histoires-d-inventions" target="_blank" rel="noopener noreferrer" style="color: #2563EB; font-weight: 600;">🎮 Histoires d'inventions</a></li>
                </ul>
            </div>

            <div style="margin-top: 30px; text-align: center;">
                <button class="btn-menu" onclick="showDashboard(currentStudent ? currentStudent.niveau : '3eme')" style="padding: 12px 28px; border-radius: 20px; background: #64748B; color: white; border: none; font-weight: 700; cursor: pointer; font-size: 0.95rem; box-shadow: var(--shadow-sm);">
                    ↩️ Retour au tableau de bord
                </button>
            </div>
        </div>
    `;

    restoreRobotsState();

    document.getElementById('activityScreen').style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function openFastModule(activity) {
    document.getElementById('dashboardScreen').style.display = 'none';
    const container = document.getElementById('activityContent');

    container.innerHTML = `
        <div class="media-container" style="max-width: 900px; margin: 0 auto; padding: 25px 15px; font-family: 'Plus Jakarta Sans', sans-serif;">

            <!-- Header -->
            <div style="background: linear-gradient(135deg, #0F172A, #1E293B); color: white; padding: 35px 25px; border-radius: 16px; text-align: center; margin-bottom: 20px; box-shadow: var(--shadow-md);">
                <h1 style="margin: 0 0 6px 0; font-size: 2.2rem; font-weight: 800; font-family: 'Outfit', sans-serif;">📐 Analyse Fonctionnelle & Diagramme FAST</h1>
                <p style="margin: 0; opacity: 0.9; font-size: 1.05rem;">10 exercices corrigés pour maîtriser la Bête à cornes, le Diagramme Pieuvre et le Diagramme FAST.</p>
            </div>

            <!-- Barre de progression sticky/fixe -->
            <div style="position: sticky; top: 10px; z-index: 100; background: white; border: 1px solid var(--border); border-radius: 12px; padding: 12px 20px; margin-bottom: 25px; text-align: center; font-weight: 700; color: var(--navy); box-shadow: var(--shadow-md); display: flex; align-items: center; justify-content: center; gap: 8px;">
                <span>📊 Exercices consultés :</span>
                <span id="fastCompteur" style="color: #2563EB; font-size: 1.1rem;">0</span>
                <span>/ 10</span>
            </div>

            <!-- Rappel des notions clés -->
            <div style="background: white; border-radius: 14px; padding: 24px; margin-bottom: 30px; border: 1px solid var(--border); box-shadow: var(--shadow-sm);">
                <h2 style="margin-top: 0; color: #1E4FB8; font-family: 'Outfit', sans-serif; font-size: 1.3rem; display: flex; align-items: center; gap: 8px;">
                    🧭 Rappel des notions clés
                </h2>
                <div style="margin-bottom: 12px; line-height: 1.6; color: var(--text-dark);">
                    <strong style="color: var(--navy);">La Bête à cornes</strong> — sert à exprimer le besoin auquel répond un produit, en répondant à trois questions : <em>à qui rend-il service ? sur quoi agit-il ? dans quel but ?</em>
                </div>
                <div style="margin-bottom: 12px; line-height: 1.6; color: var(--text-dark);">
                    <strong style="color: var(--navy);">Le Diagramme Pieuvre</strong> — représente les relations entre le produit et les éléments de son milieu extérieur (utilisateur, énergie, normes...). On distingue les <em>fonctions principales</em> (FP), qui relient deux éléments extérieurs entre eux via le produit, et les <em>fonctions contraintes</em> (FC), qui adaptent le produit à un seul élément extérieur.
                </div>
                <div style="line-height: 1.6; color: var(--text-dark);">
                    <strong style="color: var(--navy);">Le Diagramme FAST</strong> — permet de passer d'une fonction de service à des solutions techniques concrètes, en répondant à <em>"Comment ?"</em> (vers la droite) et <em>"Pourquoi ?"</em> (vers la gauche).
                </div>
            </div>

            <!-- NIVEAU FACILE -->
            <div style="display: flex; align-items: center; gap: 10px; margin: 30px 0 15px 0;">
                <span style="background: #10B981; color: white; padding: 4px 12px; border-radius: 20px; font-size: 0.8rem; font-weight: 700;">Facile</span>
                <h2 style="margin: 0; font-size: 1.3rem; font-family: 'Outfit', sans-serif; color: var(--navy);">Exercices 1 à 3</h2>
            </div>

            <!-- EXO 1 -->
            <div class="fast-exo" data-n="1" style="background: white; border: 1px solid var(--border); border-radius: 12px; margin-bottom: 16px; overflow: hidden; box-shadow: var(--shadow-sm);">
                <div style="padding: 18px 20px; background: #EEF3FD; border-bottom: 1px solid var(--border);">
                    <strong style="color: #1E4FB8;">Exercice 1 —</strong> Applique la Bête à cornes à une trottinette électrique. Identifie les trois éléments du diagramme.
                </div>
                <button onclick="toggleFastCorrection(this)" style="width: 100%; text-align: left; background: none; border: none; padding: 12px 20px; font-size: 0.95rem; color: #2563EB; cursor: pointer; font-weight: 700; transition: background 0.2s;">
                    Afficher la correction ▾
                </button>
                <div class="fast-correction" style="display: none; padding: 16px 20px; background: #EAFAF3; border-top: 1px dashed #B6E3CD;">
                    <p style="margin: 4px 0;">• À qui rend-elle service ? <strong style="color: #10B981;">À l'utilisateur.</strong></p>
                    <p style="margin: 4px 0;">• Sur quoi agit-elle ? <strong style="color: #10B981;">Sur les déplacements de l'utilisateur.</strong></p>
                    <p style="margin: 4px 0;">• Dans quel but ? <strong style="color: #10B981;">Permettre un déplacement rapide et autonome sur de courtes distances.</strong></p>
                </div>
            </div>

            <!-- EXO 2 -->
            <div class="fast-exo" data-n="2" style="background: white; border: 1px solid var(--border); border-radius: 12px; margin-bottom: 16px; overflow: hidden; box-shadow: var(--shadow-sm);">
                <div style="padding: 18px 20px; background: #EEF3FD; border-bottom: 1px solid var(--border);">
                    <strong style="color: #1E4FB8;">Exercice 2 —</strong> Pour un distributeur automatique de croquettes pour animaux, cite 5 éléments du milieu extérieur qui apparaîtraient sur un diagramme pieuvre.
                </div>
                <button onclick="toggleFastCorrection(this)" style="width: 100%; text-align: left; background: none; border: none; padding: 12px 20px; font-size: 0.95rem; color: #2563EB; cursor: pointer; font-weight: 700;">
                    Afficher la correction ▾
                </button>
                <div class="fast-correction" style="display: none; padding: 16px 20px; background: #EAFAF3; border-top: 1px dashed #B6E3CD;">
                    <p style="margin: 4px 0;"><strong style="color: #10B981;">1. L'animal</strong> (destinataire des croquettes) — <strong style="color: #10B981;">2. L'utilisateur</strong> (qui programme l'appareil) — <strong style="color: #10B981;">3. L'énergie</strong> (secteur ou piles) — <strong style="color: #10B981;">4. Les croquettes</strong> (contenu à distribuer) — <strong style="color: #10B981;">5. Le smartphone</strong> (application de pilotage à distance).</p>
                </div>
            </div>

            <!-- EXO 3 -->
            <div class="fast-exo" data-n="3" style="background: white; border: 1px solid var(--border); border-radius: 12px; margin-bottom: 16px; overflow: hidden; box-shadow: var(--shadow-sm);">
                <div style="padding: 18px 20px; background: #EEF3FD; border-bottom: 1px solid var(--border);">
                    <strong style="color: #1E4FB8;">Exercice 3 —</strong> Quelle est la différence entre une fonction principale (FP) et une fonction contrainte (FC) ? Illustre avec un casque audio sans fil.
                </div>
                <button onclick="toggleFastCorrection(this)" style="width: 100%; text-align: left; background: none; border: none; padding: 12px 20px; font-size: 0.95rem; color: #2563EB; cursor: pointer; font-weight: 700;">
                    Afficher la correction ▾
                </button>
                <div class="fast-correction" style="display: none; padding: 16px 20px; background: #EAFAF3; border-top: 1px dashed #B6E3CD;">
                    <p style="margin: 4px 0;">Une <strong style="color: #10B981;">FP</strong> relie deux éléments du milieu extérieur par l'intermédiaire du produit (ex : permettre à l'utilisateur d'écouter une musique diffusée par un smartphone).</p>
                    <p style="margin: 4px 0;">Une <strong style="color: #10B981;">FC</strong> relie le produit à un seul élément extérieur, souvent une contrainte à respecter (ex : s'adapter à la forme de la tête de l'utilisateur, ou respecter les normes d'exposition aux ondes).</p>
                </div>
            </div>

            <!-- NIVEAU MOYEN -->
            <div style="display: flex; align-items: center; gap: 10px; margin: 35px 0 15px 0;">
                <span style="background: #F59E0B; color: white; padding: 4px 12px; border-radius: 20px; font-size: 0.8rem; font-weight: 700;">Moyen</span>
                <h2 style="margin: 0; font-size: 1.3rem; font-family: 'Outfit', sans-serif; color: var(--navy);">Exercices 4 à 6</h2>
            </div>

            <!-- EXO 4 -->
            <div class="fast-exo" data-n="4" style="background: white; border: 1px solid var(--border); border-radius: 12px; margin-bottom: 16px; overflow: hidden; box-shadow: var(--shadow-sm);">
                <div style="padding: 18px 20px; background: #EEF3FD; border-bottom: 1px solid var(--border);">
                    <strong style="color: #1E4FB8;">Exercice 4 —</strong> Décris le diagramme pieuvre d'un aspirateur robot en donnant une FP1, une FC1 (liée à l'énergie) et une FC2 (liée à l'esthétique).
                </div>
                <button onclick="toggleFastCorrection(this)" style="width: 100%; text-align: left; background: none; border: none; padding: 12px 20px; font-size: 0.95rem; color: #2563EB; cursor: pointer; font-weight: 700;">
                    Afficher la correction ▾
                </button>
                <div class="fast-correction" style="display: none; padding: 16px 20px; background: #EAFAF3; border-top: 1px dashed #B6E3CD;">
                    <p style="margin: 4px 0;"><strong style="color: #10B981;">FP1 :</strong> Permettre à l'utilisateur de nettoyer le sol sans intervention manuelle.</p>
                    <p style="margin: 4px 0;"><strong style="color: #10B981;">FC1 :</strong> Se recharger automatiquement sur sa base électrique.</p>
                    <p style="margin: 4px 0;"><strong style="color: #10B981;">FC2 :</strong> S'intégrer discrètement dans le décor d'un intérieur.</p>
                </div>
            </div>

            <!-- EXO 5 -->
            <div class="fast-exo" data-n="5" style="background: white; border: 1px solid var(--border); border-radius: 12px; margin-bottom: 16px; overflow: hidden; box-shadow: var(--shadow-sm);">
                <div style="padding: 18px 20px; background: #EEF3FD; border-bottom: 1px solid var(--border);">
                    <strong style="color: #1E4FB8;">Exercice 5 —</strong> Pour la fonction technique "Convertir l'énergie électrique en mouvement de rotation", propose deux solutions techniques différentes.
                </div>
                <button onclick="toggleFastCorrection(this)" style="width: 100%; text-align: left; background: none; border: none; padding: 12px 20px; font-size: 0.95rem; color: #2563EB; cursor: pointer; font-weight: 700;">
                    Afficher la correction ▾
                </button>
                <div class="fast-correction" style="display: none; padding: 16px 20px; background: #EAFAF3; border-top: 1px dashed #B6E3CD;">
                    <p style="margin: 4px 0;"><strong style="color: #10B981;">Solution 1 :</strong> Moteur électrique à courant continu.</p>
                    <p style="margin: 4px 0;"><strong style="color: #10B981;">Solution 2 :</strong> Servomoteur.</p>
                    <p style="margin: 4px 0; font-style: italic; color: var(--text-muted);">Le choix dépend de la précision de mouvement recherchée et de la charge à entraîner.</p>
                </div>
            </div>

            <!-- EXO 6 -->
            <div class="fast-exo" data-n="6" style="background: white; border: 1px solid var(--border); border-radius: 12px; margin-bottom: 16px; overflow: hidden; box-shadow: var(--shadow-sm);">
                <div style="padding: 18px 20px; background: #EEF3FD; border-bottom: 1px solid var(--border);">
                    <strong style="color: #1E4FB8;">Exercice 6 —</strong> Pour un portail automatique, complète la chaîne FAST : [ ? ] → Transmettre le mouvement → [ ? ].
                </div>
                <button onclick="toggleFastCorrection(this)" style="width: 100%; text-align: left; background: none; border: none; padding: 12px 20px; font-size: 0.95rem; color: #2563EB; cursor: pointer; font-weight: 700;">
                    Afficher la correction ▾
                </button>
                <div class="fast-correction" style="display: none; padding: 16px 20px; background: #EAFAF3; border-top: 1px dashed #B6E3CD;">
                    <p style="margin: 4px 0;">Premier bloc (fonction technique) : <strong style="color: #10B981;">Convertir l'énergie électrique en mouvement.</strong></p>
                    <p style="margin: 4px 0;">Dernier bloc (solution technique) : <strong style="color: #10B981;">Vérin ou bras articulé du portail.</strong></p>
                </div>
            </div>

            <!-- NIVEAU DIFFICILE -->
            <div style="display: flex; align-items: center; gap: 10px; margin: 35px 0 15px 0;">
                <span style="background: #EF4444; color: white; padding: 4px 12px; border-radius: 20px; font-size: 0.8rem; font-weight: 700;">Difficile</span>
                <h2 style="margin: 0; font-size: 1.3rem; font-family: 'Outfit', sans-serif; color: var(--navy);">Exercices 7 à 10</h2>
            </div>

            <!-- EXO 7 -->
            <div class="fast-exo" data-n="7" style="background: white; border: 1px solid var(--border); border-radius: 12px; margin-bottom: 16px; overflow: hidden; box-shadow: var(--shadow-sm);">
                <div style="padding: 18px 20px; background: #EEF3FD; border-bottom: 1px solid var(--border);">
                    <strong style="color: #1E4FB8;">Exercice 7 —</strong> Explique pourquoi on réalise la Bête à cornes avant le diagramme FAST lors de la conception d'un produit.
                </div>
                <button onclick="toggleFastCorrection(this)" style="width: 100%; text-align: left; background: none; border: none; padding: 12px 20px; font-size: 0.95rem; color: #2563EB; cursor: pointer; font-weight: 700;">
                    Afficher la correction ▾
                </button>
                <div class="fast-correction" style="display: none; padding: 16px 20px; background: #EAFAF3; border-top: 1px dashed #B6E3CD;">
                    <p style="margin: 4px 0;">La Bête à cornes exprime le besoin de façon <strong style="color: #10B981;">abstraite</strong>, sans imposer de solution technique, ce qui laisse toute latitude pour imaginer différentes réponses possibles.</p>
                    <p style="margin: 4px 0;">Le FAST intervient ensuite pour organiser des solutions <strong style="color: #10B981;">concrètes</strong>. Commencer directement par le FAST risquerait d'orienter la conception vers une solution technique sans avoir vérifié qu'elle répond réellement au besoin.</p>
                </div>
            </div>

            <!-- EXO 8 -->
            <div class="fast-exo" data-n="8" style="background: white; border: 1px solid var(--border); border-radius: 12px; margin-bottom: 16px; overflow: hidden; box-shadow: var(--shadow-sm);">
                <div style="padding: 18px 20px; background: #EEF3FD; border-bottom: 1px solid var(--border);">
                    <strong style="color: #1E4FB8;">Exercice 8 —</strong> Pour la fonction contrainte "Résister aux chocs", propose un critère d'appréciation et un niveau chiffré.
                </div>
                <button onclick="toggleFastCorrection(this)" style="width: 100%; text-align: left; background: none; border: none; padding: 12px 20px; font-size: 0.95rem; color: #2563EB; cursor: pointer; font-weight: 700;">
                    Afficher la correction ▾
                </button>
                <div class="fast-correction" style="display: none; padding: 16px 20px; background: #EAFAF3; border-top: 1px dashed #B6E3CD;">
                    <p style="margin: 4px 0;"><strong style="color: #10B981;">Critère :</strong> Indice de résistance aux chocs (norme IK).</p>
                    <p style="margin: 4px 0;"><strong style="color: #10B981;">Niveau :</strong> IK08 (résistance à un choc de 5 joules).</p>
                    <p style="margin: 4px 0; font-style: italic; color: var(--text-muted);">Cette caractérisation rend la fonction mesurable et testable lors de la validation du produit.</p>
                </div>
            </div>

            <!-- EXO 9 -->
            <div class="fast-exo" data-n="9" style="background: white; border: 1px solid var(--border); border-radius: 12px; margin-bottom: 16px; overflow: hidden; box-shadow: var(--shadow-sm);">
                <div style="padding: 18px 20px; background: #EEF3FD; border-bottom: 1px solid var(--border);">
                    <strong style="color: #1E4FB8;">Exercice 9 —</strong> Sur un vélo à assistance électrique, la fonction "Réguler la vitesse" se décompose en trois sous-fonctions techniques. Lesquelles ?
                </div>
                <button onclick="toggleFastCorrection(this)" style="width: 100%; text-align: left; background: none; border: none; padding: 12px 20px; font-size: 0.95rem; color: #2563EB; cursor: pointer; font-weight: 700;">
                    Afficher la correction ▾
                </button>
                <div class="fast-correction" style="display: none; padding: 16px 20px; background: #EAFAF3; border-top: 1px dashed #B6E3CD;">
                    <p style="margin: 4px 0;"><strong style="color: #10B981;">1. Acquérir la vitesse</strong> (capteur de rotation de roue).</p>
                    <p style="margin: 4px 0;"><strong style="color: #10B981;">2. Traiter l'information</strong> (carte électronique comparant la vitesse mesurée à la consigne).</p>
                    <p style="margin: 4px 0;"><strong style="color: #10B981;">3. Agir sur le moteur</strong> (réduction ou augmentation de l'assistance électrique).</p>
                </div>
            </div>

            <!-- EXO 10 -->
            <div class="fast-exo" data-n="10" style="background: white; border: 1px solid var(--border); border-radius: 12px; margin-bottom: 30px; overflow: hidden; box-shadow: var(--shadow-sm);">
                <div style="padding: 18px 20px; background: #EEF3FD; border-bottom: 1px solid var(--border);">
                    <strong style="color: #1E4FB8;">Exercice 10 —</strong> Un client souhaite un système pour "éclairer automatiquement une allée la nuit". Rédige la FP1 puis liste 3 FC en lien avec le milieu extérieur.
                </div>
                <button onclick="toggleFastCorrection(this)" style="width: 100%; text-align: left; background: none; border: none; padding: 12px 20px; font-size: 0.95rem; color: #2563EB; cursor: pointer; font-weight: 700;">
                    Afficher la correction ▾
                </button>
                <div class="fast-correction" style="display: none; padding: 16px 20px; background: #EAFAF3; border-top: 1px dashed #B6E3CD;">
                    <p style="margin: 4px 0;"><strong style="color: #10B981;">FP1 :</strong> Permettre à l'utilisateur de bénéficier d'un éclairage automatique en fonction de la luminosité ambiante.</p>
                    <p style="margin: 4px 0;"><strong style="color: #10B981;">FC1 :</strong> Résister aux intempéries (pluie, gel).</p>
                    <p style="margin: 4px 0;"><strong style="color: #10B981;">FC2 :</strong> Fonctionner de façon autonome en énergie (panneau solaire ou pile).</p>
                    <p style="margin: 4px 0;"><strong style="color: #10B981;">FC3 :</strong> S'installer facilement sans câblage complexe.</p>
                </div>
            </div>

            <div style="margin-top: 30px; text-align: center;">
                <button class="btn-menu" onclick="showDashboard(currentStudent ? currentStudent.niveau : '3eme')" style="padding: 12px 28px; border-radius: 20px; background: #64748B; color: white; border: none; font-weight: 700; cursor: pointer; font-size: 0.95rem; box-shadow: var(--shadow-sm);">
                    ↩️ Retour au tableau de bord
                </button>
            </div>
        </div>
    `;

    document.getElementById('activityScreen').style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleFastCorrection(btn) {
    const corr = btn.nextElementSibling;
    if (!corr) return;
    const isHidden = corr.style.display === 'none';
    corr.style.display = isHidden ? 'block' : 'none';
    btn.textContent = isHidden ? 'Masquer la correction ▴' : 'Afficher la correction ▾';

    if (isHidden) {
        const exo = btn.closest('.fast-exo');
        if (exo && !exo.dataset.seen) {
            exo.dataset.seen = "1";
            const c = document.getElementById('fastCompteur');
            if (c) {
                c.textContent = parseInt(c.textContent, 10) + 1;
            }
        }
    }
}

function openVideoPlayer(activity) {
    document.getElementById('dashboardScreen').style.display = 'none';
    const container = document.getElementById('activityContent');

    const safeTitle = escapeHTML(activity.titre);
    const safeDesc = escapeHTML(activity.description);
    const safeVideoUrl = escapeHTML(activity.videoUrl);

    container.innerHTML = `
        <div class="media-container">
            <div class="media-header">
                <div>
                    <h2 class="media-title">🎬 ${safeTitle}</h2>
                    <p style="color: var(--text-muted); font-size: 0.9rem; margin-top: 4px;">${safeDesc}</p>
                </div>
            </div>
            <div class="video-player-container">
                <video controls autoplay preload="metadata">
                    <source src="${safeVideoUrl}" type="video/mp4">
                    Votre navigateur ne prend pas en charge le lecteur vidéo HTML5.
                </video>
            </div>
        </div>
    `;

    document.getElementById('activityScreen').style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
