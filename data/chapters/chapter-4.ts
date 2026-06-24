import { Chapter } from "@/lib/types";
import {
  sceneChallengeLevel,
  sceneSicherheitscheck,
  sceneTrainingsprinzip,
} from "@/data/optional-scenes";

export const chapter4: Chapter = {
  id: "herausforderungen-passend-gestalten",
  title: "Kapitel 4: Herausforderungen passend gestalten",
  shortTitle: "Herausforderungen",
  description:
    "Du gestaltest Anforderungen so, dass unterschiedliche Menschen gefordert werden, ohne Anschluss, Sicherheit oder Freude zu verlieren.",
  objective:
    "Du differenzierst Aufgaben, steigerst Anforderungen passend, machst Entwicklung sichtbar und reagierst situationsgerecht auf veraenderte Bedingungen.",
  accent: "red",
  scenes: [
    {
      id: "c4-differenzierung",
      type: "interactiveScene",
      eyebrow: "Pflichtaufgabe",
      title: "Eine Uebung - drei Wege",
      prompt:
        "Erkunde die Szene und achte darauf, wie aus einer Grundaufgabe unterschiedliche Niveaus entstehen koennen.",
      context:
        "Passende Differenzierung sorgt dafuer, dass Menschen Erfolg erleben und zugleich angemessen gefordert werden.",
      taskTypeLabel: "Interaktive Bildszene",
      primaryDimension: "leisten",
      points: 15,
      imageSrc: "/images/scenes/szene-differenzierung-leisten.png",
      imageAlt:
        "Eine Gruppe trainiert in der Sporthalle an derselben Aufgabe mit unterschiedlich anspruchsvollen Varianten.",
      placeholderLabel: "Szenenbild noch nicht hinterlegt",
      requiredHotspots: 2,
      hotspots: [
        {
          id: "grundform",
          label: "Sichere Grundform in der Mitte",
          x: 48,
          y: 54,
          dimension: "leisten",
          feedbackTitle: "Eine gemeinsame Basis schaffen",
          feedbackText:
            "Eine ueberschaubare Grundform hilft allen, die Bewegungsidee zu verstehen und erste Sicherheit aufzubauen.",
        },
        {
          id: "leichte-variante",
          label: "Niedrigere Einstiegshilfe",
          x: 18,
          y: 53,
          dimension: "leisten",
          feedbackTitle: "Leichtere Variante anbieten",
          feedbackText:
            "Leichte Varianten sind kein Rueckschritt, sondern eine sinnvolle Einladung, sicher und mit Erfolg einzusteigen.",
        },
        {
          id: "schwere-variante",
          label: "Zusaetzliche Herausforderung",
          x: 83,
          y: 40,
          dimension: "leisten",
          feedbackTitle: "Herausforderung offenhalten",
          feedbackText:
            "Wer schneller sicher wird, braucht oft eine anspruchsvollere Variante, damit Motivation und Lernreiz erhalten bleiben.",
        },
        {
          id: "gruppe-gesamt",
          label: "Unterschiedliche Menschen, gleiche Aufgabe",
          x: 63,
          y: 50,
          dimension: "lachen",
          feedbackTitle: "Passung schafft Gelingen",
          feedbackText:
            "Wenn Anforderungen passen, erleben Menschen eher Sicherheit, Freude und echte Fortschritte.",
        },
      ],
      followUp: {
        type: "quiz",
        prompt: "Welche Entscheidung zeigt gute Differenzierung?",
        options: [
          {
            id: "a",
            label:
              "Ich lasse alle dieselbe Variante machen. So bleibt die Stunde fuer mich am uebersichtlichsten.",
            insight:
              "Uebersicht hilft, aber gleiche Anforderungen bedeuten nicht automatisch passende Anforderungen.",
          },
          {
            id: "b",
            label:
              "Ich erklaere eine gemeinsame Grundform und biete dazu leichte, mittlere und schwere Zugangswege an.",
            insight:
              "Genau. So bleibt die Aufgabe gemeinsam, waehrend die Belastung und der Anspruch unterschiedlich dosiert werden koennen.",
            isBest: true,
          },
          {
            id: "c",
            label:
              "Ich gebe nur den leistungsstaerksten Personen Zusatzaufgaben und lasse den Rest abwarten.",
            insight:
              "Das differenziert nur einen Teil der Gruppe und laesst andere eher passiv zurueck.",
          },
        ],
      },
      recallHint: {
        dimension: "lachen",
        text: "Hier taucht ein Gedanke wieder auf: Gute Differenzierung kann auch Freude sichern.",
      },
      recallAward: {
        total: 1,
        kind: "bonus",
        dimension: "leisten",
        secondaryDimension: "lachen",
        secondaryPoints: 1,
        label: "Oeffne den Verweis zu Differenzierung und Freude.",
      },
      takeaway:
        "Differenzierung wird stark, wenn alle an derselben Idee arbeiten koennen, aber nicht alle dasselbe brauchen.",
      estimatedMinutes: 3,
    },
    {
      id: "c4-steigerung",
      type: "ordering",
      eyebrow: "Pflichtaufgabe",
      title: "Anforderungen passend steigern",
      prompt:
        "Bringe die Schritte in eine sinnvolle Reihenfolge, damit eine neue Bewegungsaufgabe weder ueberfordert noch unterfordert.",
      context: "Welche Progression ist didaktisch stimmig?",
      metaAward: {
        total: 2,
        kind: "deepening",
        dimension: "leisten",
        label: "Oeffne den Transfer zur passenden Steigerung.",
      },
      taskTypeLabel: "Reihenfolge-/Sortieraufgabe",
      primaryDimension: "leisten",
      points: 15,
      steps: [
        {
          id: "vormachen",
          label: "Eine ueberschaubare Grundform zeigen und kurz ausprobieren lassen",
        },
        {
          id: "variieren",
          label: "Tempo, Raum oder Zusatzaufgabe schrittweise variieren",
        },
        {
          id: "beobachten",
          label: "Wahrnehmen, wie sicher die Gruppe die Grundform ausfuehrt",
        },
        {
          id: "differenzieren",
          label: "Leichtere und schwerere Varianten gezielt anbieten",
        },
      ],
      correctOrder: ["vormachen", "beobachten", "differenzieren", "variieren"],
      feedback: {
        success:
          "Stimmig. Erst Orientierung, dann Beobachtung, dann Varianten und danach weitere Steigerung.",
        gentle:
          "Hilfreich ist meist: erst eine klare Grundform, dann beobachten, dann differenzieren und danach weiter steigern.",
      },
      takeaway:
        "Steigerung wirkt dann lernfoerderlich, wenn sie an beobachtbare Sicherheit anschliesst.",
      estimatedMinutes: 4,
    },
    {
      id: "c4-erfolge",
      type: "multipleChoice",
      eyebrow: "Pflichtaufgabe",
      title: "Individuelle Erfolge anerkennen",
      prompt:
        "Ein Teilnehmer schafft eine Uebung noch nicht vollstaendig, bleibt aber deutlich laenger dran als in der Vorwoche.",
      context: "Welche Rueckmeldung macht individuellen Erfolg sichtbar?",
      taskTypeLabel: "Selbstbewertung und Quiz",
      primaryDimension: "leisten",
      points: 15,
      options: [
        {
          id: "b",
          label:
            "Du bist heute viel laenger drangeblieben und hast deine Koerperhaltung verbessert. Das ist ein echter Fortschritt.",
          insight:
            "Genau. Du wuerdigst Entwicklung statt nur Endergebnis und machst Lernen konkret sichtbar.",
          isBest: true,
        },
        {
          id: "a",
          label: "Heute hat es noch nicht geklappt, aber naechstes Mal vielleicht.",
          insight:
            "Die Rueckmeldung ist freundlich, hebt den sichtbaren Fortschritt aber kaum hervor.",
        },
        {
          id: "c",
          label: "Schau mal, andere koennen die Uebung schon komplett.",
          insight:
            "Vergleiche koennen Druck erzeugen und den Blick vom eigenen Lernweg weglenken.",
        },
      ],
      takeaway:
        "Individuelle Erfolge entstehen oft in kleinen Schritten. Gute Uebungsleitung macht genau diese Schritte sichtbar.",
      estimatedMinutes: 3,
    },
    {
      id: "c4-situationselastisch",
      type: "interactiveScene",
      eyebrow: "Pflichtaufgabe",
      title: "Plan aendern koennen",
      prompt:
        "Erkunde die Szene und achte darauf, woran du erkennst, dass Gruppe, Raum oder Material heute anders reagieren als geplant.",
      context:
        "Situationselastisch handeln heisst: das Ziel halten, aber Aufbau, Belastung und Organisation passend anpassen.",
      taskTypeLabel: "Interaktive Bildszene",
      primaryDimension: "leisten",
      points: 15,
      imageSrc: "/images/scenes/szene-situationselastisch-leisten.png",
      imageAlt:
        "Eine Uebungsleitung strukturiert in der Sporthalle eine Aufgabe neu, waehrend die Gruppe beobachtet und sich auf einen veraenderten Aufbau einstellt.",
      placeholderLabel: "Szenenbild noch nicht hinterlegt",
      requiredHotspots: 2,
      hotspots: [
        {
          id: "uebungsleitung-neu",
          label: "Uebungsleitung strukturiert neu",
          x: 12,
          y: 41,
          dimension: "leisten",
          feedbackTitle: "Ruhe in der Anpassung",
          feedbackText:
            "Wenn du ruhig umstrukturierst, gibst du der Gruppe Sicherheit, auch wenn der Plan veraendert werden muss.",
        },
        {
          id: "gruppe-wartet",
          label: "Gruppe mit unterschiedlicher Bereitschaft",
          x: 71,
          y: 43,
          dimension: "lernen",
          feedbackTitle: "Gruppe neu einschaetzen",
          feedbackText:
            "Koerpersprache, Abstand und Aufmerksamkeit zeigen oft schnell, ob Belastung und Organisation noch passen.",
        },
        {
          id: "aufbau-material",
          label: "Aufbau und Material",
          x: 44,
          y: 78,
          dimension: "leisten",
          feedbackTitle: "Organisation anpassen",
          feedbackText:
            "Manchmal hilft schon ein vereinfachter Aufbau oder ein klarerer Raumzuschnitt, damit die Aufgabe wieder tragfaehig wird.",
        },
        {
          id: "beobachtende-teilnehmende",
          label: "Beobachtende Teilnehmende",
          x: 89,
          y: 56,
          dimension: "lachen",
          feedbackTitle: "Warten nicht zu lang werden lassen",
          feedbackText:
            "Wenn Menschen laenger warten oder zusehen muessen, sinken oft Spannung und Lernqualitaet. Eine schnelle Neuordnung hilft.",
        },
      ],
      followUp: {
        type: "quiz",
        prompt: "Wie reagierst du situationselastisch?",
        options: [
          {
            id: "a",
            label: "Ich ziehe den Plan unveraendert durch. Sonst verliere ich Zeit.",
            insight:
              "Zeitersparnis klingt verlockend, kann aber Sicherheit, Motivation und Lernqualitaet schwaechen.",
          },
          {
            id: "c",
            label: "Ich ueberspringe den Hauptteil und lasse die Gruppe frei spielen.",
            insight:
              "Das kann kurzfristig entspannen, loest die eigentliche didaktische Herausforderung aber nicht.",
          },
          {
            id: "b",
            label:
              "Ich vereinfache den Aufbau, reduziere den Laufweg und passe die Aufgabe an Gruppe und Raum an.",
            insight:
              "Genau. Du haeltst das Ziel der Aufgabe, reagierst aber flexibel auf die reale Situation.",
            isBest: true,
          },
        ],
      },
      recallHint: {
        dimension: "lernen",
        text: "Das ist ein Verbindungspunkt zwischen Lernen und Leisten: Wer aufmerksam beobachtet, kann Belastung besser anpassen.",
      },
      recallAward: {
        total: 1,
        kind: "bonus",
        dimension: "leisten",
        secondaryDimension: "lernen",
        secondaryPoints: 1,
        label: "Oeffne den Verweis zu Beobachtung und Anpassung.",
      },
      takeaway:
        "Flexibilitaet heisst nicht Beliebigkeit. Du passt den Weg an, ohne das Ziel der Aufgabe aus dem Blick zu verlieren.",
      estimatedMinutes: 3,
    },
    sceneChallengeLevel,
    sceneTrainingsprinzip,
    sceneSicherheitscheck,
  ],
};
