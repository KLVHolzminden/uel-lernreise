import { Chapter, Course, DimensionId, DimensionScores, Scene } from "@/lib/types";

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const germanDisplayReplacements: Array<[string | RegExp, string]> = [
  ["\u00c3\u0192\u00c6\u2019\u00c3\u00a2\u00e2\u201a\u00ac\u00c5\u00be", "Ä"],
  ["\u00c3\u0192\u00c6\u2019\u00c3\u00a2\u00e2\u201a\u00ac\u00e2\u20ac\u0153", "Ö"],
  ["\u00c3\u0192\u00c6\u2019\u00c3\u2026\u00e2\u20ac\u0153", "Ü"],
  ["\u00c3\u0192\u00c6\u2019\u00c3\u201a\u00c2\u00a4", "ä"],
  ["\u00c3\u0192\u00c6\u2019\u00c3\u201a\u00c2\u00b6", "ö"],
  ["\u00c3\u0192\u00c6\u2019\u00c3\u201a\u00c2\u00bc", "ü"],
  ["\u00c3\u0192\u00c6\u2019\u00c3\u2026\u00c2\u00b8", "ß"],
  ["\u00c3\u0192\u00e2\u20ac\u017e", "Ä"],
  ["\u00c3\u0192\u00e2\u20ac\u201c", "Ö"],
  ["\u00c3\u0192\u00c5\u201c", "Ü"],
  ["\u00c3\u0192\u00c2\u00a4", "ä"],
  ["\u00c3\u0192\u00c2\u00b6", "ö"],
  ["\u00c3\u0192\u00c2\u00bc", "ü"],
  ["\u00c3\u0192\u00c5\u00b8", "ß"],
  ["\u00c3\u201e", "Ä"],
  ["\u00c3\u2013", "Ö"],
  ["\u00c3\u0152", "Ü"],
  ["\u00c3\u00a4", "ä"],
  ["\u00c3\u00b6", "ö"],
  ["\u00c3\u00bc", "ü"],
  ["\u00c3\u0178", "ß"],
  ["\u00e2\u20ac\u201c", "–"],
  ["\u00e2\u20ac\u201e", "„"],
  ["\u00e2\u20ac\u0153", "“"],
  ["\u00e2\u20ac\u009d", "“"],
  ["\u00c2", ""],
  [/\bUeL\b/g, "ÜL"],
  [/UeL-/g, "ÜL-"],
  [/Uebungs/g, "Übungs"],
  [/Uebung/g, "Übung"],
  [/Ueber/g, "Über"],
  [/ueber/g, "über"],
  [/Fuer/g, "Für"],
  [/fuer/g, "für"],
  [/Atmosphaere/g, "Atmosphäre"],
  [/atmosphaere/g, "atmosphäre"],
  [/Wertschaetzung/g, "Wertschätzung"],
  [/Wertschaetz/g, "Wertschätz"],
  [/wertschaetz/g, "wertschätz"],
  [/Staerk/g, "Stärk"],
  [/staerk/g, "stärk"],
  [/Traegt/g, "Trägt"],
  [/traegt/g, "trägt"],
  [/Haelt/g, "Hält"],
  [/haelt/g, "hält"],
  [/Zaehlt/g, "Zählt"],
  [/zaehlt/g, "zählt"],
  [/Waehrend/g, "Während"],
  [/waehrend/g, "während"],
  [/Waehl/g, "Wähl"],
  [/waehl/g, "wähl"],
  [/Moechte/g, "Möchte"],
  [/moechte/g, "möchte"],
  [/Moeglich/g, "Möglich"],
  [/moeglich/g, "möglich"],
  [/Koennen/g, "Können"],
  [/koennen/g, "können"],
  [/Koennte/g, "Könnte"],
  [/koennte/g, "könnte"],
  [/Koennt/g, "Könnt"],
  [/koennt/g, "könnt"],
  [/Rueck/g, "Rück"],
  [/rueck/g, "rück"],
  [/Zurueck/g, "Zurück"],
  [/zurueck/g, "zurück"],
  [/Naechst/g, "Nächst"],
  [/naechst/g, "nächst"],
  [/Spaeter/g, "Später"],
  [/spaeter/g, "später"],
  [/Frueh/g, "Früh"],
  [/frueh/g, "früh"],
  [/Laesst/g, "Lässt"],
  [/laesst/g, "lässt"],
  [/Loesen/g, "Lösen"],
  [/loesen/g, "lösen"],
  [/Loest/g, "Löst"],
  [/loest/g, "löst"],
  [/Erklaer/g, "Erklär"],
  [/erklaer/g, "erklär"],
  [/Gehoert/g, "Gehört"],
  [/gehoert/g, "gehört"],
  [/Zuhoer/g, "Zuhör"],
  [/zuhoer/g, "zuhör"],
  [/Koerper/g, "Körper"],
  [/koerper/g, "körper"],
  [/Ueben/g, "Üben"],
  [/ueben/g, "üben"],
  [/Uebt/g, "Übt"],
  [/uebt/g, "übt"],
  [/Uebernehm/g, "Übernehm"],
  [/uebernehm/g, "übernehm"],
  [/Ueberschaubar/g, "Überschaubar"],
  [/ueberschaubar/g, "überschaubar"],
  [/Ueberfordert/g, "Überfordert"],
  [/ueberfordert/g, "überfordert"],
  [/Ueberdreht/g, "Überdreht"],
  [/ueberdreht/g, "überdreht"],
  [/Ausfuehr/g, "Ausführ"],
  [/ausfuehr/g, "ausführ"],
  [/Foerder/g, "Förder"],
  [/foerder/g, "förder"],
  [/anschliesst/g, "anschließt"],
  [/anschliess/g, "anschließ"],
  [/Schwaech/g, "Schwäch"],
  [/schwaech/g, "schwäch"],
  [/Praezis/g, "Präzis"],
  [/praezis/g, "präzis"],
  [/Vollstaendig/g, "Vollständig"],
  [/vollstaendig/g, "vollständig"],
  [/Veraender/g, "Veränder"],
  [/veraender/g, "veränder"],
  [/Tragfaehig/g, "Tragfähig"],
  [/tragfaehig/g, "tragfähig"],
  [/Beduerf/g, "Bedürf"],
  [/beduerf/g, "bedürf"],
  [/Gefuehl/g, "Gefühl"],
  [/gefuehl/g, "gefühl"],
  [/Zugehoer/g, "Zugehör"],
  [/zugehoer/g, "zugehör"],
  [/Uebersetz/g, "Übersetz"],
  [/uebersetz/g, "übersetz"],
  [/Eroeffn/g, "Eröffn"],
  [/eroeffn/g, "eröffn"],
  [/Oeffne/g, "Öffne"],
  [/oeffne/g, "öffne"],
  [/Duerf/g, "Dürf"],
  [/duerf/g, "dürf"],
  [/Haeufig/g, "Häufig"],
  [/haeufig/g, "häufig"],
  [/Mued/g, "Müd"],
  [/mued/g, "müd"],
  [/Ballgroesse/g, "Ballgröße"],
  [/Geraet/g, "Gerät"],
  [/geraet/g, "gerät"],
  [/Verlaesslich/g, "Verlässlich"],
  [/verlaesslich/g, "verlässlich"],
  [/Blossstell/g, "Bloßstell"],
  [/blossstell/g, "bloßstell"],
  [/Spass/g, "Spaß"],
  [/spass/g, "spaß"],
  [/Gross/g, "Groß"],
  [/gross/g, "groß"],
  [/Unterstuetz/g, "Unterstütz"],
  [/unterstuetz/g, "unterstütz"],
  [/Verstaend/g, "Verständ"],
  [/verstaend/g, "verständ"],
  [/Zusaetz/g, "Zusätz"],
  [/zusaetz/g, "zusätz"],
  [/Abhaeng/g, "Abhäng"],
  [/abhaeng/g, "abhäng"],
  [/Laeuft/g, "Läuft"],
  [/laeuft/g, "läuft"],
  [/Beschaedig/g, "Beschädig"],
  [/beschaedig/g, "beschädig"],
  [/Qualitaet/g, "Qualität"],
  [/qualitaet/g, "qualität"],
  [/Pruef/g, "Prüf"],
  [/pruef/g, "prüf"],
  [/Waere/g, "Wäre"],
  [/waere/g, "wäre"],
  [/Waehle/g, "Wähle"],
  [/waehle/g, "wähle"],
  [/Zugaeng/g, "Zugäng"],
  [/zugaeng/g, "zugäng"],
  [/Einschaetz/g, "Einschätz"],
  [/einschaetz/g, "einschätz"],
  [/Gespraech/g, "Gespräch"],
  [/gespraech/g, "gespräch"],
  [/Begruess/g, "Begrüß"],
  [/begruess/g, "begrüß"],
  [/Regelmaessig/g, "Regelmäßig"],
  [/regelmaessig/g, "regelmäßig"],
  [/Vielfaeltig/g, "Vielfältig"],
  [/vielfaeltig/g, "vielfältig"],
  [/Anlaess/g, "Anläss"],
  [/anlaess/g, "anläss"],
  [/Ergaenz/g, "Ergänz"],
  [/ergaenz/g, "ergänz"],
  [/Klaer/g, "Klär"],
  [/klaer/g, "klär"],
  [/Fuellen/g, "Füllen"],
  [/fuellen/g, "füllen"],
  [/Bereithaelt/g, "Bereithält"],
  [/bereithaelt/g, "bereithält"],
  [/Aufwaerm/g, "Aufwärm"],
  [/aufwaerm/g, "aufwärm"],
  [/Sicherheitsrueck/g, "Sicherheitsrück"],
  [/rueckmeld/g, "rückmeld"],
  [/Rueckmeld/g, "Rückmeld"],
  [/schluesse/g, "schlüsse"],
  [/Schluesse/g, "Schlüsse"],
  [/waechst/g, "wächst"],
  [/Waechst/g, "Wächst"],
  [/kuerz/g, "kürz"],
  [/Kuerz/g, "Kürz"],
  [/fuenf/g, "fünf"],
  [/Fuenf/g, "Fünf"],
  [/Intensitaet/g, "Intensität"],
  [/intensitaet/g, "intensität"],
  [/Komplexitaet/g, "Komplexität"],
  [/komplexitaet/g, "komplexität"],
  [/Stabilitaet/g, "Stabilität"],
  [/stabilitaet/g, "stabilität"],
  [/Haerte/g, "Härte"],
  [/haerte/g, "härte"],
  [/Aussen/g, "Außen"],
  [/aussen/g, "außen"],
  [/Missverstaend/g, "Missverständ"],
  [/missverstaend/g, "missverständ"],
  [/Loesung/g, "Lösung"],
  [/loesung/g, "lösung"],
  [/Loesungen/g, "Lösungen"],
  [/loesungen/g, "lösungen"],
  [/loesbar/g, "lösbar"],
  [/Loesbar/g, "Lösbar"],
  [/Aender/g, "Änder"],
  [/aender/g, "änder"],
  [/Souveraen/g, "Souverän"],
  [/souveraen/g, "souverän"],
  [/Abstaend/g, "Abständ"],
  [/abstaend/g, "abständ"],
  [/Wuensch/g, "Wünsch"],
  [/wuensch/g, "wünsch"],
  [/Fuehr/g, "Führ"],
  [/fuehr/g, "führ"],
  [/haeng/g, "häng"],
  [/Haeng/g, "Häng"],
  [/ursprueng/g, "ursprüng"],
  [/Ursprueng/g, "Ursprüng"],
  [/unnoetig/g, "unnötig"],
  [/Unnoetig/g, "Unnötig"],
  [/Schmuckwaechter/g, "Schmuckwächter"],
  [/schmuckwaechter/g, "Schmuckwächter"],
  [/waechter/g, "wächter"],
  [/Waechter/g, "Wächter"],
  [/Ermoeg/g, "Ermög"],
  [/ermoeg/g, "ermög"],
  [/Flexibilitaet/g, "Flexibilität"],
  [/flexibilitaet/g, "flexibilität"],
  [/Fuehl/g, "Fühl"],
  [/fuehl/g, "fühl"],
  [/Gruend/g, "Gründ"],
  [/gruend/g, "gründ"],
  [/Heiss/g, "Heiß"],
  [/heiss/g, "heiß"],
  [/Bestaet/g, "Bestät"],
  [/bestaet/g, "bestät"],
  [/Raeum/g, "Räum"],
  [/raeum/g, "räum"],
  [/Darueber/g, "Darüber"],
  [/darueber/g, "darüber"],
  [/Erhoeh/g, "Erhöh"],
  [/erhoeh/g, "erhöh"],
  [/Huerd/g, "Hürd"],
  [/huerd/g, "hürd"],
  [/Muess/g, "Müss"],
  [/muess/g, "müss"],
  [/Spuer/g, "Spür"],
  [/spuer/g, "spür"],
  [/Zunaech/g, "Zunäch"],
  [/zunaech/g, "zunäch"],
  [/Schaer/g, "Schär"],
  [/schaer/g, "schär"],
  [/Stuetz/g, "Stütz"],
  [/stuetz/g, "stütz"],
  [/Verknuepf/g, "Verknüpf"],
  [/verknuepf/g, "verknüpf"],
  [/Wuerdig/g, "Würdig"],
  [/wuerdig/g, "würdig"],
  [/Laeng/g, "Läng"],
  [/laeng/g, "läng"],
  [/Leistungsstaerk/g, "Leistungsstärk"],
  [/leistungsstaerk/g, "leistungsstärk"],
  [/Lernfoerder/g, "Lernförder"],
  [/lernfoerder/g, "lernförder"],
  [/Unveraend/g, "Unveränd"],
  [/unveraend/g, "unveränd"],
  [/Augenhoeh/g, "Augenhöh"],
  [/augenhoeh/g, "augenhöh"],
  [/Aushaeng/g, "Aushäng"],
  [/aushaeng/g, "aushäng"],
  [/Persoen/g, "Persön"],
  [/persoen/g, "persön"],
  [/Praeg/g, "Präg"],
  [/praeg/g, "präg"],
  [/Regulaer/g, "Regulär"],
  [/regulaer/g, "regulär"],
  [/Verfueg/g, "Verfüg"],
  [/verfueg/g, "verfüg"],
  [/Gehoer/g, "Gehör"],
  [/gehoer/g, "gehör"],
  [/Geloest/g, "Gelöst"],
  [/geloest/g, "gelöst"],
  [/Glaubwuerd/g, "Glaubwürd"],
  [/glaubwuerd/g, "glaubwürd"],
  [/Groess/g, "Größ"],
  [/groess/g, "größ"],
  [/Handlungsfaeh/g, "Handlungsfäh"],
  [/handlungsfaeh/g, "handlungsfäh"],
  [/Leitsaetz/g, "Leitsätz"],
  [/leitsaetz/g, "leitsätz"],
  [/Unuebersicht/g, "Unübersicht"],
  [/unuebersicht/g, "unübersicht"],
  [/Zielgruppennaeh/g, "Zielgruppennäh"],
  [/zielgruppennaeh/g, "zielgruppennäh"],
  [/Worueber/g, "Worüber"],
  [/worueber/g, "worüber"],
];

