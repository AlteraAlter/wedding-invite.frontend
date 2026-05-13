"use client";

import { startTransition, useState } from "react";

type RSVPFormProps = {
  apiBaseUrl: string;
};

type Attendance = "yes" | "no";

export function RSVPForm({ apiBaseUrl }: RSVPFormProps) {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [attendance, setAttendance] = useState<Attendance>("yes");
  const [message, setMessage] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setFeedback(null);

    try {
      const response = await fetch(`${apiBaseUrl}/api/rsvp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          full_name: fullName,
          phone,
          attendance: attendance === "yes",
          message,
        }),
      });

      const contentType = response.headers.get("content-type") ?? "";
      let data: { message?: string } | null = null;

      if (contentType.includes("application/json")) {
        data = (await response.json()) as { message?: string };
      } else {
        const rawText = await response.text();
        throw new Error(
          rawText.trim()
            ? `Сервер вернул неожиданный ответ: ${rawText.slice(0, 180)}`
            : "Сервер вернул пустой или некорректный ответ.",
        );
      }

      if (!response.ok) {
        throw new Error(data?.message ?? "Жіберу кезінде қате шықты.");
      }

      startTransition(() => {
        setFeedback(data?.message ?? "Жауабыңыз қабылданды.");
        setFullName("");
        setPhone("");
        setAttendance("yes");
        setMessage("");
      });
    } catch (error) {
      const fallback = error instanceof Error ? error.message : "Қате шықты. Қайта көріңіз.";
      setFeedback(fallback);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={submitForm} className="glass-panel glass-panel-rsvp rounded-[2rem] p-5 sm:p-7">
      <div className="grid gap-4">
        <label className="grid gap-2 text-sm text-[#8a6c58]">
          <span>Аты-жөніңіз</span>
          <input
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
            placeholder="Толық аты-жөніңіз"
            className="luxury-border rounded-2xl bg-white/88 px-4 py-3 text-base text-[#4d2c21] outline-none placeholder:text-[#b49886]"
            required
          />
        </label>

        <label className="grid gap-2 text-sm text-[#8a6c58]">
          <span>Телефон нөмірі</span>
          <input
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            placeholder="+7 777 000 00 00"
            className="luxury-border rounded-2xl bg-white/88 px-4 py-3 text-base text-[#4d2c21] outline-none placeholder:text-[#b49886]"
          />
        </label>

        <div className="grid gap-2 text-sm text-[#8a6c58]">
          <span>Жауабыңыз</span>
          <div className="grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => setAttendance("yes")}
              className={`rounded-2xl px-4 py-3 text-sm font-semibold transition duration-200 hover:-translate-y-0.5 ${
                attendance === "yes"
                  ? "border border-[#8f5b43] bg-[linear-gradient(135deg,#a37053_0%,#85523d_52%,#6a3f30_100%)] text-[#fffaf4] shadow-[0_14px_30px_rgba(122,75,52,0.22)] hover:shadow-[0_18px_36px_rgba(122,75,52,0.28)]"
                  : "border border-[rgba(160,120,95,0.24)] bg-[linear-gradient(180deg,rgba(255,255,255,0.94),rgba(247,238,230,0.98))] text-[#6d4b39] shadow-[0_10px_22px_rgba(132,101,80,0.08)] hover:shadow-[0_14px_28px_rgba(132,101,80,0.12)]"
              }`}
            >
              Келемін
            </button>
            <button
              type="button"
              onClick={() => setAttendance("no")}
              className={`rounded-2xl px-4 py-3 text-sm font-semibold transition duration-200 hover:-translate-y-0.5 ${
                attendance === "no"
                  ? "border border-[#8f5b43] bg-[linear-gradient(135deg,#a37053_0%,#85523d_52%,#6a3f30_100%)] text-[#fffaf4] shadow-[0_14px_30px_rgba(122,75,52,0.22)] hover:shadow-[0_18px_36px_rgba(122,75,52,0.28)]"
                  : "border border-[rgba(160,120,95,0.24)] bg-[linear-gradient(180deg,rgba(255,255,255,0.94),rgba(247,238,230,0.98))] text-[#6d4b39] shadow-[0_10px_22px_rgba(132,101,80,0.08)] hover:shadow-[0_14px_28px_rgba(132,101,80,0.12)]"
              }`}
            >
              Келе алмаймын
            </button>
          </div>
        </div>

        <label className="grid gap-2 text-sm text-[#8a6c58]">
          <span>Тілегіңіз немесе ескерту</span>
          <textarea
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            rows={4}
            placeholder="Қаласаңыз, қысқа тілек қалдырыңыз"
            className="luxury-border rounded-2xl bg-white/88 px-4 py-3 text-base text-[#4d2c21] outline-none placeholder:text-[#b49886]"
          />
        </label>

        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-full border border-[#8f5b43] bg-[linear-gradient(135deg,#a37053_0%,#85523d_52%,#6a3f30_100%)] px-6 py-4 text-sm font-extrabold uppercase tracking-[0.28em] text-[#fffaf4] shadow-[0_14px_32px_rgba(122,75,52,0.24)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_36px_rgba(122,75,52,0.28)] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? "Жіберілуде..." : "Жауапты жіберу"}
        </button>

        {feedback ? <p className="text-sm text-[#7a5b47]">{feedback}</p> : null}
      </div>
    </form>
  );
}
