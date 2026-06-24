"use client";

import { useState } from "react";
import {
  ArrowUpRight,
  ChevronDown,
  Download,
  ExternalLink,
  FileText,
  MapPinned,
  RotateCcw,
  Trophy,
} from "lucide-react";
import { ProgressBar } from "@/components/learning/progress-bar";
import { ContactCard } from "@/components/learning/contact-card";
import { uelcResources } from "@/data/resources";
import { InsightProgress, LearningPointProgress, PointSuggestion } from "@/lib/progress";
import { Course, DimensionScores, NotebookState, OptionalProgress, ProgressState } from "@/lib/types";
import { cn, formatReflectionLabel, getAward, getDimensionLabel, toGermanDisplayText } from "@/lib/utils";

type CompletionViewProps = {
  course: Course;
  participantName: string;
  progress: ProgressState;
  scores: DimensionScores;
  learningProgress: LearningPointProgress;
  optionalProgress: OptionalProgress;
  insightProgress: InsightProgress;
  pointSuggestions: PointSuggestion[];
  passed: boolean;
  notebook: NotebookState;
  onRestart: () => void;
  onResumeJourney: () => void;
  transferValue: string;
  onTransferChange: (value: string) => void;
};

type ProgressBandCopy = {
  title: string;
  summary: string;
  profileLook: string;
  strongestText: string;
  growthText: string;
  ctaIntro: string;
  practiceHint: string;
};