export function toGermanDisplayText(text: string | null | undefined) {
  if (!text) return "";

  return germanDisplayReplacements.reduce((current, [search, replacement]) => {
    if (search instanceof RegExp) {
      return current.replace(search, replacement);
    }

    return current.replaceAll(search, replacement);
  }, text);
}

export function formatReflectionLabel(label: string) {
  return toGermanDisplayText(label.replaceAll("_", " ").replaceAll("-", " "));
}

export function flattenScenes(course: Course): Scene[] {
  return course.chapters.flatMap((chapter) => chapter.scenes);
}

export function getSceneIndex(course: Course, sceneId: string | null) {
  const scenes = flattenScenes(course);
  return scenes.findIndex((scene) => scene.id === sceneId);
}

export function getChapterForScene(course: Course, sceneId: string | null) {
  return course.chapters.find((chapter) =>
    chapter.scenes.some((scene) => scene.id === sceneId),
  );
}

export function countChapterCompletion(chapter: Chapter, completedSceneIds: string[]) {
  const relevantSceneIds = chapter.scenes.some((scene) => !scene.optional)
    ? chapter.scenes.filter((scene) => !scene.optional).map((scene) => scene.id)
    : chapter.scenes.map((scene) => scene.id);
  const completed = relevantSceneIds.filter((id) => completedSceneIds.includes(id)).length;
  return {
    completed,
    total: relevantSceneIds.length,
    ratio: relevantSceneIds.length ? completed / relevantSceneIds.length : 0,
  };
}

