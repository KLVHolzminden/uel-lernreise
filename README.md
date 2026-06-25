# Dein Weg zur Übungsleiterrolle

Interaktive Next.js-Lernreise für angehende oder neue Übungsleitende im Sportverein. Die App verbindet einen regulären Lernweg mit freiwilligen Vertiefungen, interaktiven Bildszenen und einem lokalen Reflexions-Notizbuch.

Die Webversion startet mit einer vorgeschalteten Zugangsstrecke:

1. Hero-Seite mit „Welcher ÜL-Typ bist du?“
2. Zugangscode-Prüfung
3. Willkommensseite mit lokal gespeicherter Namenseingabe und Datenschutzhinweis
4. Lernreise
5. Abschluss, Status und lokaler Abschlussnachweis

## Projektziel

Die Lernreise unterstützt Übungsleitende dabei,

- Atmosphäre, Motivation und Beziehung bewusst zu gestalten
- Lernprozesse zielgruppenorientiert zu planen und zu reflektieren
- Belastung, Differenzierung und Erfolgserlebnisse passend zu steuern

Der Pflichtweg umfasst **17 reguläre Aufgaben** in **4 Kapiteln**. Zusätzlich gibt es **12 freiwillige Vertiefungen**.

## Stack

- Next.js 15 mit App Router
- React 19
- TypeScript
- Tailwind CSS
- Framer Motion
- `localStorage` für Fortschritt, Antworten, Reflexionen und Notizbuch

## Lokale Entwicklung

```bash
npm install
npm run dev
```

