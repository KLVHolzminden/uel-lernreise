import { ProgressState } from "@/lib/types";

export const STORAGE_KEY = "lsb-uel-rolle-lernreise";
const LEGACY_STORAGE_KEYS = [
  "lernreise-uebungsleiterrolle",
  "lsb-referierende-lernreise",
] as const;

export const defaultNotebook = {
  strengths: "",
  uncertainties: "",
  goals: "",
  newLearning: "",
  tryOut: "",
  questions: "",
  developed: "",
  consequences: "",
  furtherDevelopment: "",
  lachenReflection: "",
  lernenReflection: "",
  leistenReflection: "",
} as const;

export const defaultProgress: ProgressState = {
  started: false,
  currentSceneId: null,
  completedSceneIds: [],
  answers: {},
  reflections: {},
  notebook: { ...defaultNotebook },
  openedInsightIds: [],
  awardedPointIds: [],
  notebookIntroSeen: false,
  highestExperienceStageSeenId: "starter",
};

export function readProgress(): ProgressState {
  if (typeof window === "undefined") {
    return defaultProgress;
  }

  const raw =
    window.localStorage.getItem(STORAGE_KEY) ??
    LEGACY_STORAGE_KEYS.map((key) => window.localStorage.getItem(key)).find(Boolean) ??
    null;

  if (!raw) return defaultProgress;

  try {
    const parsedRaw = JSON.parse(raw) as Partial<ProgressState>;
    const parsed = {
      ...defaultProgress,
      ...parsedRaw,
    } as ProgressState;

    if (!Object.prototype.hasOwnProperty.call(parsedRaw, "highestExperienceStageSeenId")) {
      parsed.highestExperienceStageSeenId = null;
    }

    if (!window.localStorage.getItem(STORAGE_KEY)) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
    }

    LEGACY_STORAGE_KEYS.forEach((key) => {
      if (window.localStorage.getItem(key)) {
        window.localStorage.removeItem(key);
      }
    });

    return parsed;
  } catch {
    return defaultProgress;
  }
}

export function writeProgress(state: ProgressState) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}
