/*
 * Dataset voor het topografiespel: land -> hoofdstad.
 * Nederlandse landnamen. Bewust alleen landen met een onbetwiste hoofdstad
 * (dus geen gevallen als Bolivia of Zuid-Afrika met meerdere zetels).
 */
const LANDEN = [
  // Europa
  { land: "Nederland", hoofdstad: "Amsterdam", continent: "Europa" },
  { land: "België", hoofdstad: "Brussel", continent: "Europa" },
  { land: "Duitsland", hoofdstad: "Berlijn", continent: "Europa" },
  { land: "Frankrijk", hoofdstad: "Parijs", continent: "Europa" },
  { land: "Spanje", hoofdstad: "Madrid", continent: "Europa" },
  { land: "Portugal", hoofdstad: "Lissabon", continent: "Europa" },
  { land: "Italië", hoofdstad: "Rome", continent: "Europa" },
  { land: "Verenigd Koninkrijk", hoofdstad: "Londen", continent: "Europa" },
  { land: "Ierland", hoofdstad: "Dublin", continent: "Europa" },
  { land: "Denemarken", hoofdstad: "Kopenhagen", continent: "Europa" },
  { land: "Noorwegen", hoofdstad: "Oslo", continent: "Europa" },
  { land: "Zweden", hoofdstad: "Stockholm", continent: "Europa" },
  { land: "Finland", hoofdstad: "Helsinki", continent: "Europa" },
  { land: "IJsland", hoofdstad: "Reykjavik", continent: "Europa" },
  { land: "Polen", hoofdstad: "Warschau", continent: "Europa" },
  { land: "Tsjechië", hoofdstad: "Praag", continent: "Europa" },
  { land: "Slowakije", hoofdstad: "Bratislava", continent: "Europa" },
  { land: "Oostenrijk", hoofdstad: "Wenen", continent: "Europa" },
  { land: "Zwitserland", hoofdstad: "Bern", continent: "Europa" },
  { land: "Hongarije", hoofdstad: "Boedapest", continent: "Europa" },
  { land: "Roemenië", hoofdstad: "Boekarest", continent: "Europa" },
  { land: "Bulgarije", hoofdstad: "Sofia", continent: "Europa" },
  { land: "Griekenland", hoofdstad: "Athene", continent: "Europa" },
  { land: "Kroatië", hoofdstad: "Zagreb", continent: "Europa" },
  { land: "Servië", hoofdstad: "Belgrado", continent: "Europa" },
  { land: "Slovenië", hoofdstad: "Ljubljana", continent: "Europa" },
  { land: "Oekraïne", hoofdstad: "Kiev", continent: "Europa" },
  { land: "Rusland", hoofdstad: "Moskou", continent: "Europa" },
  { land: "Polen", hoofdstad: "Warschau", continent: "Europa" },
  { land: "Estland", hoofdstad: "Tallinn", continent: "Europa" },
  { land: "Letland", hoofdstad: "Riga", continent: "Europa" },
  { land: "Litouwen", hoofdstad: "Vilnius", continent: "Europa" },
  { land: "Luxemburg", hoofdstad: "Luxemburg", continent: "Europa" },
  { land: "Albanië", hoofdstad: "Tirana", continent: "Europa" },

  // Azië
  { land: "China", hoofdstad: "Peking", continent: "Azië" },
  { land: "Japan", hoofdstad: "Tokio", continent: "Azië" },
  { land: "Zuid-Korea", hoofdstad: "Seoel", continent: "Azië" },
  { land: "India", hoofdstad: "New Delhi", continent: "Azië" },
  { land: "Indonesië", hoofdstad: "Jakarta", continent: "Azië" },
  { land: "Thailand", hoofdstad: "Bangkok", continent: "Azië" },
  { land: "Vietnam", hoofdstad: "Hanoi", continent: "Azië" },
  { land: "Filipijnen", hoofdstad: "Manila", continent: "Azië" },
  { land: "Maleisië", hoofdstad: "Kuala Lumpur", continent: "Azië" },
  { land: "Turkije", hoofdstad: "Ankara", continent: "Azië" },
  { land: "Iran", hoofdstad: "Teheran", continent: "Azië" },
  { land: "Irak", hoofdstad: "Bagdad", continent: "Azië" },
  { land: "Saoedi-Arabië", hoofdstad: "Riyad", continent: "Azië" },
  { land: "Pakistan", hoofdstad: "Islamabad", continent: "Azië" },
  { land: "Kazachstan", hoofdstad: "Astana", continent: "Azië" },

  // Afrika
  { land: "Egypte", hoofdstad: "Caïro", continent: "Afrika" },
  { land: "Marokko", hoofdstad: "Rabat", continent: "Afrika" },
  { land: "Nigeria", hoofdstad: "Abuja", continent: "Afrika" },
  { land: "Kenia", hoofdstad: "Nairobi", continent: "Afrika" },
  { land: "Ethiopië", hoofdstad: "Addis Abeba", continent: "Afrika" },
  { land: "Ghana", hoofdstad: "Accra", continent: "Afrika" },
  { land: "Algerije", hoofdstad: "Algiers", continent: "Afrika" },
  { land: "Tunesië", hoofdstad: "Tunis", continent: "Afrika" },
  { land: "Senegal", hoofdstad: "Dakar", continent: "Afrika" },

  // Amerika
  { land: "Verenigde Staten", hoofdstad: "Washington D.C.", continent: "Amerika" },
  { land: "Canada", hoofdstad: "Ottawa", continent: "Amerika" },
  { land: "Mexico", hoofdstad: "Mexico-Stad", continent: "Amerika" },
  { land: "Brazilië", hoofdstad: "Brasília", continent: "Amerika" },
  { land: "Argentinië", hoofdstad: "Buenos Aires", continent: "Amerika" },
  { land: "Chili", hoofdstad: "Santiago", continent: "Amerika" },
  { land: "Peru", hoofdstad: "Lima", continent: "Amerika" },
  { land: "Colombia", hoofdstad: "Bogota", continent: "Amerika" },
  { land: "Cuba", hoofdstad: "Havana", continent: "Amerika" },

  // Oceanië
  { land: "Australië", hoofdstad: "Canberra", continent: "Oceanië" },
  { land: "Nieuw-Zeeland", hoofdstad: "Wellington", continent: "Oceanië" },
];

// Dubbele items (bv. Polen dat per ongeluk twee keer staat) eruit filteren.
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
