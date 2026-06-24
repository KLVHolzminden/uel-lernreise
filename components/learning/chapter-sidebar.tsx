"use client";

import { CheckCircle2, CircleDashed, LockKeyhole, PlayCircle, Plus, Trophy } from "lucide-react";
import { getOptionalTaskIdsForChapter, getTaskDefinition, regularTaskIds } from "@/data/task-structure";
import { defaultProgress } from "@/lib/storage";
import { Chapter } from "@/lib/types";
import { getChapterOptionalProgress, getChapterTaskProgress } from "@/lib/progress";
import { cn, toGermanDisplayText } from "@/lib/utils";

type ChapterSidebarProps = {
  chapters: Chapter[];
  currentSceneId: string | null;
  completedSceneIds: string[];
  onJumpToScene: (sceneId: string) => void;
  canOpenCompletion: boolean;
  onOpenCompletion: () => void;
};

const dimensionClasses = {
  lachen: "border-[#f1d77a] bg-[#fff8dd] text-[#7e6300]",
  lernen: "border-[#b9d6b1] bg-[#eef8ea] text-[#2f6a39]",
  leisten: "border-[#f0b2a3] bg-[#fff1ec] text-[#9a3a2c]",
} as const;

function getSceneLookup(chapters: Chapter[]) {
  return new Map(chapters.flatMap((chapter) => chapter.scenes).map((scene) => [scene.id, scene]));
}

function isRegularUnlocked(sceneId: string, completedSceneIds: string[]) {
  const index = regularTaskIds.indexOf(sceneId);
  if (index <= 0) return true;
  return completedSceneIds.includes(regularTaskIds[index - 1]);
}

function isOptionalUnlocked(sceneId: string, completedSceneIds: string[]) {
  const definition = getTaskDefinition(sceneId);
  return Boolean(definition?.relatedRegularSceneId && completedSceneIds.includes(definition.relatedRegularSceneId));
}

