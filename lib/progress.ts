import {
  allDeepDiveIds,
  getDeepDiveSceneIds,
  getSceneDeepDiveIds,
  hasCompletedSceneDeepDiveBonus,
} from "@/data/scene-deep-dives";
import {
  allTaskIds,
  getOptionalTaskIdsForChapter,
  getRegularTaskIdsForChapter,
  getTaskDefinition,
  optionalTaskIds,
  regularTaskIds,
} from "@/data/task-structure";
import {
  Course,
  DimensionId,
  DimensionScores,
  ExperienceProgress,
  ExperienceProfileVariant,
  ExperienceStage,
  NotebookFieldId,
  NotebookState,
  OptionalProgress,
  PointsAward,
  ProgressState,
  RequiredProgress,
  Scene,
} from "@/lib/types";
import { flattenScenes, getDimensionLabel, toGermanDisplayText } from "@/lib/utils";

export type LearningPointProgress = RequiredProgress;

export type InsightProgress = {
  discovered: number;
  total: number;
  completedTaskBonuses: number;
  totalTaskBonuses: number;
  points: number;
  totalPoints: number;
};

export type PointSuggestion = {
  id: string;
  label: string;
  total: number;
  kind: "core";
};

type AwardCatalogEntry = {
  id: string;
  total: number;
};

const NOTEBOOK_FIELD_IDS: NotebookFieldId[] = [
  "strengths",
  "uncertainties",
  "goals",
  "newLearning",
  "tryOut",
  "questions",
  "developed",
  "consequences",
  "furtherDevelopment",
  "lachenReflection",
  "lernenReflection",
  "leistenReflection",
];

const PRIMARY_PROFILE_POINTS = 2;
const SECONDARY_PROFILE_POINTS = 1;
const EXPERIENCE_STAGE_CAP_RATIO = 0.7;
const BALANCED_SHARE_RANGE = 0.12;
const PAIR_SHARE_GAP = 0.1;
const CLEAR_LEAD_GAP = 0.14;
const MIN_PAIR_ADVANTAGE = 0.1;
const LOW_SIGNAL_PROFILE_POINTS = 4;

export const EXPERIENCE_STAGES: readonly ExperienceStage[] = [
  {
    id: "starter",
    threshold: 0,
    name: "Starter*in",
    effectStrength: "small",
  },
  {
    id: "praxiserkunder",
    threshold: 0.07,
    name: "Praxiserkunder*in",
    effectStrength: "small",
  },
  {
    id: "rollenentdecker",
    threshold: 0.15,
    name: "Rollenentdecker*in",
    effectStrength: "small",
  },
  {
    id: "gruppenblick",
    threshold: 0.3,
    name: "Gruppenblick-Schärfer*in",
    effectStrength: "medium",
  },
  {
    id: "praxisgestalter",
    threshold: 0.5,
    name: "Praxisgestalter*in",
    effectStrength: "large",
  },
  {
    id: "profilentwickler",
    threshold: 0.75,
    name: "ÜL-Profilentwickler*in",
    effectStrength: "large",
  },
  {
    id: "klare-profilstufe",
    threshold: 1,
    name: "Übungsleiterkandidat*in mit klarem Profil",
    effectStrength: "final",
  },
];

const EXPERIENCE_PROFILE_LABELS: Record<ExperienceProfileVariant, string> = {
  lernen: "Lernen stark",
  lachen: "Lachen stark",
  leisten: "Leisten stark",
  "lernen-lachen": "Lernen + Lachen",
  "lernen-leisten": "Lernen + Leisten",
  "lachen-leisten": "Lachen + Leisten",
  balanced: "Ausgewogen",
};

