import { Chapter } from "@/lib/types";
import {
  sceneFallbeispiel,
  scenePeerFeedback,
  scenePerspektivwechsel,
} from "@/data/optional-scenes";

export const chapter3: Chapter = {
  id: "wahrnehmen-erklaeren-rueckmeldung",
  title: "Kapitel 3: Wahrnehmen, erklaeren und Rueckmeldung geben",
  shortTitle: "Wahrnehmen",
  description:
    "Du schaerst deinen Blick fuer Zielgruppe, Verstehen, Rueckfragen, Feedback und kurze Reflexionen in der Uebungsstunde.",
  objective:
    "Du richtest Aufgaben an Menschen aus, erklaerst verstaendlich, gibst hilfreiche Rueckmeldungen und nutzt Reflexion als Teil des Lernens.",
  accent: "green",
  scenes: [
    {
      id: "c3-zielgruppe",
      type: "matching",
      eyebrow: "Pflichtaufgabe",
      title: "Zielgruppe wahrnehmen",
      prompt:
        "Ordne die Beobachtungen dem Schwerpunkt zu, der fuer deine Planung besonders wichtig wird.",
      context:
        "Zielgruppenorientierung heisst, Unterschiede wahrzunehmen und daraus sinnvolle Entscheidungen fuer die Stunde abzuleiten.",
      contextAward: {
        total: 1,
        kind: "bonus",
        dimension: "lernen",
        label: "Oeffne den Impuls zur Zielgruppe und ihren Unterschieden.",
      },
      taskTypeLabel: "Zuordnungsaufgabe",
      primaryDimension: "lernen",
      points: 15,
      pairs: [
        {
          id: "einsteigerin",
          label:
            "Eine neue Teilnehmerin schaut erst zu, waehrend andere die Aufgabe sofort beginnen.",
        },
        {
          id: "leistungsstark",
          label:
            "Zwei Fortgeschrittene loesen die Grundaufgabe schnell und suchen schon die naechste Herausforderung.",
        },
        {
          id: "alltag",
          label:
            "Mehrere Erwachsene berichten vor Beginn, dass sie heute muede von der Arbeit kommen.",
        },
      ],
      targets: [
        { id: "orientierung", label: "Sicherheit und Orientierung" },
        { id: "herausforderung", label: "Passende Steigerung" },
        { id: "tagesform", label: "Belastung an Alltag und Tagesform anpassen" },
      ],
      answers: {
        einsteigerin: "orientierung",
        leistungsstark: "herausforderung",
        alltag: "tagesform",
      },
      feedback: {
        success:
          "Passend. Wer die Zielgruppe aufmerksam wahrnimmt, plant nicht fuer eine abstrakte Gruppe, sondern fuer reale Menschen.",
        gentle:
          "Pruefe noch einmal, ob die Beobachtung eher nach Orientierung, Steigerung oder Tagesform ruft.",
      },
      takeaway:
        "Zielgruppenorientierung beginnt mit Beobachtung und fuehrt zu konkreten didaktischen Entscheidungen.",
      estimatedMinutes: 3,
    },
    {
      id: "c3-erklaeren",
      type: "interactiveScene",
      eyebrow: "Pflichtaufgabe",
      title: "Verstanden heisst nicht nur gehoert",
      prompt:
        "Erkunde die Szene und achte darauf, woran du Verstehen, Nachfragen und stilles Mitdenken erkennen kannst.",
      context:
        "Gute Anleitung zeigt sich nicht nur daran, dass du etwas gesagt hast, sondern daran, dass die Gruppe Orientierung gewinnt.",
      metaAward: {
        total: 2,
        kind: "deepening",
        dimension: "lernen",
        label: "Oeffne den Transfer zu Rueckfragen und Probehandlungen.",
      },
      taskTypeLabel: "Interaktive Bildszene",
      primaryDimension: "lernen",
      points: 15,
      imageSrc: "/images/scenes/szene-erklaeren-lernen.png",
      imageAlt:
        "Eine Uebungsleitung erklaert einer Gruppe eine Aufgabe in der Sporthalle, waehrend mehrere Teilnehmende aufmerksam, fragend oder nachdenklich reagieren.",
      placeholderLabel: "Szenenbild noch nicht hinterlegt",
      requiredHotspots: 2,
      hotspots: [
        {
          id: "erklaerende-uebungsleitung",
          label: "Erklaerende Uebungsleitung",
          x: 87,
          y: 37,
          dimension: "lernen",
          feedbackTitle: "Klarheit sichtbar machen",
          feedbackText:
            "Offene Gestik und Blickkontakt helfen bei der Orientierung. Wirklich tragfaehig wird die Erklaerung, wenn daraus Handlungssicherheit entsteht.",
        },
        {
          id: "aufmerksame-teilnehmerin",
          label: "Aufmerksame Teilnehmerin",
          x: 31,
          y: 39,
          dimension: "lernen",
          feedbackTitle: "Zuhoeren ist noch nicht Verstehen",
          feedbackText:
            "Konzentriertes Zuhoeren ist ein gutes Signal, sagt aber noch nicht automatisch, ob die Aufgabe wirklich angekommen ist.",
        },
        {
          id: "gruppe-im-hintergrund",
          label: "Gruppe im Hintergrund",
          x: 53,
          y: 46,
          dimension: "lernen",
          feedbackTitle: "Unterschiedliche Lernstaende wahrnehmen",
          feedbackText:
            "Nicht alle reagieren gleich schnell. Genau hier hilft es, Raum fuer Rueckfragen oder kurze Probehandlungen zu lassen.",
        },
        {
          id: "material-aufbau",
          label: "Material und Stundenaufbau",
          x: 86,
          y: 79,
          dimension: "leisten",
          feedbackTitle: "Vom Reden ins Tun kommen",
          feedbackText:
            "Material und Aufbau helfen, wenn sie die Erklaerung stuetzen. Verstehen wird oft erst im Ausprobieren sichtbar.",
        },
      ],
      followUp: {
        type: "quiz",
        prompt: "Woran merkst du am ehesten, ob die Erklaerung wirklich angekommen ist?",
        options: [
          {
            id: "b",
            label:
              "Daran, dass Rueckfragen, kurze Wiederholungen oder ein Probeversuch zeigen, wie die Gruppe die Aufgabe verstanden hat.",
            insight:
              "Genau. Verstehen wird sichtbar, wenn Teilnehmende aktiv zeigen koennen, was sie gehoert und fuer sich uebersetzt haben.",
            isBest: true,
          },
          {
            id: "a",
            label: "Daran, dass waehrend der Erklaerung alle ruhig sind.",
            insight:
              "Ruhe kann hilfreich sein, ist aber noch kein sicherer Hinweis auf Verstehen.",
          },
          {
            id: "c",
            label: "Daran, dass du die Aufgabe vollstaendig und ohne Unterbrechung erklaert hast.",
            insight:
              "Eine vollstaendige Erklaerung hilft, sagt aber noch nichts darueber aus, was bei der Gruppe angekommen ist.",
          },
        ],
      },
      recallHint: {
        dimension: "lachen",
        text: "Das Motiv kennst du schon: Beteiligung hilft nicht nur der Stimmung, sondern auch dem Lernen.",
      },
      recallAward: {
        total: 1,
        kind: "bonus",
        dimension: "lernen",
        secondaryDimension: "lachen",
        secondaryPoints: 1,
        label: "Oeffne den kurzen Verweis zu Beteiligung und Orientierung.",
      },
      takeaway:
        "Verstehen wird sichtbar, wenn du Rueckmeldungen, Nachfragen oder kleine Probehandlungen ermoeglichst.",
      estimatedMinutes: 3,
    },
    {
      id: "c3-feedback",
      type: "interactiveScene",
      eyebrow: "Pflichtaufgabe",
      title: "Feedback geben",
      prompt:
        "Erkunde die Szene und achte darauf, wie Rueckmeldung durch Haltung, Blickkontakt und Formulierung wirksam wird.",
      context:
        "Hilfreiches Feedback ist kurz, konkret und wertschaetzend. Es macht den naechsten Versuch moeglich.",
      taskTypeLabel: "Interaktive Bildszene",
      primaryDimension: "lernen",
      points: 15,
      imageSrc: "/images/scenes/szene-feedback-lernen.png",
      imageAlt:
        "Eine Uebungsleitung gibt in der Sporthalle einer Teilnehmerin eine wertschaetzende Rueckmeldung, waehrend weitere Personen im Hintergrund ueben.",
      placeholderLabel: "Szenenbild noch nicht hinterlegt",
      requiredHotspots: 2,
      hotspots: [
        {
          id: "blickkontakt",
          label: "Blickkontakt im Gespraech",
          x: 53,
          y: 34,
          dimension: "lernen",
          feedbackTitle: "Rueckmeldung kommt an",
          feedbackText:
            "Direkter Blickkontakt zeigt Aufmerksamkeit und hilft, dass Rueckmeldung als Unterstuetzung statt als Bewertung ankommt.",
        },
        {
          id: "offene-haltung",
          label: "Offene Koerperhaltung",
          x: 62,
          y: 49,
          dimension: "lachen",
          feedbackTitle: "Wertschaetzung zeigen",
          feedbackText:
            "Offene Gestik und ruhige Haltung signalisieren: Ich moechte dir helfen, nicht dich blossstellen.",
        },
        {
          id: "teilnehmerin",
          label: "Teilnehmerin im Fokus",
          x: 31,
          y: 39,
          dimension: "lernen",
          feedbackTitle: "Individuell rueckmelden",
          feedbackText:
            "Gutes Feedback richtet sich an die einzelne Person und ihren naechsten Schritt, nicht an einen Vergleich mit anderen.",
        },
        {
          id: "gruppe-hintergrund",
          label: "Gruppe im Hintergrund",
          x: 77,
          y: 56,
          dimension: "lernen",
          feedbackTitle: "Feedback in der Stunde einbetten",
          feedbackText:
            "Rueckmeldungen muessen den Ablauf nicht aufhalten. Kurz und praezise wirken sie oft am besten.",
        },
      ],
      followUp: {
        type: "quiz",
        prompt: "Welche Rueckmeldung ist in dieser Situation am hilfreichsten?",
        options: [
          {
            id: "a",
            label: "Schneller, sonst wird das heute nichts.",
            insight:
              "Die Rueckmeldung macht Druck, gibt aber kaum Orientierung fuer den naechsten Versuch.",
          },
          {
            id: "c",
            label: "Die anderen koennen das schon besser, schau dir das mal ab.",
            insight:
              "Vergleiche lenken vom eigenen Lernweg ab und schwaechen oft Motivation und Sicherheit.",
          },
          {
            id: "b",
            label:
              "Du bist drangeblieben. Probier die Bewegung erst etwas ruhiger, dann wird dein Stand stabiler.",
            insight:
              "Genau. Das Feedback ist wertschaetzend, konkret und eroeffnet direkt den naechsten Schritt.",
            isBest: true,
          },
        ],
      },
      recallHint: {
        dimension: "lachen",
        text: "Erinnerung: Wertschaetzendes Feedback staerkt Lernen und Atmosphaere zugleich.",
      },
      recallAward: {
        total: 1,
        kind: "bonus",
        dimension: "lernen",
        secondaryDimension: "lachen",
        secondaryPoints: 1,
        label: "Oeffne den Verweis zu Feedback und Atmosphaere.",
      },
      takeaway:
        "Feedback wird dann wirksam, wenn Menschen wissen, was gelungen ist und was sie als Naechstes probieren koennen.",
      estimatedMinutes: 4,
    },
    {
      id: "c3-reflexion",
      type: "ordering",
      eyebrow: "Pflichtaufgabe",
      title: "Reflexion ermoeglichen",
      prompt:
        "Ordne die Schritte fuer eine knappe, alltagstaugliche Reflexionsphase am Stundenende.",
      context:
        "Wie entsteht in zwei Minuten echte Auswertung statt nur ein kurzes 'War gut'?",
      metaAward: {
        total: 2,
        kind: "deepening",
        dimension: "lernen",
        secondaryDimension: "leisten",
        secondaryPoints: 1,
        label: "Oeffne den Transfer zur alltagstauglichen Reflexion.",
      },
      taskTypeLabel: "Reihenfolge-/Sortieraufgabe",
      primaryDimension: "lernen",
      points: 15,
      steps: [
        {
          id: "fokus",
          label: "Eine konkrete Leitfrage setzen, zum Beispiel: 'Was hat dir heute geholfen?'",
        },
        {
          id: "denken",
          label: "Der Gruppe kurz Zeit zum Nachdenken oder Austauschen geben",
        },
        {
          id: "teilen",
          label: "Einige Stimmen sichtbar machen und Unterschiede wuerdigen",
        },
        {
          id: "uebertragen",
          label: "Die Erkenntnis mit der naechsten Stunde oder dem Alltag verknuepfen",
        },
      ],
      correctOrder: ["fokus", "denken", "teilen", "uebertragen"],
      feedback: {
        success:
          "Genau so wird Reflexion knapp, konkret und trotzdem wirksam: Fokus, Denkzeit, Austausch und Transfer.",
        gentle:
          "Hilfreich ist meist: erst eine klare Frage, dann kurze Denkzeit, dann Stimmen sammeln und zum Schluss den Transfer sichern.",
      },
      takeaway:
        "Reflexion braucht nicht viel Zeit. Sie braucht eine gute Frage und einen klaren Abschluss.",
      estimatedMinutes: 4,
    },
    scenePerspektivwechsel,
    scenePeerFeedback,
    sceneFallbeispiel,
  ],
};
