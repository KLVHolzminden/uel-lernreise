"use client";

import { useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

type FocusDialogProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  eyebrow?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  maxWidth?: "md" | "lg" | "xl" | "2xl" | "4xl" | "6xl";
};

const widthClasses: Record<NonNullable<FocusDialogProps["maxWidth"]>, string> = {
  md: "max-w-2xl",
  lg: "max-w-3xl",
  xl: "max-w-4xl",
  "2xl": "max-w-5xl",
  "4xl": "max-w-6xl",
  "6xl": "max-w-[90rem]",
};

const focusableSelector = [
  "a[href]",
  "button:not([disabled])",
  "textarea:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(",");

export function FocusDialog({
  open,
  onClose,
  title,
  eyebrow,
  children,
  footer,
  maxWidth = "xl",
}: FocusDialogProps) {
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!open) return;

    previousFocusRef.current = document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const dialog = dialogRef.current;
    const initialFocus = dialog?.querySelector<HTMLElement>("[data-dialog-close]") ?? dialog;
    window.requestAnimationFrame(() => initialFocus?.focus());

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onCloseRef.current();
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusableElements = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(focusableSelector),
      ).filter((element) => element.offsetParent !== null);

      if (!focusableElements.length) {
        event.preventDefault();
        dialogRef.current.focus();
        return;
      }

      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previousFocusRef.current?.focus();
    };
  }, [open]);

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/68 p-3 backdrop-blur-[6px] sm:p-5 lg:p-8"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className={cn(
          "focus-dialog flex max-h-[min(92vh,980px)] w-full flex-col overflow-hidden rounded-[28px] border border-white/70 bg-white shadow-[0_36px_110px_rgba(17,32,51,0.5)] outline-none sm:rounded-[36px]",
          widthClasses[maxWidth],
        )}
      >
        <div className="flex shrink-0 items-start justify-between gap-5 border-b border-mist bg-white px-5 py-5 sm:px-7 lg:px-9 lg:py-7">
          <div className="min-w-0">
            {eyebrow ? (
              <p className="focus-dialog-label font-semibold uppercase tracking-[0.16em] text-pine">
                {eyebrow}
              </p>
            ) : null}
            <h2
              id={titleId}
              className="mt-1 max-w-[28ch] font-display text-[2rem] leading-[1.08] text-ink [overflow-wrap:anywhere] sm:text-[2.35rem] lg:text-[2.6rem]"
            >
              {title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            data-dialog-close
            className="inline-flex min-h-14 min-w-14 shrink-0 items-center justify-center rounded-full border border-ink/15 bg-white text-ink shadow-sm transition hover:border-pine hover:text-pine focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-pine/30"
            aria-label="Fenster schließen"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-6 sm:px-7 lg:px-9 lg:py-8">
          {children}
        </div>

        {footer ? (
          <div className="shrink-0 border-t border-mist bg-sand/35 px-5 py-4 sm:px-7 lg:px-9">
            {footer}
          </div>
        ) : null}
      </div>
    </div>,
    document.body,
  );
}
