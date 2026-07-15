/*
 * Logica voor het topografiespel.
 * Pure functies (shuffle, maakVraag, maakRonde) zijn ook in Node te testen.
 * UI-code draait alleen in de browser.
 */
(function () {
  // In Node komt LANDEN uit de module; in de browser is het een globale variabele.
  const DATA =
    typeof module !== "undefined" && module.exports
      ? require("./quiz-data.js").LANDEN
      : window.LANDEN;

  const VRAGEN_PER_RONDE = 15;
  const AANTAL_OPTIES = 4;

  /** Fisher-Yates shuffle; geeft een nieuwe array terug. */
  function shuffle(array) {
    const kopie = array.slice();
    for (let i = kopie.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [kopie[i], kopie[j]] = [kopie[j], kopie[i]];
    }
    return kopie;
  }

  /**
   * Maakt één vraag: gegeven een land, kies de juiste hoofdstad.
   * De verkeerde opties zijn hoofdsteden van andere landen.
   */
  function maakVraag(juisteItem, alleItems) {
    const afleiders = shuffle(
      alleItems.filter((i) => i.hoofdstad !== juisteItem.hoofdstad)
    ).slice(0, AANTAL_OPTIES - 1);

    const opties = shuffle([juisteItem, ...afleiders].map((i) => i.hoofdstad));

    return {
      land: juisteItem.land,
      juist: juisteItem.hoofdstad,
      opties,
    };
  }

  /** Maakt een ronde van (max) VRAGEN_PER_RONDE willekeurige, unieke vragen. */
  function maakRonde(alleItems, aantal = VRAGEN_PER_RONDE) {
    const gekozen = shuffle(alleItems).slice(0, Math.min(aantal, alleItems.length));
    return gekozen.map((item) => maakVraag(item, alleItems));
  }

  // ---- Node export voor tests ----
  if (typeof module !== "undefined" && module.exports) {
    module.exports = {
      shuffle,
      maakVraag,
      maakRonde,
      VRAGEN_PER_RONDE,
      AANTAL_OPTIES,
    };
    return;
  }

  // ---- Browser UI ----
  const state = {
    vragen: [],
    index: 0,
    goed: 0,
    fout: 0,
    beantwoord: false,
  };

  const el = (id) => document.getElementById(id);

  function startRonde() {
    state.vragen = maakRonde(DATA);
    state.index = 0;
    state.goed = 0;
    state.fout = 0;
    state.beantwoord = false;
    el("resultaat").classList.add("verborgen");
    el("vraagKaart").classList.remove("verborgen");
    toonVraag();
  }

  function toonVraag() {
    state.beantwoord = false;
    const v = state.vragen[state.index];

    el("voortgang").textContent = `Vraag ${state.index + 1} / ${state.vragen.length}`;
    el("score").textContent = `Goed: ${state.goed}  ·  Fout: ${state.fout}`;
    el("vraagTekst").textContent = `Wat is de hoofdstad van ${v.land}?`;
    el("feedback").textContent = "";
    el("feedback").className = "feedback";
    el("volgendeBtn").classList.add("verborgen");

    const balk = el("balkVulling");
    balk.style.width = `${(state.index / state.vragen.length) * 100}%`;

    const opties = el("opties");
    opties.innerHTML = "";
    v.opties.forEach((optie) => {
      const btn = document.createElement("button");
      btn.className = "optie";
      btn.textContent = optie;
      btn.addEventListener("click", () => kiesAntwoord(optie, btn));
      opties.appendChild(btn);
    });
  }

  function kiesAntwoord(gekozen, btn) {
    if (state.beantwoord) return;
    state.beantwoord = true;

    const v = state.vragen[state.index];
    const knoppen = [...el("opties").querySelectorAll(".optie")];
    knoppen.forEach((b) => (b.disabled = true));

    if (gekozen === v.juist) {
      state.goed++;
      btn.classList.add("goed");
      el("feedback").textContent = "✅ Correct!";
      el("feedback").classList.add("goed");
    } else {
      state.fout++;
      btn.classList.add("fout");
      // Toon welk antwoord wél goed was.
      knoppen.forEach((b) => {
        if (b.textContent === v.juist) b.classList.add("goed");
      });
      el("feedback").textContent = `❌ Fout. Het juiste antwoord is: ${v.juist}`;
      el("feedback").classList.add("fout");
    }

    el("score").textContent = `Goed: ${state.goed}  ·  Fout: ${state.fout}`;
    el("volgendeBtn").classList.remove("verborgen");
    el("volgendeBtn").textContent =
      state.index + 1 < state.vragen.length ? "Volgende vraag →" : "Bekijk resultaat →";
  }

  function volgende() {
    if (!state.beantwoord) return;
    state.index++;
    if (state.index < state.vragen.length) {
      toonVraag();
    } else {
      toonResultaat();
    }
  }

  function toonResultaat() {
    el("vraagKaart").classList.add("verborgen");
    el("resultaat").classList.remove("verborgen");

    const totaal = state.vragen.length;
    const pct = Math.round((state.goed / totaal) * 100);
    el("eindScore").textContent = `${state.goed} / ${totaal} goed (${pct}%)`;

    let bericht;
    if (state.fout === 0) bericht = "🏆 Foutloos! Perfecte ronde.";
    else if (pct >= 80) bericht = "💪 Sterk gedaan!";
    else if (pct >= 50) bericht = "👍 Redelijk — nog even oefenen.";
    else bericht = "📚 Blijf oefenen, je komt er wel!";
    el("eindBericht").textContent = bericht;
  }

  document.addEventListener("DOMContentLoaded", () => {
    el("startBtn").addEventListener("click", startRonde);
    el("volgendeBtn").addEventListener("click", volgende);
    el("opnieuwBtn").addEventListener("click", startRonde);
  });
})();
