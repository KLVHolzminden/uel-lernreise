import { DimensionId, TaskDefinition } from "@/lib/types";

type ChapterTaskSection = {
  id: string;
  order: number;
  regularSceneIds: string[];
  optionalSceneIds: string[];
};

function defineTask(
  sceneId: string,
  chapterId: string,
  chapterPosition: number,
  orderInChapter: number,
  kind: "regular" | "optional",
  primaryDimension: DimensionId,
  secondaryDimensions: DimensionId[] = [],
  relatedRegularSceneId?: string,
): TaskDefinition {
  return {
    sceneId,
    chapterId,
    chapterPosition,
    orderInChapter,
    kind,
    relatedRegularSceneId,
    primaryDimension,
    secondaryDimensions,
  };
}

export const chapterTaskSections: ChapterTaskSection[] = [
  {
    id: "in-die-rolle-finden",
    order: 1,
    regularSceneIds: ["c1-intro", "c1-selbstbild", "c1-motivation", "c1-verantwortung"],
    optionalSceneIds: ["c5-rolle"],
  },
  {
    id: "menschen-erreichen-gemeinschaft",
    order: 2,
    regularSceneIds: ["c2-willkommen", "c2-freude", "c2-wertschaetzend", "c2-beteiligung"],
    optionalSceneIds: ["c5-ritual", "c5-motivation", "c5-humor", "c5-gruppengefuehl"],
  },
  {
    id: "wahrnehmen-erklaeren-rueckmeldung",
    order: 3,
    regularSceneIds: ["c3-zielgruppe", "c3-erklaeren", "c3-feedback", "c3-reflexion"],
    optionalSceneIds: ["c5-perspektive", "c5-peer-feedback", "c5-fallbeispiel"],
  },
  {
    id: "herausforderungen-passend-gestalten",
    order: 4,
    regularSceneIds: ["c4-differenzierung", "c4-steigerung", "c4-erfolge", "c4-situationselastisch"],
    optionalSceneIds: ["c5-challenge", "c5-trainingsprinzip", "c5-sicherheitscheck"],
  },
  {
    id: "erfahrungen-sichern-weitergehen",
    order: 5,
    regularSceneIds: ["c5-intro", "c5-rueckblick", "c5-kompass", "c5-cta-uelc"],
    optionalSceneIds: ["c5-beutebuch"],
  },
];

