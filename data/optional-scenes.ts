import {
  InteractiveScene,
  MatchingScene,
  OrderingScene,
  ReflectionScene,
  ScenarioScene,
} from "@/lib/types";

export const sceneGruppengefuehl: InteractiveScene = {
  id: "c5-gruppengefuehl",
  type: "interactiveScene",
  eyebrow: "Zusatzaufgabe",
  title: "Gruppengefühl stärken",
  prompt:
    "Erkunde die Szene und achte darauf, wodurch aus mehreren Einzelnen ein Team wird.",
  context:
    "Öffne die markierten Stellen im Bild. Achte besonders darauf, wer welche Rolle übernimmt und wie die Gruppe gemeinsam zum Ziel kommt.",
  coachNote:
    "Gruppengefühl entsteht nicht automatisch dadurch, dass Menschen gleichzeitig Sport machen. Es wird stärker, wenn die Gruppe gemeinsame Ziele erlebt, sich gegenseitig unterstützt und jede Person eine sinnvolle Rolle übernehmen kann.",
  taskTypeLabel: "Interaktive Bildszene",
  primaryDimension: "lachen",
  points: 10,
  optional: true,
  imageSrc: "/images/scenes/szene-gruppengefuehl-hinderniswand.png",
  imageAlt:
    "Eine Gruppe hilft sich gemeinsam über eine Hinderniswand. Eine Person zieht von oben, eine klettert, andere sichern und motivieren.",
  dimension: "lachen",
  requiredHotspots: 3,
  hotspots: [
    {
      id: "gemeinsames-ziel",
      label: "Gemeinsames Ziel",
      x: 47,
      y: 43,
      dimension: "lachen",
      feedbackTitle: "Gemeinsames Ziel",
      feedbackText:
        "Gruppengefühl entsteht leichter, wenn die Aufgabe nicht nur einzeln gelöst wird. Die Mauer wird hier zu einem gemeinsamen Ziel: Die Gruppe erlebt, dass sie gemeinsam weiterkommt.",
      hint:
        "Überlege in deiner Stunde: Gibt es eine Aufgabe, bei der nicht einzelne gewinnen, sondern die Gruppe gemeinsam etwas schafft?",
    },
    {
      id: "hilfe-von-oben",
      label: "Unterstützung von oben",
      x: 53,
      y: 20,
      dimension: "lachen",
      feedbackTitle: "Unterstützung von oben",
      feedbackText:
        "Eine Person übernimmt hier die Rolle, aktiv zu helfen. Sie zieht nicht nur hoch, sondern gibt Sicherheit und zeigt: Du schaffst das nicht allein, aber wir schaffen das zusammen.",
      hint:
        "Lass Teilnehmende bewusst Rollen übernehmen: helfen, sichern, vormachen, ermutigen oder beobachten.",
    },
    {
      id: "hilfe-von-unten",
      label: "Sichern und unterstützen",
      x: 45,
      y: 68,
      dimension: "lernen",
      feedbackTitle: "Sichern und unterstützen",
      feedbackText:
        "Die Unterstützung von unten macht die Aufgabe sicherer und leichter. Wichtig ist: Hilfe muss respektvoll, abgesprochen und eindeutig sein. Die helfende Person unterstützt am Schuh oder unteren Beinbereich und achtet auf Sicherheit.",
      hint:
        "Sprich Hilfestellungen klar ab: Wo darf geholfen werden? Was ist sicher? Was fühlt sich für die Person passend an?",
    },
    {
      id: "alle-beteiligt",
      label: "Alle bleiben beteiligt",
      x: 79,
      y: 56,
      dimension: "lachen",
      feedbackTitle: "Alle bleiben beteiligt",
      feedbackText:
        "Auch wer gerade nicht klettert, kann Teil der Aufgabe sein: anfeuern, sichern, beobachten oder als Nächste*r bereitstehen. So entsteht Gruppengefühl nicht nur durch die Hauptaktion, sondern durch Beteiligung aller.",
      hint:
        "Gib Wartenden eine Aufgabe, damit sie nicht nur herumstehen: zählen, sichern, motivieren, beobachten oder Material vorbereiten.",
    },
  ],
  followUp: {
    type: "quiz",
    prompt: "Was stärkt in dieser Szene das Gruppengefühl am meisten?",
    options: [
      {
        id: "a",
        label: "Dass eine einzelne Person besonders schnell über die Mauer kommt.",
        insight:
          "Nicht ganz. Eine starke Einzelleistung kann beeindruckend sein, stärkt aber noch nicht automatisch das Gruppengefühl. Entscheidend ist hier, dass mehrere Personen gemeinsam zum Gelingen beitragen. Übertrage die Szene auf deine Sportstunde: Welche kleine Aufgabe könnte ein gemeinsames Ziel und Rollen für alle enthalten?",
      },
      {
        id: "b",
        label:
          "Dass die Gruppe ein gemeinsames Ziel hat und verschiedene Personen hilfreiche Rollen übernehmen.",
        insight:
          "Passend. Gruppengefühl entsteht hier, weil die Aufgabe nur gemeinsam gut gelingt: Eine Person zieht, eine unterstützt von unten, andere sichern, warten aufmerksam oder motivieren. Übertrage die Szene auf deine Sportstunde: Welche kleine Aufgabe könnte ein gemeinsames Ziel und Rollen für alle enthalten?",
        isBest: true,
      },
      {
        id: "c",
        label: "Dass alle warten, bis sie selbst an der Reihe sind.",
        insight:
          "Nicht ganz. Warten allein stärkt noch kein Gruppengefühl. Hilfreich wird es, wenn Wartende eine aktive Rolle bekommen: sichern, anfeuern, beobachten oder vorbereiten. Übertrage die Szene auf deine Sportstunde: Welche kleine Aufgabe könnte ein gemeinsames Ziel und Rollen für alle enthalten?",
      },
    ],
  },
  estimatedMinutes: 3,
};

