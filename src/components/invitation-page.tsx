"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
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

const firstVisitStorageKey = "wedding-invitation-first-visit-seen";

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
    let frameId = 0;

    const updateCountdown = () => {
      setParts(getCountdown(targetIso));
    };

    frameId = window.requestAnimationFrame(updateCountdown);

    const timer = window.setInterval(() => {
      updateCountdown();
    }, 1000);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.clearInterval(timer);
    };
  }, [targetIso]);

  return (
    <div className="countdown-shell">
      {[
        { label: "күн", value: parts.days },
        { label: "сағат", value: parts.hours },
        { label: "минут", value: parts.minutes },
        { label: "секунд", value: parts.seconds },
      ].map((item, index, items) => (
        <div key={item.label} className="countdown-segment">
          <div className="countdown-segment-frame">
            <div className="countdown-value">{item.value}</div>
            <div className="countdown-label">{item.label}</div>
          </div>
          {index < items.length - 1 ? <div className="countdown-separator" aria-hidden="true">✦</div> : null}
        </div>
      ))}
    </div>
  );
}

export function InvitationPage({ apiBaseUrl, musicUrl }: InvitationPageProps) {
  const prefersReducedMotion = useReducedMotion();
  const [playIntro, setPlayIntro] = useState(false);
  const hasFamilyBlock = Boolean(siteContent.parents || siteContent.familyName);
  const hasProgram = siteContent.program.length > 0;
  const hasHosts = siteContent.hosts.length > 0;
  const hasAddress = Boolean(siteContent.addressValue);

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const hasSeenIntro = window.sessionStorage.getItem(firstVisitStorageKey) === "true";

    if (hasSeenIntro) {
      return;
    }

    window.sessionStorage.setItem(firstVisitStorageKey, "true");
    const frameId = window.requestAnimationFrame(() => {
      setPlayIntro(true);
    });

    const timer = window.setTimeout(() => {
      setPlayIntro(false);
    }, 2550);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.clearTimeout(timer);
    };
  }, [prefersReducedMotion]);

  return (
    <main className="relative overflow-hidden">
      <AnimatePresence>
        {playIntro ? (
          <motion.div
            key="first-visit-intro"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } }}
            className="page-intro-overlay"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.86, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.06, y: -10 }}
              transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1] }}
              className="page-intro-card"
            >
              <motion.div
                initial={{ opacity: 0, scaleX: 0.7 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ delay: 0.22, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="page-intro-line"
              />
              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12, duration: 0.75 }}
                className="page-intro-kicker"
              >
                {siteContent.eyebrow}
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.26, duration: 0.9 }}
                className="page-intro-title"
              >
                {siteContent.brideName}
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.42, duration: 0.82 }}
                className="page-intro-subtitle"
              >
                {siteContent.dateValue} • {siteContent.timeValue}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, scaleX: 0.7 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ delay: 0.52, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="page-intro-line"
              />
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className="pointer-events-none absolute inset-0">
        <div className="light-orb left-[-10rem] top-[4rem]" />
        <div className="light-orb right-[-8rem] top-[40rem]" />
        <div className="light-orb left-[10%] top-[88rem]" />
        <Image src="/ornament-corner.svg" alt="" width={192} height={192} className="ornament-corner left-[-2rem] top-10" />
        <Image src="/ornament-corner.svg" alt="" width={192} height={192} className="ornament-corner right-[-2rem] top-[30rem] rotate-180" />
      </div>

      <motion.section
        initial={false}
        animate={
          playIntro
            ? { opacity: 0.35, scale: 1.015, filter: "blur(8px)" }
            : { opacity: 1, scale: 1, filter: "blur(0px)" }
        }
        transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto max-w-4xl px-4 pt-8 pb-20 sm:px-6 lg:px-8"
      >
        <motion.div
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.9, staggerChildren: 0.12 }}
          className="invite-shell invite-shell-hero overflow-hidden rounded-[1.5rem] px-5 pt-10 pb-10 sm:px-10 sm:pt-14 sm:pb-14"
        >
          <Image
            src="/ornament-divider.svg"
            alt=""
            width={200}
            height={44}
            className="ornament-divider mx-auto mb-4 h-8 w-36 opacity-85"
          />

          <motion.div variants={reveal} className="relative z-10 text-center">
            <h1 className="hero-title font-script break-words text-[clamp(3rem,8.2vw,5.2rem)]">{siteContent.title}</h1>
            <p className="eyebrow mt-4">{siteContent.eyebrow}</p>
            {siteContent.subtitle ? (
              <p className="mt-4 text-base leading-8 text-[#614438] sm:text-lg">{siteContent.subtitle}</p>
            ) : null}
          </motion.div>

          <motion.div variants={reveal} className="music-inline-row mt-8">
            <MusicToggle musicUrl={musicUrl} placeholder={siteContent.musicPlaceholder} />
          </motion.div>

          <motion.div variants={reveal} className="relative z-10 mx-auto mt-8 h-px w-40 bg-[linear-gradient(90deg,transparent,#9c7b55,transparent)]" />

          <motion.div variants={reveal} className="relative z-10 mt-2 text-center">
            {siteContent.intro ? (
              <p className="mx-auto max-w-3xl whitespace-pre-line text-base leading-8 text-[#5d4235] sm:text-lg">
                {siteContent.intro}
              </p>
            ) : null}
            {siteContent.details ? (
              <p className="mx-auto mt-2 max-w-2xl whitespace-pre-line text-base leading-8 text-[#5d4235] sm:text-lg">
                {siteContent.details}
              </p>
            ) : null}
            {siteContent.brideNameGenitive ? (
              <p className="mx-auto mt-2 max-w-2xl whitespace-pre-line text-base leading-8 text-[#5d4235] sm:text-lg">
                {siteContent.brideNameGenitive}
              </p>
            ) : null}
            <p className="mx-auto mt-1 max-w-2xl whitespace-pre-line text-base leading-8 text-[#5d4235] sm:text-lg">
              {siteContent.invitationText}
            </p>
            {siteContent.quote ? (
              <p className="mx-auto mt-8 max-w-2xl text-base leading-8 text-[#6b4f44] sm:text-lg">
                {siteContent.quote}
              </p>
            ) : null}
          </motion.div>

          <motion.div variants={reveal} className="relative z-10 mt-10 grid gap-6 text-center">
            {hasFamilyBlock ? (
              <div className="flex flex-wrap items-baseline justify-center gap-x-4 gap-y-2">
                <p className="text-sm font-medium tracking-[0.08em] text-[#8b674d]">Той иелері:</p>
                {siteContent.parents ? (
                  <p className="supporting-title whitespace-nowrap text-[clamp(1.9rem,6vw,3rem)]">
                    <span className="underline decoration-[1.5px] underline-offset-6">Армат</span>
                    {" & Асем"}
                  </p>
                ) : null}
                {siteContent.familyName ? (
                  <p className="w-full break-words text-sm tracking-[0.08em] text-[#8b674d]">
                    {siteContent.familyName}
                  </p>
                ) : null}
              </div>
            ) : null}
          </motion.div>

          <motion.div variants={reveal} className="relative z-10 mt-12 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="calendar-card calendar-card-vine rounded-[2rem] p-6 text-center sm:p-8">
              <div className="calendar-card-visual" aria-hidden="true">
                <div className="background-calendar background-calendar-left">
                  <span className="background-calendar-month">{siteContent.monthLabel}</span>
                  <span className="background-calendar-day">{siteContent.dateDay}</span>
                </div>
                <div className="background-calendar background-calendar-right">
                  <span className="background-calendar-month">{siteContent.monthLabel}</span>
                  <span className="background-calendar-day">{siteContent.dateDay}</span>
                </div>
              </div>
              <div className="calendar-header">
                <div className="calendar-binding" aria-hidden="true">
                  <span className="calendar-ring" />
                  <span className="calendar-ring" />
                </div>
                <p className="calendar-header-label">{siteContent.dateLabel}</p>
                <p className="calendar-header-month">{siteContent.monthLabel}</p>
              </div>
              <div className="calendar-body">
                <p className="font-display text-7xl leading-none text-[#4f271d] sm:text-8xl">{siteContent.dateDay}</p>
                <p className="mt-3 text-lg text-[#6a4b3e]">{siteContent.dateYear}</p>
                <div className="mx-auto mt-5 h-px w-24 bg-[linear-gradient(90deg,transparent,#9c7b55,transparent)]" />
                <p className="mt-5 text-sm tracking-[0.12em] text-[#8b674d]">{siteContent.timeLabel}</p>
                <p className="calendar-time-value mt-2">{siteContent.timeValue}</p>
              </div>
            </div>

            <div className="soft-card soft-card-countdown min-w-0 rounded-[2rem] p-6 sm:p-8">
              <p className="countdown-heading">{siteContent.countdownTitle}</p>
              <div className="mt-6">
                <Countdown targetIso={siteContent.dateIso} />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.section>

      <section className="relative mx-auto max-w-4xl px-4 pb-10 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8, staggerChildren: 0.12 }}
          className="space-y-8"
        >
          {hasProgram ? (
            <motion.div variants={reveal} className="invite-shell invite-shell-program rounded-[2.5rem] px-5 py-10 sm:px-10">
              <div className="text-center">
                <p className="section-kicker">Кеш бағдарламасы</p>
                <h2 className="section-title mt-3">Той күнінің бағдарламасы</h2>
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

          <motion.div variants={reveal} className="invite-shell invite-shell-map map-section overflow-hidden rounded-[2.5rem] px-5 py-10 sm:px-10">
            <div
              className="map-visual absolute inset-0"
              style={{ backgroundImage: `url(${siteContent.mapPreviewUrl})` }}
              aria-hidden="true"
            />
            <div className="text-center">
              <p className="section-kicker">{siteContent.mapTitle}</p>
              <h2 className="section-title mt-3 break-words">{siteContent.venueValue}</h2>
              {hasAddress ? <p className="mt-4 break-words text-base leading-8 text-[#6a4b3e]">{siteContent.addressValue}</p> : null}
              <p className="mt-3 text-sm text-[#87624d]">{siteContent.mapText}</p>
              <p className="mt-3 text-sm text-[#87624d]">Мекен жайы: Орал қаласы, Жәңгір хан көшесі 64/1, Jaiyq Hall мейрамханасы</p>
            </div>
            <div className="mt-8 flex justify-center">
              <a
                href={siteContent.mapUrl}
                target="_blank"
                rel="noreferrer"
                className="map-button inline-flex items-center gap-3 rounded-full px-6 py-3.5 text-sm tracking-[0.12em]"
              >
                <span className="map-badge" aria-hidden="true">
                  <span className="map-badge-pulse" />
                  <svg viewBox="0 0 256 256" className="map-badge-icon" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="256" height="256" rx="36" fill="white" />
                    <path
                      d="M0 20C0 8.95 8.95 0 20 0H236C247.05 0 256 8.95 256 20V78C220 72 185 70 150 70C110 70 65 75 0 82V20Z"
                      fill="#F4B400"
                    />
                    <path
                      d="M0 82C70 75 110 70 150 70C190 70 225 73 256 78V175C210 170 165 168 120 170C80 172 40 178 0 185V82Z"
                      fill="#1DB317"
                    />
                    <path
                      d="M0 185C45 178 85 172 125 170C170 168 212 170 256 175V236C256 247.05 247.05 256 236 256H20C8.95 256 0 247.05 0 236V185Z"
                      fill="#8BE000"
                    />
                    <path
                      d="M0 82C70 75 110 70 150 70C190 70 225 73 256 78"
                      stroke="white"
                      strokeWidth="6"
                      fill="none"
                    />
                    <path
                      d="M0 185C45 178 85 172 125 170C170 168 212 170 256 175"
                      stroke="white"
                      strokeWidth="6"
                      fill="none"
                    />
                    <circle cx="128" cy="120" r="52" fill="#1A73E8" stroke="white" strokeWidth="8" />
                    <path
                      d="M128 168C118 168 108 170 100 176C90 184 86 194 84 208H172C170 194 166 184 156 176C148 170 138 168 128 168Z"
                      fill="white"
                    />
                    <path d="M122 208L128 246L134 208H122Z" fill="#1A73E8" />
                    <path d="M0 214L256 176" stroke="white" strokeWidth="8" />
                    <path d="M0 42L256 90" stroke="white" strokeWidth="4" opacity="0.7" />
                  </svg>
                </span>
                <span>{siteContent.mapButton}</span>
              </a>
            </div>
            {hasHosts ? (
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {siteContent.hosts.map((host) => (
                  <div key={host.label} className="soft-card soft-card-host min-w-0 rounded-[1.5rem] px-5 py-5 text-center">
                    <p className="text-xs uppercase tracking-[0.3em] text-[#8b674d]">{host.label}</p>
                    <p className="mt-2 break-words text-sm leading-6 text-[#5f4336]">{host.value}</p>
                  </div>
                ))}
              </div>
            ) : null}
          </motion.div>

          <motion.div variants={reveal} className="invite-shell invite-shell-rsvp rounded-[2.5rem] px-5 py-10 sm:px-10">
            <div className="text-center">
              <p className="section-kicker">RSVP</p>
              <h2 className="section-title mt-3">{siteContent.rsvpTitle}</h2>
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