function getProgressBandCopy(
  percentage: number,
  strongestLabel: string | null,
  lowestLabel: string | null,
): ProgressBandCopy {
  if (percentage >= 100) {
    return {
      title: "Lernreise abgeschlossen",
      summary:
        "Du hast den regulären Lernweg abgeschlossen. Dein ÜL-Profil ist sichtbar geworden und zeigt, welche Perspektiven du besonders intensiv bearbeitet hast.",
      profileLook:
        "Dein ÜL-Profil ist sichtbar geworden. Es zeigt, welche Perspektiven du besonders intensiv bearbeitet hast.",
      strongestText: strongestLabel ? `Besonders stark zeigt sich ${strongestLabel}.` : "",
      growthText: lowestLabel ? `Für deine weitere Entwicklung lohnt sich ein Blick auf ${lowestLabel}.` : "",
      ctaIntro: "Dein ÜL-Kompass ist aktiviert. Jetzt kannst du daraus deinen Ausbildungsweg machen.",
      practiceHint:
        "Nutze deine sichtbaren Schwerpunkte bewusst und plane zugleich einen nächsten Entwicklungsschritt für die Praxis.",
    };
  }

  if (percentage >= 90) {
    return {
      title: "Fast geschafft",
      summary:
        "Dein ÜL-Profil ist bereits gut erkennbar. Mit wenigen weiteren Impulsen schließt du die Lernreise ab.",
      profileLook:
        "Dein ÜL-Profil ist bereits gut erkennbar. Mit wenigen weiteren Impulsen schließt du die Lernreise ab.",
      strongestText: strongestLabel ? `Besonders stark zeigt sich aktuell ${strongestLabel}.` : "",
      growthText: lowestLabel ? `Zur Abrundung lohnt sich noch ein Blick auf ${lowestLabel}.` : "",
      ctaIntro:
        "Du bist kurz vor dem Abschluss. Danach kannst du deine nächsten Schritte Richtung ÜL-C Ausbildung planen.",
      practiceHint:
        "Halte den klarsten Schwerpunkt fest und runde dein Profil mit einem bewussten Blick auf den offenen Bereich ab.",
    };
  }

  if (percentage >= 60) {
    return {
      title: "Dein Profil nimmt Form an",
      summary:
        "Deine Schwerpunkte werden erkennbar. Du kannst gezielt weiterarbeiten, um dein ÜL-Profil abzurunden.",
      profileLook:
        "Deine Schwerpunkte werden erkennbar. Du kannst gezielt weiterarbeiten, um dein ÜL-Profil abzurunden.",
      strongestText: strongestLabel ? `Aktuell zeigt sich ein Schwerpunkt bei ${strongestLabel}.` : "",
      growthText: lowestLabel ? `Weiterentwickeln kannst du besonders ${lowestLabel}.` : "",
      ctaIntro:
        "Dein ÜL-Kompass zeigt erste Schwerpunkte. Daraus können nächste Schritte entstehen.",
      practiceHint:
        "Nutze erkennbare Schwerpunkte bewusst und ergänze gezielt Aufgaben aus dem Bereich, den du weiterentwickeln willst.",
    };
  }

  if (percentage >= 25) {
    return {
      title: "Du bist auf dem Weg",
      summary:
        "Dein ÜL-Profil beginnt sich zu zeigen. Für eine verlässlichere Einschätzung solltest du noch weitere Aufgaben und Impulse bearbeiten.",
      profileLook:
        "Dein ÜL-Profil beginnt sich zu zeigen. Für eine verlässlichere Einschätzung solltest du noch weitere Aufgaben und Impulse bearbeiten.",
      strongestText: strongestLabel ? `Erste Tendenzen zeigen sich aktuell bei ${strongestLabel}.` : "",
      growthText: "",
      ctaIntro:
        "Dein ÜL-Kompass entsteht. Weitere Impulse helfen dir, klarer zu sehen, welche nächsten Schritte passen.",
      practiceHint:
        "Beobachte die ersten Tendenzen, aber stütze dein Bild auf weitere bearbeitete Aufgaben und Reflexionen.",
    };
  }

  return {
    title: "Du bist gestartet",
    summary:
      "Für ein belastbares ÜL-Profil brauchst du noch mehr Bearbeitung. Erste Impulse sind gesammelt, aber deine Schwerpunkte zeigen sich erst im weiteren Verlauf.",
    profileLook:
      "Für ein belastbares ÜL-Profil brauchst du noch mehr Bearbeitung. Erste Impulse sind gesammelt, aber deine Schwerpunkte zeigen sich erst im weiteren Verlauf.",
    strongestText:
      "Aktuell sind erst wenige Lernpunkte gesammelt. Bearbeite weitere Aufgaben, damit dein Profil aussagekräftiger wird.",
    growthText: "",
    ctaIntro: "Wenn du weiterarbeitest, entsteht Schritt für Schritt dein ÜL-Kompass.",
    practiceHint:
      "Sammle zuerst weitere Aufgaben und Beobachtungen. Dann lassen sich Stärken und Entwicklungsfelder verlässlicher einschätzen.",
  };
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export function CompletionView({
  course,
  participantName,
  progress,
  scores,
  learningProgress,
  optionalProgress,
  insightProgress,
  pointSuggestions,
  passed,
  notebook,
  onRestart,
  onResumeJourney,
  transferValue,
  onTransferChange,
}: CompletionViewProps) {
  const [showNotes, setShowNotes] = useState(false);
  const reflections = Object.entries(progress.reflections).filter(([, value]) => value.trim());
  const award = getAward(scores, course.passThreshold);
  const rankedDimensions = (Object.entries(scores) as Array<
    [keyof DimensionScores, DimensionScores[keyof DimensionScores]]
  >).sort((a, b) => b[1].completed - a[1].completed);
  const strongestDimension = rankedDimensions[0]?.[0];
  const lowestDimension = [...rankedDimensions].sort((a, b) => a[1].completed - b[1].completed)[0]?.[0];
  const strongestLabel = strongestDimension ? getDimensionLabel(strongestDimension) : null;
  const lowestLabel =
    lowestDimension && lowestDimension !== strongestDimension
      ? getDimensionLabel(lowestDimension)
      : null;
  const copy = getProgressBandCopy(learningProgress.percentage, strongestLabel, lowestLabel);
  const nextStep = progress.reflections.cta_next_step?.trim() || "";

  function exportReflections() {
    const content = [
      toGermanDisplayText(course.title),
      toGermanDisplayText(course.subtitle),
      "",
      `Status: ${toGermanDisplayText(copy.title)}`,
      `Pflichtfortschritt: ${learningProgress.completed} / ${learningProgress.total} reguläre Aufgaben`,
      `Freiwillige Vertiefungen: ${optionalProgress.completed} / ${optionalProgress.total}`,
      `Praxisimpulse: ${insightProgress.points} / ${insightProgress.totalPoints} Punkte (${insightProgress.discovered} geöffnet, ${insightProgress.completedTaskBonuses} Bonuspunkte)`,
      "",
      "ÜL-Profil",
      `Lachen: ${scores.lachen.completed}% (${scores.lachen.points}/${scores.lachen.maxPoints})`,
      `Lernen: ${scores.lernen.completed}% (${scores.lernen.points}/${scores.lernen.maxPoints})`,
      `Leisten: ${scores.leisten.completed}% (${scores.leisten.points}/${scores.leisten.maxPoints})`,
      "",
      "Persönlicher Profilblick",
      toGermanDisplayText(copy.profileLook),
      toGermanDisplayText(copy.strongestText),
      toGermanDisplayText(copy.growthText),
      "",
      `Stärkste Dimension: ${strongestDimension ? getDimensionLabel(strongestDimension) : "-"}`,
      `Entwicklungsdimension: ${lowestDimension ? getDimensionLabel(lowestDimension) : "-"}`,
      "",
      "Transfer in die Praxis",
      transferValue || "Noch nicht ausgefüllt",
      "",
      "Reflexionsnotizen",
      ...reflections.map(([key, value]) => `${formatReflectionLabel(key)}: ${value}`),
    ].join("\n");

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "uel-profil-lernreise.txt";
    anchor.click();
    URL.revokeObjectURL(url);
  }

  function printCertificate() {
    const date = new Intl.DateTimeFormat("de-DE", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(new Date());
    const safeName = escapeHtml(participantName.trim() || "Teilnehmende*r");
    const certificateHtml = `<!doctype html>
<html lang="de">
<head>
  <meta charset="utf-8" />
  <title>Abschlussnachweis</title>
  <style>
    body { font-family: Georgia, "Times New Roman", serif; color: #112033; margin: 0; padding: 48px; }
    .certificate { border: 2px solid #112033; border-radius: 28px; padding: 48px; max-width: 840px; margin: 0 auto; }
    h1 { font-size: 42px; margin: 0 0 32px; }
    p { font-size: 20px; line-height: 1.65; }
    .meta { margin-top: 36px; font-size: 18px; }
    .hint { margin-top: 36px; font-size: 16px; color: #53616f; }
  </style>
</head>
<body>
  <section class="certificate">
    <h1>Abschlussnachweis</h1>
    <p><strong>${safeName}</strong> hat die Lernreise „Welcher ÜL-Typ bist du?“ abgeschlossen.</p>
    <p>Die Lernreise dient der Orientierung auf dem Weg zur Übungsleiter*innen-Rolle und verbindet die Perspektiven Lachen, Lernen und Leisten.</p>
    <p class="meta">Datum: ${date}</p>
    <p class="hint">Zur Vorlage im Rahmen der Anerkennung von Lerneinheiten.</p>
  </section>
  <script>window.print();</script>
</body>
</html>`;
    const printWindow = window.open("", "_blank", "noopener,noreferrer");
    if (!printWindow) return;
    printWindow.document.write(certificateHtml);
    printWindow.document.close();
  }

  return (
    <section className="learning-status-page rounded-[32px] border border-white/70 bg-white/92 p-6 shadow-soft backdrop-blur md:p-8">
      <div className="grid gap-6 md:grid-cols-[1.08fr_0.92fr]">
        <div className="space-y-5">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-pine">
            Abschluss und Auswertung
          </p>
          <h2 className="font-display text-4xl leading-tight text-ink">{toGermanDisplayText(copy.title)}</h2>
          <p className="max-w-[42rem] text-lg leading-8 text-ink/90">{toGermanDisplayText(copy.summary)}</p>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-3xl border border-pine/15 bg-pine/5 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-pine">
                Pflichtfortschritt
              </p>
              <p className="mt-3 text-3xl font-semibold text-ink">
                {learningProgress.completed} / {learningProgress.total}
              </p>
              <p className="mt-2 text-sm leading-6 text-slate">
                {passed
                  ? "Du hast alle regulären Aufgaben bearbeitet."
                  : `Dir fehlen noch ${learningProgress.remaining} reguläre Aufgaben.`}
              </p>
            </div>

            <div className="rounded-3xl border border-mist bg-[#f8fafb] p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate">
                Freiwillige Vertiefungen
              </p>
              <p className="mt-3 text-3xl font-semibold text-ink">
                {optionalProgress.completed} / {optionalProgress.total}
              </p>
              <p className="mt-2 text-sm leading-6 text-slate">
                Sie schärfen dein Profil, sind aber keine Voraussetzung für den Abschluss.
              </p>
            </div>

            <div className="rounded-3xl border border-mist bg-[#f8fafb] p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate">
                Praxisimpulse
              </p>
              <p className="mt-3 text-3xl font-semibold text-ink">
                {insightProgress.points} / {insightProgress.totalPoints}
              </p>
              <p className="mt-2 text-sm leading-6 text-slate">
                {insightProgress.discovered} geöffnet, {insightProgress.completedTaskBonuses} Bonuspunkte
                durch vollständige Dreiergruppen. Diese Punkte verändern den Pflichtfortschritt
                und die Profilbalken nicht.
              </p>
            </div>
          </div>

          <div className="space-y-4 rounded-3xl border border-mist bg-[#f8fafb] p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate">
              Dein ÜL-Profil
            </p>
            <ProgressBar value={scores.lachen.ratio} label="Lachen" dimension="lachen" />
            <ProgressBar value={scores.lernen.ratio} label="Lernen" dimension="lernen" />
            <ProgressBar value={scores.leisten.ratio} label="Leisten" dimension="leisten" />
          </div>

          <div className="rounded-3xl border border-mist bg-white/80 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate">Profilblick</p>
            <div className="mt-2 space-y-2 text-base leading-7 text-ink">
              <p>{toGermanDisplayText(copy.profileLook)}</p>
              {copy.strongestText ? <p>{toGermanDisplayText(copy.strongestText)}</p> : null}
              {copy.growthText ? <p>{toGermanDisplayText(copy.growthText)}</p> : null}
            </div>
          </div>

          {!passed && pointSuggestions.length ? (
            <div className="rounded-3xl border border-[#f1d77a] bg-[#fff8dd] p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8a6c00]">
                Diese offenen Impulse bringen dich weiter
              </p>
              <div className="mt-3 space-y-2 text-sm leading-6 text-ink">
                {pointSuggestions.map((suggestion) => (
                  <p key={suggestion.id}>{toGermanDisplayText(suggestion.label)}</p>
                ))}
              </div>
            </div>
          ) : null}

          <div className="rounded-3xl border border-[#f1d77a] bg-[#fff8dd] p-5">
            <p className="text-sm leading-7 text-ink">{toGermanDisplayText(copy.ctaIntro)}</p>
          </div>

          <label className="grid gap-2 rounded-3xl border border-mist bg-white/80 p-5">
            <span className="text-sm font-semibold text-ink">
              Ein konkreter Schritt für meine nächste Übungsstunde:
            </span>
            <textarea
              value={transferValue}
              onChange={(event) => onTransferChange(event.target.value)}
              rows={4}
              placeholder="Zum Beispiel: Ich starte mit einer kurzen Begrüßungsaufgabe und biete beim Hauptteil zwei Leistungsniveaus an."
              className="min-h-[120px] rounded-3xl border border-mist bg-sand/30 px-4 py-4 text-base leading-7 text-ink outline-none transition focus:border-pine"
            />
          </label>

          <div className="rounded-3xl border border-mist bg-sand/30 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate">
              Dein Notizbuch-Auszug
            </p>
            <div className="mt-3 space-y-3 text-sm leading-6 text-ink">
              <p>
                <strong>Stärke:</strong> {notebook.strengths.trim() || "Noch keine Stärke notiert."}
              </p>
              <p>
                <strong>Unsicherheit oder Entwicklungsfrage:</strong>{" "}
                {notebook.uncertainties.trim() || notebook.questions.trim() || "Noch nichts festgehalten."}
              </p>
              <p>
                <strong>Nächster Praxisschritt:</strong>{" "}
                {transferValue.trim() || notebook.tryOut.trim() || "Noch kein konkreter Praxisschritt notiert."}
              </p>
              <p>
                <strong>Nächster Schritt Richtung ÜL-C:</strong>{" "}
                {nextStep || "Noch kein nächster Schritt festgehalten."}
              </p>
            </div>
          </div>

          {reflections.length ? (
            <div className="rounded-3xl border border-mist bg-white/75">
              <button
                type="button"
                onClick={() => setShowNotes((current) => !current)}
                className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
              >
                <span className="text-sm font-semibold text-ink">Gespeicherte Reflexionen</span>
                <ChevronDown
                  className={cn("h-4 w-4 text-slate transition-transform", showNotes && "rotate-180")}
                />
              </button>
              {showNotes ? (
                <div className="grid gap-3 border-t border-mist px-4 py-4 md:grid-cols-2">
                  {reflections.map(([key, value]) => (
                    <div key={key} className="rounded-2xl bg-sand/35 p-4">
                      <p className="text-sm font-semibold text-ink">{formatReflectionLabel(key)}</p>
                      <p className="mt-2 text-sm leading-6 text-slate">{value}</p>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          ) : null}
        </div>

        <div className="peripheral-ui space-y-4 rounded-[28px] bg-ink p-6 text-white shadow-card">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
              Auszeichnung
            </p>
            <p className="mt-3 text-2xl font-semibold">
              {award ?? "Dein Profil entwickelt sich weiter"}
            </p>
            <p className="mt-2 text-sm leading-6 text-white/80">
              Ab 55 Prozent in allen Bereichen: ÜL-Kompass aktiviert. Ab 75 Prozent: Starkes
              ÜL-Profil. Ab 90 Prozent: Reflexionsprofi.
            </p>
          </div>

          <div className="rounded-3xl bg-white/8 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
              Praxishinweis
            </p>
            <div className="mt-3 space-y-3 text-sm leading-6 text-white/88">
              <p>{toGermanDisplayText(copy.practiceHint)}</p>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <button
              type="button"
              onClick={exportReflections}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-ink transition hover:bg-sand"
            >
              <Download className="h-4 w-4" />
              Profil als Text exportieren
            </button>
            <button
              type="button"
              onClick={printCertificate}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-ink transition hover:bg-sand"
            >
              <Download className="h-4 w-4" />
              Abschlussnachweis drucken
            </button>
            <button
              type="button"
              onClick={onResumeJourney}
              className="flex w-full items-center justify-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/5"
            >
              <Trophy className="h-4 w-4" />
              Zur Lernreise
            </button>
            <button
              type="button"
              onClick={onRestart}
              className="flex w-full items-center justify-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/5"
            >
              <RotateCcw className="h-4 w-4" />
              Lernreise neu starten
            </button>
          </div>
        </div>
      </div>

      <section className="mt-8 space-y-5 rounded-[32px] border border-white/70 bg-white/88 p-6 shadow-soft backdrop-blur md:p-8">
        <div className="max-w-[48rem] space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-pine">
            Nächster Schritt
          </p>
          <h3 className="font-display text-4xl leading-tight text-ink">
            Dein nächster Schritt zur ÜL-C Lizenz
          </h3>
          <p className="text-base leading-7 text-slate">
            Du hast dich mit deiner Rolle als Übungsleitung auseinandergesetzt. Wenn du diesen Weg
            weitergehen möchtest, ist die ÜL-C Ausbildung der nächste sinnvolle Schritt.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          <div className="rounded-3xl border border-mist bg-[#f8fafb] p-5 xl:col-span-2">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-sand p-2 text-ink">
                <MapPinned className="h-4 w-4" />
              </div>
              <p className="text-sm font-semibold text-ink">So ist der Weg aufgebaut</p>
            </div>
            <div className="mt-4 space-y-3 text-sm leading-6 text-slate">
              <p>Die ÜL-C Ausbildung besteht aus C-30, C-40 und C-50 Flex.</p>
              <p>Insgesamt sind 120 LE erforderlich.</p>
              <p>
                Zusätzlich gehören Erste Hilfe, Hospitation, Praxiscoaching und die
                Verhaltensrichtlinie Prävention sexualisierte Gewalt dazu.
              </p>
              <p>Die Reihenfolge ist flexibel. Der Laufzettel hilft dir, deine Nachweise zu sammeln.</p>
            </div>
          </div>

          <div className="rounded-3xl border border-mist bg-white p-5">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-sand p-2 text-ink">
                <FileText className="h-4 w-4" />
              </div>
              <p className="text-sm font-semibold text-ink">Ausbildungsweg</p>
            </div>
            <p className="mt-4 text-sm leading-6 text-slate">
              Die Grafik gibt dir eine visuelle Orientierung über die Bausteine auf dem Weg zur
              ÜL-C Lizenz.
            </p>
            <a
              href={uelcResources.downloads.pathway}
              download
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white transition hover:bg-pine"
            >
              <Download className="h-4 w-4" />
              ÜL-C Ausbildungsweg ansehen
            </a>
          </div>

          <div className="rounded-3xl border border-mist bg-white p-5">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-sand p-2 text-ink">
                <FileText className="h-4 w-4" />
              </div>
              <p className="text-sm font-semibold text-ink">Laufzettel</p>
            </div>
            <p className="mt-4 text-sm leading-6 text-slate">
              Mit dem Laufzettel kannst du deine Module, Fortbildungen, Hospitation,
              Praxiscoaching und weiteren Nachweise im Blick behalten.
            </p>
            <a
              href={uelcResources.downloads.checklist}
              download
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white transition hover:bg-pine"
            >
              <Download className="h-4 w-4" />
              Laufzettel für meine ÜL-C Lizenz herunterladen
            </a>
          </div>

          <div className="rounded-3xl border border-mist bg-white p-5">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-sand p-2 text-ink">
                <ExternalLink className="h-4 w-4" />
              </div>
              <p className="text-sm font-semibold text-ink">Weitergehen</p>
            </div>
            <div className="mt-4 space-y-4">
              <div>
                <p className="text-sm font-semibold text-ink">ÜL-C Angebote suchen</p>
                <p className="mt-1 text-sm leading-6 text-slate">
                  Im Bildungsportal findest du passende Aus- und Fortbildungen des LSB Niedersachsen.
                </p>
                <a
                  href={uelcResources.links.bildungsportal}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex items-center gap-2 rounded-full border border-mist bg-white px-4 py-2 text-sm font-semibold text-ink transition hover:border-pine hover:text-pine"
                >
                  Zum Bildungsportal
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
              <div>
                <p className="text-sm font-semibold text-ink">Weiter informieren</p>
                <p className="mt-1 text-sm leading-6 text-slate">
                  Im Wissensnetz findest du weiterführende Informationen, Materialien und Orientierung rund
                  um Qualifizierung und Vereinsarbeit.
                </p>
                <a
                  href={uelcResources.links.wissensnetz}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex items-center gap-2 rounded-full border border-mist bg-white px-4 py-2 text-sm font-semibold text-ink transition hover:border-pine hover:text-pine"
                >
                  Zum Wissensnetz
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <ContactCard />
      </section>
    </section>
  );
}