const EXPERIENCE_STAGE_PROFILE_TEXTS: Record<string, Record<ExperienceProfileVariant, string>> = {
  starter: {
    lernen:
      "Du startest mit einem wachen Blick dafür, wie Übungsstunden verständlich, reflektiert und zielgruppenorientiert gestaltet werden können.",
    lachen:
      "Du startest mit einem Gespür dafür, wie wichtig Freude, Atmosphäre und Zugehörigkeit in einer Übungsstunde sind.",
    leisten:
      "Du startest mit Interesse daran, wie passende Herausforderungen und sichtbare Entwicklung im Sport entstehen.",
    "lernen-lachen":
      "Du beginnst mit einem Blick für Verständlichkeit und Atmosphäre. Das ist eine starke Grundlage für gute Übungsstunden.",
    "lernen-leisten":
      "Du startest mit Interesse an Planung, Entwicklung und passenden Anforderungen. Daraus kann viel Handlungssicherheit entstehen.",
    "lachen-leisten":
      "Du beginnst mit einem Profil, das Motivation und persönliche Erfolgserlebnisse verbindet.",
    balanced:
      "Du startest breit: Freude, Lernen und Entwicklung sind bei dir von Anfang an gemeinsam im Blick.",
  },
  praxiserkunder: {
    lernen:
      "Du erkundest vor allem, wie gute Erklärungen, Beobachtungen und Reflexion die Stunde verbessern.",
    lachen:
      "Du achtest besonders darauf, wie Menschen gut ankommen, sich wohlfühlen und Lust auf Bewegung bekommen.",
    leisten: "Du erkundest, wie Aufgaben passend fordern, ohne zu überfordern.",
    "lernen-lachen":
      "Du verbindest erste methodische Klarheit mit einem guten Blick für Atmosphäre und Motivation.",
    "lernen-leisten": "Du schaust darauf, wie Planung und passende Steigerung zusammenwirken.",
    "lachen-leisten":
      "Du erkundest, wie Freude und persönliche Erfolge Menschen in Bewegung bringen.",
    balanced:
      "Du sammelst Erfahrungen in allen drei Bereichen und entwickelst ein breites erstes ÜL-Verständnis.",
  },
  rollenentdecker: {
    lernen:
      "Du entdeckst die ÜL-Rolle vor allem als Beobachter*in, Erklärer*in und Lernbegleiter*in.",
    lachen:
      "Du entdeckst die ÜL-Rolle besonders über Beziehung, Freude und wertschätzendes Miteinander.",
    leisten:
      "Du entdeckst die ÜL-Rolle über Herausforderung, Entwicklung und verantwortliches Anleiten.",
    "lernen-lachen":
      "Deine Rolle entwickelt sich über Klarheit und Zugewandtheit. Du erklärst nicht nur, du erreichst Menschen.",
    "lernen-leisten":
      "Du erkennst, wie wichtig gute Planung ist, damit Entwicklung wirklich gelingen kann.",
    "lachen-leisten":
      "Du verbindest Motivation mit passenden Herausforderungen. Das kann sehr wirksam sein.",
    balanced:
      "Du entdeckst die ÜL-Rolle in ihrer ganzen Breite: Menschen erreichen, Lernen ermöglichen und Entwicklung begleiten.",
  },
  gruppenblick: {
    lernen: "Dein Blick für Voraussetzungen, Verständlichkeit und Reflexion wird schärfer.",
    lachen:
      "Du erkennst immer besser, wie Stimmung, Zugehörigkeit und Beteiligung die Gruppe tragen.",
    leisten:
      "Du achtest stärker darauf, welche Anforderungen zur Gruppe und zur Tagesform passen.",
    "lernen-lachen":
      "Du siehst genauer, was Menschen brauchen, um sich sicher, verstanden und beteiligt zu fühlen.",
    "lernen-leisten": "Du verbindest Beobachtung mit passenden methodischen Entscheidungen.",
    "lachen-leisten":
      "Du erkennst, wie Motivation und Erfolgserlebnisse die Gruppe in Bewegung halten.",
    balanced:
      "Dein Gruppenblick wird rund: Du nimmst Atmosphäre, Lernprozesse und Belastung gleichzeitig wahr.",
  },
  praxisgestalter: {
    lernen:
      "Du gestaltest Praxis vor allem über gute Struktur, klare Erklärungen und Reflexion.",
    lachen:
      "Du gestaltest Praxis besonders über Freude, Wertschätzung und ein gutes Gruppengefühl.",
    leisten:
      "Du gestaltest Praxis über passende Herausforderungen, Varianten und sichtbare Fortschritte.",
    "lernen-lachen":
      "Du kannst Übungsstunden so gestalten, dass Menschen verstehen, mitmachen und sich wohlfühlen.",
    "lernen-leisten":
      "Du planst zunehmend so, dass Aufgaben verständlich sind und Entwicklung ermöglichen.",
    "lachen-leisten":
      "Du bringst Menschen über Motivation und persönliche Erfolge ins Tun.",
    balanced:
      "Du gestaltest Praxis ausgewogen: Freude, Lernen und Leistung greifen sichtbar ineinander.",
  },
  profilentwickler: {
    lernen:
      "Dein Profil zeigt eine klare Stärke darin, Lernprozesse bewusst zu begleiten und Erfahrungen auszuwerten.",
    lachen:
      "Dein Profil zeigt eine klare Stärke darin, Atmosphäre, Motivation und Zugehörigkeit zu gestalten.",
    leisten:
      "Dein Profil zeigt eine klare Stärke darin, Entwicklung, Belastung und Herausforderung passend zu steuern.",
    "lernen-lachen":
      "Dein Profil verbindet methodische Klarheit mit einem starken Blick für Menschen und Stimmung.",
    "lernen-leisten":
      "Dein Profil verbindet Planungskompetenz mit einem guten Gefühl für Entwicklung und Steigerung.",
    "lachen-leisten": "Dein Profil verbindet Motivation mit wirksamen Erfolgserlebnissen.",
    balanced:
      "Dein Profil wird ausgewogen und tragfähig: Du kannst alle drei Perspektiven bewusst einsetzen.",
  },
  "klare-profilstufe": {
    lernen:
      "Dein klares Profil liegt im Begleiten von Lernprozessen: beobachten, erklären, reflektieren und weiterentwickeln.",
    lachen:
      "Dein klares Profil liegt im Gestalten von Atmosphäre: Menschen erreichen, motivieren und Zugehörigkeit schaffen.",
    leisten:
      "Dein klares Profil liegt im Entwickeln von Praxis: passend fordern, steigern und Erfolge sichtbar machen.",
    "lernen-lachen":
      "Dein klares Profil verbindet Verständlichkeit mit Beziehung. Du kannst Menschen fachlich und menschlich erreichen.",
    "lernen-leisten":
      "Dein klares Profil verbindet Struktur mit Entwicklung. Du planst so, dass Fortschritt möglich wird.",
    "lachen-leisten":
      "Dein klares Profil verbindet Freude mit Herausforderung. Du stärkst Motivation und persönliche Erfolgserlebnisse.",
    balanced:
      "Dein klares Profil ist breit angelegt: Du verbindest Lachen, Lernen und Leisten zu einer tragfähigen ÜL-Haltung.",
  },
};

