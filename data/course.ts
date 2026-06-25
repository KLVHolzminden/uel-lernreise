import { chapter1 } from "@/data/chapters/chapter-1";
import { chapter2 } from "@/data/chapters/chapter-2";
import { chapter3 } from "@/data/chapters/chapter-3";
import { chapter4 } from "@/data/chapters/chapter-4";
import { attachDeepDivesToChapter } from "@/data/scene-deep-dives";
import { Course } from "@/lib/types";

export const onboardingCourse: Course = {
  id: "dein-weg-zur-uebungsleiterrolle",
  title: "Dein Weg zur Übungsleiterrolle",
  subtitle: "Lachen, Lernen, Leisten – drei Perspektiven für gute Übungsstunden",
  organization: "Lernreise für angehende Übungsleitende im Sportverein",
  intro:
    "Gute Übungsstunden entstehen nicht nur durch Übungen. Du gestaltest Atmosphäre, ermöglichst Lernen und dosierst Leistung passend. Im regulären Lernweg bearbeitest du 17 Aufgaben, freiwillige Vertiefungen schärfen zusätzlich dein Profil.",
  passThreshold: 55,
  completionGoal: 17,
  chapters: [chapter1, chapter2, chapter3, chapter4].map((chapter) =>
    attachDeepDivesToChapter(chapter),
  ),
};