export const sceneEigeneRolle: ReflectionScene = {
  id: "c5-rolle",
  type: "reflection",
  eyebrow: "Zusatzaufgabe",
  title: "Eigene UeL-Rolle reflektieren",
  prompt:
    "Denk an eine Uebungsleitung, bei der du selbst gern teilgenommen hast. Was hat diese Person ausgezeichnet?",
  context:
    "Es gibt nicht die eine perfekte UeL-Rolle. Die eigene Rolle entsteht durch Erfahrung, Reflexion und Weiterentwicklung.",
  taskTypeLabel: "Reflexion mit Texteingabe",
  primaryDimension: "lernen",
  points: 10,
  optional: true,
  prompts: [
    {
      id: "rolle-staerke",
      label: "Das moechte ich von dieser Person mitnehmen",
      placeholder: "Zum Beispiel: Ruhe, Klarheit, Humor, Aktivierung, Genauigkeit ...",
    },
    {
      id: "rolle-naechster-schritt",
      label: "Daran moechte ich bei mir selbst arbeiten",
      placeholder:
        "Zum Beispiel: verstaendlicher erklaeren, mehr Beteiligung zulassen, flexibler reagieren ...",
    },
  ],
  estimatedMinutes: 4,
};

export const sceneChallengeLevel: OrderingScene = {
  id: "c5-challenge",
  type: "ordering",
  eyebrow: "Zusatzaufgabe",
  title: "Challenge-Level entwickeln",
  prompt:
    "Bringe die Planungsschritte in eine sinnvolle Reihenfolge, damit Fortgeschrittene zusaetzliche Herausforderungen bekommen, ohne andere abzuhaengen.",
  context: "Wie entsteht ein gutes Zusatzniveau?",
  taskTypeLabel: "Reihenfolge-/Sortieraufgabe",
  primaryDimension: "leisten",
  points: 10,
  optional: true,
  steps: [
    { id: "basis", label: "Eine sichere Grundaufgabe fuer alle festlegen" },
    { id: "kriterium", label: "Erkennen, wann jemand die Grundaufgabe stabil beherrscht" },
    { id: "erweitern", label: "Eine passende Zusatzherausforderung anbieten" },
    { id: "rueckweg", label: "Jederzeit eine Rueckkehr zur Grundaufgabe ermoeglichen" },
  ],
  correctOrder: ["basis", "kriterium", "erweitern", "rueckweg"],
  feedback: {
    success:
      "Stimmig. Ein gutes Challenge-Level baut auf einer sicheren Basis auf und laesst den Wechsel zwischen Niveaus zu.",
    gentle:
      "Hilfreich ist meist: Grundaufgabe sichern, Stabilitaet erkennen, Zusatzherausforderung anbieten und Rueckkehr offenhalten.",
  },
  estimatedMinutes: 3,
};

