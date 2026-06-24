import { Chapter } from "@/lib/types";
import { uelcResources } from "@/data/resources";
import { sceneBeutebuch } from "@/data/optional-scenes";

export const chapter5: Chapter = {
  id: "erfahrungen-sichern-weitergehen",
  title: "Kapitel 5: Erfahrungen sichern und weitergehen",
  shortTitle: "Weitergehen",
  description:
    "Du sicherst Erfahrungen im Notizbuch, schaust auf deinen UeL-Kompass und machst daraus einen naechsten Schritt fuer Praxis oder Ausbildung.",
  objective:
    "Du verdichtest deine Erkenntnisse, verbindest sie mit deinem Profil und richtest den Blick auf deinen naechsten Praxisschritt oder den Weg zur UeL-C Ausbildung.",
  accent: "blue",
  scenes: [
    {
      id: "c5-intro",
      type: "infoCard",
      eyebrow: "Reflexion",
      title: "Dein Notizbuch begleitet die Lernreise",
      prompt:
        "Dein digitales Notizbuch ist kein Test. Es hilft dir, Erfahrungen, Fragen und Entwicklungsschritte auf deinem Weg als Uebungsleitung festzuhalten.",
      context:
        "Reflexion gehoert zur UeL-Rolle dazu, weil die eigene Rolle durch Erfahrung, Beobachtung und Weiterentwicklung waechst.",
      contextAward: {
        total: 1,
        kind: "bonus",
        dimension: "lernen",
        label: "Oeffne den Impuls zum Notizbuch als Lernbegleiter.",
      },
      highlights: [
        "Deine Notizen bleiben lokal in diesem Browser gespeichert.",
        "Dein Abschluss richtet sich nach 20 regulaeren Aufgaben im Lernweg.",
        "Die Profilbalken zeigen, welche Bereiche du in Lachen, Lernen und Leisten bereits staerkst.",
      ],
      takeaway:
        "Das Notizbuch ergaenzt die Aufgaben. Es ersetzt sie nicht, macht dein Lernen aber greifbarer.",
      estimatedMinutes: 2,
    },
    {
      id: "c5-rueckblick",
      type: "interactiveScene",
      eyebrow: "Reflexion",
      title: "Was nehme ich aus der Stunde mit?",
      prompt:
        "Erkunde die Szene und nutze danach den kurzen Rueckblick, um Stimmung, Lernen und Belastung zusammenzudenken.",
      context:
        "Nach einer Uebungsstunde entsteht oft der wichtigste Lernmoment: Was hat funktioniert, was habe ich beobachtet und was moechte ich beim naechsten Mal anders machen?",
      taskTypeLabel: "Interaktive Bildszene",
      imageSrc: "/images/scenes/szene-reflexion-abschluss.png",
      imageAlt:
        "Eine Uebungsleitung reflektiert mit einer Gruppe sitzend im Kreis nach einer Uebungsstunde.",
      placeholderLabel: "Szenenbild noch nicht hinterlegt",
      requiredHotspots: 2,
      hotspots: [
        {
          id: "klemmbrett",
          label: "Notizbuch oder Klemmbrett",
          x: 73,
          y: 46,
          dimension: "lernen",
          feedbackTitle: "Erfahrungen sichern",
          feedbackText:
            "Notizen helfen dir, aus einzelnen Situationen echte Entwicklungsschritte zu machen. Genau dafuer ist dein digitales Notizbuch da.",
        },
        {
          id: "gespraech-im-kreis",
          label: "Gespraech im Kreis",
          x: 49,
          y: 43,
          dimension: "lernen",
          feedbackTitle: "Reflexion ermoeglichen",
          feedbackText:
            "Reflexion muss nicht lang sein. Eine kurze Frage am Ende kann reichen, damit Teilnehmende ihr Erleben bewusst wahrnehmen.",
        },
        {
          id: "gruppe-zusammen",
          label: "Gruppe sitzt zusammen",
          x: 25,
          y: 52,
          dimension: "lachen",
          feedbackTitle: "Gemeinschaft wahrnehmen",
          feedbackText:
            "Auch der Abschluss praegt Atmosphaere. Wer gesehen wird, kommt eher wieder.",
        },
        {
          id: "augenhoehe",
          label: "Uebungsleitung auf Augenhoehe",
          x: 73,
          y: 42,
          dimension: "lernen",
          feedbackTitle: "Rolle bewusst gestalten",
          feedbackText:
            "Als Uebungsleitung musst du nicht alles perfekt loesen. Entscheidend ist, dass du beobachtest, reflektierst und dich weiterentwickelst.",
        },
      ],
      followUp: {
        type: "reflection",
        title: "Dein kurzer Stundenrueckblick",
        submitLabel: "Stundenrueckblick sichern",
        notebookBindings: {
          "rueckblick-stimmung": "lachenReflection",
          "rueckblick-lernen": "lernenReflection",
          "rueckblick-belastung": "leistenReflection",
          "rueckblick-naechster-schritt": "tryOut",
        },
        prompts: [
          {
            id: "rueckblick-stimmung",
            label: "Was hat heute zu guter Stimmung beigetragen?",
            placeholder:
              "Zum Beispiel: Begruessung, Beteiligung, Humor oder ein gelungener Uebergang ...",
          },
          {
            id: "rueckblick-lernen",
            label: "Was habe ich verstanden, gelernt oder neu gesehen?",
            placeholder:
              "Zum Beispiel: eine Bewegungsidee, eine klare Rueckmeldung oder ein Aha-Moment ...",
          },
          {
            id: "rueckblick-belastung",
            label: "Wo habe ich etwas verbessert, angepasst oder angemessen belastet?",
            placeholder:
              "Zum Beispiel: zwei Niveaus haben geholfen oder eine Aufgabe war noch zu schwer ...",
          },
          {
            id: "rueckblick-naechster-schritt",
            label: "Was moechte ich in meiner naechsten Uebungsstunde ausprobieren?",
            placeholder:
              "Zum Beispiel: eine kurze Abschlussfrage oder bewusstere Differenzierung ...",
          },
        ],
      },
      metaAward: {
        total: 2,
        kind: "deepening",
        dimension: "lernen",
        secondaryDimension: "leisten",
        secondaryPoints: 1,
        label: "Oeffne den Transfer vom Rueckblick in die Praxis.",
      },
      takeaway:
        "Rueckblick ist kein Zusatz am Rand. Er hilft dir, Erfahrungen in Entwicklung zu verwandeln.",
      estimatedMinutes: 5,
    },
    {
      id: "c5-kompass",
      type: "infoCard",
      eyebrow: "Profil",
      title: "Dein persoenlicher UeL-Kompass",
      prompt:
        "Im Abschlussprofil siehst du deinen Pflichtfortschritt und zugleich, welche Dimensionen dein UeL-Profil besonders praegen.",
      context:
        "Nutze den Button Status & Abschluss, sobald du deine Auswertung sehen moechtest. Die freiwilligen Vertiefungen darunter bleiben auch danach verfuegbar.",
      contextAward: {
        total: 2,
        kind: "deepening",
        dimension: "lernen",
        label: "Oeffne den Impuls zum persoenlichen UeL-Kompass.",
      },
      highlights: [
        "Nach 20 regulaeren Aufgaben ist die Lernreise abgeschlossen.",
        "Ab 55 Prozent in allen Bereichen: UeL-Kompass aktiviert.",
        "Ab 75 Prozent in allen Bereichen: Starkes UeL-Profil.",
        "Ab 90 Prozent in allen Bereichen: Reflexionsprofi.",
      ],
      takeaway:
        "Der Kompass bewertet dich nicht. Er macht sichtbar, wo du schon wirksam bist und wo ein naechster Lernschritt sinnvoll sein kann.",
      estimatedMinutes: 2,
    },
    {
      id: "c5-cta-uelc",
      type: "interactiveScene",
      eyebrow: "Naechster Schritt",
      title: "Dein naechster Schritt",
      prompt:
        "Wenn du merkst, dass dir diese Rolle liegt, kann aus Interesse ein Ausbildungsweg werden. Die UeL-C Ausbildung ist der naechste Schritt.",
      context:
        "Erkunde die Szene und oeffne danach die naechsten Materialien, Links und Kontaktwege fuer deinen Start.",
      taskTypeLabel: "Interaktive Bildszene",
      imageSrc: "/images/scenes/szene-cta-uelc.png",
      imageAlt:
        "Eine angehende Uebungsleiterin steht mit Klemmbrett in einer Sporthalle und blickt auf Aushaenge, waehrend im Hintergrund eine Gruppe aktiv ist.",
      placeholderLabel: "Szenenbild noch nicht hinterlegt",
      requiredHotspots: 2,
      hotspots: [
        {
          id: "infowand",
          label: "Infowand oder Kursbereich",
          x: 8,
          y: 41,
          dimension: "lernen",
          feedbackTitle: "Angebote finden",
          feedbackText:
            "Im Bildungsportal findest du passende UeL-C Module und Fortbildungen.",
        },
        {
          id: "aktive-gruppe",
          label: "Aktive Gruppe im Hintergrund",
          x: 55,
          y: 54,
          dimension: "lachen",
          feedbackTitle: "Warum es sich lohnt",
          feedbackText:
            "Uebungsleitende ermoeglichen Bewegung, Begegnung und Entwicklung im Verein.",
        },
        {
          id: "klemmbrett",
          label: "Klemmbrett oder Mappe",
          x: 69,
          y: 51,
          dimension: "lernen",
          feedbackTitle: "Deinen Weg planen",
          feedbackText:
            "Mit dem Laufzettel kannst du deine Module, Nachweise und naechsten Schritte festhalten.",
        },
        {
          id: "blick-nach-vorn",
          label: "Person mit Blick nach vorn",
          x: 70,
          y: 34,
          dimension: "leisten",
          feedbackTitle: "Rolle uebernehmen",
          feedbackText:
            "Der naechste Schritt ist nicht perfekt zu sein, sondern Verantwortung zu uebernehmen und sich weiterzuentwickeln.",
        },
      ],
      followUp: {
        type: "callToAction",
        title: "Jetzt UeL-C Weg starten",
        text:
          "Du hast dich mit deiner Übungsleiterrolle auseinandergesetzt. Wenn du diesen Weg weitergehen möchtest, findest du hier die nächsten Schritte.",
        promptKey: "cta_next_step",
        promptLabel: "Mein naechster konkreter Schritt ist:",
        promptPlaceholder:
          "Zum Beispiel: Ich schaue ins Bildungsportal, lade den Laufzettel herunter und melde mich bei Steve Sander.",
        submitLabel: "Nächsten Schritt sichern",
        notebookField: "furtherDevelopment",
        actions: [
          {
            id: "cta-checklist",
            label: "UeL-C Laufzettel herunterladen",
            href: uelcResources.downloads.checklist,
            download: true,
          },
          {
            id: "cta-pathway",
            label: "UeL-C Ausbildungsweg ansehen",
            href: uelcResources.downloads.pathway,
            download: true,
          },
          {
            id: "cta-bildungsportal",
            label: "Zum Bildungsportal",
            href: uelcResources.links.bildungsportal,
            external: true,
          },
          {
            id: "cta-wissensnetz",
            label: "Zum Wissensnetz",
            href: uelcResources.links.wissensnetz,
            external: true,
          },
          {
            id: "cta-mail",
            label: "Kontakt aufnehmen",
            href: `mailto:${uelcResources.contact.email}`,
            external: true,
          },
        ],
      },
      takeaway:
        "Der naechste Schritt beginnt nicht mit Perfektion, sondern mit Orientierung und einem ersten konkreten Handeln.",
      estimatedMinutes: 3,
    },
    sceneBeutebuch,
  ],
};
