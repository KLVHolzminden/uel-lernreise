"use client";

import { useState } from "react";
import { ArrowRight, ChevronDown, Flame, Leaf, Smile } from "lucide-react";
import { ExperienceStatus } from "@/components/learning/experience-status";
import { NotebookPanel } from "@/components/learning/notebook-panel";
import { ProgressBar } from "@/components/learning/progress-bar";
import { LearningPointProgress } from "@/lib/progress";
import { Course, DimensionScores, ExperienceProgress, NotebookState, PointsAward, ProgressState } from "@/lib/types";
import { cn, toGermanDisplayText } from "@/lib/utils";

type StartScreenProps = {
  course: Course;
  progress: ProgressState;
  scores: DimensionScores;
  learningProgress: LearningPointProgress;
  experience: ExperienceProgress;
  notebook: NotebookState;
  onNotebookChange: (field: keyof NotebookState, value: string) => void;
  onAwardPoints: (awards: PointsAward[]) => void;
  onNotebookIntroSeen?: () => void;
  onStart: () => void;
  onResume: () => void;
  notice?: string | null;
};

export function StartScreen({
  course,
  progress,
  scores,
  learningProgress,
  experience,
  notebook,
  onNotebookChange,
  onAwardPoints,
  onNotebookIntroSeen,
  onStart,
  onResume,
  notice,
}: StartScreenProps) {
  const [showGuide, setShowGuide] = useState(false);
  const hasProgress = progress.started && progress.completedSceneIds.length > 0;

  return (
    <section className="rounded-[40px] border border-white/70 bg-white/86 p-6 shadow-soft backdrop-blur md:p-8 xl:p-10">
      <div className="grid gap-8 xl:grid-cols-[minmax(0,1.35fr)_360px]">
        <div className="space-y-8">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-pine">
              Interaktive Lernreise
            </p>
            <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate">
              <span className="rounded-full bg-sand px-3 py-1.5">{learningProgress.total} reguläre Aufgaben im Lernweg</span>
              <span className="rounded-full bg-sand px-3 py-1.5">ohne Login</span>
              <span className="rounded-full bg-sand px-3 py-1.5">lokal gespeichert</span>
            </div>
            <h1 className="max-w-[13ch] font-display text-5xl leading-[0.98] text-ink md:text-6xl xl:text-7xl">
              {toGermanDisplayText(course.title)}
            </h1>
            <p className="max-w-[42rem] text-lg leading-8 text-ink/88 md:text-xl">
              {toGermanDisplayText(course.subtitle)}
            </p>
            <div className="max-w-[40rem] space-y-1 text-base leading-8 text-slate">
              <p>Gute Übungsstunden entstehen nicht nur durch Übungen.</p>
              <p>Du gestaltest Atmosphäre, ermöglichst Lernen und dosierst Belastung.</p>
              <p>Der Pflichtweg umfasst {learningProgress.total} reguläre Aufgaben. Freiwillige Vertiefungen schärfen zusätzlich dein Profil.</p>
            </div>
            {notice ? (
              <div className="max-w-[34rem] rounded-3xl border border-pine/15 bg-pine/5 px-4 py-3 text-sm leading-6 text-ink">
                {notice}
              </div>
            ) : null}
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-[28px] border border-[#f1d77a] bg-[#fff8dd] p-6">
              <Smile className="h-6 w-6 text-[#8a6c00]" />
              <h2 className="mt-4 text-xl font-semibold text-ink">Lachen</h2>
              <p className="mt-3 text-base leading-7 text-slate">Atmosphäre. Freude. Beziehung.</p>
            </div>
            <div className="rounded-[28px] border border-[#b9d6b1] bg-[#eef8ea] p-6">
              <Leaf className="h-6 w-6 text-[#2f6a39]" />
              <h2 className="mt-4 text-xl font-semibold text-ink">Lernen</h2>
              <p className="mt-3 text-base leading-7 text-slate">Verstehen. Feedback. Reflexion.</p>
            </div>
            <div className="rounded-[28px] border border-[#f0b2a3] bg-[#fff1ec] p-6">
              <Flame className="h-6 w-6 text-[#a83e2d]" />
              <h2 className="mt-4 text-xl font-semibold text-ink">Leisten</h2>
              <p className="mt-3 text-base leading-7 text-slate">Belastung. Differenzierung. Erfolg.</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={hasProgress ? onResume : onStart}
              className="inline-flex min-h-12 items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition hover:bg-pine"
            >
              {hasProgress ? "Lernreise fortsetzen" : "Lernreise starten"}
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setShowGuide((current) => !current)}
              className="inline-flex min-h-12 items-center gap-2 rounded-full border border-mist bg-white px-6 py-3 text-sm font-semibold text-ink transition hover:border-pine hover:text-pine"
            >
              So funktioniert es
              <ChevronDown className={cn("h-4 w-4 transition-transform", showGuide && "rotate-180")} />
            </button>
            {hasProgress ? (
              <button
                type="button"
                onClick={onStart}
                className="inline-flex min-h-12 items-center rounded-full border border-mist bg-white px-6 py-3 text-sm font-semibold text-ink transition hover:border-pine hover:text-pine"
              >
                Neu beginnen
              </button>
            ) : null}
          </div>

          {showGuide ? (
            <div className="max-w-[48rem] rounded-[30px] border border-mist bg-sand/35 p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate">
                So funktioniert die Lernreise
              </p>
              <div className="mt-3 space-y-2 text-sm leading-7 text-slate">
                <p>Der Pflichtfortschritt richtet sich nur nach den {learningProgress.total} regulären Aufgaben.</p>
                <p>Lachen, Lernen und Leisten bleiben als Profilbalken sichtbar.</p>
                <p>Die Erfahrungsstufe verdichtet dieselben Punkte zu einem kompakten Lernstand.</p>
                <p>Freiwillige Vertiefungen stärken dein Profil, zählen aber nicht zum Pflichtfortschritt.</p>
                <p>Dein Notizbuch bleibt lokal gespeichert und begleitet dich als Reflexionshilfe.</p>
              </div>
            </div>
          ) : null}
        </div>

        <div className="space-y-4 xl:pl-2">
          <div className="peripheral-ui rounded-[30px] border border-white/70 bg-white/64 p-5 shadow-card backdrop-blur">
            <ExperienceStatus experience={experience} compact className="mb-4" />
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate">
              Pflichtfortschritt
            </p>
            <div className="mt-4 rounded-[24px] bg-ink px-4 py-4 text-white">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/68">
                Reguläre Aufgaben
              </p>
              <p className="mt-2 text-2xl font-semibold">
                {learningProgress.completed} / {learningProgress.total}
              </p>
              <p className="mt-2 text-sm leading-6 text-white/78">
                {hasProgress
                  ? "Fortschritt und Notizen sind in diesem Browser gespeichert."
                  : "Du startest mit einem klaren Fokus und kannst den Pflichtweg Schritt für Schritt bearbeiten."}
              </p>
            </div>
            <div className="mt-4 space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate">
                Dein ÜL-Profil
              </p>
              <ProgressBar value={scores.lachen.ratio} label="Lachen" dimension="lachen" />
              <ProgressBar value={scores.lernen.ratio} label="Lernen" dimension="lernen" />
              <ProgressBar value={scores.leisten.ratio} label="Leisten" dimension="leisten" />
            </div>
          </div>

          <NotebookPanel
            notebook={notebook}
            onChange={onNotebookChange}
            awardedPointIds={progress.awardedPointIds}
            onAwardPoints={onAwardPoints}
            defaultSection="profile"
            compact
            className="bg-white/76"
            downloadHref="/downloads/notizbuch-digital.pdf"
            introSeen={progress.notebookIntroSeen ?? false}
            onIntroSeen={onNotebookIntroSeen}
          />
        </div>
      </div>
    </section>
  );
}


