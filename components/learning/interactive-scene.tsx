"use client";

import { useMemo, useState } from "react";
import { ArrowUpRight, CheckCircle2, ChevronDown, Download, ImageOff, MapPinned } from "lucide-react";
import { FocusDialog } from "@/components/learning/focus-dialog";
import { ContactCard } from "@/components/learning/contact-card";
import { SceneShell } from "@/components/learning/scene-shell";
import {
  Insight,
  InteractiveScene as InteractiveSceneType,
  InteractiveSceneAnswer,
  PointsAward,
} from "@/lib/types";
import { getSceneActionAwards, getSceneCoreAward } from "@/lib/progress";
import { cn, toGermanDisplayText } from "@/lib/utils";

type InteractiveSceneProps = {
  scene: InteractiveSceneType;
  savedAnswer?: InteractiveSceneAnswer;
  openedInsightIds: string[];
  awardedPointIds: string[];
  onAwardPoints: (awards: PointsAward[]) => void;
  onOpenInsight: (insight: Insight) => void;
  contextRail?: React.ReactNode;
  nextRail?: React.ReactNode;
  footerBar?: React.ReactNode;
  onOpenNotebook?: () => void;
  onOpenStatus?: () => void;
  onComplete: (
    answer: InteractiveSceneAnswer,
    reflections?: Record<string, string>,
    notebookUpdates?: Record<string, string>,
  ) => void;
};

function getSavedHotspots(savedAnswer?: InteractiveSceneAnswer) {
  return Array.isArray(savedAnswer?.visitedHotspotIds) ? savedAnswer.visitedHotspotIds : [];
}

function getImageFilename(imageSrc: string) {
  const segments = imageSrc.split("/").filter(Boolean);
  return segments[segments.length - 1] ?? imageSrc;
}

