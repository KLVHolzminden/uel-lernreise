export type DimensionId = "lachen" | "lernen" | "leisten";
export type Dimension = DimensionId;
export type PointKind = "core" | "deepening" | "bonus";

export type PointsAward = {
  id?: string;
  total: number;
  dimension?: DimensionId;
  secondaryDimension?: DimensionId;
  secondaryPoints?: number;
  kind: PointKind;
  label?: string;
};

export type SceneType =
  | "intro"
  | "scenario"
  | "multipleChoice"
  | "interactiveScene"
  | "matching"
  | "ordering"
  | "reflection"
  | "infoCard"
  | "summary"
  | "callToAction";

export type SceneResponseValue =
  | string
  | string[]
  | Record<string, unknown>;

export type ChapterAccent = "yellow" | "green" | "red" | "blue";

export type TaskKind = "regular" | "optional";

export type InsightCategory = "praxis" | "didaktik" | "organisation";

export type InsightTriggerType = "card" | "inline";

export type Insight = {
  id: string;
  category: InsightCategory;
  triggerType: InsightTriggerType;
  triggerLabel: string;
  title: string;
  content: string;
  points: number;
  reward?: PointsAward;
};

export type RecallHint = {
  dimension: DimensionId;
  text: string;
};

export type UnlockableInsight = {
  id: string;
  title: string;
  text: string;
  points?: PointsAward;
};

export type BaseScene = {
  id: string;
  type: SceneType;
  title: string;
  eyebrow?: string;
  prompt: string;
  context?: string;
  coachNote?: string;
  takeaway?: string;
  transferQuestion?: string;
  estimatedMinutes?: number;
  insights?: Insight[];
  taskTypeLabel?: string;
  primaryDimension?: DimensionId;
  points?: number;
  optional?: boolean;
  recallHint?: RecallHint;
  contextAward?: PointsAward;
  metaAward?: PointsAward;
  recallAward?: PointsAward;
};

export type ChoiceOption = {
  id: string;
  label: string;
  insight: string;
  isBest?: boolean;
};

export type ScenarioScene = BaseScene & {
  type: "scenario" | "multipleChoice";
  options: ChoiceOption[];
};

export type SceneHotspot = {
  id: string;
  label: string;
  x: number;
  y: number;
  width?: number;
  height?: number;
  radius?: number;
  dimension?: Dimension;
  feedbackTitle: string;
  feedbackText: string;
  hint?: string;
  linkedTaskId?: string;
  pointsPreview?: string;
};

export type InteractiveSceneHotspot = SceneHotspot;

export type InteractiveSceneAnswer = {
  visitedHotspotIds: string[];
  selectedOptionId?: string;
  reflections?: Record<string, string>;
};

export type InteractiveSceneAction = {
  id: string;
  label: string;
  href: string;
  external?: boolean;
  download?: boolean;
};

export type InteractiveSceneFollowUp =
  | {
      type: "quiz";
      prompt: string;
      options: ChoiceOption[];
    }
  | {
      type: "reflection";
      title: string;
      prompts: ReflectionPrompt[];
      submitLabel?: string;
      notebookBindings?: Partial<Record<string, NotebookFieldId>>;
    }
  | {
      type: "callToAction";
      title: string;
      text: string;
      actions: InteractiveSceneAction[];
      promptLabel?: string;
      promptPlaceholder?: string;
      promptKey?: string;
      submitLabel?: string;
      notebookField?: NotebookFieldId;
    };

export type InteractiveScene = BaseScene & {
  type: "interactiveScene";
  imageSrc: string;
  imageAlt: string;
  dimension?: Dimension;
  placeholderLabel?: string;
  hotspots: SceneHotspot[];
  requiredHotspots?: number;
  minimumHotspots?: number;
  requiredHotspotIds?: string[];
  followUp: InteractiveSceneFollowUp;
};

export type MatchingPair = {
  id: string;
  label: string;
};

export type MatchingTarget = {
  id: string;
  label: string;
  description?: string;
};

export type MatchingScene = BaseScene & {
  type: "matching";
  pairs: MatchingPair[];
  targets: MatchingTarget[];
  answers: Record<string, string>;
  feedback: {
    success: string;
    gentle: string;
  };
};

export type OrderingStep = {
  id: string;
  label: string;
};

export type OrderingScene = BaseScene & {
  type: "ordering";
  steps: OrderingStep[];
  correctOrder: string[];
  feedback: {
    success: string;
    gentle: string;
  };
};

export type ReflectionPrompt = {
  id: string;
  label: string;
  placeholder: string;
};

export type ReflectionScene = BaseScene & {
  type: "reflection";
  prompts: ReflectionPrompt[];
};

export type IntroScene = BaseScene & {
  type: "intro" | "infoCard" | "summary" | "callToAction";
  highlights?: string[];
};

export type Scene =
  | ScenarioScene
  | InteractiveScene
  | MatchingScene
  | OrderingScene
  | ReflectionScene
  | IntroScene;

export type Chapter = {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  objective: string;
  accent: ChapterAccent;
  optional?: boolean;
  scenes: Scene[];
};

export type Course = {
  id: string;
  title: string;
  subtitle: string;
  organization: string;
  intro: string;
  passThreshold: number;
  completionGoal: number;
  chapters: Chapter[];
};

export type TaskDefinition = {
  sceneId: string;
  chapterId: string;
  chapterPosition: number;
  orderInChapter: number;
  kind: TaskKind;
  relatedRegularSceneId?: string;
  primaryDimension: DimensionId;
  secondaryDimensions: DimensionId[];
};

export type ProgressState = {
  started: boolean;
  currentSceneId: string | null;
  completedSceneIds: string[];
  answers: Record<string, SceneResponseValue>;
  reflections: Record<string, string>;
  notebook: NotebookState;
  openedInsightIds: string[];
  awardedPointIds: string[];
  highestExperienceStageSeenId?: string | null;
  startedAt?: string;
  updatedAt?: string;
};

export type DimensionScore = {
  points: number;
  maxPoints: number;
  completed: number;
  total: number;
  ratio: number;
};

export type DimensionScores = Record<DimensionId, DimensionScore>;

export type RequiredProgress = {
  completed: number;
  total: number;
  remaining: number;
  ratio: number;
  percentage: number;
};

export type OptionalProgress = {
  completed: number;
  total: number;
  ratio: number;
};

export type ExperienceEffectStrength = "small" | "medium" | "large" | "final";

export type ExperienceProfileVariant =
  | "lernen"
  | "lachen"
  | "leisten"
  | "lernen-lachen"
  | "lernen-leisten"
  | "lachen-leisten"
  | "balanced";

export type ExperienceStage = {
  id: string;
  threshold: number;
  name: string;
  effectStrength: ExperienceEffectStrength;
};

export type ExperienceProgress = {
  ratio: number;
  totalPoints: number;
  maxPossiblePoints: number;
  cappedTargetPoints: number;
  currentStage: ExperienceStage;
  nextStage: ExperienceStage | null;
  currentStageIndex: number;
  stageProgress: number;
  isMaxStage: boolean;
  profileVariant: ExperienceProfileVariant;
  profileLabel: string;
  profileText: string;
};

export type NotebookFieldId =
  | "strengths"
  | "uncertainties"
  | "goals"
  | "newLearning"
  | "tryOut"
  | "questions"
  | "developed"
  | "consequences"
  | "furtherDevelopment"
  | "lachenReflection"
  | "lernenReflection"
  | "leistenReflection";

export type NotebookState = Record<NotebookFieldId, string>;
