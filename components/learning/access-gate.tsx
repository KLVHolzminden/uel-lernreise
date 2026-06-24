"use client";

import Image from "next/image";
import { FormEvent, MouseEvent, useEffect, useRef, useState } from "react";
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
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const privacyTriggerRef = useRef<HTMLButtonElement | null>(null);
  const privacyCloseRef = useRef<HTMLButtonElement | null>(null);
  const mailHref = `mailto:${contactEmail}?subject=${encodeURIComponent(requestSubject)}&body=${encodeURIComponent(
    requestBody,
  )}`;

  useEffect(() => {
    if (!privacyOpen) return;

    const activeElement = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    privacyTriggerRef.current = activeElement instanceof HTMLButtonElement ? activeElement : null;
    privacyCloseRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setPrivacyOpen(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      window.setTimeout(() => privacyTriggerRef.current?.focus(), 0);
    };
  }, [privacyOpen]);

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

  function openPrivacyNotice(event?: MouseEvent<HTMLButtonElement>) {
    event?.preventDefault();
    event?.stopPropagation();
    setPrivacyOpen(true);
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
              <div className="mt-5 flex items-center gap-4 rounded-3xl border border-white bg-white/80 p-3 shadow-sm">
                <Image
                  src="/images/steve-sander.png"
                  alt="Steve Sander, Ansprechpartner für die Lernreise"
                  width={88}
                  height={88}
                  className="h-20 w-20 shrink-0 rounded-full object-cover ring-2 ring-white"
                />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-pine">
                    Dein Ansprechpartner
                  </p>
                  <p className="mt-1 text-lg font-semibold text-ink">Steve Sander</p>
                </div>
              </div>
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
              <p>
                Dein Name wird nur verwendet, um deinen Abschlussnachweis in deinem Browser zu erstellen.
                Deine Antworten, dein Fortschritt und dein Profil bleiben lokal auf deinem Gerät gespeichert.
                An den Betreiber der Lernreise wird nur anonym übermittelt, dass die Lernreise genutzt
                beziehungsweise abgeschlossen wurde. Es werden keine Namen, Antworten oder personenbezogenen
                Lernverläufe übertragen.
              </p>
              <button
                type="button"
                onClick={openPrivacyNotice}
                className="mt-4 inline-flex min-h-11 items-center rounded-full bg-white px-5 py-2 text-sm font-semibold text-pine ring-1 ring-pine/20 transition hover:ring-pine focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-pine/20"
              >
                Datenschutzhinweise zur Lernreise anzeigen
              </button>
            </div>
            <div className="flex max-w-2xl items-start gap-3 rounded-3xl border border-mist bg-white/80 p-4">
              <input
                id="privacyAccepted"
                type="checkbox"
                checked={privacyAccepted}
                onChange={(event) => setPrivacyAccepted(event.target.checked)}
                className="mt-1 h-5 w-5 rounded border-mist text-pine"
              />
              <span className="text-base leading-7 text-ink">
                <label htmlFor="privacyAccepted">Ich habe die </label>
                <button
                  type="button"
                  onClick={openPrivacyNotice}
                  aria-label="Datenschutzhinweise zur Lernreise öffnen"
                  className="font-semibold text-pine underline underline-offset-4 transition hover:text-ink focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-pine/20"
                >
                  Datenschutzhinweise zur Lernreise
                </button>
                <label htmlFor="privacyAccepted"> gelesen und möchte die Lernreise starten.</label>
              </span>
            </div>
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
      {privacyOpen ? (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-ink/55 px-4 py-6 backdrop-blur-sm"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setPrivacyOpen(false);
            }
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="privacy-notice-title"
            className="max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-[32px] border border-white/70 bg-white shadow-soft"
          >
            <div className="flex items-start justify-between gap-4 border-b border-mist bg-sand/70 px-6 py-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-pine">
                  Datenschutz
                </p>
                <h2 id="privacy-notice-title" className="mt-2 font-display text-3xl leading-tight text-ink">
                  Datenschutzhinweise zur Lernreise
                </h2>
              </div>
              <button
                ref={privacyCloseRef}
                type="button"
                onClick={() => setPrivacyOpen(false)}
                className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink ring-1 ring-mist transition hover:text-pine hover:ring-pine focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-pine/20"
              >
                Schließen
              </button>
            </div>

            <div className="max-h-[calc(90vh-8rem)] space-y-6 overflow-y-auto px-6 py-6 text-base leading-7 text-slate">
              <p>
                Diese Lernreise wird als geschützte Webanwendung bereitgestellt. Sie dient der
                Orientierung auf dem Weg zur Übungsleiter*innen-Rolle und arbeitet mit Aufgaben,
                Reflexionen, Praxisimpulsen und einem Abschlussnachweis.
              </p>

              <section className="rounded-3xl border border-pine/15 bg-pine/5 p-5">
                <h3 className="text-lg font-semibold text-ink">Verantwortlicher Ansprechpartner</h3>
                <p className="mt-3 text-ink">
                  Steve Sander
                  <br />
                  Kreissportbund Holzminden
                  <br />
                  E-Mail:{" "}
                  <a
                    href="mailto:s.sander@ksbholzminden.de"
                    className="font-semibold text-pine underline underline-offset-4"
                  >
                    s.sander@ksbholzminden.de
                  </a>
                </p>
                <p className="mt-4">
                  Weitere Informationen zum Datenschutz beim Kreissportbund Holzminden findest du in
                  der allgemeinen Datenschutzerklärung des KSB Holzminden.
                </p>
                <a
                  href="https://ksb-holzminden.de/datenschutzerklaerung/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex min-h-11 items-center rounded-full bg-white px-5 py-2 text-sm font-semibold text-pine ring-1 ring-pine/20 transition hover:ring-pine focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-pine/20"
                >
                  Allgemeine Datenschutzerklärung des KSB Holzminden öffnen
                </a>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-ink">Welche Daten gibst du ein?</h3>
                <p className="mt-2">
                  Zu Beginn trägst du deinen Namen ein. Dieser Name wird ausschließlich verwendet, um
                  am Ende deinen persönlichen Abschlussnachweis in deinem Browser zu erstellen.
                </p>
                <p className="mt-2">
                  Der Name wird nicht automatisch an den Betreiber der Lernreise übertragen und nicht
                  serverseitig gespeichert.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-ink">Was wird lokal gespeichert?</h3>
                <p className="mt-2">
                  Damit du die Lernreise bearbeiten und fortsetzen kannst, werden folgende Informationen
                  lokal in deinem Browser gespeichert: dein eingegebener Name, dein Bearbeitungsstand,
                  deine Antworten, deine besuchten Praxisimpulse, deine Punkte und Erfahrungsstufe, dein
                  Profil aus Lachen, Lernen und Leisten sowie dein Abschlussstatus.
                </p>
                <p className="mt-2">
                  Diese Daten bleiben auf deinem Gerät beziehungsweise in deinem Browser gespeichert.
                  Du kannst sie über die Funktion „Lernreise zurücksetzen“ löschen.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-ink">Was wird an den Betreiber übermittelt?</h3>
                <p className="mt-2">
                  Beim Start und beim Abschluss der Lernreise kann eine anonyme Meldung an den Betreiber
                  gesendet werden. Diese Meldung dient nur dazu, zu sehen, ob die Lernreise genutzt wird
                  und wie viele Personen sie abschließen.
                </p>
                <p className="mt-2">
                  Dabei werden keine Namen, keine Antworten, keine Punkte, keine Profilwerte, keine
                  Notizen und keine personenbezogenen Lernverläufe übertragen.
                </p>
                <p className="mt-2">
                  Der Betreiber sieht also nicht, wer welche Aufgaben bearbeitet hat und auch nicht,
                  welche Person die Lernreise abgeschlossen hat.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-ink">Wofür wird der Abschlussnachweis genutzt?</h3>
                <p className="mt-2">
                  Wenn du die Lernreise abschließt, kannst du einen Abschlussnachweis herunterladen oder
                  ausdrucken. Dieser Nachweis enthält deinen eingegebenen Namen und das Abschlussdatum.
                </p>
                <p className="mt-2">
                  Der Abschlussnachweis wird lokal in deinem Browser erzeugt. Er wird nicht automatisch
                  an den Betreiber gesendet. Du entscheidest selbst, ob du den Nachweis weiterleitest,
                  zum Beispiel zur Anerkennung von Lerneinheiten.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-ink">Zugangscode</h3>
                <p className="mt-2">
                  Der Zugangscode dient dazu, die Lernreise nur eingeladenen oder berechtigten Personen
                  zugänglich zu machen. Der eingegebene Code wird zur Prüfung des Zugangs verwendet. Nach
                  erfolgreicher Prüfung wird im Browser nur gespeichert, dass der Zugang freigegeben wurde.
                  Der Zugangscode selbst soll nicht unnötig dauerhaft gespeichert werden.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-ink">Technische Verbindungsdaten</h3>
                <p className="mt-2">
                  Beim Aufruf der Website können durch den Hostinganbieter technisch notwendige
                  Verbindungsdaten verarbeitet werden, zum Beispiel IP-Adresse, Zeitpunkt des Aufrufs
                  und Browserinformationen. Diese Verarbeitung ist für die Bereitstellung der Website
                  technisch erforderlich.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-ink">Deine Rechte</h3>
                <p className="mt-2">
                  Für die allgemeine Verarbeitung personenbezogener Daten gelten die Hinweise und
                  Betroffenenrechte aus der Datenschutzerklärung des KSB Holzminden. Dazu gehören
                  insbesondere Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung,
                  Widerspruch und Beschwerde bei einer zuständigen Aufsichtsbehörde.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-ink">Hinweis zur lokalen Speicherung</h3>
                <p className="mt-2">
                  Da Name, Antworten und Fortschritt lokal in deinem Browser gespeichert werden, kann der
                  Betreiber diese Daten nicht zentral einsehen oder für dich wiederherstellen. Wenn du
                  Browserdaten löschst oder ein anderes Gerät verwendest, kann dein lokaler Lernstand
                  verloren gehen.
                </p>
              </section>

              <p className="text-sm font-semibold text-slate">Stand: Juni 2026</p>
            </div>
          </section>
        </div>
      ) : null}
    </main>
  );
}
