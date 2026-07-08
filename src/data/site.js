// ---------------------------------------------------------------------------
// Datos editables del sitio. Reemplazá los placeholders [ ... ] por datos reales.
// No se inventan matrículas, direcciones ni nombres profesionales.
// ---------------------------------------------------------------------------

export const site = {
  name: "Dermafisherton",
  city: "Fisherton",
  // Cambiá el número (formato internacional sin +, ni espacios) por el real.
  whatsappNumber: "5493410000000", // [WhatsApp]
  instagram: "https://instagram.com/dermafisherton", // [Instagram]
  instagramHandle: "@dermafisherton",
  address: "[Dirección exacta], Fisherton, Rosario", // [Dirección]
  hours: [
    { day: "Lunes a viernes", value: "[09:00 – 19:00]" },
    { day: "Sábados", value: "[09:00 – 13:00]" },
    { day: "Domingos", value: "Cerrado" },
  ],
  // Reemplazá por el embed real de Google Maps (o dejá para integrar).
  mapsEmbed: "",
  mapsLink: "https://maps.google.com/?q=Fisherton+Rosario",
};

// Mensaje base para WhatsApp
export function waLink(message) {
  const base = `https://wa.me/${site.whatsappNumber}`;
  const text = message || "Hola, quisiera coordinar una evaluación.";
  return `${base}?text=${encodeURIComponent(text)}`;
}
