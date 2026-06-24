"use client";

import { useEffect, useRef, useState } from "react";
import { BookOpenText, ChevronLeft, ChevronRight, Home, Menu, PanelsTopLeft, RotateCcw, Trophy, X } from "lucide-react";
import { AccessGate } from "@/components/learning/access-gate";
import { ChapterSidebar } from "@/components/learning/chapter-sidebar";
import { ChapterSummaryCard } from "@/components/learning/chapter-summary-card";
import { CompletionView } from "@/components/learning/completion-view";
import { ExperienceLevelUp } from "@/components/learning/experience-level-up";
import { ExperienceStatus } from "@/components/learning/experience-status";
import { InteractiveScene } from "@/components/learning/interactive-scene";
import { IntroCard } from "@/components/learning/intro-card";
import { LearningPointsHelp } from "@/components/learning/learning-points-help";
import { MatchingCard } from "@/components/learning/matching-card";
import { NotebookPanel } from "@/components/learning/notebook-panel";
import { OptionalOfferCard } from "@/components/learning/optional-offer-card";
import { OrderingCard } from "@/components/learning/ordering-card";
import { ProgressBar } from "@/components/learning/progress-bar";
import { ReflectionCard } from "@/components/learning/reflection-card";
import { ScenarioCard } from "@/components/learning/scenario-card";
import { StartScreen } from "@/components/learning/start-screen";
import { onboardingCourse } from "@/data/course";
import { uelcResources } from "@/data/resources";
import { allDeepDiveIds } from "@/data/scene-deep-dives";
import {
  getNextRegularTaskId,
  getOptionalTaskIdsForRegular,
  getPreviousRegularTaskId,
  getRelatedRegularTaskId,
  getTaskDefinition,
  isOptionalTask,
  isRegularTask,
  regularTaskIds,
} from "@/data/task-structure";
import { STORAGE_KEY, defaultProgress, readProgress, writeProgress } from "@/lib/storage";
import {
  AccessState,
  ACCESS_STORAGE_KEY,
  COMPLETION_REPORT_STORAGE_KEY,
  ParticipantState,
  PARTICIPANT_STORAGE_KEY,
  hasReportedCompletion,
  markCompletionReported,
  readAccessState,
  readParticipantState,
  writeAccessState,
  writeParticipantState,
} from "@/lib/access";
import {
  Course,
  ExperienceStage,
  Insight,
  InteractiveSceneAnswer,
  PointsAward,
  ProgressState,
  Scene,
  SceneResponseValue,
} from "@/lib/types";
import {
  flattenScenes,
  getChapterForScene,
  toGermanDisplayText,
} from "@/lib/utils";
import {
  getExperienceProgress,
  getExperienceStageIndex,
  getInsightProgress,
  getNotebookAwardIdsForFilledFields,
  getOptionalProgress,
  getOpenPointSuggestions,
  getProfileFeedback,
  getProfileScores,
  getRequiredProgress,
  hasReachedCompletionGoal,
} from "@/lib/progress";

const course: Course = onboardingCourse;
const COURSE_VERSION = "1.0.0";
const allScenes = flattenScenes(course);
const sceneLookup = new Map(allScenes.map((scene) => [scene.id, scene]));
const allSceneIds = new Set(allScenes.map((scene) => scene.id));
const allDeepDiveIdSet = new Set(allDeepDiveIds);
const firstRegularSceneId = regularTaskIds[0] ?? null;

const nextTaskPreviewText: Record<string, string> = {
  "c1-intro":
    "Du bekommst einen Überblick über Lachen, Lernen und Leisten als Orientierung für deine Rolle.",
  "c1-selbstbild":
    "Du hältst fest, welche Stärken, Unsicherheiten und Ziele du gerade mitbringst.",
  "c1-motivation":
    "Du schaust darauf, welche Haltung dich in deiner ÜL-Rolle auch in holprigen Momenten trägt.",
  "c1-verantwortung":
    "Du überlegst, wie du deine erste Verantwortung in der Übungsstunde bewusst vorbereitest.",
  "c2-willkommen":
    "Du erkundest, wie ein guter erster Kontakt Atmosphäre, Orientierung und Sicherheit schafft.",
  "c2-freude":
    "Du erkundest, wie ein leichter Einstieg Menschen schnell ins Tun bringt und Freude an Bewegung ermöglicht.",
  "c2-wertschaetzend":
    "Du schaust dir an, wie eine kurze Reaktion Atmosphäre, Sicherheit und Motivation beeinflussen kann.",
  "c2-beteiligung":
    "Du überlegst, wie kleine Wahlmöglichkeiten und Aufgaben die Beteiligung in der Gruppe stärken können.",
  "c3-zielgruppe":
    "Du trainierst den Blick dafür, was Teilnehmende können, brauchen und heute mitbringen.",
  "c3-erklaeren":
    "Du achtest darauf, woran du erkennst, ob eine Erklärung wirklich verstanden wurde.",
  "c3-feedback":
    "Du übst, Rückmeldungen konkret, hilfreich und wertschätzend zu formulieren.",
  "c3-reflexion":
    "Du ordnest, wie eine kurze Reflexion am Stundenende wirksam und alltagstauglich wird.",
  "c4-differenzierung":
    "Du erkundest, wie eine Aufgabe verschiedene Zugänge und passende Herausforderungen ermöglichen kann.",
  "c4-steigerung":
    "Du ordnest, wie Anforderungen Schritt für Schritt wachsen können, ohne Teilnehmende zu überfordern.",
  "c4-erfolge":
    "Du schaust darauf, wie du individuelle Fortschritte sichtbar und motivierend anerkennen kannst.",
  "c4-situationselastisch":
    "Du übst, einen Plan ruhig anzupassen, wenn Gruppe, Raum oder Material anders reagieren als erwartet.",
  "c5-intro":
    "Du lernst dein digitales Notizbuch als Begleiter für Reflexion und Entwicklung kennen.",
  "c5-rueckblick":
    "Du verbindest Stimmung, Lernen und Belastung zu einem kurzen Rückblick auf deine Praxis.",
  "c5-kompass":
    "Du schaust auf dein persönliches ÜL-Profil und darauf, welche Schwerpunkte sichtbar werden.",
  "c5-cta-uelc":
    "Du richtest den Blick auf konkrete nächste Schritte Richtung ÜL-C Ausbildung.",
};

