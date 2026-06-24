import { Chapter, Insight, Scene } from "@/lib/types";

type DeepDiveDefinition = {
  title: string;
  content: string;
};

type DeepDiveCatalog = Record<string, [DeepDiveDefinition, DeepDiveDefinition, DeepDiveDefinition]>;

const deepDiveCatalog: DeepDiveCatalog = {
  "c1-intro": [
    {
      title: "Vor der Stunde 3 Dinge klaeren",
      content:
        "Klaere vor jeder Stunde dein Ziel, den Bedarf der Gruppe und den Punkt, an dem du heute besonders aufmerksam sein willst. So planst du ruhiger und fokussierter.",
    },
    {
      title: "Meinen UeL-Rucksack fuellen",
      content:
        "Halte nach jeder Stunde eine Sache fest, die gut funktioniert hat, und eine Sache, die du ausprobieren willst. So entsteht Schritt fuer Schritt dein eigener Erfahrungsfundus.",
    },
    {
      title: "Lachen-Lernen-Leisten pruefen",
      content:
        "Pruefe schon in der Planung, ob deine Stunde Freude, etwas zu lernen und eine passende Herausforderung bereithaelt. Damit wird dein Angebot von Anfang an ausgewogener.",
    },
  ],
  "c1-selbstbild": [
    {
      title: "Mit einem kleinen Auftrag starten",
      content:
        "Uebernimm zuerst eine ueberschaubare Teilaufgabe wie Begruessung, Aufwaermen oder Abschluss. Das gibt Sicherheit und macht Verantwortung handhabbar.",
    },
    {
      title: "Unsicherheit sichtbar machen",
      content:
        "Schreib dir vor der Stunde auf, wobei du unsicher bist, und frage danach gezielt eine erfahrene Person. Rueckfragen machen dich klarer, nicht schwaecher.",
    },
    {
      title: "Ein realistisches Ziel setzen",
      content:
        "Formuliere dir ein konkretes Ziel wie: Ich erklaere heute eine Aufgabe kurz und verstaendlich. Solche kleinen Ziele machen Entwicklung beobachtbar.",
    },
  ],
  "c1-motivation": [
    {
      title: "Motivations-Check machen",
      content:
        "Frage dich ehrlich, was dich ins Anleiten zieht: Spass, Verantwortung, Sport weitergeben oder Gemeinschaft. So erkennst du, was deine Rolle traegt.",
    },
    {
      title: "Eigene Werte in Verhalten uebersetzen",
      content:
        "Wenn dir Wertschaetzung wichtig ist, plane dazu passendes Verhalten ein, zum Beispiel persoenliche Ansprache oder sichtbare Anerkennung. Werte werden erst im Handeln wirksam.",
    },
    {
      title: "Energiequellen erkennen",
      content:
        "Achte darauf, was dir nach einer Stunde Energie gibt. Von diesen Momenten solltest du bewusst mehr in deine Rolle holen.",
    },
  ],
  "c1-verantwortung": [
    {
      title: "Vorher Sicherheitsblick machen",
      content:
        "Pruefe Raum, Geraete, Schmuck, Kleidung, Notfalltelefon und Erste-Hilfe-Material vor dem Start. Ein kurzer Sicherheitsblick schafft Ruhe und Handlungssicherheit.",
    },
    {
      title: "Regeln verstaendlich machen",
      content:
        "Nenne eine Regel, begruende sie kurz und lass sie von der Gruppe wiederholen. So wird aus einer Ansage echte Orientierung.",
    },
    {
      title: "Eingreifen ueben",
      content:
        "Wenn Regeln verletzt werden, stoppe ruhig, erklaere die Regel erneut und waehle erst dann eine passende Konsequenz. So bleibst du klar und fair.",
    },
  ],
  "c2-willkommen": [
    {
      title: "Neue direkt einbinden",
      content:
        "Frage nach dem Namen, erklaere kurz, wo die Person stehen kann, und biete eine erste Partnerperson an. So sinkt die Unsicherheit schon in der ersten Minute.",
    },
    {
      title: "Startsignal nutzen",
      content:
        "Verwende immer dasselbe Signal fuer Aufmerksamkeit, zum Beispiel ein Handzeichen, einen Pfiff oder Musik aus. Wiederkehrende Signale geben Struktur.",
    },
    {
      title: "Erste Minute planen",
      content:
        "Setze Begruessung, Ueberblick und erste Bewegung bewusst, statt irgendwie zu beginnen. Der erste Eindruck praegt oft die ganze Stunde.",
    },
  ],
  "c2-freude": [
    {
      title: "Schnell ins Tun kommen",
      content:
        "Starte nach kurzer Erklaerung direkt mit einer einfachen Bewegungsform. Wer schnell aktiv wird, findet leichter in die Stunde.",
    },
    {
      title: "Einstieg niedrig halten",
      content:
        "Waehle eine Aufgabe, bei der niemand lange ueberlegen oder sich blossstellen muss. Niedrige Einstiegshuerden oeffnen Beteiligung.",
    },
    {
      title: "Erste Erfolgserlebnisse einbauen",
      content:
        "Plane eine Variante, bei der jede Person in den ersten Minuten etwas schafft. Fruehe Erfolgserlebnisse staerken Motivation und Zutrauen.",
    },
  ],
  "c2-wertschaetzend": [
    {
      title: "Erst beobachten, dann ansprechen",
      content:
        "Bewerte Unsicherheit oder Rueckzug nicht sofort, sondern frage erst: Was ist gerade los? So reagierst du genauer und fairer.",
    },
    {
      title: "Konkret loben",
      content:
        "Formuliere Anerkennung konkret, zum Beispiel: Du bist heute drangeblieben, obwohl es schwer war. Konkretes Lob wirkt glaubwuerdiger als ein pauschales Gut gemacht.",
    },
    {
      title: "Fehler nutzbar machen",
      content:
        "Biete bei Fehlern eine konkrete Alternative an, etwa einen kleineren Abstand oder ein ruhigeres Tempo. So wird aus dem Fehler ein naechster Lernschritt.",
    },
  ],
  "c2-beteiligung": [
    {
      title: "Mini-Entscheidungen geben",
      content:
        "Biete zwei Spielvarianten an und lass die Gruppe waehlen. Kleine Entscheidungen staerken Beteiligung, ohne die Stunde unruhig zu machen.",
    },
    {
      title: "Aufgaben verteilen",
      content:
        "Gib Teilnehmenden Aufgaben fuer Material, Zeit, Signal, Sicherheit oder Aufbau. So erleben sie Verantwortung konkret und aktiv.",
    },
    {
      title: "Wuensche abfragen",
      content:
        "Nutze am Ende eine kurze Frage wie: Was wollt ihr naechste Stunde wieder machen? Solche Rueckfragen geben dir Hinweise fuer Motivation und Planung.",
    },
  ],
  "c3-zielgruppe": [
    {
      title: "Vor der Planung drei Fragen stellen",
      content:
        "Frage dich vor der Planung: Was koennen sie, was wollen sie und was brauchen sie heute? Diese drei Fragen machen Planung zielgruppennaeher.",
    },
    {
      title: "Tagesform beobachten",
      content:
        "Muede, unruhig, zurueckhaltend oder ueberdreht: Solche Signale sind Planungsinformationen. Nimm sie ernst und passe Einstieg oder Belastung an.",
    },
    {
      title: "Nicht nur die Lauten sehen",
      content:
        "Achte bewusst auch auf stille, neue oder unsichere Teilnehmende. Gerade dort zeigen sich oft die wichtigsten Hinweise fuer gelingende Leitung.",
    },
  ],
  "c3-erklaeren": [
    {
      title: "Erklaerung auf 30 Sekunden kuerzen",
      content:
        "Nenne nur Ziel, wichtigste Regel und Startsignal. Kurze Erklaerungen erleichtern Verstehen und bringen die Gruppe schneller in Bewegung.",
    },
    {
      title: "Vormachen lassen",
      content:
        "Lass eine Person oder Kleingruppe die Aufgabe vormachen, bevor alle starten. Sichtbare Beispiele helfen oft mehr als lange Worte.",
    },
    {
      title: "Verstehen pruefen",
      content:
        "Frage: Wer kann die Aufgabe mit eigenen Worten erklaeren? So merkst du frueh, ob gehoert auch wirklich verstanden wurde.",
    },
  ],
  "c3-feedback": [
    {
      title: "Ich-Botschaft nutzen",
      content:
        "Beginne mit Formulierungen wie: Ich habe gesehen, dass... Das macht Feedback beobachtbar und weniger angreifend.",
    },
    {
      title: "Eine Sache korrigieren",
      content:
        "Gib nicht fuenf Hinweise auf einmal, sondern nur den wichtigsten naechsten Punkt. So bleibt Rueckmeldung nutzbar und ueberfordert nicht.",
    },
    {
      title: "Alternative anbieten",
      content:
        "Verbinde Feedback mit einer konkreten Idee fuer den naechsten Versuch. Rueckmeldung wird dann sofort in Handeln uebersetzbar.",
    },
  ],
  "c3-reflexion": [
    {
      title: "Eine Abschlussfrage stellen",
      content:
        "Nutze kurze Fragen wie: Was hat heute gut funktioniert? oder Was war schwierig? Solche Fragen helfen, Erfahrungen bewusst zu machen.",
    },
    {
      title: "Kurze Daumenabfrage nutzen",
      content:
        "Mit Daumen hoch, mittel oder runter bekommst du schnell Rueckmeldung zu Spass, Verstaendlichkeit oder Belastung. Das spart Zeit und macht Beteiligung leicht.",
    },
    {
      title: "Nächsten Schritt sichern",
      content:
        "Lass jede Person eine Sache nennen, die sie beim naechsten Mal wieder versucht. So bekommt Reflexion eine konkrete Richtung.",
    },
  ],
  "c4-differenzierung": [
    {
      title: "Drei Varianten vorbereiten",
      content:
        "Plane eine leichtere, normale und schwerere Variante, ohne Menschen in gut oder schlecht einzuteilen. So bleibt Differenzierung wertschätzend.",
    },
    {
      title: "Material veraendern",
      content:
        "Passe Abstand, Ballgroesse, Tempo, Partnerzahl oder Zielzone an. Schon kleine Materialveraenderungen koennen eine Aufgabe passender machen.",
    },
    {
      title: "Wahl ermoeglichen",
      content:
        "Lass Teilnehmende selbst eine passende Variante waehlen und spaeter wechseln. Wahlmoeglichkeiten foerdern Selbststeuerung und passende Belastung.",
    },
  ],
  "c4-steigerung": [
    {
      title: "Erst stabil, dann schwerer",
      content:
        "Lass eine Aufgabe erst sicher wiederholen, bevor Tempo, Druck oder Komplexitaet steigen. Stabilitaet schafft die Basis fuer sinnvolle Steigerung.",
    },
    {
      title: "Belastung dosieren",
      content:
        "Verändere Intensitaet, Dauer, Pause und Wiederholungen bewusst. So steuerst du nicht nur Anstrengung, sondern auch Lernerfolg.",
    },
    {
      title: "Sprechtest nutzen",
      content:
        "Koennen Teilnehmende noch sprechen, bekommst du eine einfache Rueckmeldung zur Belastung. Der Sprechtest ist niedrigschwellig und alltagstauglich.",
    },
  ],
  "c4-erfolge": [
    {
      title: "Fortschritt statt Vergleich loben",
      content:
        "Betone Veraenderung wie: Heute warst du sicherer als letzte Woche. So wird Entwicklung sichtbarer als blosser Leistungsvergleich.",
    },
    {
      title: "Kleine Erfolge sichtbar machen",
      content:
        "Benenne gelungene Wiederholungen, mutiges Ausprobieren oder gutes Helfen. Gerade kleine Erfolge geben Menschen Zutrauen.",
    },
    {
      title: "Leistung breiter sehen",
      content:
        "Anerkenne auch Fairness, Dranbleiben, Helfen und gute Entscheidungen. Leistung ist mehr als nur das Ergebnis.",
    },
  ],
  "c4-situationselastisch": [
    {
      title: "Plan B vorbereiten",
      content:
        "Halte fuer jede Stunde eine leichtere oder ruhigere Alternative bereit. So bist du handlungsfaehig, wenn Gruppe oder Rahmen anders reagieren als gedacht.",
    },
    {
      title: "Stoppsignal ernst nehmen",
      content:
        "Wenn viele nicht verstehen, unsicher sind oder ueberdrehen, stoppe die Aufgabe und sortiere neu. Fruehes Reagieren verhindert groessere Unruhe.",
    },
    {
      title: "Aenderung erklaeren",
      content:
        "Sage offen: Ich aendere das, weil wir mehr Platz, Sicherheit oder Ruhe brauchen. Transparenz schafft Akzeptanz fuer den neuen Weg.",
    },
  ],
  "c5-intro": [
    {
      title: "Nach jeder Stunde 3 Zeilen",
      content:
        "Halte kurz fest: Was war geplant, was ist passiert und was lerne ich daraus? Drei Zeilen reichen oft schon fuer einen klaren Rueckblick.",
    },
    {
      title: "Beobachtungen sammeln",
      content:
        "Notiere nicht nur Bewertungen, sondern konkrete Situationen. Je genauer du beobachtest, desto hilfreicher werden deine Schluesse.",
    },
    {
      title: "Ideenbank anlegen",
      content:
        "Sammle gute Spiele, Varianten, Fragen und Rituale. So waechst mit der Zeit dein eigener Werkzeugkasten fuer Uebungsstunden.",
    },
  ],
  "c5-rueckblick": [
    {
      title: "Direkt nach der Stunde notieren",
      content:
        "Notiere deinen Rueckblick moeglichst direkt nach der Stunde, solange die Situation frisch ist. So gehen wichtige Beobachtungen nicht verloren.",
    },
    {
      title: "Eine Aenderung festlegen",
      content:
        "Leite eine konkrete Veraenderung ab, zum Beispiel kuerzer erklaeren oder mehr Wahlmoeglichkeiten einbauen. Rueckblick wird so handlungswirksam.",
    },
    {
      title: "Rueckmeldung einholen",
      content:
        "Frage eine Person: Was war heute fuer dich hilfreich? Solche kurzen Rueckmeldungen erweitern deinen Blick auf die Stunde.",
    },
  ],
  "c5-kompass": [
    {
      title: "Drei Leitsaetze formulieren",
      content:
        "Formuliere fuer dich drei Leitsaetze wie: klar sein, wertschätzend bleiben, Sicherheit zuerst. Sie helfen dir, deine Rolle zu verdichten.",
    },
    {
      title: "Kompass bei Stress nutzen",
      content:
        "Wenn es unruhig wird, frage dich kurz: Was ist jetzt mein wichtigster Auftrag? Ein klarer Kompass hilft besonders in dichten Momenten.",
    },
    {
      title: "Werte sichtbar machen",
      content:
        "Uebersetze Werte in beobachtbares Verhalten, zum Beispiel Namen kennen, ausreden lassen oder niemanden blossstellen. So wird Haltung im Alltag greifbar.",
    },
  ],
  "c5-cta-uelc": [
    {
      title: "Eine konkrete Ansprechperson finden",
      content:
        "Suche dir eine konkrete Person im Verein, Sportbund oder Lehrteam. Ein direkter Kontakt macht den naechsten Schritt leichter.",
    },
    {
      title: "Nächsten Termin suchen",
      content:
        "Schau dir ein konkretes Bildungsangebot an, statt nur spaeter darueber nachzudenken. Sichtbare Termine machen Vorhaben verbindlicher.",
    },
    {
      title: "Mini-Verbindlichkeit schaffen",
      content:
        "Trage dir einen kleinen naechsten Schritt ein, zum Beispiel Anmeldung pruefen, Verein fragen oder Material lesen. Verbindlichkeit beginnt oft sehr klein.",
    },
  ],
  "c5-gruppengefuehl": [
    {
      title: "Teamziel statt Einzelsieg",
      content:
        "Stelle eine Aufgabe so, dass die Gruppe gemeinsam ein Ziel erreicht. Zum Beispiel: Alle müssen gemeinsam eine Station bewältigen, eine Zielzahl sammeln oder eine Bewegungsfolge schaffen. Dadurch zählt nicht nur die Einzelleistung, sondern das gemeinsame Gelingen.",
    },
    {
      title: "Rollen sichtbar machen",
      content:
        "Gruppengefühl entsteht leichter, wenn jede Person eine Aufgabe hat. Eine Person führt aus, eine sichert, eine zählt, eine motiviert oder beobachtet. Wichtig ist, die Rollen regelmäßig zu wechseln, damit alle beteiligt bleiben.",
    },
    {
      title: "Hilfe klar absprechen",
      content:
        "Hilfestellungen brauchen klare Absprachen. Teilnehmende sollen wissen, wo geholfen werden darf, was sicher ist und was sich für die Person gut anfühlt. Unterstützung soll stärken, nicht unangenehm werden.",
    },
  ],
  "c5-rolle": [
    {
      title: "Nach schwierigen Situationen fragen",
      content:
        "Frage dich nach herausfordernden Momenten: Was war mein Anteil, was lag an der Gruppe und was aendere ich? So wird Reflexion konkret.",
    },
    {
      title: "Rolle bewusst waehlen",
      content:
        "Pruefe, ob du gerade fuehren, begleiten, beobachten oder beraten solltest. Nicht jede Situation braucht dieselbe Art von Leitung.",
    },
    {
      title: "Nicht perfekt sein muessen",
      content:
        "Korrigiere einen Fehler offen und lerne daraus. Souveraen wirkt nicht Fehlerfreiheit, sondern der ruhige Umgang damit.",
    },
  ],
  "c5-challenge": [
    {
      title: "Schwierigkeit staffeln",
      content:
        "Biete dieselbe Grundaufgabe mit unterschiedlichen Abstaenden, Tempi oder Zusatzregeln an. So entstehen echte Challenge-Level ohne Aussonderung.",
    },
    {
      title: "Selbstwahl erlauben",
      content:
        "Lass Teilnehmende Level 1, 2 oder 3 selbst waehlen und spaeter wechseln. Selbstwahl erleichtert passendes Fordern.",
    },
    {
      title: "Mut statt Druck foerdern",
      content:
        "Fordere heraus, aber lass auch Rueckzug oder eine leichtere Variante zu. Gute Challenge braucht Wahlfreiheit und Sicherheit.",
    },
  ],
  "c5-humor": [
    {
      title: "Ueber Situationen lachen, nicht ueber Personen",
      content:
        "Humor darf Spannung loesen, aber niemanden klein machen. Entscheidend ist, worueber gelacht wird.",
    },
    {
      title: "Humor als Spannungsloeser nutzen",
      content:
        "Nach einem Missgeschick kann ein freundlicher Kommentar entlasten und den Neustart erleichtern. Humor hilft dann, wieder handlungsfaehig zu werden.",
    },
    {
      title: "Grenzen beobachten",
      content:
        "Wenn jemand still wird, rot wird oder sich zurueckzieht, war der Witz wahrscheinlich nicht passend. Humor braucht Aufmerksamkeit fuer Reaktionen.",
    },
  ],
  "c5-perspektive": [
    {
      title: "Teilnehmendenfrage stellen",
      content:
        "Frage offen: Wie kam die Aufgabe bei euch an? So erweiterst du deine Sicht um die Perspektive der Gruppe.",
    },
    {
      title: "Eltern- oder Vereinssicht kurz pruefen",
      content:
        "Manche Erwartungen wirken von aussen auf die Stunde. Ein kurzer Perspektivwechsel hilft, Spannungen frueher zu erkennen.",
    },
    {
      title: "Missverstaendnisse klaeren",
      content:
        "Reagiere nicht sofort, sondern frage nach: Wie hast du das gemeint? Nachfragen verhindert, dass du auf Vermutungen steuerst.",
    },
  ],
  "c5-trainingsprinzip": [
    {
      title: "Ziel vor Uebung klaeren",
      content:
        "Bestimme zuerst, was trainiert werden soll: Ausdauer, Kraft, Koordination, Beweglichkeit oder Schnelligkeit. Erst das Ziel macht die Uebung passend.",
    },
    {
      title: "Reiz passend setzen",
      content:
        "Eine Aufgabe soll fordern, aber zur Gruppe passen. Trainingswirkung entsteht nicht durch Haerte allein, sondern durch passende Reize.",
    },
    {
      title: "Variation nutzen",
      content:
        "Wiederhole Aufgaben, veraendere dabei aber Raum, Tempo, Partner, Geraet oder Rhythmus. Variation haelt Lernen lebendig und Belastung steuerbar.",
    },
  ],
  "c5-motivation": [
    {
      title: "Motive abfragen",
      content:
        "Frage: Warum seid ihr heute hier oder Was macht euch daran Spass? Solche Fragen geben dir Hinweise fuer passgenaue Gestaltung.",
    },
    {
      title: "Nicht alle gleich motivieren",
      content:
        "Manche suchen Leistung, andere Gemeinschaft, Ausgleich oder Sicherheit. Motivation wird staerker, wenn du diese Unterschiede beachtest.",
    },
    {
      title: "Wiederkommen erleichtern",
      content:
        "Plane jede Stunde so, dass mindestens ein positives Erlebnis moeglich ist. Wiederkehr entsteht oft aus solchen kleinen Erfolgen.",
    },
  ],
  "c5-peer-feedback": [
    {
      title: "Beobachtungsauftrag geben",
      content:
        "Formuliere klar, worauf geachtet werden soll, zum Beispiel nur auf den Absprung. So wird Peer-Feedback konkreter und hilfreicher.",
    },
    {
      title: "Feedbacksatz vorgeben",
      content:
        "Ein Satzmuster wie Ich habe gesehen..., hilfreich waere... erleichtert wertschätzende Rueckmeldung. Struktur hilft besonders bei ungeuebtem Feedback.",
    },
    {
      title: "Kurz halten",
      content:
        "Eine Beobachtung, eine Idee und dann wieder ausprobieren. Peer-Feedback wirkt besser kurz und direkt im Bewegungsfluss.",
    },
  ],
  "c5-sicherheitscheck": [
    {
      title: "5-Finger-Regel nutzen",
      content:
        "Gefahren erkennen, informieren, Regeln klaeren, beobachten und eingreifen: Diese einfache Reihenfolge hilft, Sicherheit aktiv mitzudenken.",
    },
    {
      title: "Belastung einfach pruefen",
      content:
        "Beobachte Atmung, Sprechtest, Gesichtsausdruck und Pausenverhalten. So bekommst du schnell alltagstaugliche Belastungsrueckmeldungen.",
    },
    {
      title: "Sicherheitsrollen vergeben",
      content:
        "Verteile kleine Rollen wie Schmuckwaechter, Materialcheck, Signalgeber oder Abstandskontrolle. So wird Sicherheit fuer die Gruppe sichtbarer.",
    },
  ],
  "c5-ritual": [
    {
      title: "Start immer gleich beginnen",
      content:
        "Begrüßung, kurzer Ueberblick und erstes Bewegungssignal duerfen sich wiederholen. Rituale schaffen Verlaesslichkeit und Orientierung.",
    },
    {
      title: "Abschlussfrage ritualisieren",
      content:
        "Eine wiederkehrende Abschlussfrage wie Was nimmst du heute mit? erleichtert kurze Reflexionen. So wird Rueckblick zu einem festen Teil der Stunde.",
    },
    {
      title: "Ritual passend halten",
      content:
        "Kinder brauchen oft andere Formen als Erwachsene. Ein gutes Ritual ist kurz, klar und fuer die Zielgruppe gut wiederholbar.",
    },
  ],
  "c5-beutebuch": [
    {
      title: "Eine Erkenntnis sichern",
      content:
        "Halte eine klare Erkenntnis fest, zum Beispiel: Heute habe ich gelernt, dass... So bleibt Wichtiges nicht nur im Kopf.",
    },
    {
      title: "Eine Situation beschreiben",
      content:
        "Beschreibe kurz, was passiert ist, wie du reagiert hast und was die Wirkung war. Konkrete Situationen sind lernwirksamer als pauschale Urteile.",
    },
    {
      title: "Praxisschritt ableiten",
      content:
        "Leite direkt ab, was du beim naechsten Mal konkret probieren willst. So wird aus einem Gedanken ein umsetzbarer Schritt.",
    },
  ],
  "c5-fallbeispiel": [
    {
      title: "Erst sortieren",
      content:
        "Pruefe zuerst, ob es vor allem um Sicherheit, Motivation, Regel, Ueberforderung oder Beziehung geht. Sortieren hilft, den Kern des Problems zu sehen.",
    },
    {
      title: "Mehrere Loesungen pruefen",
      content:
        "Unterscheide zwischen dem, was sofort hilft, und dem, was langfristig traegt. Gute Entscheidungen verbinden beides, statt nur akut zu reagieren.",
    },
    {
      title: "Entscheidung begruenden",
      content:
        "Ein klares Ich mache das, weil... schafft Transparenz und Handlungssicherheit. Begruendete Entscheidungen wirken auf Gruppe und Leitung zugleich stabilisierend.",
    },
  ],
};

