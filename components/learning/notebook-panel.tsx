"use client";

import { useEffect, useMemo, useState } from "react";
import { BookOpenText, ChevronDown, Download, Save } from "lucide-react";
import { NotebookFieldId, NotebookState, PointsAward } from "@/lib/types";
import { cn, toGermanDisplayText } from "@/lib/utils";

type NotebookSectionId = "profile" | "learnings" | "review" | "dimensions";

type NotebookPanelProps = {
  notebook: NotebookState;
  onChange: (field: NotebookFieldId, value: string) => void;
  awardedPointIds: string[];
  onAwardPoints: (awards: PointsAward[]) => void;
  defaultSection?: NotebookSectionId;
  compact?: boolean;
  className?: string;
  downloadHref?: string;
  forceExpanded?: boolean;
  hideToggle?: boolean;
  introSeen?: boolean;
  onIntroSeen?: () => void;
};

const notebookSections: Record<
  NotebookSectionId,
  {
    label: string;
    intro: string;
    fields: Array<{ id: NotebookFieldId; label: string; placeholder: string }>;
  }
> = {
  profile: {
    label: "Start / Profil",
    intro:
      "Kein Test, sondern ein Lernbegleiter: Hier hältst du fest, was dich in deiner ÜL-Rolle schon trägt.",
    fields: [
      {
        id: "strengths",
        label: "Darin bin ich gut",
        placeholder: "Zum Beispiel: Gruppen wahrnehmen, freundlich anleiten, Ruhe behalten ...",
      },
      {
        id: "uncertainties",
        label: "Hier bin ich noch unsicher",
        placeholder: "Zum Beispiel: Übungen variieren, klarer erklären, Belastung genauer steuern ...",
      },
      {
        id: "goals",
        label: "Das sind meine Ziele",
        placeholder: "Zum Beispiel: Teilnehmende aktiver einbinden, passender differenzieren ...",
      },
    ],
  },
  learnings: {
    label: "Während der Lernreise",
    intro: "Hier sammelst du Neues, offene Fragen und erste Ideen zum Ausprobieren.",
    fields: [
      {
        id: "newLearning",
        label: "Das ist für mich neu",
        placeholder: "Zum Beispiel: wie stark schon kleine Wahlmöglichkeiten die Stunde verändern ...",
      },
      {
        id: "tryOut",
        label: "Das möchte ich ausprobieren",
        placeholder: "Zum Beispiel: eine Mini-Reflexion am Stundenende oder zwei Einstiegsvarianten ...",
      },
      {
        id: "questions",
        label: "Hierzu habe ich noch Fragen",
        placeholder: "Zum Beispiel: Wie viel Differenzierung ist für meine Gruppe realistisch? ...",
      },
    ],
  },
  review: {
    label: "Rückblick / Dazugelernt",
    intro:
      "Hier verdichtest du deine Entwicklungsschritte und leitest Konsequenzen für die Praxis ab.",
    fields: [
      {
        id: "developed",
        label: "Darin habe ich mich weiterentwickelt",
        placeholder: "Zum Beispiel: klarer auf Unsicherheit reagieren oder Ziele verständlicher formulieren ...",
      },
      {
        id: "consequences",
        label: "Konsequenzen für mich als Trainer*in / Übungsleiter*in",
        placeholder: "Zum Beispiel: Ich plane künftig immer eine leichte und eine schwere Variante mit ...",
      },
      {
        id: "furtherDevelopment",
        label: "Darin möchte ich mich weiterentwickeln",
        placeholder: "Zum Beispiel: Feedback knapper geben oder Übergänge ruhiger gestalten ...",
      },
    ],
  },
  dimensions: {
    label: "Lachen – Lernen – Leisten",
    intro:
      "Die drei Perspektiven helfen dir, Stimmung, Lernen und Leistung in deiner eigenen Praxis bewusster zu beobachten.",
    fields: [
      {
        id: "lachenReflection",
        label: "Was hat heute zu guter Stimmung beigetragen?",
        placeholder: "Zum Beispiel: Begrüßung, Humor, Beteiligung, passende Einstiegsaufgabe ...",
      },
      {
        id: "lernenReflection",
        label: "Was habe ich verstanden, gelernt oder neu gesehen?",
        placeholder: "Zum Beispiel: wie wichtig Zielklarheit oder kurze Reflexionsfragen sind ...",
      },
      {
        id: "leistenReflection",
        label: "Wo habe ich etwas verbessert, angepasst oder angemessen belastet?",
        placeholder: "Zum Beispiel: durch Varianten, Raumänderung oder passende Steigerung ...",
      },
    ],
  },
};

