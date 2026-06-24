# Deployment mit GitHub und Vercel

## 1. GitHub-Repository anlegen

1. Neues Repository in GitHub erstellen.
2. Projekt lokal in dieses Repository pushen:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <DEIN_GITHUB_REPO_URL>
git push -u origin main
```

## 2. Projekt in Vercel importieren

1. Bei Vercel anmelden.
2. `Add New Project` wählen.
3. Das GitHub-Repository auswählen.
4. Framework-Erkennung auf `Next.js` belassen.
5. Projekt deployen.

## 3. Production und Preview verstehen

- `Production`: die Hauptversion, typischerweise aus dem `main`-Branch
- `Preview`: automatische Vorschau-Deployments für weitere Commits oder Branches

Für Testpersonen reicht in der Regel ein geschützter Preview- oder Production-Link.

## 4. Deployment Protection aktivieren

Für die Testphase ist kein internes App-Login nötig. Stattdessen in Vercel:

1. Projekt öffnen
2. `Settings`
3. Bereich `Deployment Protection`
4. Zugriffsschutz aktivieren

Danach kann der Zugriff auf Deployments geschützt werden.

## 5. Shareable Link für Testpersonen

Wenn Deployment Protection aktiv ist:

1. gewünschtes Deployment öffnen
2. Shareable Link erzeugen
3. diesen Link an Testpersonen versenden

So können externe Personen testen, ohne dass die App selbst ein eigenes Login benötigt.

## 6. Hinweise für den Testbetrieb

- Fortschritt wird pro Browser lokal gespeichert
- bei Tests mit mehreren Personen am gleichen Gerät am besten getrennte Browserprofile verwenden
- Änderungen an `main` lösen nach GitHub-Integration neue Deployments in Vercel aus