Standardmäßig startet die App lokal auf [http://localhost:3500](http://localhost:3500).

Für die lokale Entwicklung ist serverseitig ein Demo-Hash hinterlegt. Für produktive Deployments muss `ACCESS_CODE_HASHES` in Vercel gesetzt werden.

Für Zugriff aus dem lokalen Netzwerk:

```bash
npm run dev:host
```

## Build und Vorschau

```bash
npm run build
npm run start
```

Auch der Produktionsstart läuft standardmäßig auf Port `3500`.

## Projektstruktur

- `app/`: Next.js App Router und globale Styles
- `components/learning/`: Startseite, Aufgabenkarten, Kapitelübersicht, Notizbuch und Abschlussansicht
- `data/chapters/`: Inhalte der Lernreise
- `data/task-structure.ts`: zentrale Zuordnung aller regulären und optionalen Aufgaben
- `data/resources.ts`: CTA-Materialien, Downloads und Kontakt
- `lib/`: Typen, Speicherlogik und Fortschrittsberechnung
- `public/downloads/`: eingebundene Begleitmaterialien und ÜL-C-PDFs
- `public/images/scenes/`: Bilddateien für interaktive Hotspot-Szenen

## Lernlogik

- **Pflichtfortschritt** zählt nur die 17 regulären Aufgaben.
- **Freiwillige Vertiefungen** zählen nicht zum Pflichtfortschritt und blockieren keinen Abschluss.
- **Praxisimpulse** liegen innerhalb jeder Aufgabe unter `Warum ist das wichtig?` als drei interne `Mehr erfahren`-Fenster.
- **Profilbalken** für `Lachen`, `Lernen` und `Leisten` werden getrennt berechnet.
- Jede Aufgabe stärkt ihren Hauptbereich mit `+2`, weitere Wirkungsbereiche mit jeweils `+1`.
- Jeder geöffnete Praxisimpuls bringt `+1` separaten Vertiefungspunkt.
- Wenn alle drei Praxisimpulse einer Aufgabe geöffnet wurden, kommt einmalig `+1` Bonus hinzu.
- Praxisimpulse verändern weder Pflichtfortschritt noch Profilbalken.
- Bereits gespeicherte Aufgaben werden über ihre stabilen IDs erneut erkannt und beim Laden des Profils berücksichtigt.

## Freiwillige Vertiefungen und Praxisimpulse

- Freiwillige Vertiefungen werden in der Kapitelübersicht in einem eigenen Bereich **„Freiwillige Vertiefungen“** angezeigt.
- Werden nach der fachlich zugehörigen regulären Aufgabe freigeschaltet.
- Können direkt nach einer regulären Aufgabe gestartet oder später über die Kapitelübersicht geöffnet werden.
- Führen nach Abschluss zurück in den regulären Lernweg oder zur Übersicht, ohne Sackgassen.
- Jede der 32 Aufgaben enthält zusätzlich genau drei interne Praxisimpulse.
- Praxisimpulse öffnen sich als interne Modal-Fenster, nicht als externe Links.
- Bereits geöffnete Praxisimpulse bleiben nach Reload lokal gespeichert und werden nicht doppelt gewertet.

## Lokale Speicherung

Die App verwendet kein Login und keine externe Datenübertragung. Gespeichert werden ausschließlich lokal im Browser:

- validierter Zugangszustand, nicht der Zugangscode selbst
- Name für den Abschlussnachweis
- aktueller Fortschritt
- bearbeitete Aufgaben
- Antworten und Reflexionen
- Notizbuch-Einträge
- geöffnete Praxisimpulse
- Transferfrage aus der Abschlussansicht

Aktueller Storage-Key:

- `lsb-uel-rolle-lernreise`
- `lsb-uel-rolle-access`
- `lsb-uel-rolle-participant`

Alte Keys werden beim Laden nach Möglichkeit migriert.

## Zugangscode-Konzept

Die Codeprüfung läuft über die Serverless API Route:

- `POST /api/verify-access`

Der eingegebene Code wird nur an diese Route gesendet, dort mit SHA-256 gehasht und mit den konfigurierten Hashes verglichen. Im Browser wird anschließend nur `accessGranted: true` lokal gespeichert, nicht der Code.

Environment Variable:

```env
ACCESS_CODE_HASHES=kommagetrennte-sha256-hashes
```

Hash für einen neuen Code erzeugen:

```bash
node -e "const crypto=require('crypto'); console.log(crypto.createHash('sha256').update('DEIN-CODE','utf8').digest('hex'))"
```

Für die lokale Entwicklung gibt es einen serverseitigen Demo-Hash. Vor Vercel-Deployment bitte eigene Codes verwenden und den Hash in `ACCESS_CODE_HASHES` hinterlegen.

## Datenschutzkonzept der Lernreise

Die Lernreise nutzt eine vorgeschaltete Zugangscode-Prüfung und einen verständlichen Datenschutzhinweis auf der Willkommensseite. Der eingegebene Name wird nur lokal im Browser gespeichert und ausschließlich für den lokal erzeugten Abschlussnachweis verwendet.

Fortschritt, Antworten, Reflexionen, Notizbuch-Einträge, Punkte, Profilwerte und Praxisimpulse bleiben lokal im Browser. Über die Funktion **„Lernreise zurücksetzen“** können diese lokalen Daten gelöscht werden.

An den Betreiber werden keine personenbezogenen Lernverläufe, Namen, Antworten, Punkte, Profilwerte oder Notizen übertragen. Die App kann lediglich eine anonyme Nutzungs- beziehungsweise Abschlussmeldung senden, um die Nutzung und Abschlüsse der Lernreise grob zählen zu können.

Der Abschlussnachweis wird lokal erzeugt und nicht automatisch versendet. Die allgemeine Datenschutzerklärung des KSB Holzminden ist in der App verlinkt:

[Allgemeine Datenschutzerklärung des KSB Holzminden](https://ksb-holzminden.de/datenschutzerklaerung/)

## Anonyme Abschlussmeldung

Beim Abschluss sendet die App einmalig pro lokalem Browser eine anonyme Meldung an:

- `POST /api/report-completion`

Gesendet werden nur:

- `courseId`
- `courseVersion`
- `completion: true`

Die Route ergänzt serverseitig einen Timestamp. Sie nimmt bewusst keine personenbezogenen Daten, Antworten, Punkte, Profilwerte oder Notizen an. Aktuell wird die Meldung nur serverseitig geloggt. Für eine dauerhafte Zählung können später z. B. Vercel KV, Supabase, Neon oder ein datensparsamer Form-/Sheet-Endpoint angebunden werden.

## Abschlussnachweis

Die Abschlussansicht bietet einen lokalen, druckbaren Abschlussnachweis. Dieser enthält:

- lokal gespeicherten Namen
- Datum
- Titel „Welcher ÜL-Typ bist du?“
- Hinweis auf die Orientierung zur Übungsleiter*innen-Rolle

Der Nachweis wird nicht automatisch versendet.

## Environment Variables

Siehe `.env.example`:

```env
ACCESS_CODE_HASHES=
COURSE_ID=uel-lernreise
COURSE_VERSION=1.0.0
CONTACT_EMAIL=steve.sander@ksb-holzminden.de
COMPLETION_STORE=
```

## Eingebundene Materialien

Folgende Materialien liegen unter `public/downloads/` und sind in der Lernreise eingebunden:

- `notizbuch-digital.pdf`
- `UEL_C_Grafik_Alternative_3.pdf`
- `LSB_Laufzettel_03_22.pdf`

Zusätzlich verlinkt die Abschluss-CTA auf:

- das [Bildungsportal des LSB Niedersachsen](https://bildungsportal.lsb-niedersachsen.de/angebotssuche)
- das [Wissensnetz des LSB Niedersachsen](https://wissensnetz.lsb-niedersachsen.de/)

## Szenenbilder

Für die interaktiven Bildszenen erwartet die App folgende Dateien im Ordner `public/images/scenes/`:

- `szene-ankommen-sporthalle.png`
- `szene-erklaeren-lernen.png`
- `szene-differenzierung-leisten.png`
- `szene-bewegungseinstieg-lachen.png`
- `szene-feedback-lernen.png`
- `szene-situationselastisch-leisten.png`
- `szene-reflexion-abschluss.png`
- `szene-cta-uelc.png`

Wichtig für Next.js:

- Die Dateien müssen physisch im Ordner `public/images/scenes/` liegen.
- Im Code werden sie über Pfade wie `/images/scenes/szene-ankommen-sporthalle.png` eingebunden.
- Falls eine Datei fehlt, zeigt die App automatisch einen neutralen Platzhalter an.

## GitHub- und Vercel-Fähigkeit

Die Anwendung bleibt bewusst GitHub- und Vercel-fähig:

- keine fest verdrahteten `localhost`-Links im UI
- keine Serverpflicht für Nutzerdaten
- Standard-Next.js-Build mit `npm run build`

Empfohlener Ablauf:

1. Repository zu GitHub pushen.
2. Repository in Vercel importieren.
3. Framework automatisch als Next.js erkennen lassen.
4. Environment Variables in Vercel setzen, insbesondere `ACCESS_CODE_HASHES`.
5. Deploy ausführen.

## Bekannte Grenzen und nächste Schritte

- `npm run lint` nutzt aktuell noch `next lint`. In neueren Next-Versionen ist das interaktiv/deprecated; mittelfristig sollte auf ESLint CLI migriert werden.
- Die Abschlusszählung ist als API vorbereitet, aber noch nicht an einen dauerhaften Speicher angebunden.
- Zugangscodes werden serverseitig per Hash geprüft. Die Stärke hängt von ausreichend langen, nicht erratbaren Codes ab.

