// ---------------------------------------------------------------------------
// Comparativas antes/después por categoría de tratamiento (fotos reales de
// la clínica, recortadas de los posteos sin los textos sobreimpresos).
// La clave es el slug de la categoría en src/data/treatments.js.
// ---------------------------------------------------------------------------
import labiosAntes from "../assets/before-after/labios-antes.webp";
import labiosDespues from "../assets/before-after/labios-despues.webp";
import toxinaAntes from "../assets/before-after/toxina-antes.webp";
import toxinaDespues from "../assets/before-after/toxina-despues.webp";
import hifuCelulitisAntes from "../assets/before-after/hifu-celulitis-antes.webp";
import hifuCelulitisDespues from "../assets/before-after/hifu-celulitis-despues.webp";
import hifuCorporalAntes from "../assets/before-after/hifu-corporal-antes.webp";
import hifuCorporalDespues from "../assets/before-after/hifu-corporal-despues.webp";

export const beforeAfter = {
  "estetica-facial": [
    {
      label: "Labios",
      alt: "Hidratación de labios — antes y después",
      before: labiosAntes,
      after: labiosDespues,
    },
    {
      label: "Toxina botulínica",
      alt: "Toxina botulínica en frente — antes y después",
      before: toxinaAntes,
      after: toxinaDespues,
    },
  ],
  corporales: [
    {
      label: "HIFU · Celulitis",
      alt: "HIFU corporal para celulitis — antes y después (1 sesión)",
      before: hifuCelulitisAntes,
      after: hifuCelulitisDespues,
    },
    {
      label: "HIFU corporal",
      alt: "HIFU corporal — antes y después",
      before: hifuCorporalAntes,
      after: hifuCorporalDespues,
    },
  ],
};
