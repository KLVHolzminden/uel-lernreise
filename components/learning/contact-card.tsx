import Image from "next/image";
import { uelcResources } from "@/data/resources";
import { toGermanDisplayText } from "@/lib/utils";

type ContactCardProps = {
  className?: string;
};

export function ContactCard({ className = "" }: ContactCardProps) {
  return (
    <div
      className={`grid gap-5 rounded-3xl border border-mist bg-white p-5 sm:grid-cols-[minmax(0,1fr)_132px] sm:items-center ${className}`}
    >
      <div className="min-w-0">
        <p className="text-sm font-semibold text-ink">Du bist unsicher, wie du starten sollst?</p>
        <p className="mt-2 text-sm leading-6 text-slate">
          Melde dich gern. Ich helfe dir bei der Einordnung, welche nächsten Schritte für dich passen.
        </p>
        <div className="mt-4 space-y-1 text-sm leading-6 text-ink">
          <p><strong>{uelcResources.contact.name}</strong></p>
          <p>{toGermanDisplayText(uelcResources.contact.role)}</p>
          <p>
            <a
              href={`mailto:${uelcResources.contact.email}`}
              className="text-pine underline-offset-2 hover:underline"
            >
              {uelcResources.contact.email}
            </a>
          </p>
          <p>
            <a
              href={`tel:${uelcResources.contact.phoneHref}`}
              className="text-pine underline-offset-2 hover:underline"
            >
              {uelcResources.contact.phoneLabel}
            </a>
          </p>
        </div>
      </div>

      <div className="mx-auto overflow-hidden rounded-[28px] bg-ink shadow-[0_16px_38px_rgba(17,32,51,0.2)] sm:mx-0 sm:justify-self-end">
        <Image
          src={uelcResources.contact.imageSrc}
          alt={`Portrait von ${uelcResources.contact.name}`}
          width={132}
          height={132}
          className="h-[112px] w-[112px] object-cover sm:h-[132px] sm:w-[132px]"
          sizes="(max-width: 639px) 112px, 132px"
        />
      </div>
    </div>
  );
}