function TaskButton({
  sceneId,
  title,
  currentSceneId,
  completedSceneIds,
  onJumpToScene,
}: {
  sceneId: string;
  title: string;
  currentSceneId: string | null;
  completedSceneIds: string[];
  onJumpToScene: (sceneId: string) => void;
}) {
  const definition = getTaskDefinition(sceneId);
  if (!definition) return null;

  const isOptional = definition.kind === "optional";
  const unlocked = isOptional
    ? isOptionalUnlocked(sceneId, completedSceneIds)
    : isRegularUnlocked(sceneId, completedSceneIds);
  const completed = completedSceneIds.includes(sceneId);
  const active = currentSceneId === sceneId;
  const colorClass = dimensionClasses[definition.primaryDimension];

  return (
    <button
      type="button"
      disabled={!unlocked}
      onClick={() => onJumpToScene(sceneId)}
      className={cn(
        "w-full rounded-2xl border px-3 py-3 text-left transition",
        isOptional ? "border-dashed" : "",
        active
          ? "border-pine bg-pine/6 shadow-sm"
          : unlocked
            ? "border-mist bg-white/78 hover:border-pine hover:bg-pine/5"
            : "cursor-not-allowed border-mist/70 bg-sand/20 text-slate/75",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={cn(
                "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.14em]",
                colorClass,
              )}
            >
              {isOptional ? <Plus className="h-3 w-3" /> : null}
              {toGermanDisplayText(definition.primaryDimension)}
            </span>
            {isOptional ? (
              <span className="rounded-full bg-sand px-2.5 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-slate">
                Optional
              </span>
            ) : null}
          </div>
          <p className="text-sm font-semibold text-ink">{toGermanDisplayText(title)}</p>
          {!unlocked && isOptional ? (
            <p className="text-xs leading-5 text-slate">
              Verfügbar, sobald die zugehörige reguläre Aufgabe bearbeitet wurde.
            </p>
          ) : null}
        </div>
        {completed ? (
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-pine" />
        ) : unlocked ? (
          <PlayCircle className="mt-0.5 h-4 w-4 shrink-0 text-slate" />
        ) : (
          <LockKeyhole className="mt-0.5 h-4 w-4 shrink-0 text-slate/65" />
        )}
      </div>
    </button>
  );
}

export function ChapterSidebar({
  chapters,
  currentSceneId,
  completedSceneIds,
  onJumpToScene,
  canOpenCompletion,
  onOpenCompletion,
}: ChapterSidebarProps) {
  const sceneLookup = getSceneLookup(chapters);
  const sidebarProgress = {
    ...defaultProgress,
    started: true,
    currentSceneId,
    completedSceneIds,
  };

  return (
    <aside className="max-h-[78vh] space-y-4 overflow-y-auto rounded-[28px] border border-white/70 bg-white/92 p-5 shadow-card backdrop-blur">
      <div className="space-y-1">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate">Lernreise</p>
        <h2 className="font-display text-2xl text-ink">Kapitel und Aufgaben</h2>
      </div>

      <div className="space-y-4">
        {chapters.map((chapter, index) => {
          const chapterProgress = getChapterTaskProgress(chapter.id, sidebarProgress);
          const optionalProgress = getChapterOptionalProgress(chapter.id, sidebarProgress);
          const chapterOptionalIds = getOptionalTaskIdsForChapter(chapter.id);
          const isActive = chapter.scenes.some((scene) => scene.id === currentSceneId);

          return (
            <section
              key={chapter.id}
              className={cn(
                "rounded-3xl border px-4 py-4",
                isActive ? "border-pine/25 bg-pine/5" : "border-mist bg-sand/25",
              )}
            >
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate">
                  Kapitel {index + 1}
                </p>
                <h3 className="text-lg font-semibold text-ink">{toGermanDisplayText(chapter.title)}</h3>
                <p className="text-sm leading-6 text-slate">{toGermanDisplayText(chapter.description)}</p>
                <div className="flex flex-wrap gap-3 text-xs font-medium text-slate">
                  <span>{chapterProgress.completed} / {chapterProgress.total} reguläre Aufgaben</span>
                  {chapterOptionalIds.length ? (
                    <span>{optionalProgress.completed} / {optionalProgress.total} Vertiefungen bearbeitet</span>
                  ) : null}
                </div>
              </div>

              <div className="mt-4 space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate">
                    <PlayCircle className="h-3.5 w-3.5" />
                    Regulärer Lernweg
                  </div>
                  <div className="grid gap-2">
                    {chapter.scenes
                      .filter((scene) => getTaskDefinition(scene.id)?.kind === "regular")
                      .map((scene) => (
                        <TaskButton
                          key={scene.id}
                          sceneId={scene.id}
                          title={scene.title}
                          currentSceneId={currentSceneId}
                          completedSceneIds={completedSceneIds}
                          onJumpToScene={onJumpToScene}
                        />
                      ))}
                  </div>
                </div>

                {chapterOptionalIds.length ? (
                  <div className="space-y-2 border-t border-mist/70 pt-3">
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate">
                      <CircleDashed className="h-3.5 w-3.5" />
                      Freiwillige Vertiefungen
                    </div>
                    <div className="grid gap-2">
                      {chapterOptionalIds.map((sceneId) => {
                        const scene = sceneLookup.get(sceneId);
                        if (!scene) return null;

                        return (
                          <TaskButton
                            key={sceneId}
                            sceneId={sceneId}
                            title={scene.title}
                            currentSceneId={currentSceneId}
                            completedSceneIds={completedSceneIds}
                            onJumpToScene={onJumpToScene}
                          />
                        );
                      })}
                    </div>
                  </div>
                ) : null}
              </div>
            </section>
          );
        })}
      </div>

      <button
        type="button"
        disabled={!canOpenCompletion}
        onClick={onOpenCompletion}
        className={cn(
          "flex w-full items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-semibold transition",
          canOpenCompletion
            ? "bg-ink text-white hover:bg-pine"
            : "cursor-not-allowed border border-mist bg-white text-slate",
        )}
      >
        <Trophy className="h-4 w-4" />
        Status & Abschluss
      </button>
    </aside>
  );
}
