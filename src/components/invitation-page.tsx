"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

import { MusicToggle } from "@/components/music-toggle";
import { RSVPForm } from "@/components/rsvp-form";
import { siteContent } from "@/data/site-content";

type InvitationPageProps = {
  apiBaseUrl: string;
  musicUrl?: string;
};

type CountdownParts = {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
};

const emptyCountdown: CountdownParts = {
  days: "00",
  hours: "00",
  minutes: "00",
  seconds: "00",
};

const reveal = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

function getCountdown(targetIso: string): CountdownParts {
  const target = new Date(targetIso).getTime();
  const now = Date.now();
  const diff = Math.max(target - now, 0);

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return {
    days: String(days).padStart(2, "0"),
    hours: String(hours).padStart(2, "0"),
    minutes: String(minutes).padStart(2, "0"),
    seconds: String(seconds).padStart(2, "0"),
  };
}

function Countdown({ targetIso }: { targetIso: string }) {
  const [parts, setParts] = useState<CountdownParts>(emptyCountdown);

  useEffect(() => {
    setParts(getCountdown(targetIso));

    const timer = window.setInterval(() => {
      setParts(getCountdown(targetIso));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [targetIso]);

  return (
    <div className="grid grid-cols-2 gap-3 text-center sm:grid-cols-4">
      {[
        { label: "күн", value: parts.days },
        { label: "сағат", value: parts.hours },
        { label: "минут", value: parts.minutes },
        { label: "секунд", value: parts.seconds },
      ].map((item) => (
        <div key={item.label} className="soft-card min-w-0 rounded-[1.5rem] px-3 py-4">
          <div className="font-display text-3xl text-[#4f271d] sm:text-4xl">{item.value}</div>
          <div className="mt-2 text-[11px] uppercase tracking-[0.22em] text-[#8b674d] sm:tracking-[0.3em]">
            {item.label}
          </div>
        </div>
      ))}
    </div>
  );
}

export function InvitationPage({ apiBaseUrl, musicUrl }: InvitationPageProps) {
  const hasFamilyBlock = Boolean(siteContent.parents || siteContent.familyName);
  const hasProgram = siteContent.program.length > 0;
  const hasHosts = siteContent.hosts.length > 0;
  const hasAddress = Boolean(siteContent.addressValue);

  return (
    <main className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="light-orb left-[-10rem] top-[4rem]" />
        <div className="light-orb right-[-8rem] top-[40rem]" />
        <div className="light-orb left-[10%] top-[88rem]" />
        <Image src="/ornament-corner.svg" alt="" width={192} height={192} className="ornament-corner left-[-2rem] top-10" />
        <Image src="/ornament-corner.svg" alt="" width={192} height={192} className="ornament-corner right-[-2rem] top-[30rem] rotate-180" />
      </div>

      <section className="relative mx-auto max-w-4xl px-4 pt-8 pb-20 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.9, staggerChildren: 0.12 }}
          className="invite-shell overflow-hidden rounded-[2.5rem] px-5 pt-10 pb-10 sm:px-10 sm:pt-14 sm:pb-14"
        >
          <Image
            src="/ornament-divider.svg"
            alt=""
            width={200}
            height={44}
            className="ornament-divider mx-auto mb-4 h-8 w-36 opacity-85"
          />

          <motion.div variants={reveal} className="relative z-10 text-center">
            <p className="eyebrow">{siteContent.eyebrow}</p>
            <h1 className="font-display mt-4 break-words text-5xl text-[#40281d] sm:text-7xl">{siteContent.title}</h1>
            <p className="mt-4 text-base leading-8 text-[#614438] sm:text-lg">{siteContent.subtitle}</p>
          </motion.div>

          <motion.div variants={reveal} className="relative z-10 mx-auto mt-8 h-px w-40 bg-[linear-gradient(90deg,transparent,#9c7b55,transparent)]" />

          <motion.div variants={reveal} className="relative z-10 mt-8 text-center">
            <p className="text-sm uppercase tracking-[0.35em] text-[#8b674d]">Құрметті қонақтар</p>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[#5d4235] sm:text-lg">
              {siteContent.invitationText}
            </p>
          </motion.div>

          <motion.div variants={reveal} className="relative z-10 mt-10 grid gap-6 text-center">
            <div>
              <p className="font-display break-words text-4xl text-[#5a2d22] sm:text-5xl">{siteContent.brideName}</p>
              <p className="mt-2 text-xl text-[#8f674c]">&</p>
              <p className="font-display break-words text-3xl text-[#5a2d22] sm:text-4xl">{siteContent.groomName}</p>
            </div>
            {hasFamilyBlock ? (
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-[#8b674d]">Той иелері</p>
                {siteContent.parents ? (
                  <p className="mt-3 break-words font-display text-2xl text-[#40281d] sm:text-3xl">{siteContent.parents}</p>
                ) : null}
                {siteContent.familyName ? (
                  <p className="mt-2 break-words text-sm uppercase tracking-[0.28em] text-[#8b674d] sm:tracking-[0.35em]">
                    {siteContent.familyName}
                  </p>
                ) : null}
              </div>
            ) : null}
          </motion.div>

          <motion.div variants={reveal} className="relative z-10 mt-12 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="calendar-card rounded-[2rem] p-6 text-center sm:p-8">
              <p className="text-xs uppercase tracking-[0.35em] text-[#8b674d]">{siteContent.dateLabel}</p>
              <p className="mt-4 text-lg text-[#6a4b3e]">{siteContent.monthLabel}</p>
              <p className="font-display mt-2 text-6xl text-[#4f271d] sm:text-7xl">{siteContent.dateDay}</p>
              <p className="mt-2 text-lg text-[#6a4b3e]">{siteContent.dateYear}</p>
              <div className="mx-auto mt-5 h-px w-24 bg-[linear-gradient(90deg,transparent,#9c7b55,transparent)]" />
              <p className="mt-5 text-sm uppercase tracking-[0.35em] text-[#8b674d]">{siteContent.timeLabel}</p>
              <p className="mt-2 font-semibold text-[#4f271d]">{siteContent.timeValue}</p>
            </div>

            <div className="soft-card min-w-0 rounded-[2rem] p-6 sm:p-8">
              <p className="text-xs uppercase tracking-[0.35em] text-[#8b674d]">{siteContent.countdownTitle}</p>
              <div className="mt-6">
                <Countdown targetIso={siteContent.dateIso} />
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <MusicToggle musicUrl={musicUrl} placeholder={siteContent.musicPlaceholder} />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      <section className="relative mx-auto max-w-4xl px-4 pb-10 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8, staggerChildren: 0.12 }}
          className="space-y-8"
        >
          {hasProgram ? (
            <motion.div variants={reveal} className="invite-shell rounded-[2.5rem] px-5 py-10 sm:px-10">
              <div className="text-center">
                <p className="section-kicker">Кеш бағдарламасы</p>
                <h2 className="font-display mt-3 text-4xl text-[#40281d] sm:text-5xl">Той күнінің бағдарламасы</h2>
              </div>
              <div className="mt-8 space-y-4">
                {siteContent.program.map((item) => (
                  <div
                    key={`${item.time}-${item.title}`}
                    className="timeline-row rounded-[1.5rem] px-4 py-4 sm:grid sm:grid-cols-[120px_1fr] sm:items-center sm:gap-6 sm:px-6"
                  >
                    <div className="font-display text-3xl text-[#5a2d22]">{item.time}</div>
                    <div className="mt-2 text-sm leading-7 text-[#5f4336] sm:mt-0">{item.title}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          ) : null}

          <motion.div variants={reveal} className="invite-shell rounded-[2.5rem] px-5 py-10 sm:px-10">
            <div className="text-center">
              <p className="section-kicker">{siteContent.mapTitle}</p>
              <h2 className="font-display mt-3 break-words text-4xl text-[#40281d] sm:text-5xl">{siteContent.venueValue}</h2>
              {hasAddress ? <p className="mt-4 break-words text-base leading-8 text-[#6a4b3e]">{siteContent.addressValue}</p> : null}
              <p className="mt-3 text-sm text-[#87624d]">{siteContent.mapText}</p>
            </div>
            <div className="mt-8 flex justify-center">
              <a
                href={siteContent.mapUrl}
                target="_blank"
                rel="noreferrer"
                className="map-button rounded-full px-7 py-4 text-sm uppercase tracking-[0.28em]"
              >
                {siteContent.mapButton}
              </a>
            </div>
            {hasHosts ? (
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {siteContent.hosts.map((host) => (
                  <div key={host.label} className="soft-card min-w-0 rounded-[1.5rem] px-5 py-5 text-center">
                    <p className="text-xs uppercase tracking-[0.3em] text-[#8b674d]">{host.label}</p>
                    <p className="mt-2 break-words text-sm leading-6 text-[#5f4336]">{host.value}</p>
                  </div>
                ))}
              </div>
            ) : null}
          </motion.div>

          <motion.div variants={reveal} className="invite-shell rounded-[2.5rem] px-5 py-10 sm:px-10">
            <div className="text-center">
              <p className="section-kicker">RSVP</p>
              <h2 className="font-display mt-3 text-4xl text-[#40281d] sm:text-5xl">{siteContent.rsvpTitle}</h2>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-[#6a4b3e]">{siteContent.rsvpText}</p>
            </div>
            <div className="mt-8">
              <RSVPForm apiBaseUrl={apiBaseUrl} />
            </div>
            {siteContent.footer ? <p className="mt-6 text-center text-sm leading-7 text-[#87624d]">{siteContent.footer}</p> : null}
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
}