const optionalTaskPreviewText: Record<string, string> = {
  "c5-rolle":
    "Diese Vertiefung hilft dir, deine eigene ÜL-Rolle bewusster zu beschreiben und weiterzuentwickeln.",
  "c5-ritual":
    "Diese Vertiefung gibt dir eine Praxisidee, wie Rituale Sicherheit und Wiedererkennung schaffen können.",
  "c5-motivation":
    "Wenn du noch tiefer einsteigen möchtest: Schau dir an, woran du unterschiedliche Motive in deiner Gruppe erkennen kannst.",
  "c5-humor":
    "Diese Vertiefung zeigt, wie Humor entlasten kann, ohne einzelne Personen bloßzustellen.",
  "c5-gruppengefuehl":
    "Diese Vertiefung zeigt an einer Hindernisszene, wie gemeinsame Ziele, Rollen und Unterstützung Gruppengefühl stärken.",
  "c5-perspektive":
    "Diese Vertiefung erweitert deinen Blick auf Situationen aus Sicht der Teilnehmenden und des Umfelds.",
  "c5-peer-feedback":
    "Diese Vertiefung zeigt, wie gezieltes Feedback von anderen deinen Blick auf die Stunde schärfen kann.",
  "c5-fallbeispiel":
    "Diese Vertiefung verbindet mehrere Beobachtungen zu einer praxisnahen Entscheidungssituation.",
  "c5-challenge":
    "Diese Vertiefung gibt dir Ideen, wie zusätzliche Herausforderungen ohne Druck entstehen können.",
  "c5-trainingsprinzip":
    "Diese Vertiefung macht greifbar, wie Belastung, Anpassung und Variation zusammenwirken.",
  "c5-sicherheitscheck":
    "Diese Vertiefung hilft dir, Sicherheit und Belastung vor einer Stunde bewusst einzuschätzen.",
  "c5-beutebuch":
    "Diese Vertiefung unterstützt dich dabei, persönliche Erkenntnisse für spätere Stunden festzuhalten.",
};

function getScenePreviewText(scene: Scene | null) {
  if (!scene) {
    return "Danach kannst du deine Auswertung anschauen und deinen nächsten Praxisschritt festhalten.";
  }

  return nextTaskPreviewText[scene.id] ?? toGermanDisplayText(scene.prompt);
}

function getOptionalPreviewText(scene: Scene) {
  return optionalTaskPreviewText[scene.id] ?? "Diese Vertiefung gibt dir eine zusätzliche Praxisidee für deine nächste Übungsstunde.";
}

function isInteractiveSceneAnswer(value: SceneResponseValue | undefined): value is InteractiveSceneAnswer {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return false;
  }

  const visited = value.visitedHotspotIds;
  const selected = value.selectedOptionId;
  const reflections = value.reflections;

  return (
    Array.isArray(visited) &&
    visited.every((entry) => typeof entry === "string") &&
    (selected === undefined || typeof selected === "string") &&
    (reflections === undefined ||
      (typeof reflections === "object" &&
        reflections !== null &&
        !Array.isArray(reflections) &&
        Object.values(reflections).every((entry) => typeof entry === "string")))
  );
}

function getInteractiveSceneAnswer(value: SceneResponseValue | undefined) {
  return isInteractiveSceneAnswer(value) ? value : undefined;
}

function mergeCompleted(existing: string[], sceneId: string) {
  return existing.includes(sceneId) ? existing : [...existing, sceneId];
}

function mergeUniqueIds(existing: string[], incoming: string[]) {
  return Array.from(new Set([...existing, ...incoming]));
}

function sanitizeStringArray(value: unknown) {
  return Array.isArray(value)
    ? value.filter((entry): entry is string => typeof entry === "string")
    : [];
}

function sanitizeRecord(value: unknown) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return {} as Record<string, string>;
  }

  return Object.fromEntries(
    Object.entries(value).filter(([, entry]) => typeof entry === "string"),
  ) as Record<string, string>;
}

function normalizeProgressState(initial: ProgressState): ProgressState {
  const validCompleted = sanitizeStringArray(initial.completedSceneIds).filter((id) =>
    allSceneIds.has(id),
  );
  const validAnswers = Object.fromEntries(
    Object.entries(
      initial.answers && typeof initial.answers === "object" && !Array.isArray(initial.answers)
        ? initial.answers
        : {},
    ).filter(([id]) => allSceneIds.has(id)),
  );
  const openedInsightIds = sanitizeStringArray(initial.openedInsightIds).filter((id) =>
    allDeepDiveIdSet.has(id),
  );
  const awardedPointIds = sanitizeStringArray(initial.awardedPointIds);
  const sanitizedReflections = sanitizeRecord(initial.reflections);
  const sanitizedNotebook = Object.fromEntries(
    Object.entries(defaultProgress.notebook).map(([field, fallbackValue]) => [
      field,
      typeof initial.notebook?.[field as keyof ProgressState["notebook"]] === "string"
        ? initial.notebook[field as keyof ProgressState["notebook"]]
        : fallbackValue,
    ]),
  ) as ProgressState["notebook"];
  const migratedAwardedIds = mergeUniqueIds(
    awardedPointIds,
    getNotebookAwardIdsForFilledFields(sanitizedNotebook).filter(Boolean),
  );

  const nextIncompleteRegularSceneId =
    regularTaskIds.find((sceneId) => !validCompleted.includes(sceneId)) ?? firstRegularSceneId;
  const currentSceneId =
    initial.currentSceneId && allSceneIds.has(initial.currentSceneId)
      ? initial.currentSceneId
      : nextIncompleteRegularSceneId;

  return {
    ...defaultProgress,
    ...initial,
    completedSceneIds: validCompleted,
    answers: validAnswers,
    reflections: sanitizedReflections,
    notebook: sanitizedNotebook,
    openedInsightIds,
    awardedPointIds: migratedAwardedIds,
    currentSceneId,
    started: initial.started || validCompleted.length > 0,
  };
}