function buildInsights(sceneId: string, items: [DeepDiveDefinition, DeepDiveDefinition, DeepDiveDefinition]): Insight[] {
  return items.map((item, index) => ({
    id: `${sceneId}.deepDive.${index + 1}`,
    category: "praxis",
    triggerType: "card",
    triggerLabel: item.title,
    title: item.title,
    content: item.content,
    points: 1,
  }));
}

export const sceneDeepDiveMap: Record<string, Insight[]> = Object.fromEntries(
  Object.entries(deepDiveCatalog).map(([sceneId, items]) => [sceneId, buildInsights(sceneId, items)]),
);

export const allDeepDiveIds = Object.values(sceneDeepDiveMap).flatMap((insights) =>
  insights.map((insight) => insight.id),
);

export function getSceneDeepDives(sceneId: string) {
  return sceneDeepDiveMap[sceneId] ?? [];
}

export function getSceneDeepDiveIds(sceneId: string) {
  return getSceneDeepDives(sceneId).map((insight) => insight.id);
}

export function getDeepDiveBonusId(sceneId: string) {
  return `${sceneId}.deepDive.bonus`;
}

export function hasCompletedSceneDeepDiveBonus(sceneId: string, openedInsightIds: string[]) {
  const sceneInsightIds = getSceneDeepDiveIds(sceneId);
  return sceneInsightIds.length > 0 && sceneInsightIds.every((id) => openedInsightIds.includes(id));
}

export function attachDeepDivesToScene<T extends Scene>(scene: T): T {
  return {
    ...scene,
    insights: getSceneDeepDives(scene.id),
  };
}

export function attachDeepDivesToChapter(chapter: Chapter): Chapter {
  return {
    ...chapter,
    scenes: chapter.scenes.map((scene) => attachDeepDivesToScene(scene)),
  };
}

export function getDeepDiveSceneIds() {
  return Object.keys(sceneDeepDiveMap);
}