export function InteractiveScene({
  scene,
  savedAnswer,
  openedInsightIds,
  awardedPointIds,
  onAwardPoints,
  onOpenInsight,
  contextRail,
  nextRail,
  footerBar,
  onOpenNotebook,
  onOpenStatus,
  onComplete,
}: InteractiveSceneProps) {
  const [visitedHotspotIds, setVisitedHotspotIds] = useState<string[]>(getSavedHotspots(savedAnswer));
  const [selectedHotspotId, setSelectedHotspotId] = useState<string>("");
  const [followUpOpen, setFollowUpOpen] = useState(false);
  const [selectedOptionId, setSelectedOptionId] = useState<string>(savedAnswer?.selectedOptionId ?? "");
  const [reflectionValues, setReflectionValues] = useState<Record<string, string>>(
    savedAnswer?.reflections ?? {},
  );
  const [imageMissing, setImageMissing] = useState(false);
  const [showHotspotList, setShowHotspotList] = useState(false);
  const imageFilename = getImageFilename(scene.imageSrc);
  const actionAwards = getSceneActionAwards(scene);
  const coreAward = getSceneCoreAward(scene);

  const selectedHotspot = useMemo(
    () => scene.hotspots.find((hotspot) => hotspot.id === selectedHotspotId) ?? null,
    [scene.hotspots, selectedHotspotId],
  );
  const activeOption =
    scene.followUp.type === "quiz"
      ? scene.followUp.options.find((option) => option.id === selectedOptionId)
      : undefined;
  const minimumHotspots = scene.requiredHotspots ?? scene.minimumHotspots ?? 1;
  const minimumReached = visitedHotspotIds.length >= minimumHotspots;
  const requiredHotspotsReached = scene.requiredHotspotIds
    ? scene.requiredHotspotIds.every((hotspotId) => visitedHotspotIds.includes(hotspotId))
    : true;
  const isReadyForFollowUp = minimumReached && requiredHotspotsReached;
  const alreadyCompleted =
    Boolean(savedAnswer?.selectedOptionId) ||
    Object.values(savedAnswer?.reflections ?? {}).some((value) => value.trim().length > 0);

  function openHotspot(hotspotId: string) {
    setSelectedHotspotId(hotspotId);
    setVisitedHotspotIds((current) => (current.includes(hotspotId) ? current : [...current, hotspotId]));
  }

  function updateReflectionValue(key: string, value: string) {
    setReflectionValues((current) => ({
      ...current,
      [key]: value,
    }));
  }

  function completeQuiz() {
    onComplete({
      visitedHotspotIds,
      selectedOptionId,
    });
  }

  function completeReflection() {
    if (scene.followUp.type !== "reflection") return;

    const notebookUpdates = Object.fromEntries(
      Object.entries(scene.followUp.notebookBindings ?? {})
        .map(([promptId, notebookField]) => [
          notebookField,
          reflectionValues[promptId]?.trim() ?? "",
        ])
        .filter((entry): entry is [string, string] => typeof entry[1] === "string" && entry[1].length > 0),
    );

    onComplete(
      {
        visitedHotspotIds,
        reflections: reflectionValues,
      },
      reflectionValues,
      notebookUpdates,
    );
  }

  function completeCallToAction() {
    if (scene.followUp.type !== "callToAction") return;

    const promptKey = scene.followUp.promptKey;
    const promptValue = promptKey ? reflectionValues[promptKey]?.trim() ?? "" : "";
    const notebookUpdates =
      scene.followUp.notebookField && promptValue
        ? { [scene.followUp.notebookField]: promptValue }
        : undefined;
    const reflections = promptKey && promptValue ? { [promptKey]: promptValue } : undefined;

    onComplete(
      {
        visitedHotspotIds,
        reflections: reflectionValues,
      },
      reflections,
      notebookUpdates,
    );
  }

  const canSubmitReflection =
    scene.followUp.type === "reflection"
      ? scene.followUp.prompts.every((prompt) => (reflectionValues[prompt.id] ?? "").trim().length > 0)
      : true;
  const canSubmitCallToAction =
    scene.followUp.type === "callToAction"
      ? !scene.followUp.promptKey ||
        (reflectionValues[scene.followUp.promptKey] ?? "").trim().length > 0
      : true;

  return (
    <SceneShell
      {...scene}
      insights={scene.insights}
      openedInsightIds={openedInsightIds}
      onOpenInsight={onOpenInsight}
      learningPoints={coreAward.total}
      contextAward={actionAwards.context}
      metaAward={actionAwards.meta}
      recallAward={actionAwards.recall}
      awardedPointIds={awardedPointIds}
      onAwardPoints={onAwardPoints}
      contextRail={contextRail}
      nextRail={nextRail}
      footerBar={footerBar}
      onOpenNotebook={onOpenNotebook}
      onOpenStatus={onOpenStatus}
    >
      <div className="space-y-5">
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-sand px-3 py-1.5 text-sm font-semibold text-ink">
            {isReadyForFollowUp ? "Bild erkundet" : `Hotspots ${visitedHotspotIds.length}/${minimumHotspots}`}
          </span>
          <span className="rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-slate ring-1 ring-mist">
            {alreadyCompleted ? "Aufgabe bearbeitet" : "Bild zuerst"}
          </span>
        </div>

        <div className="grid gap-5 lg:grid-cols-[minmax(0,1.55fr)_minmax(280px,0.82fr)] xl:grid-cols-[minmax(0,1.7fr)_minmax(300px,0.74fr)]">
          <div className="overflow-hidden rounded-[32px] border border-mist bg-sand/25">
            <div className="relative aspect-[16/10] bg-[linear-gradient(180deg,rgba(17,32,51,0.03),rgba(255,255,255,0.16))] xl:aspect-[15/9]">
              {imageMissing ? (
                <div className="flex h-full items-center justify-center p-6">
                  <div className="max-w-sm rounded-[24px] border border-dashed border-mist bg-white/88 px-5 py-6 text-center shadow-sm">
                    <ImageOff className="mx-auto h-8 w-8 text-slate" />
                    <p className="mt-3 text-base font-semibold text-ink">
                      {`${toGermanDisplayText(scene.placeholderLabel ?? "Szenenbild noch nicht hinterlegt")}: ${imageFilename}`}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate">
                      Erwarteter Pfad: <code>{`public/images/scenes/${imageFilename}`}</code>
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  <img
                    src={scene.imageSrc}
                    alt={toGermanDisplayText(scene.imageAlt)}
                    className="h-full w-full object-cover"
                    onError={() => setImageMissing(true)}
                  />
                  {selectedHotspot ? (
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_78%,rgba(255,255,255,0)_0%,rgba(17,32,51,0.04)_42%,rgba(17,32,51,0.22)_100%)]" />
                  ) : null}
                  <div className="absolute inset-0">
                    {scene.hotspots.map((hotspot, index) => {
                      const isVisited = visitedHotspotIds.includes(hotspot.id);
                      const isActive = selectedHotspotId === hotspot.id;

                      return (
                        <button
                          key={hotspot.id}
                          type="button"
                          aria-label={`Hotspot ${index + 1}: ${toGermanDisplayText(hotspot.label)}`}
                          onClick={() => openHotspot(hotspot.id)}
                          className={cn(
                            "absolute flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-[3px] text-lg font-bold transition focus:outline-none focus:ring-4 focus:ring-white/80",
                            isActive
                              ? "z-20 scale-110 border-white bg-ink text-white shadow-[0_18px_42px_rgba(17,32,51,0.34)] ring-4 ring-white/70"
                              : isVisited
                                ? "z-10 border-white bg-pine text-white shadow-[0_12px_28px_rgba(17,32,51,0.24)]"
                                : "border-ink/25 bg-white/95 text-ink opacity-85 shadow-[0_8px_20px_rgba(17,32,51,0.18)] hover:border-pine hover:text-pine hover:opacity-100",
                          )}
                          style={{
                            left: `clamp(1.75rem, ${hotspot.x}%, calc(100% - 1.75rem))`,
                            top: `clamp(1.75rem, ${hotspot.y}%, calc(100% - 1.75rem))`,
                          }}
                        >
                          {index + 1}
                        </button>
                      );
                    })}
                  </div>
                </>
              )}
            </div>

            <div className="border-t border-mist bg-white px-5 py-4 shadow-[0_-10px_30px_rgba(17,32,51,0.08)] lg:hidden">
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-pine/10 p-2 text-pine">
                  <MapPinned className="h-5 w-5 shrink-0" />
                </div>
                <div>
                  <p className="text-lg font-semibold text-ink">Erkunde die Szene</p>
                  <p className="mt-1 text-base leading-7 text-ink/82">
                    Tippe auf einen markierten Bereich. Die Erklärung öffnet sich gut lesbar im Vordergrund.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="hidden rounded-[28px] border border-pine/15 bg-white/88 p-5 shadow-sm lg:block">
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-pine/10 p-2 text-pine">
                  <MapPinned className="h-5 w-5 shrink-0" />
                </div>
                <div>
                  <p className="text-base font-semibold uppercase tracking-[0.14em] text-pine">
                    Bild erkunden
                  </p>
                  <p className="mt-2 text-lg font-semibold leading-7 text-ink">
                    Wähle einen Hotspot im Bild
                  </p>
                  <p className="mt-2 text-base leading-7 text-ink/82">
                    Die zugehörige Erklärung öffnet sich groß im Vordergrund.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[28px] border border-mist bg-white/72">
              <button
                type="button"
                onClick={() => setShowHotspotList((current) => !current)}
                className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
              >
                <div>
                  <p className="text-sm font-semibold text-ink">Hotspots und Hinweise</p>
                  <p className="text-xs text-slate">Öffne die Liste nur, wenn du sie brauchst.</p>
                </div>
                <ChevronDown
                  className={cn("h-4 w-4 text-slate transition-transform", showHotspotList && "rotate-180")}
                />
              </button>

              {showHotspotList ? (
                <div className="grid gap-2 border-t border-mist px-4 py-4">
                  {scene.hotspots.map((hotspot, index) => {
                    const isVisited = visitedHotspotIds.includes(hotspot.id);
                    const isActive = selectedHotspotId === hotspot.id;

                    return (
                      <button
                        key={hotspot.id}
                        type="button"
                        onClick={() => openHotspot(hotspot.id)}
                        className={cn(
                          "flex items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-left transition",
                          isActive || isVisited
                            ? "border-pine bg-white text-ink"
                            : "border-mist bg-white/70 text-ink hover:border-sky",
                        )}
                      >
                        <span className="text-sm font-medium">
                          {index + 1}. {toGermanDisplayText(hotspot.label)}
                        </span>
                        {isVisited ? <CheckCircle2 className="h-4 w-4 shrink-0 text-pine" /> : null}
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="border-t border-mist px-4 py-4 text-sm leading-6 text-slate">
                  Tippe direkt im Bild auf die markierten Stellen. Die Liste bleibt als mobile Hilfe
                  und Zusatznavigation erreichbar.
                </div>
              )}
            </div>

            {isReadyForFollowUp ? (
              <>
                <button
                  type="button"
                  onClick={() => setFollowUpOpen(true)}
                  className="flex min-h-16 w-full items-center justify-center rounded-full bg-ink px-6 py-4 text-lg font-semibold text-white transition hover:bg-pine focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-pine/30"
                >
                  {scene.followUp.type === "quiz"
                    ? "Abschlussfrage öffnen"
                    : scene.followUp.type === "reflection"
                      ? "Reflexion öffnen"
                      : "Nächsten Schritt öffnen"}
                </button>
                <FocusDialog
                  open={followUpOpen}
                  onClose={() => setFollowUpOpen(false)}
                  eyebrow={
                    scene.followUp.type === "quiz"
                      ? "Abschlussfrage"
                      : scene.followUp.type === "reflection"
                        ? "Reflexion"
                        : "Nächster Schritt"
                  }
                  title={
                    scene.followUp.type === "quiz"
                      ? toGermanDisplayText(scene.followUp.prompt)
                      : toGermanDisplayText(scene.followUp.title)
                  }
                  maxWidth="2xl"
                >
              <div className="rounded-[28px] border border-pine/15 bg-pine/5 p-6 lg:p-8">
                {scene.followUp.type === "quiz" ? (
                  <>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-pine">
                      Anschlussfrage
                    </p>
                    <p className="mt-2 max-w-[70ch] text-xl leading-[1.55] text-ink">
                      {toGermanDisplayText(scene.followUp.prompt)}
                    </p>
                    <div className="mt-4 grid gap-3">
                      {scene.followUp.options.map((option) => {
                        const isSelected = selectedOptionId === option.id;

                        return (
                          <button
                            key={option.id}
                            type="button"
                            onClick={() => setSelectedOptionId(option.id)}
                            className={cn(
                              "rounded-3xl border px-4 py-4 text-left transition",
                              isSelected
                                ? "border-pine bg-white shadow-sm"
                                : "border-mist bg-white/72 hover:border-sky hover:bg-sky/10",
                            )}
                          >
                            <div className="flex items-start justify-between gap-3">
                              <p className="text-lg leading-[1.5] text-ink">
                                {toGermanDisplayText(option.label)}
                              </p>
                              {isSelected ? (
                                <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-pine" />
                              ) : null}
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {activeOption ? (
                      <div className="mt-4 rounded-3xl border border-pine/15 bg-white/78 p-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-pine">
                          Feedback
                        </p>
                        <p className="mt-2 text-lg leading-[1.55] text-ink">
                          {toGermanDisplayText(activeOption.insight)}
                        </p>
                      </div>
                    ) : null}

                    <div className="mt-4">
                      <button
                        type="button"
                        disabled={!selectedOptionId}
                        onClick={completeQuiz}
                        className="min-h-14 rounded-full bg-ink px-7 py-3 text-lg font-semibold text-white transition hover:bg-pine disabled:cursor-not-allowed disabled:bg-slate/40"
                      >
                        Bildaufgabe sichern
                      </button>
                    </div>
                  </>
                ) : null}

                {scene.followUp.type === "reflection" ? (
                  <>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-pine">
                      Reflexion
                    </p>
                    <p className="mt-2 max-w-[70ch] text-xl leading-[1.55] text-ink">
                      {toGermanDisplayText(scene.followUp.title)}
                    </p>
                    <div className="mt-4 grid gap-3">
                      {scene.followUp.prompts.map((prompt) => (
                        <label key={prompt.id} className="grid gap-2">
                          <span className="text-lg font-semibold text-ink">
                            {toGermanDisplayText(prompt.label)}
                          </span>
                          <textarea
                            value={reflectionValues[prompt.id] ?? ""}
                            onChange={(event) => updateReflectionValue(prompt.id, event.target.value)}
                            rows={3}
                            placeholder={toGermanDisplayText(prompt.placeholder)}
                            className="min-h-[170px] rounded-3xl border border-mist bg-white/88 px-5 py-4 text-lg leading-[1.55] text-ink outline-none transition focus:border-pine focus:ring-4 focus:ring-pine/15"
                          />
                        </label>
                      ))}
                    </div>

                    <div className="mt-4">
                      <button
                        type="button"
                        disabled={!canSubmitReflection}
                        onClick={completeReflection}
                        className="min-h-14 rounded-full bg-ink px-7 py-3 text-lg font-semibold text-white transition hover:bg-pine disabled:cursor-not-allowed disabled:bg-slate/40"
                      >
                        {toGermanDisplayText(scene.followUp.submitLabel ?? "Reflexion sichern")}
                      </button>
                    </div>
                  </>
                ) : null}

                {scene.followUp.type === "callToAction" ? (
                  <>
                    {(() => {
                      const promptKey = scene.followUp.promptKey;

                      return (
                        <>
                          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-pine">
                            Nächster Schritt
                          </p>
                          <p className="mt-2 max-w-[70ch] text-xl leading-[1.55] text-ink">
                            {toGermanDisplayText(scene.followUp.title)}
                          </p>
                          <p className="mt-2 max-w-[70ch] text-lg leading-[1.55] text-slate">
                            {toGermanDisplayText(scene.followUp.text)}
                          </p>
                          <div className="mt-4 grid gap-3 md:grid-cols-2">
                            {scene.followUp.actions.map((action) => (
                              <a
                                key={action.id}
                                href={action.href}
                                target={action.external ? "_blank" : undefined}
                                rel={action.external ? "noreferrer" : undefined}
                                download={action.download}
                                className="inline-flex min-h-14 items-center justify-between gap-3 rounded-3xl border border-mist bg-white px-5 py-4 text-lg font-semibold text-ink transition hover:border-pine hover:text-pine"
                              >
                                <span>{toGermanDisplayText(action.label)}</span>
                                {action.download ? (
                                  <Download className="h-4 w-4 shrink-0" />
                                ) : (
                                  <ArrowUpRight className="h-4 w-4 shrink-0" />
                                )}
                              </a>
                            ))}
                          </div>

                          {scene.followUp.actions.some((action) => action.id === "cta-mail") ? (
                            <ContactCard className="mt-5" />
                          ) : null}

                          {promptKey ? (
                            <label className="mt-4 grid gap-2">
                              <span className="text-lg font-semibold text-ink">
                                {toGermanDisplayText(scene.followUp.promptLabel)}
                              </span>
                              <textarea
                                value={reflectionValues[promptKey] ?? ""}
                                onChange={(event) => updateReflectionValue(promptKey, event.target.value)}
                                rows={3}
                                placeholder={toGermanDisplayText(scene.followUp.promptPlaceholder)}
                                className="min-h-[170px] rounded-3xl border border-mist bg-white/88 px-5 py-4 text-lg leading-[1.55] text-ink outline-none transition focus:border-pine focus:ring-4 focus:ring-pine/15"
                              />
                            </label>
                          ) : null}

                          <div className="mt-4">
                            <button
                              type="button"
                              disabled={!canSubmitCallToAction}
                              onClick={completeCallToAction}
                              className="min-h-14 rounded-full bg-ink px-7 py-3 text-lg font-semibold text-white transition hover:bg-pine disabled:cursor-not-allowed disabled:bg-slate/40"
                            >
                              {toGermanDisplayText(scene.followUp.submitLabel ?? "Nächsten Schritt sichern")}
                            </button>
                          </div>
                        </>
                      );
                    })()}
                  </>
                ) : null}
              </div>
                </FocusDialog>
              </>
            ) : (
              <div className="rounded-[28px] border border-dashed border-mist bg-white/72 p-4 text-sm leading-6 text-slate">
                {scene.requiredHotspotIds?.length
                  ? "Erkunde zuerst die markierten Kernbereiche. Danach erscheint die Anschlussaufgabe."
                  : `Öffne mindestens ${minimumHotspots} markierte Bereiche. Danach erscheint die Anschlussaufgabe.`}
              </div>
            )}
          </div>
        </div>

        <FocusDialog
          open={Boolean(selectedHotspot)}
          onClose={() => setSelectedHotspotId("")}
          eyebrow={selectedHotspot ? toGermanDisplayText(selectedHotspot.label) : "Bildhinweis"}
          title={selectedHotspot ? toGermanDisplayText(selectedHotspot.feedbackTitle) : "Bildhinweis"}
          maxWidth="xl"
        >
          {selectedHotspot ? (
            <div className="space-y-5">
              <p className="max-w-[70ch] text-xl leading-[1.6] text-ink">
                {toGermanDisplayText(selectedHotspot.feedbackText)}
              </p>
              {selectedHotspot.hint ? (
                <div className="rounded-3xl border border-pine/20 bg-pine/5 p-5 text-lg leading-[1.55] text-ink">
                  {toGermanDisplayText(selectedHotspot.hint)}
                </div>
              ) : null}
              {selectedHotspot.pointsPreview ? (
                <p className="text-base font-semibold text-pine">
                  {toGermanDisplayText(selectedHotspot.pointsPreview)}
                </p>
              ) : null}
            </div>
          ) : null}
        </FocusDialog>
      </div>
    </SceneShell>
  );
}