export function LearningApp() {
  const [hydrated, setHydrated] = useState(false);
  const [progress, setProgress] = useState<ProgressState>(defaultProgress);
  const [accessState, setAccessState] = useState<AccessState>({ accessGranted: false });
  const [participant, setParticipant] = useState<ParticipantState>({
    name: "",
    privacyAccepted: false,
  });
  const [levelUpStage, setLevelUpStage] = useState<ExperienceStage | null>(null);
  const [view, setView] = useState<"start" | "journey" | "optionalOffer" | "chapterSummary" | "done">("start");
  const [journeyPanel, setJourneyPanel] = useState<"menu" | "chapters" | "status" | "notebook" | null>(null);
  const journeyPanelTriggerRef = useRef<HTMLElement | null>(null);
  const [summaryChapterId, setSummaryChapterId] = useState<string | null>(null);
  const [pendingOptionalSceneId, setPendingOptionalSceneId] = useState<string | null>(null);
  const [completedSceneNotice, setCompletedSceneNotice] = useState<string | null>(null);

  useEffect(() => {
    const initial = normalizeProgressState(readProgress());
    const initialAccess = readAccessState();
    const initialParticipant = readParticipantState();
    const initialExperience = getExperienceProgress(course, initial);
    const hydratedProgress =
      initial.highestExperienceStageSeenId === null
        ? {
            ...initial,
            highestExperienceStageSeenId: initialExperience.currentStage.id,
          }
        : initial;

    setProgress(hydratedProgress);
    setAccessState(initialAccess);
    setParticipant(initialParticipant);
    if (hydratedProgress.started && hydratedProgress.currentSceneId) {
      setView("journey");
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    writeProgress({
      ...progress,
      updatedAt: new Date().toISOString(),
    });
  }, [hydrated, progress]);

  useEffect(() => {
    if (!journeyPanel) return;

    journeyPanelTriggerRef.current = document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const panel = document.querySelector<HTMLElement>("[data-journey-panel]");
    window.requestAnimationFrame(() => panel?.querySelector<HTMLElement>("button, a, textarea, select")?.focus());

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        setJourneyPanel(null);
        return;
      }

      if (event.key !== "Tab") return;
      const activePanel = document.querySelector<HTMLElement>("[data-journey-panel]");
      if (!activePanel) return;
      const focusable = Array.from(
        activePanel.querySelectorAll<HTMLElement>(
          "a[href], button:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex='-1'])",
        ),
      ).filter((element) => element.offsetParent !== null);
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      journeyPanelTriggerRef.current?.focus();
    };
  }, [journeyPanel]);

  const currentScene: Scene | undefined = progress.currentSceneId
    ? sceneLookup.get(progress.currentSceneId)
    : undefined;
  const currentChapter = getChapterForScene(course, progress.currentSceneId);
  const scores = getProfileScores(course, progress);
  const experience = getExperienceProgress(course, progress, scores);
  const requiredProgress = getRequiredProgress(progress);
  const optionalProgress = getOptionalProgress(progress);
  const insightProgress = getInsightProgress(progress);
  const pointSuggestions = getOpenPointSuggestions(course, progress);
  const passed = hasReachedCompletionGoal(course, progress);
  const currentRegularSceneId = currentScene ? getRelatedRegularTaskId(currentScene.id) : null;
  const currentRegularIndex = currentRegularSceneId
    ? regularTaskIds.indexOf(currentRegularSceneId)
    : -1;
  const pendingOptionalScene = pendingOptionalSceneId ? sceneLookup.get(pendingOptionalSceneId) ?? null : null;
  const notebookSection =
    view === "start"
      ? "profile"
      : view === "done"
        ? "review"
        : currentScene && getTaskDefinition(currentScene.id)?.primaryDimension
          ? "dimensions"
          : "learnings";

  useEffect(() => {
    if (!hydrated) return;

    const seenStageIndex = getExperienceStageIndex(progress.highestExperienceStageSeenId);
    if (experience.currentStageIndex <= seenStageIndex) return;

    setLevelUpStage(experience.currentStage);
    setProgress((current) => ({
      ...current,
      highestExperienceStageSeenId: experience.currentStage.id,
    }));
  }, [
    experience.currentStage,
    experience.currentStage.id,
    experience.currentStageIndex,
    hydrated,
    progress.highestExperienceStageSeenId,
  ]);

  useEffect(() => {
    if (!hydrated || !passed) return;
    if (hasReportedCompletion(course.id)) return;

    void fetch("/api/report-completion", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        courseId: course.id,
        courseVersion: COURSE_VERSION,
        completion: true,
      }),
    })
      .then((response) => {
        if (response.ok) {
          markCompletionReported(course.id);
        }
      })
      .catch(() => {
        // Die Abschlussmeldung ist anonym und darf die lokale Lernreise nicht blockieren.
      });
  }, [hydrated, passed]);

  function handleAwardPoints(awards: PointsAward[]) {
    const awardIds = awards
      .map((award) => award.id)
      .filter((awardId): awardId is string => Boolean(awardId));

    if (!awardIds.length) return;

    setProgress((current) => ({
      ...current,
      awardedPointIds: mergeUniqueIds(current.awardedPointIds, awardIds),
    }));
  }

  function handleOpenInsight(insight: Insight) {
    setProgress((current) => {
      if (current.openedInsightIds.includes(insight.id)) {
        return current;
      }

      return {
        ...current,
        openedInsightIds: [...current.openedInsightIds, insight.id],
      };
    });
  }

  function startJourney(reset = false) {
    const firstSceneId = firstRegularSceneId;
    const nextProgress = reset
      ? {
          ...defaultProgress,
          started: true,
          currentSceneId: firstSceneId,
          startedAt: new Date().toISOString(),
        }
      : {
          ...progress,
          started: true,
          currentSceneId: progress.currentSceneId ?? firstSceneId,
          startedAt: progress.startedAt ?? new Date().toISOString(),
        };

    setProgress(nextProgress);
    setLevelUpStage(null);
    setSummaryChapterId(null);
    setPendingOptionalSceneId(null);
    setCompletedSceneNotice(null);
    setJourneyPanel(null);
    setView("journey");
  }

  function jumpToScene(sceneId: string) {
    setProgress((current) => ({
      ...current,
      currentSceneId: sceneId,
    }));
    setSummaryChapterId(null);
    setPendingOptionalSceneId(null);
    setCompletedSceneNotice(null);
    setJourneyPanel(null);
    setView("journey");
  }

  function routeAfterRegularScene(regularSceneId: string) {
    const currentDefinition = getTaskDefinition(regularSceneId);
    const nextRegularSceneId = getNextRegularTaskId(regularSceneId);

    if (!nextRegularSceneId || !currentDefinition) {
      setSummaryChapterId(null);
      setCompletedSceneNotice(null);
      setView("done");
      return;
    }

    const nextDefinition = getTaskDefinition(nextRegularSceneId);
    setProgress((current) => ({
      ...current,
      currentSceneId: nextRegularSceneId,
    }));

    if (nextDefinition && nextDefinition.chapterId !== currentDefinition.chapterId) {
      setSummaryChapterId(currentDefinition.chapterId);
      setCompletedSceneNotice(null);
      setView("chapterSummary");
      return;
    }

    setSummaryChapterId(null);
    setCompletedSceneNotice(null);
    setView("journey");
  }

  function goToNextScene() {
    if (!currentScene) return;
    if (!progress.completedSceneIds.includes(currentScene.id)) return;

    if (pendingOptionalSceneId && isRegularTask(currentScene.id)) {
      setView("optionalOffer");
      return;
    }

    const regularSceneId = getRelatedRegularTaskId(currentScene.id);
    if (!regularSceneId) {
      setCompletedSceneNotice(null);
      setView("done");
      return;
    }

    routeAfterRegularScene(regularSceneId);
  }

  function goToPreviousScene() {
    if (!currentScene) {
      setView("start");
      return;
    }

    if (isOptionalTask(currentScene.id)) {
      const relatedRegularSceneId = getRelatedRegularTaskId(currentScene.id);
      if (relatedRegularSceneId) {
        jumpToScene(relatedRegularSceneId);
        return;
      }
    }

    const previousRegularSceneId = getPreviousRegularTaskId(currentScene.id);
    if (!previousRegularSceneId) {
      setSummaryChapterId(null);
      setView("start");
      return;
    }

    jumpToScene(previousRegularSceneId);
  }

  function handleSceneComplete(
    value?: SceneResponseValue,
    reflections?: Record<string, string>,
    notebookUpdates?: Record<string, string>,
  ) {
    if (!currentScene) return;
    const sceneId = currentScene.id;
    const wasCompleted = progress.completedSceneIds.includes(sceneId);
    const optionalSceneIds = isRegularTask(sceneId) ? getOptionalTaskIdsForRegular(sceneId) : [];
    const shouldOfferOptional =
      isRegularTask(sceneId) &&
      !wasCompleted &&
      optionalSceneIds.length > 0 &&
      optionalSceneIds.some((optionalSceneId) => !progress.completedSceneIds.includes(optionalSceneId));
    const firstIncompleteOptionalSceneId = shouldOfferOptional
      ? optionalSceneIds.find((optionalSceneId) => !progress.completedSceneIds.includes(optionalSceneId)) ?? null
      : null;
    const completionNotice = getProfileFeedback(sceneId);

    setProgress((current) => ({
      ...current,
      completedSceneIds: mergeCompleted(current.completedSceneIds, sceneId),
      answers:
        value !== undefined
          ? {
              ...current.answers,
              [sceneId]: value,
            }
          : current.answers,
      reflections: reflections
        ? {
            ...current.reflections,
            ...reflections,
          }
        : current.reflections,
      notebook: notebookUpdates
        ? {
            ...current.notebook,
            ...notebookUpdates,
          }
        : current.notebook,
    }));
    setCompletedSceneNotice(completionNotice);
    setPendingOptionalSceneId(firstIncompleteOptionalSceneId);
  }

  function restartJourney() {
    setProgress({
      ...defaultProgress,
      started: false,
      currentSceneId: null,
    });
    setLevelUpStage(null);
    setView("start");
    setSummaryChapterId(null);
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }

  function resetLocalData() {
    setProgress({
      ...defaultProgress,
      started: false,
      currentSceneId: null,
    });
    setAccessState({ accessGranted: false });
    setParticipant({ name: "", privacyAccepted: false });
    setLevelUpStage(null);
    setView("start");
    setSummaryChapterId(null);
    setPendingOptionalSceneId(null);
    setCompletedSceneNotice(null);
    setJourneyPanel(null);
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(STORAGE_KEY);
      window.localStorage.removeItem(ACCESS_STORAGE_KEY);
      window.localStorage.removeItem(PARTICIPANT_STORAGE_KEY);
      window.localStorage.removeItem(`${COMPLETION_REPORT_STORAGE_KEY}:${course.id}`);
    }
  }

  function handleAccessGranted() {
    const nextAccess = {
      accessGranted: true,
      grantedAt: new Date().toISOString(),
    };
    setAccessState(nextAccess);
    writeAccessState(nextAccess);
  }

  function handleWelcomeComplete(name: string) {
    const nextParticipant = {
      name,
      privacyAccepted: true,
      acceptedAt: new Date().toISOString(),
    };
    setParticipant(nextParticipant);
    writeParticipantState(nextParticipant);
  }

  function updateTransferValue(value: string) {
    setProgress((current) => ({
      ...current,
      reflections: {
        ...current.reflections,
        transfer_praxis: value,
      },
    }));
  }

  function updateNotebookField(field: keyof ProgressState["notebook"], value: string) {
    setProgress((current) => ({
      ...current,
      notebook: {
        ...current.notebook,
        [field]: value,
      },
    }));
  }

  function buildContextRail(scene: Scene) {
    const sceneIsOptional = isOptionalTask(scene.id);
    const sceneCompleted = progress.completedSceneIds.includes(scene.id);
    const optionalSceneIds = sceneIsOptional ? [] : getOptionalTaskIdsForRegular(scene.id);
    const suggestedOptionalSceneId =
      optionalSceneIds.find((candidateId) => !progress.completedSceneIds.includes(candidateId)) ??
      optionalSceneIds[0] ??
      null;
    const suggestedOptionalScene = suggestedOptionalSceneId
      ? sceneLookup.get(suggestedOptionalSceneId) ?? null
      : null;
    const suggestedOptionalCompleted = suggestedOptionalScene
      ? progress.completedSceneIds.includes(suggestedOptionalScene.id)
      : false;
    if (sceneIsOptional) {
      const relatedRegularSceneId = getRelatedRegularTaskId(scene.id);

      return (
          <div className="rounded-[30px] border border-mist bg-white/82 p-5 shadow-card">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate">
              Freiwillige Vertiefung
            </p>
            <p className="mt-3 text-lg font-semibold leading-7 text-ink">
              {toGermanDisplayText(scene.title)}
            </p>
            <p className="mt-2 text-sm leading-6 text-slate">
              Diese Zusatzaufgabe vertieft die Lernreise, bleibt aber freiwillig. Wenn du
              zurückspringen willst, kommst du direkt zur zugehörigen regulären Aufgabe.
            </p>
            <div className="mt-4 grid gap-2 sm:grid-cols-2 xl:grid-cols-1">
              {relatedRegularSceneId ? (
                <button
                  type="button"
                  onClick={() => jumpToScene(relatedRegularSceneId)}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-mist bg-white px-4 py-2 text-sm font-semibold text-ink transition hover:border-pine hover:text-pine"
                >
                  Zur zugehörigen Aufgabe
                </button>
              ) : null}
              <button
                type="button"
                onClick={() => setJourneyPanel("chapters")}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-mist bg-white px-4 py-2 text-sm font-semibold text-ink transition hover:border-pine hover:text-pine"
              >
                Kapitel öffnen
              </button>
            </div>
          </div>
        );
    }

    if (!suggestedOptionalScene) {
      return null;
    }

    return (
      <div className="rounded-[30px] border border-mist bg-white/82 p-5 shadow-card">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate">
          Freiwillige Vertiefung
        </p>
        <p className="mt-3 text-lg font-semibold leading-7 text-ink">
          {toGermanDisplayText(suggestedOptionalScene.title)}
        </p>
        <p className="mt-2 text-sm leading-6 text-slate">
          {sceneCompleted || suggestedOptionalCompleted
            ? "Diese Zusatzaufgabe bleibt freiwillig. Du kannst sie direkt öffnen oder regulär weitergehen."
            : "Die Zusatzaufgabe wird nach dem Sichern dieser Aufgabe freigeschaltet. Sie bleibt optional und konkurriert nicht mit dem Pflichtweg."}
        </p>
        <div className="mt-4 space-y-2">
          <button
            type="button"
            disabled={!sceneCompleted && !suggestedOptionalCompleted}
            onClick={() => jumpToScene(suggestedOptionalScene.id)}
            className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full border border-mist bg-white px-4 py-2 text-sm font-semibold text-ink transition hover:border-pine hover:text-pine disabled:cursor-not-allowed disabled:opacity-50"
          >
            {suggestedOptionalCompleted ? "Freiwillige Vertiefung öffnen" : "Freiwillige Vertiefung starten"}
          </button>
        </div>
      </div>
    );
  }

  function buildNextRail(scene: Scene) {
    const sceneIsOptional = isOptionalTask(scene.id);
    const sceneCompleted = progress.completedSceneIds.includes(scene.id);
    const nextRegularSceneId = getNextRegularTaskId(scene.id);
    const nextRegularScene = nextRegularSceneId ? sceneLookup.get(nextRegularSceneId) ?? null : null;
    const optionalSceneIds = sceneIsOptional ? [] : getOptionalTaskIdsForRegular(scene.id);
    const suggestedOptionalSceneId =
      optionalSceneIds.find((candidateId) => !progress.completedSceneIds.includes(candidateId)) ??
      optionalSceneIds[0] ??
      null;
    const suggestedOptionalScene = suggestedOptionalSceneId
      ? sceneLookup.get(suggestedOptionalSceneId) ?? null
      : null;
    const suggestedOptionalCompleted = suggestedOptionalScene
      ? progress.completedSceneIds.includes(suggestedOptionalScene.id)
      : false;
    const relatedRegularSceneId = getRelatedRegularTaskId(scene.id);
    const relatedRegularScene = relatedRegularSceneId
      ? sceneLookup.get(relatedRegularSceneId) ?? null
      : null;
    const previewTitle = sceneIsOptional
      ? nextRegularScene?.title ?? relatedRegularScene?.title ?? "Status & Abschluss"
      : nextRegularScene?.title ?? "Status & Abschluss";
    const previewText = sceneIsOptional
      ? getScenePreviewText(nextRegularScene ?? relatedRegularScene)
      : getScenePreviewText(nextRegularScene);

    return (
      <div className="space-y-4">
        <div className="rounded-[30px] border border-mist bg-white/82 p-4 shadow-card">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate">
            Nächste Aufgabe
          </p>
          <div className="relative mt-3 overflow-hidden rounded-[26px] border border-white/80 bg-[linear-gradient(180deg,rgba(17,32,51,0.04),rgba(255,255,255,0.72))] p-4">
            <div className="pointer-events-none absolute inset-x-5 top-5 h-14 rounded-full bg-sky/20 blur-2xl" />
            <div className="pointer-events-none absolute right-4 top-4 h-16 w-16 rounded-full bg-moss/10 blur-2xl" />
            <div className="relative space-y-2">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-slate">
                {sceneIsOptional ? "Zurück im regulären Weg" : nextRegularScene ? "Als Nächstes" : "Danach"}
              </p>
              <p className="text-base font-semibold leading-6 text-ink">
                {toGermanDisplayText(previewTitle)}
              </p>
              <p className="text-sm leading-6 text-slate">{previewText}</p>
            </div>
          </div>
        </div>

        {suggestedOptionalScene ? (
          <div className="rounded-[30px] border border-mist bg-white/82 p-4 shadow-card">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate">
              Freiwillige Vertiefung
            </p>
            <p className="mt-3 text-base font-semibold leading-6 text-ink">
              {toGermanDisplayText(suggestedOptionalScene.title)}
            </p>
            <p className="mt-2 text-sm leading-6 text-slate">
              {getOptionalPreviewText(suggestedOptionalScene)}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                disabled={!sceneCompleted && !suggestedOptionalCompleted}
                onClick={() => jumpToScene(suggestedOptionalScene.id)}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-mist bg-white px-4 py-2 text-sm font-semibold text-ink transition hover:border-pine hover:text-pine disabled:cursor-not-allowed disabled:opacity-50"
              >
                {suggestedOptionalCompleted ? "Vertiefung öffnen" : "Vertiefung starten"}
              </button>
            </div>
          </div>
        ) : null}
      </div>
    );
  }

  function buildFooterBar(scene: Scene) {
    const sceneCompleted = progress.completedSceneIds.includes(scene.id);
    const shouldOpenOptionalOffer = Boolean(pendingOptionalSceneId && isRegularTask(scene.id));
    const nextRegularSceneId = getNextRegularTaskId(scene.id);
    const nextRegularScene = nextRegularSceneId ? sceneLookup.get(nextRegularSceneId) ?? null : null;
    const effectText = sceneCompleted
      ? getProfileFeedback(scene.id) ?? "Diese Aufgabe zahlt auf dein ÜL-Profil ein."
      : "Sichere zuerst deine Bearbeitung. Danach wird der nächste Schritt im Lernweg freigeschaltet.";
    const nextLabel = !sceneCompleted
      ? "Erst Aufgabe sichern"
      : shouldOpenOptionalOffer
        ? "Weiter"
        : nextRegularScene
          ? "Weiter zur nächsten Aufgabe"
          : "Zur Auswertung";

    return (
      <div className="rounded-[30px] border border-white/75 bg-white/92 px-5 py-4 shadow-card backdrop-blur xl:sticky xl:bottom-4 xl:z-10">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="space-y-2">
            <span className="inline-flex rounded-full bg-sand px-3 py-1.5 text-xs font-semibold text-ink">
              {sceneCompleted ? "Aufgabe gespeichert" : "Aufgabe noch offen"}
            </span>
            <p className="text-sm leading-6 text-ink">{toGermanDisplayText(effectText)}</p>
          </div>

          <button
            type="button"
            disabled={!sceneCompleted}
            onClick={() => {
              goToNextScene();
            }}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white transition hover:bg-pine disabled:cursor-not-allowed disabled:bg-slate/40"
          >
            {nextLabel}
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    );
  }

  function withTaskMeta<T extends Scene>(scene: T): T {
    const sceneDefinition = getTaskDefinition(scene.id);

    return {
      ...scene,
      primaryDimension: sceneDefinition?.primaryDimension ?? scene.primaryDimension,
      optional: sceneDefinition?.kind === "optional",
    } as T;
  }

  function renderScene(scene: Scene) {
    switch (scene.type) {
      case "intro":
      case "infoCard":
      case "summary":
      case "callToAction": {
        const sceneWithMeta = withTaskMeta(scene);
        const contextRail = buildContextRail(sceneWithMeta);
        const nextRail = buildNextRail(sceneWithMeta);
        const footerBar = buildFooterBar(sceneWithMeta);

        return (
          <IntroCard
            key={scene.id}
            scene={sceneWithMeta}
            openedInsightIds={progress.openedInsightIds}
            awardedPointIds={progress.awardedPointIds}
            onAwardPoints={handleAwardPoints}
            onOpenInsight={handleOpenInsight}
            contextRail={contextRail}
            nextRail={nextRail}
            footerBar={footerBar}
            onOpenNotebook={() => setJourneyPanel("notebook")}
            onOpenStatus={() => setJourneyPanel("status")}
            onComplete={() => handleSceneComplete()}
          />
        );
      }
      case "scenario":
      case "multipleChoice": {
        const sceneWithMeta = withTaskMeta(scene);
        const contextRail = buildContextRail(sceneWithMeta);
        const nextRail = buildNextRail(sceneWithMeta);
        const footerBar = buildFooterBar(sceneWithMeta);

        return (
          <ScenarioCard
            key={scene.id}
            scene={sceneWithMeta}
            savedAnswer={progress.answers[scene.id] as string | undefined}
            openedInsightIds={progress.openedInsightIds}
            awardedPointIds={progress.awardedPointIds}
            onAwardPoints={handleAwardPoints}
            onOpenInsight={handleOpenInsight}
            contextRail={contextRail}
            nextRail={nextRail}
            footerBar={footerBar}
            onOpenNotebook={() => setJourneyPanel("notebook")}
            onOpenStatus={() => setJourneyPanel("status")}
            onComplete={(answer) => handleSceneComplete(answer)}
          />
        );
      }
      case "interactiveScene": {
        const sceneWithMeta = withTaskMeta(scene);
        const contextRail = buildContextRail(sceneWithMeta);
        const nextRail = buildNextRail(sceneWithMeta);
        const footerBar = buildFooterBar(sceneWithMeta);

        return (
          <InteractiveScene
            key={scene.id}
            scene={sceneWithMeta}
            savedAnswer={getInteractiveSceneAnswer(progress.answers[scene.id])}
            openedInsightIds={progress.openedInsightIds}
            awardedPointIds={progress.awardedPointIds}
            onAwardPoints={handleAwardPoints}
            onOpenInsight={handleOpenInsight}
            contextRail={contextRail}
            nextRail={nextRail}
            footerBar={footerBar}
            onOpenNotebook={() => setJourneyPanel("notebook")}
            onOpenStatus={() => setJourneyPanel("status")}
            onComplete={(answer, reflections, notebookUpdates) =>
              handleSceneComplete(answer, reflections, notebookUpdates)
            }
          />
        );
      }
      case "matching": {
        const sceneWithMeta = withTaskMeta(scene);
        const contextRail = buildContextRail(sceneWithMeta);
        const nextRail = buildNextRail(sceneWithMeta);
        const footerBar = buildFooterBar(sceneWithMeta);

        return (
          <MatchingCard
            key={scene.id}
            scene={sceneWithMeta}
            savedAnswer={progress.answers[scene.id] as Record<string, string> | undefined}
            openedInsightIds={progress.openedInsightIds}
            awardedPointIds={progress.awardedPointIds}
            onAwardPoints={handleAwardPoints}
            onOpenInsight={handleOpenInsight}
            contextRail={contextRail}
            nextRail={nextRail}
            footerBar={footerBar}
            onOpenNotebook={() => setJourneyPanel("notebook")}
            onOpenStatus={() => setJourneyPanel("status")}
            onComplete={(answer) => handleSceneComplete(answer)}
          />
        );
      }
      case "ordering": {
        const sceneWithMeta = withTaskMeta(scene);
        const contextRail = buildContextRail(sceneWithMeta);
        const nextRail = buildNextRail(sceneWithMeta);
        const footerBar = buildFooterBar(sceneWithMeta);

        return (
          <OrderingCard
            key={scene.id}
            scene={sceneWithMeta}
            savedAnswer={progress.answers[scene.id] as string[] | undefined}
            openedInsightIds={progress.openedInsightIds}
            awardedPointIds={progress.awardedPointIds}
            onAwardPoints={handleAwardPoints}
            onOpenInsight={handleOpenInsight}
            contextRail={contextRail}
            nextRail={nextRail}
            footerBar={footerBar}
            onOpenNotebook={() => setJourneyPanel("notebook")}
            onOpenStatus={() => setJourneyPanel("status")}
            onComplete={(answer) => handleSceneComplete(answer)}
          />
        );
      }
      case "reflection": {
        const sceneWithMeta = withTaskMeta(scene);
        const contextRail = buildContextRail(sceneWithMeta);
        const nextRail = buildNextRail(sceneWithMeta);
        const footerBar = buildFooterBar(sceneWithMeta);

        return (
          <ReflectionCard
            key={scene.id}
            scene={sceneWithMeta}
            savedReflections={progress.reflections}
            openedInsightIds={progress.openedInsightIds}
            awardedPointIds={progress.awardedPointIds}
            onAwardPoints={handleAwardPoints}
            onOpenInsight={handleOpenInsight}
            contextRail={contextRail}
            nextRail={nextRail}
            footerBar={footerBar}
            onOpenNotebook={() => setJourneyPanel("notebook")}
            onOpenStatus={() => setJourneyPanel("status")}
            onComplete={(answer) => handleSceneComplete(answer, answer)}
          />
        );
      }
      default:
        return null;
    }
  }

  if (!hydrated) {
    return <main className="min-h-screen bg-sand" />;
  }

  if (!accessState.accessGranted || !participant.name.trim() || !participant.privacyAccepted) {
    return (
      <AccessGate
        course={course}
        contactEmail={uelcResources.contact.email}
        initialStep={accessState.accessGranted ? "welcome" : "hero"}
        onAccessGranted={handleAccessGranted}
        onWelcomeComplete={handleWelcomeComplete}
      />
    );
  }

  const summaryChapter = summaryChapterId
    ? course.chapters.find((chapter) => chapter.id === summaryChapterId) ?? null
    : null;
  const currentChapterIndex = currentChapter
    ? course.chapters.findIndex((chapter) => chapter.id === currentChapter.id)
    : -1;

  return (
    <main className="learning-readable min-h-screen px-4 py-5 md:px-6 lg:px-8 xl:px-10">
      <div className="mx-auto max-w-[1500px] space-y-5">
        {view === "journey" && currentScene ? (
          <header className="sticky top-3 z-30 rounded-[24px] border border-white/75 bg-white/88 px-4 py-3 shadow-card backdrop-blur md:px-5">
            <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
              <div className="flex min-h-[52px] items-center gap-3">
                <button
                  type="button"
                  onClick={goToPreviousScene}
                  className="inline-flex min-h-10 items-center gap-2 rounded-full border border-mist bg-white px-3 py-2 text-sm font-semibold text-ink transition hover:border-pine hover:text-pine"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Zurück
                </button>

                <div className="min-w-0 flex-1 xl:text-center">
                  <p className="truncate text-sm font-semibold text-ink md:text-base">
                    {`${currentChapterIndex >= 0 ? `Kapitel ${currentChapterIndex + 1}` : "Lernreise"} · ${
                      isOptionalTask(currentScene.id)
                        ? "Vertiefung"
                        : `Aufgabe ${Math.max(currentRegularIndex + 1, 1)}/${requiredProgress.total}`
                    } · ${toGermanDisplayText(currentScene.title)}`}
                  </p>
                  <p className="mt-1 text-xs text-slate">
                    {toGermanDisplayText(currentChapter?.title ?? course.title)}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end xl:min-w-[420px]">
                <ExperienceStatus experience={experience} compact className="sm:min-w-[260px]" />
                <div className="flex items-center gap-2 sm:justify-end">
                  <span className="rounded-full bg-sand px-3 py-1.5 text-xs font-semibold text-ink">
                    Pflicht {requiredProgress.completed}/{requiredProgress.total}
                  </span>
                  <button
                    type="button"
                    onClick={() => setJourneyPanel("menu")}
                    className="inline-flex min-h-10 items-center gap-2 rounded-full border border-mist bg-white px-3 py-2 text-sm font-semibold text-ink transition hover:border-pine hover:text-pine"
                    aria-label="Menü öffnen"
                  >
                    <Menu className="h-4 w-4" />
                    <span className="hidden sm:inline">Menü</span>
                  </button>
                </div>
              </div>
            </div>
          </header>
        ) : (
          <header
            className={`rounded-[30px] border border-white/70 bg-white/74 px-5 py-5 shadow-card backdrop-blur md:px-6 ${
              view === "done" || view === "chapterSummary" ? "peripheral-ui" : ""
            }`}
          >
            <div className="grid gap-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(340px,0.85fr)] lg:items-end">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate">
                  {toGermanDisplayText(course.organization)}
                </p>
                <h1 className="mt-1 font-display text-2xl text-ink md:text-3xl">
                  {toGermanDisplayText(course.title)}
                </h1>
                <p className="mt-2 max-w-[42rem] text-sm leading-6 text-slate">
                  {toGermanDisplayText(course.subtitle)}
                </p>
              </div>

              <div className="rounded-[26px] border border-white/70 bg-sand/55 p-4">
                <ExperienceStatus experience={experience} compact className="mb-4" />
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate">
                    Pflichtfortschritt
                  </p>
                  <span className="text-sm font-semibold text-ink">
                    {requiredProgress.completed} / {requiredProgress.total}
                  </span>
                </div>
                <div className="mt-3">
                  <LearningPointsHelp
                    awardedPointIds={progress.awardedPointIds}
                    onAwardPoints={handleAwardPoints}
                  />
                </div>
                <p className="mt-3 text-sm leading-6 text-slate">
                  {optionalProgress.completed} freiwillige Vertiefungen bearbeitet
                </p>
                <p className="mt-1 text-sm leading-6 text-slate">
                  {insightProgress.discovered} Praxisimpulse entdeckt
                </p>
                <div className="mt-4 space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate">
                    Dein ÜL-Profil
                  </p>
                  <ProgressBar value={scores.lachen.ratio} label="Lachen" dimension="lachen" />
                  <ProgressBar value={scores.lernen.ratio} label="Lernen" dimension="lernen" />
                  <ProgressBar value={scores.leisten.ratio} label="Leisten" dimension="leisten" />
                </div>
              </div>
            </div>
          </header>
        )}

        {view === "start" ? (
          <StartScreen
            course={course}
            progress={progress}
            scores={scores}
            learningProgress={requiredProgress}
            experience={experience}
            notebook={progress.notebook}
            onNotebookChange={updateNotebookField}
            onAwardPoints={handleAwardPoints}
            onStart={() => startJourney(true)}
            onResume={() => startJourney(false)}
          />
        ) : null}

        {view === "optionalOffer" && currentScene && pendingOptionalScene ? (
          <OptionalOfferCard
            chapter={currentChapter ?? null}
            regularScene={currentScene}
            optionalScene={pendingOptionalScene}
            completionNotice={toGermanDisplayText(completedSceneNotice)}
            onContinue={() => {
              setPendingOptionalSceneId(null);
              const regularSceneId = getRelatedRegularTaskId(currentScene.id);
              if (regularSceneId) {
                routeAfterRegularScene(regularSceneId);
              }
            }}
            onStartOptional={() => {
              setPendingOptionalSceneId(null);
              jumpToScene(pendingOptionalScene.id);
            }}
          />
        ) : null}

        {view === "journey" && currentScene ? (
          <div className="relative overflow-hidden rounded-[42px] border border-white/60 bg-[linear-gradient(180deg,rgba(17,32,51,0.05),rgba(255,255,255,0.76))] px-4 py-4 shadow-soft md:px-6 md:py-5 xl:min-h-[calc(100vh-152px)] xl:px-8 xl:py-6">
            <div className="pointer-events-none absolute inset-x-20 top-14 h-24 rounded-full bg-sky/25 blur-3xl" />
            <div className="pointer-events-none absolute bottom-10 right-10 h-32 w-40 rounded-full bg-moss/10 blur-3xl" />

            {journeyPanel ? (
              <div className="absolute inset-0 z-20 bg-ink/38 backdrop-blur-[4px]" />
            ) : null}

            <div className="relative z-10">
              <div className="min-w-0">{renderScene(currentScene)}</div>
            </div>

            {journeyPanel === "menu" ? (
              <div className="absolute inset-0 z-30 p-4 md:p-6">
                <div data-journey-panel className="ml-auto w-full max-w-sm rounded-[32px] border border-ink/10 bg-white p-5 shadow-[0_32px_90px_rgba(17,32,51,0.34)] ring-1 ring-white">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate">
                        Menü
                      </p>
                      <h2 className="mt-1 font-display text-2xl text-ink">Schnellzugriff</h2>
                    </div>
                    <button
                      type="button"
                      onClick={() => setJourneyPanel(null)}
                      className="inline-flex min-h-11 items-center justify-center rounded-full border border-ink/10 bg-white px-3 py-2 text-ink shadow-sm transition hover:border-pine hover:text-pine"
                      aria-label="Menü schließen"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="mt-5 grid gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setJourneyPanel(null);
                        setCompletedSceneNotice(null);
                        setView("start");
                      }}
                      className="flex min-h-12 items-center justify-between rounded-2xl border border-mist bg-white px-4 py-3 text-left text-sm font-semibold text-ink shadow-sm transition hover:border-pine hover:bg-pine/5 hover:shadow-[0_12px_30px_rgba(17,32,51,0.12)]"
                    >
                      <span className="inline-flex items-center gap-3">
                        <Home className="h-4 w-4" />
                        Start
                      </span>
                      <ChevronRight className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setJourneyPanel("chapters")}
                      className="flex min-h-12 items-center justify-between rounded-2xl border border-mist bg-white px-4 py-3 text-left text-sm font-semibold text-ink shadow-sm transition hover:border-pine hover:bg-pine/5 hover:shadow-[0_12px_30px_rgba(17,32,51,0.12)]"
                    >
                      <span className="inline-flex items-center gap-3">
                        <PanelsTopLeft className="h-4 w-4" />
                        Kapitelübersicht
                      </span>
                      <ChevronRight className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setJourneyPanel("status")}
                      className="flex min-h-12 items-center justify-between rounded-2xl border border-mist bg-white px-4 py-3 text-left text-sm font-semibold text-ink shadow-sm transition hover:border-pine hover:bg-pine/5 hover:shadow-[0_12px_30px_rgba(17,32,51,0.12)]"
                    >
                      <span className="inline-flex items-center gap-3">
                        <Trophy className="h-4 w-4" />
                        Status & Abschluss
                      </span>
                      <ChevronRight className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setJourneyPanel("notebook")}
                      className="flex min-h-12 items-center justify-between rounded-2xl border border-mist bg-white px-4 py-3 text-left text-sm font-semibold text-ink shadow-sm transition hover:border-pine hover:bg-pine/5 hover:shadow-[0_12px_30px_rgba(17,32,51,0.12)]"
                    >
                      <span className="inline-flex items-center gap-3">
                        <BookOpenText className="h-4 w-4" />
                        Mein Notizbuch
                      </span>
                      <ChevronRight className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setJourneyPanel(null)}
                      className="flex min-h-12 items-center justify-between rounded-2xl border border-mist bg-white px-4 py-3 text-left text-sm font-semibold text-ink shadow-sm transition hover:border-pine hover:bg-sand/30 hover:shadow-[0_12px_30px_rgba(17,32,51,0.12)]"
                    >
                      <span>Zur aktuellen Aufgabe zurück</span>
                      <ChevronRight className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={resetLocalData}
                      className="flex min-h-12 items-center justify-between rounded-2xl border border-[#f0b2a3] bg-[#fff1ec] px-4 py-3 text-left text-sm font-semibold text-[#8a2f22] shadow-sm transition hover:border-[#d86f58] hover:bg-[#ffe4da] hover:shadow-[0_12px_30px_rgba(17,32,51,0.12)]"
                    >
                      <span className="inline-flex items-center gap-3">
                        <RotateCcw className="h-4 w-4" />
                        Lernreise zurücksetzen
                      </span>
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ) : null}

            {journeyPanel === "chapters" ? (
              <div className="absolute inset-0 z-30 flex items-start justify-center px-4 py-4 md:px-8 md:py-6">
                <div
                  data-journey-panel
                  data-active="true"
                  className="w-full max-w-3xl rounded-[34px] border border-ink/10 bg-white p-5 shadow-[0_32px_90px_rgba(17,32,51,0.34)] ring-1 ring-white"
                >
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate">
                        Kapitelübersicht
                      </p>
                      <h2 className="font-display text-2xl text-ink">Lernreise auf einen Blick</h2>
                    </div>
                    <button
                      type="button"
                      onClick={() => setJourneyPanel(null)}
                      className="inline-flex min-h-11 items-center gap-2 rounded-full border border-ink/10 bg-white px-4 py-2 text-sm font-semibold text-ink shadow-sm transition hover:border-pine hover:text-pine"
                    >
                      <X className="h-4 w-4" />
                      Schließen
                    </button>
                  </div>

                  <ChapterSidebar
                    chapters={course.chapters}
                    currentSceneId={currentScene.id}
                    completedSceneIds={progress.completedSceneIds}
                    onJumpToScene={jumpToScene}
                    canOpenCompletion
                    onOpenCompletion={() => {
                      setJourneyPanel(null);
                      setView("done");
                    }}
                  />
                </div>
              </div>
            ) : null}

            {journeyPanel === "status" ? (
              <div className="absolute inset-0 z-30 flex items-start justify-center px-4 py-4 md:px-8 md:py-6">
                <div data-journey-panel className="w-full max-w-2xl rounded-[34px] border border-ink/10 bg-white p-5 shadow-[0_32px_90px_rgba(17,32,51,0.34)] ring-1 ring-white">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate">
                        Status
                      </p>
                      <h2 className="mt-1 font-display text-2xl text-ink">Fortschritt und Profil</h2>
                    </div>
                    <button
                      type="button"
                      onClick={() => setJourneyPanel(null)}
                      className="inline-flex min-h-11 items-center justify-center rounded-full border border-ink/10 bg-white px-3 py-2 text-ink shadow-sm transition hover:border-pine hover:text-pine"
                      aria-label="Status schließen"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="mt-5">
                    <ExperienceStatus experience={experience} showProfileText />
                  </div>

                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                    <div className="rounded-[28px] border border-mist bg-white p-4 shadow-sm">
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-sm font-semibold text-ink">Pflichtfortschritt</p>
                        <span className="text-sm font-semibold text-ink">
                          {requiredProgress.completed} / {requiredProgress.total}
                        </span>
                      </div>
                      <p className="mt-2 text-sm leading-6 text-slate">
                        {optionalProgress.completed} freiwillige Vertiefungen bearbeitet
                      </p>
                      <p className="mt-1 text-sm leading-6 text-slate">
                        {insightProgress.discovered} Praxisimpulse entdeckt
                      </p>
                      <div className="mt-4">
                        <LearningPointsHelp
                          awardedPointIds={progress.awardedPointIds}
                          onAwardPoints={handleAwardPoints}
                        />
                      </div>
                    </div>

                    <div className="rounded-[28px] border border-mist bg-white p-4 shadow-sm">
                      <p className="text-sm font-semibold text-ink">Lachen, Lernen, Leisten</p>
                      <div className="mt-4 space-y-3">
                        <ProgressBar value={scores.lachen.ratio} label="Lachen" dimension="lachen" />
                        <ProgressBar value={scores.lernen.ratio} label="Lernen" dimension="lernen" />
                        <ProgressBar value={scores.leisten.ratio} label="Leisten" dimension="leisten" />
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 flex flex-wrap justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setJourneyPanel(null);
                        setView("done");
                      }}
                      className="inline-flex min-h-11 items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white transition hover:bg-pine"
                    >
                      Zur Auswertung
                    </button>
                  </div>
                </div>
              </div>
            ) : null}

            {journeyPanel === "notebook" ? (
              <div className="absolute inset-0 z-30 flex items-stretch justify-end p-2 md:p-4">
                <div data-journey-panel className="flex h-full w-full max-w-2xl flex-col overflow-hidden rounded-[34px] border border-ink/10 bg-white p-4 shadow-[0_32px_90px_rgba(17,32,51,0.34)] ring-1 ring-white md:p-5">
                  <div className="mb-4 flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate">
                        Notizbuch
                      </p>
                      <h2 className="mt-1 font-display text-2xl text-ink">Meine Reflexion</h2>
                    </div>
                    <button
                      type="button"
                      onClick={() => setJourneyPanel(null)}
                      className="inline-flex min-h-11 items-center justify-center rounded-full border border-ink/10 bg-white px-3 py-2 text-ink shadow-sm transition hover:border-pine hover:text-pine"
                      aria-label="Notizbuch schließen"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="min-h-0 flex-1 overflow-y-auto pr-1">
                    <NotebookPanel
                      notebook={progress.notebook}
                      onChange={updateNotebookField}
                      awardedPointIds={progress.awardedPointIds}
                      onAwardPoints={handleAwardPoints}
                      defaultSection={notebookSection}
                      compact
                      forceExpanded
                      hideToggle
                      className="bg-white shadow-none"
                      downloadHref="/downloads/notizbuch-digital.pdf"
                    />
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        ) : null}

        {view === "chapterSummary" && summaryChapter ? (
          <ChapterSummaryCard
            chapter={summaryChapter}
            onContinue={() => {
              setSummaryChapterId(null);
              setView("journey");
            }}
            onReviewChapter={() => {
              if (!summaryChapter.scenes[0]?.id) return;
              jumpToScene(summaryChapter.scenes[0].id);
            }}
          />
        ) : null}

        {view === "done" ? (
          <CompletionView
            course={course}
            participantName={participant.name}
            progress={progress}
            scores={scores}
            learningProgress={requiredProgress}
            optionalProgress={optionalProgress}
            insightProgress={insightProgress}
            pointSuggestions={pointSuggestions}
            passed={passed}
            notebook={progress.notebook}
            onRestart={restartJourney}
            onResumeJourney={() => setView("journey")}
            transferValue={progress.reflections.transfer_praxis ?? ""}
            onTransferChange={updateTransferValue}
          />
        ) : null}

        {levelUpStage ? (
          <ExperienceLevelUp
            stage={levelUpStage}
            profileText={experience.profileText}
            onClose={() => setLevelUpStage(null)}
          />
        ) : null}
      </div>
    </main>
  );
}