export const sceneHumor: ScenarioScene = {
  id: "c5-humor",
  type: "scenario",
  eyebrow: "Zusatzaufgabe",
  title: "Humor passend einsetzen",
  prompt:
    "Eine Uebung laeuft holprig an. Die Gruppe lacht schon ueber kleine Missgeschicke. Du moechtest die Situation auflockern, ohne jemanden blosszustellen.",
  context: "Welche Reaktion passt?",
  taskTypeLabel: "Szenario mit Entscheidung",
  primaryDimension: "lachen",
  points: 10,
  optional: true,
  options: [
    {
      id: "a",
      label: "Ich mache eine spitze Bemerkung ueber die ungeschickteste Bewegung der Runde.",
      insight:
        "Kurz witzig vielleicht, aber auf Kosten einzelner Personen. Das kann Vertrauen beschaedigen.",
    },
    {
      id: "c",
      label: "Ich gehe gar nicht darauf ein, damit die Gruppe sofort wieder ernst wird.",
      insight:
        "Manchmal sinnvoll, hier aber wahrscheinlich eine verpasste Chance auf Entlastung und Verbindung.",
    },
    {
      id: "b",
      label:
        "Ich nehme die Situation mit einem freundlichen, gemeinsamen Kommentar auf und starte einen neuen Versuch.",
      insight:
        "Stark. So entsteht Leichtigkeit, ohne jemanden blosszustellen.",
      isBest: true,
    },
  ],
  estimatedMinutes: 3,
};

export const scenePerspektivwechsel: MatchingScene = {
  id: "c5-perspektive",
  type: "matching",
  eyebrow: "Zusatzaufgabe",
  title: "Perspektivwechsel einbauen",
  prompt:
    "Ordne jede Beobachtung der Perspektive zu, aus der sie besonders gut verstanden werden kann.",
  context: "So trainierst du den Blickwechsel in der Planung.",
  taskTypeLabel: "Zuordnungsaufgabe",
  primaryDimension: "lernen",
  points: 10,
  optional: true,
  pairs: [
    {
      id: "teilnehmende",
      label: "Eine Uebung ist fachlich gut, wirkt fuer Einsteiger*innen aber unuebersichtlich.",
    },
    {
      id: "verein",
      label: "Die Stunde soll zur Kultur des Vereins passen und zugleich offen fuer neue Ideen sein.",
    },
    {
      id: "eltern",
      label: "Kinder berichten zuhause, ob sie sich sicher und gesehen gefuehlt haben.",
    },
  ],
  targets: [
    { id: "gruppe", label: "Sicht der Teilnehmenden" },
    { id: "organisation", label: "Sicht des Vereins" },
    { id: "umfeld", label: "Sicht des Umfelds" },
  ],
  answers: {
    teilnehmende: "gruppe",
    verein: "organisation",
    eltern: "umfeld",
  },
  feedback: {
    success:
      "Genau. Perspektivwechsel erweitert den Blick auf Qualitaet und hilft, Situationen vollstaendiger zu verstehen.",
    gentle:
      "Pruefe noch einmal, ob die Beobachtung eher zur Gruppe, zum Verein oder zum Umfeld passt.",
  },
  estimatedMinutes: 3,
};

export const sceneTrainingsprinzip: ScenarioScene = {
  id: "c5-trainingsprinzip",
  type: "multipleChoice",
  eyebrow: "Zusatzaufgabe",
  title: "Trainingsprinzip kurz verstehen",
  prompt:
    "Welche Erklaerung macht das Prinzip von Belastung, Anpassung und Variation fuer eine Gruppe niedrigschwellig verstaendlich?",
  context: "Waehle die alltagstauglichste Formulierung.",
  taskTypeLabel: "Kurze Lesekarte und Quiz",
  primaryDimension: "leisten",
  points: 10,
  optional: true,
  options: [
    {
      id: "a",
      label:
        "Ihr werdet besser, wenn ihr etwas fordert, Pausen nutzt und Aufgaben immer wieder ein wenig veraendert.",
      insight:
        "Genau. Die Erklaerung ist verstaendlich und trifft das Grundprinzip ohne Fachjargon.",
      isBest: true,
    },
    {
      id: "b",
      label: "Training wirkt nur ueber lineare Superkompensation unter standardisierten Reizen.",
      insight:
        "Fachlich angelehnt, aber fuer eine Lerngruppe viel zu abstrakt und unnoetig kompliziert.",
    },
    {
      id: "c",
      label: "Wenn es anstrengend ist, ist es automatisch gutes Training.",
      insight:
        "Anstrengung allein reicht nicht. Passung, Erholung und Variation gehoeren dazu.",
    },
  ],
  estimatedMinutes: 2,
};

