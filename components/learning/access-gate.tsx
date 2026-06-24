"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";
import { ArrowRight, Mail, ShieldCheck } from "lucide-react";
import { Course } from "@/lib/types";
import { cn, toGermanDisplayText } from "@/lib/utils";

type GateStep = "hero" | "access" | "welcome";

type AccessGateProps = {
  course: Course;
  contactEmail: string;
  initialStep: GateStep;
  onAccessGranted: () => void;
  onWelcomeComplete: (name: string) => void;
};

const requestSubject = "Zugang zur Lernreise ÜL-C anfragen";
const requestBody = `Hallo Steve,

ich möchte Zugang zur Lernreise „Welcher ÜL-Typ bist du?“ anfragen.

Name:
Verein:
Grund der Anfrage:

Viele Grüße`;

export function AccessGate({
  course,
  contactEmail,
  initialStep,
  onAccessGranted,
  onWelcomeComplete,
}: AccessGateProps) {
  const [step, setStep] = useState<GateStep>(initialStep);
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const mailHref = `mailto:${contactEmail}?subject=${encodeURIComponent(requestSubject)}&body=${encodeURIComponent(
    requestBody,
  )}`;

  async function handleAccessSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/verify-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      const result = (await response.json()) as { valid?: boolean };

      if (!response.ok || !result.valid) {
        setError("Der Zugangscode wurde nicht erkannt. Bitte prüfe deine Eingabe oder frage einen Zugangscode an.");
        return;
      }

      setCode("");
      onAccessGranted();
      setStep("welcome");
    } catch {
      setError("Der Zugang konnte gerade nicht geprüft werden. Bitte versuche es erneut.");
    } finally {
      setLoading(false);
    }
  }

  function handleWelcomeSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!name.trim() || !privacyAccepted) return;
    onWelcomeComplete(name.trim());
  }

  if (step === "hero") {
    return (
      <main className="min-h-screen bg-ink">
        <section className="relative min-h-screen overflow-hidden">
          <Image
            src="/images/uel-typ-hero.png"
            alt="Collage mit Sportmotiven und der Frage: Welcher ÜL-Typ bist du?"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,32,51,0.02),rgba(17,32,51,0.08)_42%,rgba(17,32,51,0.38)_100%)]" />
          <div className="absolute inset-x-0 top-[68%] z-10 -translate-y-1/2 px-5 sm:top-[69%] lg:top-[70%]">
            <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
              <button
                type="button"
                onClick={() => setStep("access")}
                className="inline-flex min-h-14 items-center gap-3 rounded-full bg-[#ff6a1a] px-8 py-4 text-lg font-bold text-white shadow-[0_18px_42px_rgba(255,106,26,0.28)] transition hover:bg-[#e95505] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/70"
              >
                Lernreise starten
                <ArrowRight className="h-5 w-5" />
              </button>
              <p className="mt-3 rounded-full bg-white/86 px-5 py-2 text-base font-semibold text-ink shadow-sm backdrop-blur">
                Entdecke dein Profil aus Lachen, Lernen und Leisten.
              </p>
            </div>
          </div>
        </section>
      </main>
    );
  }

  if (step === "access") {
    return (
      <main className="min-h-screen bg-sand px-4 py-8">
        <section className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-5xl place-items-center">
          <div className="grid w-full gap-5 rounded-[36px] border border-white/70 bg-white/92 p-6 shadow-soft backdrop-blur md:grid-cols-[1fr_0.85fr] md:p-8">
            <div className="space-y-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-pine">
                Geschützter Zugang
              </p>
              <h1 className="font-display text-4xl leading-tight text-ink md:text-5xl">
                Zugang zur Lernreise
              </h1>
              <p className="max-w-[38rem] text-lg leading-8 text-slate">
                Diese Lernreise ist für eingeladene Teilnehmende vorgesehen. Gib deinen Zugangscode
                ein, um fortzufahren.
              </p>
              <form className="grid max-w-md gap-4" onSubmit={handleAccessSubmit}>
                <label className="grid gap-2">
                  <span className="text-sm font-semibold text-ink">Zugangscode</span>
                  <input
                    value={code}
                    onChange={(event) => setCode(event.target.value)}
                    placeholder="Code eingeben"
                    className="min-h-13 rounded-2xl border border-mist bg-sand/30 px-4 text-base text-ink outline-none transition focus:border-pine focus:ring-4 focus:ring-pine/15"
                  />
                </label>
                {error ? (
                  <p className="rounded-2xl border border-[#f0b2a3] bg-[#fff1ec] px-4 py-3 text-sm leading-6 text-[#8a2f22]">
                    {error}
                  </p>
                ) : null}
                <button
                  type="submit"
                  disabled={!code.trim() || loading}
                  className="inline-flex min-h-13 items-center justify-center rounded-full bg-ink px-6 py-3 text-base font-semibold text-white transition hover:bg-pine disabled:cursor-not-allowed disabled:bg-slate/40"
                >
                  {loading ? "Prüfe Zugang ..." : "Zugang prüfen"}
                </button>
              </form>
            </div>

            <aside className="rounded-[30px] border border-mist bg-[#f8fafb] p-5">
              <div className="rounded-full bg-pine/10 p-3 text-pine w-fit">
                <Mail className="h-5 w-5" />
              </div>
              <h2 className="mt-4 text-xl font-semibold text-ink">Du hast noch keinen Zugangscode?</h2>
              <p className="mt-3 text-base leading-7 text-slate">Melde dich bei mir.</p>
              <a
                href={mailHref}
                className="mt-5 inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-ink ring-1 ring-mist transition hover:text-pine hover:ring-pine"
              >
                Zugangscode anfragen
                <Mail className="h-4 w-4" />
              </a>
            </aside>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-sand px-4 py-8">
      <section className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-4xl place-items-center">
        <form
          onSubmit={handleWelcomeSubmit}
          className="w-full rounded-[36px] border border-white/70 bg-white/92 p-6 shadow-soft backdrop-blur md:p-8"
        >
          <div className="space-y-5">
            <div className="rounded-full bg-pine/10 p-3 text-pine w-fit">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-pine">
              Willkommen
            </p>
            <h1 className="font-display text-4xl leading-tight text-ink md:text-5xl">
              Willkommen zur Lernreise
            </h1>
            <p className="max-w-[48rem] text-lg leading-8 text-slate">
              Trage deinen Namen ein. Er wird nur lokal in deinem Browser verwendet und später auf
              deinem Abschlussnachweis eingetragen. Dein Name wird nicht automatisch an den Server
              übertragen.
            </p>
            <label className="grid max-w-xl gap-2">
              <span className="text-sm font-semibold text-ink">Name für den Abschlussnachweis</span>
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Vor- und Nachname"
                className="min-h-13 rounded-2xl border border-mist bg-sand/30 px-4 text-base text-ink outline-none transition focus:border-pine focus:ring-4 focus:ring-pine/15"
              />
            </label>
            <div className="rounded-3xl border border-pine/15 bg-pine/5 p-5 text-base leading-7 text-ink">
              Deine Antworten, dein Fortschritt und dein Name bleiben in deinem Browser gespeichert.
              Am Ende wird nur eine anonyme Abschlussmeldung gezählt. Es werden keine Aufgabenantworten
              und keine personenbezogenen Lernverläufe übertragen.
            </div>
            <label className="flex max-w-2xl items-start gap-3 rounded-3xl border border-mist bg-white/80 p-4">
              <input
                type="checkbox"
                checked={privacyAccepted}
                onChange={(event) => setPrivacyAccepted(event.target.checked)}
                className="mt-1 h-5 w-5 rounded border-mist text-pine"
              />
              <span className="text-base leading-7 text-ink">
                Ich habe den Datenschutzhinweis gelesen und möchte die Lernreise starten.
              </span>
            </label>
            <button
              type="submit"
              disabled={!name.trim() || !privacyAccepted}
              className={cn(
                "inline-flex min-h-13 items-center gap-2 rounded-full px-6 py-3 text-base font-semibold transition",
                name.trim() && privacyAccepted
                  ? "bg-ink text-white hover:bg-pine"
                  : "cursor-not-allowed bg-slate/30 text-white",
              )}
            >
              Jetzt beginnen
              <ArrowRight className="h-4 w-4" />
            </button>
            <p className="text-sm leading-6 text-slate">
              Lernreise: {toGermanDisplayText(course.title)}
            </p>
          </div>
        </form>
      </section>
    </main>
  );
}
