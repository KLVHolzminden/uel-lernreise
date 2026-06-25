import { Chapter } from "@/lib/types";
import { sceneEigeneRolle } from "@/data/optional-scenes";

export const chapter1: Chapter = {
  id: "in-die-rolle-finden",
  title: "Kapitel 1: In die Rolle finden",
  shortTitle: "Rolle finden",
  description:
    "Du schaust auf Selbstbild, Motivation und erste Verantwortung und nutzt Lachen, Lernen und Leisten als Orientierung für deine Rolle.",
  objective:
    "Du schärfst deinen Startpunkt als angehende Übungsleitung und klärst, was dich in diese Rolle trägt und worauf du achten willst.",
  accent: "blue",
  scenes: [
    {
      id: "c1-intro",
      type: "intro",
      eyebrow: "Start",
      title: "Dein Weg zur Übungsleiterrolle",
      prompt:
        "Gute Uebungsstunden entstehen nicht nur durch Uebungen. Du gestaltest Atmosphaere, ermoeglichst Lernen und dosierst Leistung passend.",
      context:
        "Im regulären Lernweg bearbeitest du 17 Aufgaben. Freiwillige Vertiefungen, Bildszenen und dein Notizbuch ergänzen dein Profil.",
      contextAward: {
        total: 1,
        kind: "bonus",
        label: "Öffne den Startimpuls zu Fortschritt und Profil.",
      },
      highlights: [
        "Lachen steht fuer Atmosphaere, Beziehung und Motivation.",
        "Lernen steht fuer Verstehen, Rueckmeldung und Reflexion.",
        "Leisten steht fuer passende Belastung, Differenzierung und Erfolgserlebnisse.",
      ],
      takeaway:
        "Die drei Perspektiven helfen dir, deine Rolle nicht nur ueber Inhalte, sondern ueber Wirkung zu denken.",
      metaAward: {
        total: 1,
        kind: "bonus",
        dimension: "lernen",
        label: "Öffne den Überblick zu Lachen, Lernen und Leisten.",
      },
      estimatedMinutes: 2,
    },
    {
      id: "c1-selbstbild",
      type: "reflection",
      eyebrow: "Einstieg",
      title: "So starte ich in meine Rolle",
      prompt: "Welche Staerken, Unsicherheiten und Ziele bringst du gerade mit?",
      context:
        "Du musst noch nicht alles koennen. Entscheidend ist, dass du deinen Startpunkt bewusst wahrnimmst.",
      contextAward: {
        total: 1,
        kind: "deepening",
        dimension: "lernen",
        label: "Oeffne den kurzen Impuls zum eigenen Startpunkt.",
      },
      taskTypeLabel: "Kurze Selbstreflexion",
      prompts: [
        {
          id: "einstieg-staerken",
          label: "Darin fuehle ich mich heute schon sicher",
          placeholder:
            "Zum Beispiel: freundlich ansprechen, Gruppen strukturieren, Bewegungsideen einbringen ...",
        },
        {
          id: "einstieg-unsicherheiten",
          label: "Hier bin ich noch unsicher",
          placeholder:
            "Zum Beispiel: laut anleiten, Belastung einschaetzen, spontan umplanen ...",
        },
        {
          id: "einstieg-ziele",
          label: "Das moechte ich in dieser Lernreise fuer mich klaeren",
          placeholder:
            "Zum Beispiel: sicherer erklaeren, mehr Beteiligung schaffen, besser differenzieren ...",
        },
      ],
      takeaway:
        "Ein klares Selbstbild ist kein Test, sondern eine gute Grundlage fuer Entwicklung.",
      estimatedMinutes: 4,
    },
    {
      id: "c1-motivation",
      type: "multipleChoice",
      eyebrow: "Einstieg",
      title: "Was traegt dich in der UeL-Rolle?",
      prompt:
        "Menschen uebernehmen die Rolle als Uebungsleitung aus unterschiedlichen Gruenden: Freude an Bewegung, Verantwortung, Gemeinschaft oder der Wunsch, andere zu begleiten.",
      context:
        "Welche Haltung traegt am ehesten auch dann, wenn eine Stunde einmal holprig laeuft?",
      contextAward: {
        total: 1,
        kind: "bonus",
        dimension: "lachen",
        secondaryDimension: "lernen",
        secondaryPoints: 1,
        label: "Oeffne den Impuls zur tragfaehigen Motivation.",
      },
      taskTypeLabel: "Selbstbewertung und Quiz",
      options: [
        {
          id: "a",
          label:
            "Ich moechte vor allem zeigen, dass ich sportlich vorneweg sein kann.",
          insight:
            "Eigene Kompetenz kann helfen, reicht aber allein oft nicht fuer eine tragfaehige UeL-Rolle.",
        },
        {
          id: "b",
          label:
            "Ich moechte Bewegung so gestalten, dass andere sich sicher, aktiviert und gesehen fuehlen.",
          insight:
            "Stark. Diese Haltung verbindet Atmosphaere, Lernen und passende Leistung von Anfang an.",
          isBest: true,
        },
        {
          id: "c",
          label:
            "Ich uebernehme die Rolle vor allem, damit die Stunde organisatorisch abgesichert ist.",
          insight:
            "Organisation gehoert dazu, erfasst aber noch nicht die ganze Wirkung von Uebungsleitung.",
        },
      ],
      takeaway:
        "Eine tragfaehige Motivation richtet den Blick nicht nur auf Inhalte, sondern auf Menschen und Situationen.",
      estimatedMinutes: 3,
    },
    {
      id: "c1-verantwortung",
      type: "scenario",
      eyebrow: "Einstieg",
      title: "Erste Verantwortung bewusst annehmen",
      prompt:
        "Vor deiner ersten eigenen Stunde merkst du: Die Gruppe erwartet Orientierung, Sicherheit und einen guten Rahmen von dir.",
      context:
        "Welche Vorbereitung zeigt ein realistisches Verstaendnis der UeL-Rolle?",
      metaAward: {
        total: 2,
        kind: "deepening",
        dimension: "lernen",
        secondaryDimension: "leisten",
        secondaryPoints: 1,
        label: "Oeffne den Transfer zur ersten eigenen Verantwortung.",
      },
      taskTypeLabel: "Szenario mit Entscheidung",
      options: [
        {
          id: "b",
          label:
            "Ich plane Einstieg, Erklaerung, Belastungsvarianten und einen kurzen Abschluss gleich mit.",
          insight:
            "Genau. Gute Uebungsleitung denkt von Anfang an an Stimmung, Lernen und passende Anforderungen.",
          isBest: true,
        },
        {
          id: "a",
          label:
            "Ich plane nur die Uebungen genau. Die Stimmung ergibt sich dann schon von allein.",
          insight:
            "Uebungen sind wichtig, aber Atmosphaere, Orientierung und Passung brauchen ebenfalls Vorbereitung.",
        },
        {
          id: "c",
          label:
            "Ich lasse vieles offen und entscheide alles spontan in der Stunde.",
          insight:
            "Flexibilitaet hilft spaeter. Fuer den Start braucht es trotzdem einen tragfaehigen Grundplan.",
        },
      ],
      takeaway:
        "Verantwortung heisst nicht, alles perfekt zu wissen, sondern bewusst vorzubereiten und aufmerksam zu reagieren.",
      estimatedMinutes: 3,
    },
    sceneEigeneRolle,
  ],
};