export const sceneMotivation: ScenarioScene = {
  id: "c5-motivation",
  type: "multipleChoice",
  eyebrow: "Zusatzaufgabe",
  title: "Motivation erkennen",
  prompt:
    "Drei Personen kommen regelmaessig in die Stunde: eine wegen Freund*innen, eine wegen Fitness, eine wegen Wettkampfambition.",
  context: "Welche Schlussfolgerung ist am hilfreichsten?",
  taskTypeLabel: "Multiple-Choice-Quiz",
  primaryDimension: "lachen",
  points: 10,
  optional: true,
  options: [
    {
      id: "a",
      label: "Ich richte alles an der leistungsorientiertesten Person aus.",
      insight:
        "Das macht einzelne Motive sichtbar, blendet aber andere Zugaenge zur Stunde aus.",
    },
    {
      id: "b",
      label:
        "Ich plane so, dass unterschiedliche Motive angesprochen werden: Gemeinschaft, Wohlbefinden und Herausforderung.",
      insight:
        "Stark. Motivation ist vielfaeltig und sollte sich in der Gestaltung der Stunde wiederfinden.",
      isBest: true,
    },
    {
      id: "c",
      label: "Ich frage nicht weiter nach. Hauptsache, alle machen mit.",
      insight:
        "Praktisch vielleicht, aber du verschenkst wichtige Hinweise fuer Motivation und Passung.",
    },
  ],
  recallHint: {
    dimension: "lernen",
    text: "Das kennst du schon aus dem Bereich Lernen: Wer die Zielgruppe genauer wahrnimmt, kann Motivation besser aufgreifen.",
  },
  estimatedMinutes: 3,
};

export const scenePeerFeedback: ScenarioScene = {
  id: "c5-peer-feedback",
  type: "scenario",
  eyebrow: "Zusatzaufgabe",
  title: "Peer-Feedback nutzen",
  prompt:
    "Du leitest zum ersten Mal allein eine Stunde und moechtest danach besser einschaetzen koennen, wie dein Einstieg gewirkt hat.",
  context: "Welcher Weg bringt dir das hilfreichste Peer-Feedback?",
  taskTypeLabel: "Szenario mit Entscheidung",
  primaryDimension: "lernen",
  points: 10,
  optional: true,
  options: [
    {
      id: "a",
      label: "Ich frage hinterher allgemein: 'Und, wie war's?'",
      insight:
        "Ein Einstieg ins Gespraech, aber oft zu offen fuer wirklich konkrete Rueckmeldungen.",
    },
    {
      id: "c",
      label: "Ich warte ab, ob jemand von sich aus etwas sagt.",
      insight:
        "Kann passieren, liefert aber oft nur Zufallsrueckmeldungen statt gezieltes Lernen.",
    },
    {
      id: "b",
      label:
        "Ich bitte eine andere Uebungsleitung, auf Begruessung, Beteiligung und Klarheit zu achten und mir dazu kurz Feedback zu geben.",
      insight:
        "Genau. Beobachtungskriterien machen Rueckmeldungen praeziser und besser nutzbar.",
      isBest: true,
    },
  ],
  estimatedMinutes: 3,
};

export const sceneSicherheitscheck: MatchingScene = {
  id: "c5-sicherheitscheck",
  type: "matching",
  eyebrow: "Zusatzaufgabe",
  title: "Sicherheits- und Belastungscheck",
  prompt:
    "Ordne die Beobachtungen dem passenden Prueffokus zu. So bleibt der Blick auf Sicherheit und Belastung konkret.",
  context: "Worauf schaust du vor dem Start?",
  taskTypeLabel: "Zuordnungsaufgabe",
  primaryDimension: "leisten",
  points: 10,
  optional: true,
  pairs: [
    {
      id: "raum",
      label: "Der Hallenboden ist an einer Stelle rutschig und das Material liegt noch ungeordnet.",
    },
    {
      id: "gruppe",
      label: "Mehrere Teilnehmende wirken heute muede und kommen erst langsam in Bewegung.",
    },
    {
      id: "aufgabe",
      label: "Die geplante Spielform hat hohe Laufintensitaet und viele Richtungswechsel.",
    },
  ],
  targets: [
    { id: "sicherheit", label: "Sicherheitscheck" },
    { id: "tagesform", label: "Tagesform pruefen" },
    { id: "belastung", label: "Belastung einschaetzen" },
  ],
  answers: {
    raum: "sicherheit",
    gruppe: "tagesform",
    aufgabe: "belastung",
  },
  feedback: {
    success:
      "Treffsicher. Ein kurzer Check zu Raum, Tagesform und Belastung verhindert viele Probleme im Verlauf der Stunde.",
    gentle:
      "Pruefe noch einmal, was vor allem Sicherheit, Tagesform oder Belastung betrifft.",
  },
  estimatedMinutes: 3,
};