export function NotebookPanel({
  notebook,
  onChange,
  awardedPointIds: _awardedPointIds,
  onAwardPoints: _onAwardPoints,
  defaultSection = "learnings",
  compact = false,
  className,
  downloadHref = "/downloads/notizbuch-digital.pdf",
  forceExpanded = false,
  hideToggle = false,
  introSeen = true,
  onIntroSeen,
}: NotebookPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<NotebookSectionId>(defaultSection);
  const [saveNotice, setSaveNotice] = useState<string | null>(null);

  useEffect(() => {
    setActiveSection(defaultSection);
  }, [defaultSection]);

  useEffect(() => {
    if (forceExpanded) {
      setIsOpen(true);
    }
  }, [forceExpanded]);

  useEffect(() => {
    if ((forceExpanded || isOpen) && !introSeen) {
      onIntroSeen?.();
    }
  }, [forceExpanded, introSeen, isOpen, onIntroSeen]);

  const section = notebookSections[activeSection];
  const filledCount = useMemo(
    () => Object.values(notebook).filter((value) => value.trim().length > 0).length,
    [notebook],
  );
  const isExpanded = forceExpanded || isOpen;

  function handleSaveNotice() {
    setSaveNotice("Notiz gespeichert");
    window.setTimeout(() => setSaveNotice(null), 1600);
  }

  return (
    <section
      className={cn(
        "rounded-[30px] border border-mist bg-white p-4 shadow-card",
        compact ? "" : "peripheral-ui",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-sand p-2.5 text-ink">
            <BookOpenText className="h-4 w-4" />
          </div>
          <div>
            <p className="text-sm font-semibold text-ink">Mein Notizbuch</p>
            <p className="text-xs text-slate">{filledCount} Einträge gespeichert</p>
          </div>
        </div>

        {hideToggle ? null : (
          <button
            type="button"
            onClick={() => setIsOpen((current) => !current)}
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-mist bg-white px-3 py-2 text-sm font-semibold text-ink transition hover:border-pine hover:text-pine"
          >
            {isExpanded ? "Schließen" : "Notizbuch öffnen"}
            <ChevronDown className={cn("h-4 w-4 transition-transform", isExpanded && "rotate-180")} />
          </button>
        )}
      </div>

      {isExpanded ? (
        <div className="mt-4 space-y-4 border-t border-mist pt-4">
          <div className="rounded-3xl border border-mist bg-white p-4 text-sm leading-6 text-ink/78 shadow-sm">
            <p>
              Das Notizbuch ist kein Test. Es hilft dir, Erfahrungen, Ziele und Entwicklungsschritte
              für deine ÜL-Rolle festzuhalten.
            </p>
            {!introSeen ? (
              <div className="mt-3 rounded-2xl border border-pine/15 bg-pine/5 p-3 text-ink">
                <p className="font-semibold">Dein Notizbuch begleitet die Lernreise</p>
                <p className="mt-1">
                  Es ergänzt die Aufgaben, ersetzt sie aber nicht. Deine Notizen bleiben lokal in
                  diesem Browser gespeichert.
                </p>
              </div>
            ) : null}
          </div>

          <div className="rounded-3xl border border-[#b9d6b1] bg-[#eef8ea] p-4 text-sm leading-6 text-ink shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#2f6a39]">
              Beutebuch-Impuls
            </p>
            <p className="mt-2 font-semibold">Eine Erkenntnis sichern</p>
            <p className="mt-1">
              Halte eine Erkenntnis aus der Lernreise so fest, dass du sie in einer Woche noch
              wiederfindest und nutzen kannst.
            </p>
            <button
              type="button"
              onClick={() => setActiveSection("review")}
              className="mt-3 inline-flex min-h-10 items-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink ring-1 ring-mist transition hover:border-pine hover:text-pine"
            >
              Beutebuch-Impuls nutzen
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {(Object.keys(notebookSections) as NotebookSectionId[]).map((sectionId) => (
              <button
                key={sectionId}
                type="button"
                onClick={() => setActiveSection(sectionId)}
                className={cn(
                  "rounded-full px-3 py-2 text-sm font-semibold transition",
                  activeSection === sectionId
                    ? "bg-ink text-white"
                    : "border border-mist bg-white text-ink shadow-sm hover:border-pine hover:text-pine",
                )}
              >
                {toGermanDisplayText(notebookSections[sectionId].label)}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            <p className="text-sm leading-6 text-ink/78">{toGermanDisplayText(section.intro)}</p>
            {section.fields.map((field) => (
              <label key={field.id} className="grid gap-2">
                <span className="text-sm font-semibold text-ink">
                  {toGermanDisplayText(field.label)}
                </span>
                <textarea
                  value={notebook[field.id]}
                  onChange={(event) => onChange(field.id, event.target.value)}
                  rows={compact ? 3 : 4}
                  placeholder={toGermanDisplayText(field.placeholder)}
                  className="min-h-[96px] rounded-3xl border border-mist bg-white/88 px-4 py-3 text-sm leading-6 text-ink outline-none transition focus:border-pine"
                />
              </label>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleSaveNotice}
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white transition hover:bg-pine"
            >
              <Save className="h-4 w-4" />
              Notiz speichern
            </button>
            <a
              href={downloadHref}
              download
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-mist bg-white px-4 py-2 text-sm font-semibold text-ink transition hover:border-pine hover:text-pine"
            >
              <Download className="h-4 w-4" />
              Notizbuch als PDF herunterladen
            </a>
            {saveNotice ? <span className="text-sm text-pine">{saveNotice}</span> : null}
          </div>
        </div>
      ) : null}
    </section>
  );
}


