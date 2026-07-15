/*
 * Dataset voor het topografiespel: land -> hoofdstad.
 * Alleen Europese landen. Nederlandse landnamen, met een onbetwiste hoofdstad.
 */
const LANDEN = [
  // West-Europa
  { land: "Nederland", hoofdstad: "Amsterdam", continent: "Europa" },
  { land: "België", hoofdstad: "Brussel", continent: "Europa" },
  { land: "Luxemburg", hoofdstad: "Luxemburg", continent: "Europa" },
  { land: "Duitsland", hoofdstad: "Berlijn", continent: "Europa" },
  { land: "Frankrijk", hoofdstad: "Parijs", continent: "Europa" },
  { land: "Verenigd Koninkrijk", hoofdstad: "Londen", continent: "Europa" },
  { land: "Ierland", hoofdstad: "Dublin", continent: "Europa" },
  { land: "Monaco", hoofdstad: "Monaco", continent: "Europa" },

  // Zuid-Europa
  { land: "Spanje", hoofdstad: "Madrid", continent: "Europa" },
  { land: "Portugal", hoofdstad: "Lissabon", continent: "Europa" },
  { land: "Italië", hoofdstad: "Rome", continent: "Europa" },
  { land: "Griekenland", hoofdstad: "Athene", continent: "Europa" },
  { land: "Malta", hoofdstad: "Valletta", continent: "Europa" },
  { land: "Cyprus", hoofdstad: "Nicosia", continent: "Europa" },
  { land: "Andorra", hoofdstad: "Andorra la Vella", continent: "Europa" },
  { land: "San Marino", hoofdstad: "San Marino", continent: "Europa" },

  // Noord-Europa
  { land: "Denemarken", hoofdstad: "Kopenhagen", continent: "Europa" },
  { land: "Noorwegen", hoofdstad: "Oslo", continent: "Europa" },
  { land: "Zweden", hoofdstad: "Stockholm", continent: "Europa" },
  { land: "Finland", hoofdstad: "Helsinki", continent: "Europa" },
  { land: "IJsland", hoofdstad: "Reykjavik", continent: "Europa" },
  { land: "Estland", hoofdstad: "Tallinn", continent: "Europa" },
  { land: "Letland", hoofdstad: "Riga", continent: "Europa" },
  { land: "Litouwen", hoofdstad: "Vilnius", continent: "Europa" },

  // Centraal-Europa
  { land: "Polen", hoofdstad: "Warschau", continent: "Europa" },
  { land: "Tsjechië", hoofdstad: "Praag", continent: "Europa" },
  { land: "Slowakije", hoofdstad: "Bratislava", continent: "Europa" },
  { land: "Oostenrijk", hoofdstad: "Wenen", continent: "Europa" },
  { land: "Zwitserland", hoofdstad: "Bern", continent: "Europa" },
  { land: "Liechtenstein", hoofdstad: "Vaduz", continent: "Europa" },
  { land: "Hongarije", hoofdstad: "Boedapest", continent: "Europa" },
  { land: "Slovenië", hoofdstad: "Ljubljana", continent: "Europa" },

  // Zuidoost- en Oost-Europa
  { land: "Kroatië", hoofdstad: "Zagreb", continent: "Europa" },
  { land: "Bosnië en Herzegovina", hoofdstad: "Sarajevo", continent: "Europa" },
  { land: "Servië", hoofdstad: "Belgrado", continent: "Europa" },
  { land: "Montenegro", hoofdstad: "Podgorica", continent: "Europa" },
  { land: "Noord-Macedonië", hoofdstad: "Skopje", continent: "Europa" },
  { land: "Albanië", hoofdstad: "Tirana", continent: "Europa" },
  { land: "Roemenië", hoofdstad: "Boekarest", continent: "Europa" },
  { land: "Bulgarije", hoofdstad: "Sofia", continent: "Europa" },
  { land: "Moldavië", hoofdstad: "Chisinau", continent: "Europa" },
  { land: "Oekraïne", hoofdstad: "Kiev", continent: "Europa" },
  { land: "Wit-Rusland", hoofdstad: "Minsk", continent: "Europa" },
  { land: "Rusland", hoofdstad: "Moskou", continent: "Europa" },
];

// Dubbele landnamen eruit filteren (veiligheidsnet).
const _gezien = new Set();
const LANDEN_UNIEK = LANDEN.filter((item) => {
  if (_gezien.has(item.land)) return false;
  _gezien.add(item.land);
  return true;
});

if (typeof module !== "undefined" && module.exports) {
  module.exports = { LANDEN: LANDEN_UNIEK };
} else if (typeof window !== "undefined") {
  // Top-level `const` komt niet automatisch op window; expliciet beschikbaar maken.
  window.LANDEN = LANDEN_UNIEK;
}