export const taskDefinitions: Record<string, TaskDefinition> = {
  "c1-intro": defineTask("c1-intro", "in-die-rolle-finden", 1, 1, "regular", "lernen", [
    "lachen",
    "leisten",
  ]),
  "c1-selbstbild": defineTask("c1-selbstbild", "in-die-rolle-finden", 1, 2, "regular", "lernen", [
    "leisten",
  ]),
  "c1-motivation": defineTask("c1-motivation", "in-die-rolle-finden", 1, 3, "regular", "lachen", [
    "lernen",
  ]),
  "c1-verantwortung": defineTask(
    "c1-verantwortung",
    "in-die-rolle-finden",
    1,
    4,
    "regular",
    "leisten",
    ["lernen"],
  ),
  "c5-rolle": defineTask(
    "c5-rolle",
    "in-die-rolle-finden",
    1,
    1,
    "optional",
    "lernen",
    ["leisten"],
    "c1-selbstbild",
  ),

  "c2-willkommen": defineTask(
    "c2-willkommen",
    "menschen-erreichen-gemeinschaft",
    2,
    1,
    "regular",
    "lachen",
    ["lernen"],
  ),
  "c2-freude": defineTask(
    "c2-freude",
    "menschen-erreichen-gemeinschaft",
    2,
    2,
    "regular",
    "lachen",
    ["leisten"],
  ),
  "c2-wertschaetzend": defineTask(
    "c2-wertschaetzend",
    "menschen-erreichen-gemeinschaft",
    2,
    3,
    "regular",
    "lachen",
    ["lernen"],
  ),
  "c2-beteiligung": defineTask(
    "c2-beteiligung",
    "menschen-erreichen-gemeinschaft",
    2,
    4,
    "regular",
    "lachen",
    ["lernen"],
  ),
  "c5-ritual": defineTask(
    "c5-ritual",
    "menschen-erreichen-gemeinschaft",
    2,
    1,
    "optional",
    "lachen",
    ["lernen"],
    "c2-willkommen",
  ),
  "c5-motivation": defineTask(
    "c5-motivation",
    "menschen-erreichen-gemeinschaft",
    2,
    2,
    "optional",
    "lachen",
    ["lernen"],
    "c2-freude",
  ),
  "c5-humor": defineTask(
    "c5-humor",
    "menschen-erreichen-gemeinschaft",
    2,
    3,
    "optional",
    "lachen",
    ["lernen"],
    "c2-wertschaetzend",
  ),
  "c5-gruppengefuehl": defineTask(
    "c5-gruppengefuehl",
    "menschen-erreichen-gemeinschaft",
    2,
    4,
    "optional",
    "lachen",
    ["lernen"],
    "c2-beteiligung",
  ),

  "c3-zielgruppe": defineTask(
    "c3-zielgruppe",
    "wahrnehmen-erklaeren-rueckmeldung",
    3,
    1,
    "regular",
    "lernen",
    ["leisten"],
  ),
  "c3-erklaeren": defineTask(
    "c3-erklaeren",
    "wahrnehmen-erklaeren-rueckmeldung",
    3,
    2,
    "regular",
    "lernen",
    ["lachen"],
  ),
  "c3-feedback": defineTask(
    "c3-feedback",
    "wahrnehmen-erklaeren-rueckmeldung",
    3,
    3,
    "regular",
    "lernen",
    ["lachen", "leisten"],
  ),
  "c3-reflexion": defineTask(
    "c3-reflexion",
    "wahrnehmen-erklaeren-rueckmeldung",
    3,
    4,
    "regular",
    "lernen",
    ["leisten"],
  ),
  "c5-perspektive": defineTask(
    "c5-perspektive",
    "wahrnehmen-erklaeren-rueckmeldung",
    3,
    1,
    "optional",
    "lernen",
    ["lachen"],
    "c3-zielgruppe",
  ),
  "c5-peer-feedback": defineTask(
    "c5-peer-feedback",
    "wahrnehmen-erklaeren-rueckmeldung",
    3,
    2,
    "optional",
    "lernen",
    ["lachen", "leisten"],
    "c3-feedback",
  ),
  "c5-fallbeispiel": defineTask(
    "c5-fallbeispiel",
    "wahrnehmen-erklaeren-rueckmeldung",
    3,
    3,
    "optional",
    "lernen",
    ["leisten"],
    "c3-reflexion",
  ),

  "c4-differenzierung": defineTask(
    "c4-differenzierung",
    "herausforderungen-passend-gestalten",
    4,
    1,
    "regular",
    "leisten",
    ["lernen"],
  ),
  "c4-steigerung": defineTask(
    "c4-steigerung",
    "herausforderungen-passend-gestalten",
    4,
    2,
    "regular",
    "leisten",
    ["lernen"],
  ),
  "c4-erfolge": defineTask(
    "c4-erfolge",
    "herausforderungen-passend-gestalten",
    4,
    3,
    "regular",
    "leisten",
    ["lachen"],
  ),
  "c4-situationselastisch": defineTask(
    "c4-situationselastisch",
    "herausforderungen-passend-gestalten",
    4,
    4,
    "regular",
    "lernen",
    ["leisten"],
  ),
  "c5-challenge": defineTask(
    "c5-challenge",
    "herausforderungen-passend-gestalten",
    4,
    1,
    "optional",
    "leisten",
    ["lernen"],
    "c4-differenzierung",
  ),
  "c5-trainingsprinzip": defineTask(
    "c5-trainingsprinzip",
    "herausforderungen-passend-gestalten",
    4,
    2,
    "optional",
    "lernen",
    ["leisten"],
    "c4-steigerung",
  ),
  "c5-sicherheitscheck": defineTask(
    "c5-sicherheitscheck",
    "herausforderungen-passend-gestalten",
    4,
    3,
    "optional",
    "leisten",
    ["lernen"],
    "c4-situationselastisch",
  ),

  "c5-intro": defineTask(
    "c5-intro",
    "erfahrungen-sichern-weitergehen",
    5,
    1,
    "regular",
    "lernen",
  ),
  "c5-rueckblick": defineTask(
    "c5-rueckblick",
    "erfahrungen-sichern-weitergehen",
    5,
    2,
    "regular",
    "lernen",
    ["leisten"],
  ),
  "c5-kompass": defineTask(
    "c5-kompass",
    "erfahrungen-sichern-weitergehen",
    5,
    3,
    "regular",
    "lernen",
    ["leisten"],
  ),
  "c5-cta-uelc": defineTask(
    "c5-cta-uelc",
    "erfahrungen-sichern-weitergehen",
    5,
    4,
    "regular",
    "leisten",
    ["lernen"],
  ),
  "c5-beutebuch": defineTask(
    "c5-beutebuch",
    "erfahrungen-sichern-weitergehen",
    5,
    1,
    "optional",
    "lernen",
    ["leisten"],
    "c5-rueckblick",
  ),
};

export const regularTaskIds = chapterTaskSections.flatMap((chapter) => chapter.regularSceneIds);
export const optionalTaskIds = chapterTaskSections.flatMap((chapter) => chapter.optionalSceneIds);
export const allTaskIds = [...regularTaskIds, ...optionalTaskIds];

export function getTaskDefinition(sceneId: string) {
  return taskDefinitions[sceneId];
}

export function getRegularTaskIdsForChapter(chapterId: string) {
  return chapterTaskSections.find((chapter) => chapter.id === chapterId)?.regularSceneIds ?? [];
}

export function getOptionalTaskIdsForChapter(chapterId: string) {
  return chapterTaskSections.find((chapter) => chapter.id === chapterId)?.optionalSceneIds ?? [];
}

export function getOptionalTaskIdsForRegular(regularSceneId: string) {
  return optionalTaskIds.filter(
    (sceneId) => taskDefinitions[sceneId]?.relatedRegularSceneId === regularSceneId,
  );
}

export function getNextRegularTaskId(sceneId: string) {
  const meta = taskDefinitions[sceneId];
  const regularId = meta?.kind === "optional" ? meta.relatedRegularSceneId ?? null : sceneId;

  if (!regularId) return null;

  const currentIndex = regularTaskIds.indexOf(regularId);
  return currentIndex >= 0 ? regularTaskIds[currentIndex + 1] ?? null : null;
}

export function getPreviousRegularTaskId(sceneId: string) {
  const meta = taskDefinitions[sceneId];
  const regularId = meta?.kind === "optional" ? meta.relatedRegularSceneId ?? null : sceneId;

  if (!regularId) return null;

  const currentIndex = regularTaskIds.indexOf(regularId);
  return currentIndex > 0 ? regularTaskIds[currentIndex - 1] ?? null : null;
}

export function isRegularTask(sceneId: string) {
  return taskDefinitions[sceneId]?.kind === "regular";
}

export function isOptionalTask(sceneId: string) {
  return taskDefinitions[sceneId]?.kind === "optional";
}

export function getRelatedRegularTaskId(sceneId: string) {
  const meta = taskDefinitions[sceneId];
  if (!meta) return null;
  return meta.kind === "optional" ? meta.relatedRegularSceneId ?? null : sceneId;
}