export const sceneRitual: ReflectionScene = {
  id: "c5-ritual",
  type: "reflection",
  eyebrow: "Zusatzaufgabe",
  title: "Ein Ritual entwickeln",
  prompt:
    "Rituale geben Wiedererkennung und Sicherheit. Sie helfen besonders dann, wenn Gruppen wechseln oder unterschiedlich schnell ankommen.",
  context: "Skizziere ein kurzes Start- oder Abschlussritual fuer deine Zielgruppe.",
  taskTypeLabel: "Reflexion mit Texteingabe",
  primaryDimension: "lachen",
  points: 10,
  optional: true,
  prompts: [
    {
      id: "ritual-form",
      label: "So koennte mein Ritual aussehen",
      placeholder:
        "Zum Beispiel: Begruessungsrunde in Bewegung, kurzer Teamruf, Abschlussfrage oder Partnercheck ...",
    },
    {
      id: "ritual-wirkung",
      label: "Darauf soll das Ritual einzahlen",
      placeholder:
        "Zum Beispiel: Sicherheit, Wiedererkennung, Aktivierung oder ruhiger Abschluss ...",
    },
  ],
  estimatedMinutes: 4,
};

export const sceneBeutebuch: ReflectionScene = {
  id: "c5-beutebuch",
  type: "reflection",
  eyebrow: "Zusatzaufgabe",
  title: "Beutebuch-Impuls",
  prompt:
    "Halte eine Erkenntnis aus der Lernreise so fest, dass du sie in einer Woche noch wiederfindest und nutzen kannst.",
  context:
    "Ein Beutebuch sammelt das, was du wirklich mitnehmen willst: eine Einsicht, eine Formulierung oder einen Praxisschritt.",
  taskTypeLabel: "Kurze Selbstreflexion",
  primaryDimension: "lernen",
  points: 10,
  optional: true,
  prompts: [
    {
      id: "beutebuch-erkenntnis",
      label: "Diese Erkenntnis nehme ich mit",
      placeholder: "Zum Beispiel: Beteiligung zuerst klein und konkret machen ...",
    },
    {
      id: "beutebuch-praxis",
      label: "So will ich sie in der Praxis nutzen",
      placeholder:
        "Zum Beispiel: in der naechsten Stunde eine kurze Wahlmoeglichkeit einbauen ...",
    },
  ],
  estimatedMinutes: 3,
};

export const sceneFallbeispiel: ScenarioScene = {
  id: "c5-fallbeispiel",
  type: "scenario",
  eyebrow: "Zusatzaufgabe",
  title: "Komplexes Fallbeispiel loesen",
  prompt:
    "Vor dir steht eine gemischte Jugendgruppe. Einige wollen sich auspowern, zwei sind unsicher, der Platz ist kleiner als sonst und du hast wenig Material.",
  context: "Welche Entscheidung zeigt die staerkste UeL-Kompetenz?",
  taskTypeLabel: "Komplexes Szenario",
  primaryDimension: "leisten",
  points: 10,
  optional: true,
  options: [
    {
      id: "a",
      label: "Ich ziehe mein urspruengliches Programm durch, damit die Stunde professionell wirkt.",
      insight:
        "Professionell wirkt nicht der starre Plan, sondern die passende Reaktion auf die reale Situation.",
    },
    {
      id: "b",
      label:
        "Ich waehle eine bewegungsreiche Grundform, baue Varianten ein, sichere den Raum ab und gebe kurze Wahlmoeglichkeiten.",
      insight:
        "Sehr stark. Du verbindest Motivation, Passung, Sicherheit und Differenzierung in einer Entscheidung.",
      isBest: true,
    },
    {
      id: "c",
      label: "Ich mache nur ruhige Uebungen, damit kein Risiko entsteht.",
      insight:
        "Sicherheit ist wichtig, aber die Stunde verliert so unnoetig an Aktivierung und Lernchance.",
    },
  ],
  recallHint: {
    dimension: "lachen",
    text: "Das kennst du schon: Beteiligung und Wahlmoeglichkeiten helfen nicht nur der Stimmung, sondern auch bei der passenden Steuerung von Leistung.",
  },
  estimatedMinutes: 4,
};
