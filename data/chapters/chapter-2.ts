import { Chapter } from "@/lib/types";
import {
  sceneGruppengefuehl,
  sceneHumor,
  sceneMotivation,
  sceneRitual,
} from "@/data/optional-scenes";

export const chapter2: Chapter = {
  id: "menschen-erreichen-gemeinschaft",
  title: "Kapitel 2: Menschen erreichen und Gemeinschaft schaffen",
  shortTitle: "Gemeinschaft",
  description:
    "Du gestaltest Einstieg, Freude, Wertschaetzung und Beteiligung so, dass Menschen sich gesehen fuehlen und gern dabeibleiben.",
  objective:
    "Du staerkst Atmosphaere, Motivation und Zugehoerigkeit durch einen guten ersten Kontakt und passende kleine Beteiligungsmoeglichkeiten.",
  accent: "yellow",
  scenes: [
    {
      id: "c2-willkommen",
      type: "interactiveScene",
      eyebrow: "Pflichtaufgabe",
      title: "Der erste Eindruck",
      prompt:
        "Erkunde die Szene und achte darauf, was beim Ankommen sofort Atmosphaere, Orientierung und Sicherheit schafft.",
      context:
        "Gerade am Anfang entscheiden oft kleine Handlungen darueber, ob sich Menschen gesehen und eingeladen fuehlen.",
      contextAward: {
        total: 1,
        kind: "bonus",
        dimension: "lachen",
        label: "Oeffne den Impuls zum ersten Kontakt in der Halle.",
      },
      taskTypeLabel: "Interaktive Bildszene",
      primaryDimension: "lachen",
      points: 15,
      imageSrc: "/images/scenes/szene-ankommen-sporthalle.png",
      imageAlt:
        "Eine Uebungsleitung begruesst eine Gruppe in der Sporthalle und kommt mit mehreren Teilnehmenden ins erste Gespraech.",
      placeholderLabel: "Szenenbild noch nicht hinterlegt",
      requiredHotspots: 2,
      hotspots: [
        {
          id: "begruessung",
          label: "Aktive Begruessung",
          x: 18,
          y: 47,
          dimension: "lachen",
          feedbackTitle: "Ankommen beginnt mit Ansprache",
          feedbackText:
            "Wer Menschen aktiv begruesst, schafft sofort Beziehung und senkt die Hemmschwelle fuer die ersten Minuten.",
        },
        {
          id: "unsichere-person",
          label: "Unsichere Person am Rand",
          x: 88,
          y: 51,
          dimension: "lachen",
          feedbackTitle: "Unsicherheit wahrnehmen",
          feedbackText:
            "Gerade stillere oder neue Teilnehmende brauchen oft einen kurzen Blickkontakt oder eine einfache Ansprache, um einzusteigen.",
        },
        {
          id: "kleine-aufgabe",
          label: "Einfache Beteiligung beim Start",
          x: 57,
          y: 55,
          dimension: "lachen",
          feedbackTitle: "Niedrigschwellig einbinden",
          feedbackText:
            "Eine kleine Aufgabe wie Aufbauen, Material holen oder ein erster Partnerkontakt gibt sofort Orientierung und Zugehoerigkeit.",
        },
        {
          id: "raum-orientierung",
          label: "Klarer Raum und Materialstart",
          x: 20,
          y: 77,
          dimension: "leisten",
          feedbackTitle: "Orientierung entlastet",
          feedbackText:
            "Ein ueberschaubarer Aufbau hilft der Gruppe, schnell in Bewegung zu kommen, ohne lange suchen oder warten zu muessen.",
        },
      ],
      followUp: {
        type: "quiz",
        prompt: "Was ist in dieser Situation der beste erste Schritt?",
        options: [
          {
            id: "a",
            label: "Ich baue erst in Ruhe weiter auf und warte, bis alle da sind.",
            insight:
              "Das spart dir vielleicht zunaechst Energie, laesst aber wertvolle erste Kontaktmomente ungenutzt.",
          },
          {
            id: "c",
            label: "Ich sage nur kurz Hallo und starte spaeter mit der offiziellen Begruessung.",
            insight:
              "So bleibt der Einstieg eher formal. Beziehung und Sicherheit entstehen oft frueher.",
          },
          {
            id: "b",
            label:
              "Ich begruesse die Anwesenden aktiv, frage kurz nach Namen und binde sie niedrigschwellig ein.",
            insight:
              "Stark. Du schaffst Atmosphaere, nimmst Menschen wahr und gibst ihnen sofort einen Platz in der Stunde.",
            isBest: true,
          },
        ],
      },
      takeaway:
        "Willkommen beginnt nicht mit dem offiziellen Startsignal, sondern mit den ersten Sekunden in der Halle.",
      estimatedMinutes: 3,
    },
    {
      id: "c2-freude",
      type: "interactiveScene",
      eyebrow: "Pflichtaufgabe",
      title: "Freude an Bewegung ermoeglichen",
      prompt:
        "Erkunde die Szene und achte darauf, was einen spielerischen Bewegungseinstieg leicht, motivierend und gemeinschaftlich macht.",
      context:
        "Ein guter Start bringt Menschen in Bewegung, ohne sie mit langen Erklaerungen oder hohen Huerden auszubremsen.",
      contextAward: {
        total: 1,
        kind: "bonus",
        dimension: "lachen",
        secondaryDimension: "leisten",
        secondaryPoints: 1,
        label: "Oeffne den Impuls zum freudvollen Einstieg.",
      },
      taskTypeLabel: "Interaktive Bildszene",
      primaryDimension: "lachen",
      points: 15,
      imageSrc: "/images/scenes/szene-bewegungseinstieg-lachen.png",
      imageAlt:
        "Eine Gruppe startet locker und mit guter Stimmung in eine Bewegungsaufgabe in der Sporthalle.",
      placeholderLabel: "Szenenbild noch nicht hinterlegt",
      requiredHotspots: 2,
      hotspots: [
        {
          id: "aktive-gruppe",
          label: "Aktive Gruppe in Bewegung",
          x: 43,
          y: 47,
          dimension: "lachen",
          feedbackTitle: "Aktivierung statt Warten",
          feedbackText:
            "Menschen kommen leichter in Bewegung, wenn sie direkt etwas Einfaches tun koennen, statt lange zuzusehen.",
        },
        {
          id: "spielform",
          label: "Spielerische Aufgabe mit Ball",
          x: 39,
          y: 50,
          dimension: "lachen",
          feedbackTitle: "Spielerisch einsteigen",
          feedbackText:
            "Eine einfache Spielform senkt die Schwelle, bringt Kontakt in die Gruppe und sorgt oft sofort fuer Energie.",
        },
        {
          id: "uebungsleitung",
          label: "Zugewandte Uebungsleitung",
          x: 84,
          y: 42,
          dimension: "lachen",
          feedbackTitle: "Atmosphaere rahmen",
          feedbackText:
            "Offene Ansprache und sichtbare Freude der Uebungsleitung wirken oft direkt auf Motivation und Sicherheit.",
        },
        {
          id: "raum-marker",
          label: "Klare Bewegungsraeume",
          x: 52,
          y: 82,
          dimension: "leisten",
          feedbackTitle: "Orientierung im Start",
          feedbackText:
            "Ein klarer Raumaufbau hilft der Gruppe, schnell ins Tun zu kommen, ohne viele Rueckfragen zu brauchen.",
        },
      ],
      followUp: {
        type: "quiz",
        prompt: "Welche Gestaltung passt am besten zu einem freudvollen Einstieg?",
        options: [
          {
            id: "b",
            label:
              "Ich beginne mit einer einfachen, aktivierenden Bewegungsform mit Wahlmoeglichkeiten und schnellen Erfolgserlebnissen.",
            insight:
              "Stark. So entstehen Sicherheit, Aktivierung und oft auch sichtbare Freude an Bewegung.",
            isBest: true,
          },
          {
            id: "a",
            label:
              "Ich erklaere zuerst den kompletten Ablauf der Stunde, damit wirklich alle Bescheid wissen.",
            insight:
              "Orientierung ist wichtig, aber ein langer Redeanteil nimmt dem Einstieg oft Energie.",
          },
          {
            id: "c",
            label:
              "Ich starte direkt mit einer technisch anspruchsvollen Aufgabe, damit alle sofort konzentriert sind.",
            insight:
              "Ein hoher Anspruch kann gerade zu Beginn eher bremsen als aktivieren.",
          },
        ],
      },
      takeaway:
        "Freude an Bewegung entsteht oft durch einen niedrigschwelligen Start mit spuerbarem Gelingen.",
      estimatedMinutes: 3,
    },
    {
      id: "c2-wertschaetzend",
      type: "scenario",
      eyebrow: "Pflichtaufgabe",
      title: "Wertschaetzend reagieren",
      prompt:
        "Beim Vormachen einer neuen Uebung bricht eine Teilnehmerin nach zwei Versuchen ab und sagt: 'Ich kann das sowieso nicht.'",
      context: "Wie reagierst du wertschaetzend und zugleich hilfreich?",
      taskTypeLabel: "Szenario mit Entscheidung",
      primaryDimension: "lachen",
      points: 15,
      options: [
        {
          id: "a",
          label: "Ich sage: 'Doch, das ist leicht. Versuch es einfach noch einmal.'",
          insight:
            "Gut gemeint, aber die Rueckmeldung nimmt die Unsicherheit nicht wirklich ernst.",
        },
        {
          id: "b",
          label:
            "Ich bestaetige die Schwierigkeit, biete eine leichtere Variante an und lobe den Versuch.",
          insight:
            "Stark. Du entlastest, haeltst die Person im Lernprozess und machst einen naechsten Schritt moeglich.",
          isBest: true,
        },
        {
          id: "c",
          label: "Ich gehe weiter, damit die Gruppe nicht aufgehalten wird.",
          insight:
            "So bleibt die Stunde vielleicht im Fluss, die Person erlebt aber eher Rueckzug als Unterstuetzung.",
        },
      ],
      takeaway:
        "Wertschaetzung heisst nicht, Schwierigkeit kleinzureden, sondern einen naechsten Schritt anzubieten.",
      estimatedMinutes: 3,
    },
    {
      id: "c2-beteiligung",
      type: "scenario",
      eyebrow: "Pflichtaufgabe",
      title: "Teilnehmende beteiligen",
      prompt:
        "Fuer den Hauptteil hast du zwei passende Spielformen vorbereitet. Die Gruppe ist aufmerksam und gut dabei.",
      context: "Wie nutzt du die Situation sinnvoll?",
      metaAward: {
        total: 2,
        kind: "deepening",
        dimension: "lachen",
        secondaryDimension: "lernen",
        secondaryPoints: 1,
        label: "Oeffne den Transfer zu Beteiligung und Mitentscheidung.",
      },
      taskTypeLabel: "Szenario mit Entscheidung",
      primaryDimension: "lachen",
      points: 15,
      options: [
        {
          id: "a",
          label: "Ich entscheide allein, damit keine Zeit verloren geht.",
          insight:
            "Das kann effizient wirken, nimmt der Gruppe aber eine gute Beteiligungschance.",
        },
        {
          id: "c",
          label: "Ich frage nur die lautesten Teilnehmenden nach ihrer Meinung.",
          insight:
            "So entsteht scheinbar Beteiligung, aber nicht unbedingt ein gutes Bild der ganzen Gruppe.",
        },
        {
          id: "b",
          label:
            "Ich stelle beide Optionen kurz vor und lasse die Gruppe mit einem schnellen Zeichen mitentscheiden.",
          insight:
            "Stark. Beteiligung erhoeht oft Motivation und gibt dir zugleich Hinweise auf Beduerfnisse der Gruppe.",
          isBest: true,
        },
      ],
      takeaway:
        "Kleine Wahlmoeglichkeiten koennen eine Stunde sofort dialogischer und motivierender machen.",
      estimatedMinutes: 3,
    },
    sceneRitual,
    sceneMotivation,
    sceneHumor,
    sceneGruppengefuehl,
  ],
};