const EMPTY_AWARD: PointsAward = {
  total: 0,
  kind: "core",
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function getSceneLookup(course: Course) {
  return new Map(flattenScenes(course).map((scene) => [scene.id, scene]));
}

function getCompletedTaskIds(progress: ProgressState) {
  return progress.completedSceneIds.filter((id) => allTaskIds.includes(id));
}

function getOpenedDeepDiveIds(progress: ProgressState) {
  return Array.from(
    new Set(
      progress.openedInsightIds.filter((id) => {
        const sceneId = id.split(".deepDive.")[0];
        return allDeepDiveIds.includes(id) && allTaskIds.includes(sceneId);
      }),
    ),
  );
}

function getActiveDeepDiveSceneIds() {
  return getDeepDiveSceneIds().filter((sceneId) => allTaskIds.includes(sceneId));
}

function getActiveDeepDiveIds() {
  return allDeepDiveIds.filter((id) => {
    const sceneId = id.split(".deepDive.")[0];
    return allTaskIds.includes(sceneId);
  });
}

function getAwardCatalog(course: Course) {
  const catalog = new Map<string, AwardCatalogEntry>();

  function addAward(award: PointsAward | null | undefined) {
    if (!award?.id || award.total <= 0) return;
    if (!catalog.has(award.id)) {
      catalog.set(award.id, {
        id: award.id,
        total: award.total,
      });
    }
  }

  flattenScenes(course).forEach((scene) => {
    addAward(getSceneCoreAward(scene));
    const actionAwards = getSceneActionAwards(scene);
    addAward(actionAwards.context);
    addAward(actionAwards.meta);
    addAward(actionAwards.recall);
    addAward(scene.contextAward);
    addAward(scene.metaAward);
    addAward(scene.recallAward);
    scene.insights?.forEach((insight) => addAward(insight.reward));
  });

  NOTEBOOK_FIELD_IDS.forEach((fieldId) => {
    addAward(getNotebookFieldAward(fieldId));
  });

  addAward(getPointsExplanationAward());

  return Array.from(catalog.values());
}

function getAwardPointTotals(course: Course, progress: ProgressState) {
  const catalog = getAwardCatalog(course);
  const awardedIds = new Set(progress.awardedPointIds);

  return {
    max: catalog.reduce((sum, award) => sum + award.total, 0),
    earned: catalog.reduce((sum, award) => sum + (awardedIds.has(award.id) ? award.total : 0), 0),
  };
}

function getScenePointTotals(course: Course, progress: ProgressState) {
  const completedIds = new Set(progress.completedSceneIds);

  return {
    max: flattenScenes(course).reduce((sum, scene) => sum + (scene.points ?? 0), 0),
    earned: flattenScenes(course).reduce(
      (sum, scene) => sum + (completedIds.has(scene.id) ? scene.points ?? 0 : 0),
      0,
    ),
  };
}

function getDeepDivePointTotals(course: Course, progress: ProgressState) {
  const insightPoints = new Map(
    flattenScenes(course).flatMap((scene) =>
      (scene.insights ?? []).map((insight) => [insight.id, insight.points] as const),
    ),
  );
  const openedIds = getOpenedDeepDiveIds(progress);
  const bonusSceneIds = getActiveDeepDiveSceneIds();

  return {
    max: Array.from(insightPoints.values()).reduce((sum, points) => sum + points, 0),
    earned: openedIds.reduce((sum, insightId) => sum + (insightPoints.get(insightId) ?? 0), 0),
    maxBonus: bonusSceneIds.length,
    earnedBonus: bonusSceneIds.filter((sceneId) => hasCompletedSceneDeepDiveBonus(sceneId, openedIds)).length,
  };
}

function buildProgress(completed: number, total: number): RequiredProgress {
  const remaining = Math.max(0, total - completed);
  const ratio = total ? completed / total : 0;

  return {
    completed,
    total,
    remaining,
    ratio,
    percentage: Math.round(ratio * 100),
  };
}

function getTaskDefinitions() {
  return Object.fromEntries(allTaskIds.map((id) => [id, getTaskDefinition(id)!]));
}

function getDimensionPointTotals() {
  const totals: Record<DimensionId, number> = {
    lachen: 0,
    lernen: 0,
    leisten: 0,
  };

  Object.values(getTaskDefinitions()).forEach((definition) => {
    totals[definition.primaryDimension] += PRIMARY_PROFILE_POINTS;
    definition.secondaryDimensions.forEach((dimension) => {
      totals[dimension] += SECONDARY_PROFILE_POINTS;
    });
  });

  return totals;
}

export function getSceneCoreAward(_scene: Scene): PointsAward {
  return EMPTY_AWARD;
}

export function getSceneActionAwards(_scene: Scene) {
  return {
    context: null,
    meta: null,
    recall: null,
  };
}

export function getNotebookFieldAward(_field: NotebookFieldId) {
  return null;
}

export function getPointsExplanationAward() {
  return EMPTY_AWARD;
}

export function getNotebookAwardIdsForFilledFields(_notebook: NotebookState) {
  return [] as string[];
}

function getPairProfileVariant(first: DimensionId, second: DimensionId): ExperienceProfileVariant {
  const ids = [first, second].sort().join("-");

  switch (ids) {
    case "lachen-lernen":
      return "lernen-lachen";
    case "lachen-leisten":
      return "lachen-leisten";
    case "lernen-leisten":
      return "lernen-leisten";
    default:
      return "balanced";
  }
}

function getExperienceProfileVariant(scores: DimensionScores): ExperienceProfileVariant {
  const rankedDimensions = (Object.entries(scores) as Array<[DimensionId, DimensionScores[DimensionId]]>)
    .map(([id, score]) => ({
      id,
      points: score.points,
      ratio: score.ratio,
    }))
    .sort((a, b) => b.points - a.points || b.ratio - a.ratio);
  const totalPoints = rankedDimensions.reduce((sum, entry) => sum + entry.points, 0);

  if (totalPoints <= 0) {
    return "balanced";
  }

  const [top, second, third] = rankedDimensions.map((entry) => ({
    ...entry,
    share: totalPoints > 0 ? entry.points / totalPoints : 0,
  }));
  const shareRange = top.share - third.share;
  const topSecondGap = top.share - second.share;
  const secondThirdGap = second.share - third.share;
  const pointSpread = top.points - third.points;

  if ((totalPoints <= LOW_SIGNAL_PROFILE_POINTS && pointSpread <= 1) || shareRange <= BALANCED_SHARE_RANGE) {
    return "balanced";
  }

  if (topSecondGap <= PAIR_SHARE_GAP && secondThirdGap >= MIN_PAIR_ADVANTAGE) {
    return getPairProfileVariant(top.id, second.id);
  }

  if (topSecondGap >= CLEAR_LEAD_GAP) {
    return top.id;
  }

  if (topSecondGap <= PAIR_SHARE_GAP) {
    return getPairProfileVariant(top.id, second.id);
  }

  return "balanced";
}

function getExperienceProfileLabel(variant: ExperienceProfileVariant) {
  return EXPERIENCE_PROFILE_LABELS[variant];
}

function getExperienceProfileText(stageId: string, variant: ExperienceProfileVariant) {
  const stageTexts = EXPERIENCE_STAGE_PROFILE_TEXTS[stageId];
  if (!stageTexts) {
    return EXPERIENCE_STAGE_PROFILE_TEXTS.starter.balanced;
  }

  return stageTexts[variant] ?? stageTexts.balanced;
}

export function getExperienceStageIndex(stageId: string | null | undefined) {
  const index = EXPERIENCE_STAGES.findIndex((stage) => stage.id === stageId);
  return index >= 0 ? index : 0;
}

export function getExperienceProgress(
  course: Course,
  progress: ProgressState,
  scores = getProfileScores(course, progress),
): ExperienceProgress {
  const scenePointTotals = getScenePointTotals(course, progress);
  const deepDivePointTotals = getDeepDivePointTotals(course, progress);
  const awardPointTotals = getAwardPointTotals(course, progress);
  const maxPossiblePoints =
    scenePointTotals.max +
    deepDivePointTotals.max +
    deepDivePointTotals.maxBonus +
    awardPointTotals.max;
  const totalPoints =
    scenePointTotals.earned +
    deepDivePointTotals.earned +
    deepDivePointTotals.earnedBonus +
    awardPointTotals.earned;
  const cappedTargetPoints = maxPossiblePoints * EXPERIENCE_STAGE_CAP_RATIO;
  const ratio = cappedTargetPoints > 0 ? clamp(totalPoints / cappedTargetPoints, 0, 1) : 0;
  const currentStageIndex = EXPERIENCE_STAGES.reduce((highestIndex, stage, index) => {
    return ratio >= stage.threshold ? index : highestIndex;
  }, 0);
  const currentStage = EXPERIENCE_STAGES[currentStageIndex];
  const nextStage = EXPERIENCE_STAGES[currentStageIndex + 1] ?? null;
  const stageProgress = nextStage
    ? clamp(
        (ratio - currentStage.threshold) / Math.max(nextStage.threshold - currentStage.threshold, 0.0001),
        0,
        1,
      )
    : 1;
  const profileVariant = getExperienceProfileVariant(scores);
  const profileLabel = getExperienceProfileLabel(profileVariant);
  const profileText = getExperienceProfileText(currentStage.id, profileVariant);

  return {
    ratio,
    totalPoints,
    maxPossiblePoints,
    cappedTargetPoints,
    currentStage,
    nextStage,
    currentStageIndex,
    stageProgress,
    isMaxStage: !nextStage,
    profileVariant,
    profileLabel,
    profileText,
  };
}

export function getLearningPointProgress(_course: Course, progress: ProgressState): LearningPointProgress {
  const completed = regularTaskIds.filter((id) => progress.completedSceneIds.includes(id)).length;
  return buildProgress(completed, regularTaskIds.length);
}

export function getRequiredProgress(progress: ProgressState): RequiredProgress {
  const completed = regularTaskIds.filter((id) => progress.completedSceneIds.includes(id)).length;
  return buildProgress(completed, regularTaskIds.length);
}

export function getOptionalProgress(progress: ProgressState): OptionalProgress {
  const completed = optionalTaskIds.filter((id) => progress.completedSceneIds.includes(id)).length;
  const total = optionalTaskIds.length;
  const ratio = total ? completed / total : 0;

  return {
    completed,
    total,
    ratio,
  };
}

export function getInsightProgress(progress: ProgressState): InsightProgress {
  const openedDeepDiveIds = getOpenedDeepDiveIds(progress);
  const activeDeepDiveIds = getActiveDeepDiveIds();
  const activeDeepDiveSceneIds = getActiveDeepDiveSceneIds();
  const completedTaskBonuses = activeDeepDiveSceneIds.filter((sceneId) =>
    hasCompletedSceneDeepDiveBonus(sceneId, openedDeepDiveIds),
  ).length;
  const totalTaskBonuses = activeDeepDiveSceneIds.length;

  return {
    discovered: openedDeepDiveIds.length,
    total: activeDeepDiveIds.length,
    completedTaskBonuses,
    totalTaskBonuses,
    points: openedDeepDiveIds.length + completedTaskBonuses,
    totalPoints: activeDeepDiveIds.length + totalTaskBonuses,
  };
}

export function isCourseCompleted(progress: ProgressState) {
  return getRequiredProgress(progress).completed >= regularTaskIds.length;
}

export function hasReachedCompletionGoal(_course: Course, progress: ProgressState) {
  return isCourseCompleted(progress);
}

export function getChapterTaskProgress(chapterId: string, progress: ProgressState) {
  const regularIds = getRegularTaskIdsForChapter(chapterId);
  const completed = regularIds.filter((id) => progress.completedSceneIds.includes(id)).length;
  return buildProgress(completed, regularIds.length);
}

export function getChapterOptionalProgress(chapterId: string, progress: ProgressState) {
  const optionalIds = getOptionalTaskIdsForChapter(chapterId);
  const completed = optionalIds.filter((id) => progress.completedSceneIds.includes(id)).length;
  const total = optionalIds.length;
  const ratio = total ? completed / total : 0;

  return {
    completed,
    total,
    ratio,
  };
}

export function getProfileScores(_course: Course, progress: ProgressState): DimensionScores {
  const maxPoints = getDimensionPointTotals();
  const scores: Record<DimensionId, number> = {
    lachen: 0,
    lernen: 0,
    leisten: 0,
  };

  getCompletedTaskIds(progress).forEach((sceneId) => {
    const definition = getTaskDefinition(sceneId);
    if (!definition) return;

    scores[definition.primaryDimension] += PRIMARY_PROFILE_POINTS;
    definition.secondaryDimensions.forEach((dimension) => {
      scores[dimension] += SECONDARY_PROFILE_POINTS;
    });
  });

  return {
    lachen: {
      points: scores.lachen,
      maxPoints: maxPoints.lachen,
      completed: maxPoints.lachen ? Math.min(100, Math.round((scores.lachen / maxPoints.lachen) * 100)) : 0,
      total: 100,
      ratio: maxPoints.lachen ? Math.min(1, scores.lachen / maxPoints.lachen) : 0,
    },
    lernen: {
      points: scores.lernen,
      maxPoints: maxPoints.lernen,
      completed: maxPoints.lernen ? Math.min(100, Math.round((scores.lernen / maxPoints.lernen) * 100)) : 0,
      total: 100,
      ratio: maxPoints.lernen ? Math.min(1, scores.lernen / maxPoints.lernen) : 0,
    },
    leisten: {
      points: scores.leisten,
      maxPoints: maxPoints.leisten,
      completed: maxPoints.leisten ? Math.min(100, Math.round((scores.leisten / maxPoints.leisten) * 100)) : 0,
      total: 100,
      ratio: maxPoints.leisten ? Math.min(1, scores.leisten / maxPoints.leisten) : 0,
    },
  };
}

export function getOpenPointSuggestions(
  course: Course,
  progress: ProgressState,
  limit = 4,
): PointSuggestion[] {
  const sceneLookup = getSceneLookup(course);

  return regularTaskIds
    .filter((id) => !progress.completedSceneIds.includes(id))
    .slice(0, limit)
    .map((id) => ({
      id,
      label: toGermanDisplayText(sceneLookup.get(id)?.title ?? id),
      total: 1,
      kind: "core" as const,
    }));
}

export function getSceneDeepDiveBonusMessage(sceneId: string, progress: ProgressState) {
  const sceneInsightIds = getSceneDeepDiveIds(sceneId);
  const openedIds = getOpenedDeepDiveIds(progress);
  const isComplete =
    sceneInsightIds.length > 0 && sceneInsightIds.every((insightId) => openedIds.includes(insightId));

  if (!isComplete) return null;

  return "Alle drei Praxisimpulse dieser Aufgabe entdeckt: +1 Bonus.";
}

export function getProfileFeedback(sceneId: string) {
  const definition = getTaskDefinition(sceneId);
  if (!definition) return null;

  const primaryLabel = getDimensionLabel(definition.primaryDimension);

  if (!definition.secondaryDimensions.length) {
    return `Diese Aufgabe stärkt ${primaryLabel} (+2).`;
  }

  if (definition.secondaryDimensions.length === 1) {
    return `Diese Aufgabe stärkt vor allem ${primaryLabel} (+2) und außerdem ${getDimensionLabel(
      definition.secondaryDimensions[0],
    )} (+1).`;
  }

  const secondaryLabels = definition.secondaryDimensions.map((dimension) => getDimensionLabel(dimension));
  return `Diese Aufgabe stärkt vor allem ${primaryLabel} (+2) und außerdem ${secondaryLabels.join(
    " und ",
  )} (je +1).`;
}