function createEmptyScore(): DimensionScores {
  return {
    lachen: { points: 0, maxPoints: 100, completed: 0, total: 100, ratio: 0 },
    lernen: { points: 0, maxPoints: 100, completed: 0, total: 100, ratio: 0 },
    leisten: { points: 0, maxPoints: 100, completed: 0, total: 100, ratio: 0 },
  };
}

export function getDimensionScores(course: Course, completedSceneIds: string[]): DimensionScores {
  const scores = createEmptyScore();

  flattenScenes(course).forEach((scene) => {
    if (!scene.primaryDimension || !scene.points) return;
    const key = scene.primaryDimension;

    if (completedSceneIds.includes(scene.id)) {
      scores[key].completed += scene.points;
      scores[key].points += scene.points;
    }
  });

  (Object.keys(scores) as DimensionId[]).forEach((dimension) => {
    scores[dimension].completed = Math.min(100, scores[dimension].completed);
    scores[dimension].points = Math.min(scores[dimension].maxPoints, scores[dimension].points);
    scores[dimension].ratio = scores[dimension].completed / scores[dimension].total;
  });

  return scores;
}

export function summarizeProfile(scores: DimensionScores) {
  const sorted = (Object.entries(scores) as Array<[DimensionId, DimensionScores[DimensionId]]>).sort(
    (a, b) => b[1].completed - a[1].completed,
  );
  const strongest = sorted[0]?.[0] ?? "lernen";
  const growth = sorted[sorted.length - 1]?.[0] ?? "leisten";

  const profileMap: Record<DimensionId, string> = {
    lachen: "Du stärkst Atmosphäre, Beziehung und Motivation spürbar.",
    lernen: "Du gestaltest Lernprozesse klar, nachvollziehbar und reflexiv.",
    leisten: "Du steuerst Anforderung, Differenzierung und Erfolgserlebnisse sicher.",
  };

  const growthMap: Record<DimensionId, string> = {
    lachen: "Noch mehr Wirkung entsteht, wenn du Einstiege und Beteiligung bewusster planst.",
    lernen: "Noch mehr Wirkung entsteht, wenn du Feedback und Reflexion konsequenter einbaust.",
    leisten:
      "Noch mehr Wirkung entsteht, wenn du Belastung und Steigerung noch gezielter differenzierst.",
  };

  return `${profileMap[strongest]} ${growthMap[growth]}`;
}

export function getDimensionLabel(dimension: DimensionId) {
  const labels: Record<DimensionId, string> = {
    lachen: "Lachen",
    lernen: "Lernen",
    leisten: "Leisten",
  };

  return labels[dimension];
}

export function getAward(scores: DimensionScores, threshold: number) {
  const values = Object.values(scores).map((entry) => entry.completed);

  if (values.every((value) => value >= 90)) {
    return "Reflexionsprofi";
  }

  if (values.every((value) => value >= 75)) {
    return "Starkes ÜL-Profil";
  }

  if (values.every((value) => value >= threshold)) {
    return "ÜL-Kompass aktiviert";
  }

  return null;
}


