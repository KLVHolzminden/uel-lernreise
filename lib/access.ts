export const ACCESS_STORAGE_KEY = "lsb-uel-rolle-access";
export const PARTICIPANT_STORAGE_KEY = "lsb-uel-rolle-participant";
export const COMPLETION_REPORT_STORAGE_KEY = "lsb-uel-rolle-completion-reported";

export type AccessState = {
  accessGranted: boolean;
  grantedAt?: string;
};

export type ParticipantState = {
  name: string;
  privacyAccepted: boolean;
  acceptedAt?: string;
};

export const defaultAccessState: AccessState = {
  accessGranted: false,
};

export const defaultParticipantState: ParticipantState = {
  name: "",
  privacyAccepted: false,
};

function readJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;

  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return {
      ...fallback,
      ...(JSON.parse(raw) as Partial<T>),
    };
  } catch {
    return fallback;
  }
}

export function readAccessState() {
  return readJson(ACCESS_STORAGE_KEY, defaultAccessState);
}

export function writeAccessState(state: AccessState) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(ACCESS_STORAGE_KEY, JSON.stringify(state));
}

export function readParticipantState() {
  return readJson(PARTICIPANT_STORAGE_KEY, defaultParticipantState);
}

export function writeParticipantState(state: ParticipantState) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(PARTICIPANT_STORAGE_KEY, JSON.stringify(state));
}

export function hasReportedCompletion(courseId: string) {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(`${COMPLETION_REPORT_STORAGE_KEY}:${courseId}`) === "true";
}

export function markCompletionReported(courseId: string) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(`${COMPLETION_REPORT_STORAGE_KEY}:${courseId}`, "true");
}
