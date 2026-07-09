// ---------------------------------------------------------------------------
// Clips de tratamientos reales (extraídos de los reels de Instagram de la
// clínica, recortados a los tramos sin subtítulos ni efectos). La info de
// cada card proviene de la descripción del reel correspondiente.
// El reel "Láser y luz pulsada" no tenía tramos limpios (título sobreimpreso
// todo el video); su información se integró en la card del láser Harmony.
// ---------------------------------------------------------------------------
import hifuFacial from "../assets/clips/hifu-facial.mp4";
import hifuFacialPoster from "../assets/clips/hifu-facial-poster.webp";
import hifuCorporal from "../assets/clips/hifu-corporal.mp4";
import hifuCorporalPoster from "../assets/clips/hifu-corporal-poster.webp";
import crioRf from "../assets/clips/crio-radiofrecuencia.mp4";
import crioRfPoster from "../assets/clips/crio-radiofrecuencia-poster.webp";
import laserHarmony from "../assets/clips/laser-harmony.mp4";
import laserHarmonyPoster from "../assets/clips/laser-harmony-poster.webp";
import unyqueTensado from "../assets/clips/unyque-tensado.mp4";
import unyqueTensadoPoster from "../assets/clips/unyque-tensado-poster.webp";

export const clips = [
  {
    slug: "hifu-facial",
    title: "HIFU facial",
    tag: "Efecto tensor",
    text: "Calor puntual en la profundidad de la piel, sin dañarla: mejora la textura, reafirma los tejidos y reduce los poros. Sin cirugías ni tiempo de recuperación.",
    video: hifuFacial,
    poster: hifuFacialPoster,
  },
  {
    slug: "hifu-corporal",
    title: "HIFU corporal",
    tag: "Reafirmar y contorno",
    text: "Estimula colágeno y elastina para una piel más firme: ayuda a reducir grasa localizada, mejora la flacidez y el aspecto de la celulitis leve.",
    video: hifuCorporal,
    poster: hifuCorporalPoster,
  },
  {
    slug: "crio-radiofrecuencia",
    title: "UNYQUE · Crio-radiofrecuencia",
    tag: "Textura y firmeza",
    text: "Frío y radiofrecuencia combinados que estimulan colágeno y elastina: mejoran la textura, reducen la flacidez y definen los contornos.",
    video: crioRf,
    poster: crioRfPoster,
  },
  {
    slug: "laser-harmony",
    title: "Láser Harmony y luz pulsada",
    tag: "Tono y luminosidad",
    text: "Mejora el tono, el brillo y la uniformidad de la piel: manchas, cicatrices, arrugas finas y textura, estimulando la producción de colágeno.",
    video: laserHarmony,
    poster: laserHarmonyPoster,
  },
  {
    slug: "unyque-tensado",
    title: "UNYQUE · Tensado y modelado",
    tag: "Facial y corporal",
    text: "Tecnología para el tensado de la piel, arrugas y líneas de expresión; modelado corporal, celulitis y drenaje.",
    video: unyqueTensado,
    poster: unyqueTensadoPoster,
  },
];
