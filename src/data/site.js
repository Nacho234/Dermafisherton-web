// ---------------------------------------------------------------------------
// Datos editables del sitio. Reemplazá los placeholders [ ... ] por datos reales.
// No se inventan matrículas, direcciones ni nombres profesionales.
// ---------------------------------------------------------------------------

export const site = {
  name: "Dermafisherton",
  city: "Fisherton",
  whatsappNumber: "5493412590703",
  instagram: "https://instagram.com/dermafisherton", // [Instagram]
  instagramHandle: "@dermafisherton",
  address: "Schweitzer 8883 · Portero 4, Fisherton, Rosario",
  hours: [
    { day: "Lunes a viernes", value: "[09:00 – 19:00]" },
    { day: "Sábados", value: "[09:00 – 13:00]" },
    { day: "Domingos", value: "Cerrado" },
  ],
  mapsEmbed:
    "https://www.google.com/maps?q=Schweitzer+8883,+Rosario,+Santa+Fe,+Argentina&output=embed",
  mapsLink: "https://maps.google.com/?q=Schweitzer+8883,+Rosario,+Santa+Fe",
};

// Mensaje base para WhatsApp
export function waLink(message) {
  const base = `https://wa.me/${site.whatsappNumber}`;
  const text = message || "Hola, quisiera coordinar una evaluación.";
  return `${base}?text=${encodeURIComponent(text)}`;
}
