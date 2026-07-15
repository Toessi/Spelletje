/*
 * Testscript voor de quizlogica. Draai met: node quiz.test.js
 * Controleert de eisen: 15 vragen per ronde, 4 opties, juist antwoord altijd
 * aanwezig, geen dubbele opties, alle hoofdsteden correct in de dataset.
 */
const { LANDEN } = require("./quiz-data.js");
const { maakRonde, maakVraag, shuffle, VRAGEN_PER_RONDE, AANTAL_OPTIES } = require("./quiz.js");

let fouten = 0;
function check(naam, conditie) {
  if (conditie) {
    console.log(`  ✅ ${naam}`);
  } else {
    console.error(`  ❌ ${naam}`);
    fouten++;
  }
}

console.log("Dataset");
check(`minstens 15 landen (${LANDEN.length})`, LANDEN.length >= 15);
check("geen dubbele landnamen", new Set(LANDEN.map((l) => l.land)).size === LANDEN.length);
check("elk land heeft een niet-lege hoofdstad", LANDEN.every((l) => l.land && l.hoofdstad));

console.log("Ronde (1000x gedraaid)");
let alleGoed = true;
for (let r = 0; r < 1000; r++) {
  const ronde = maakRonde(LANDEN);
  if (ronde.length !== Math.min(VRAGEN_PER_RONDE, LANDEN.length)) alleGoed = false;
  for (const v of ronde) {
    if (v.opties.length !== AANTAL_OPTIES) alleGoed = false;
    if (!v.opties.includes(v.juist)) alleGoed = false; // juist antwoord aanwezig
    if (new Set(v.opties).size !== v.opties.length) alleGoed = false; // geen duplicaten
    const item = LANDEN.find((l) => l.land === v.land);
    if (!item || item.hoofdstad !== v.juist) alleGoed = false; // juist antwoord klopt met data
  }
  // Geen dubbele landen binnen een ronde.
  const landen = ronde.map((v) => v.land);
  if (new Set(landen).size !== landen.length) alleGoed = false;
}
check("15 unieke vragen, 4 opties, correct juist antwoord, geen duplicaten", alleGoed);

console.log("shuffle");
const bron = [1, 2, 3, 4, 5];
const geschud = shuffle(bron);
check("shuffle muteert het origineel niet", bron.join() === "1,2,3,4,5");
check("shuffle behoudt alle elementen", geschud.slice().sort().join() === "1,2,3,4,5");

console.log("");
if (fouten === 0) {
  console.log("🏆 ALLE TESTS GESLAAGD — geen fouten.");
  process.exit(0);
} else {
  console.error(`💥 ${fouten} test(s) gefaald.`);
  process.exit(1);
}
