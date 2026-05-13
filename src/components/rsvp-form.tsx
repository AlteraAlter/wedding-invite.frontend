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
    <form onSubmit={submitForm} className="glass-panel rounded-[2rem] p-5 sm:p-7">
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
              className={`rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                attendance === "yes"
                  ? "bg-[#2f5a51] text-white"
                  : "luxury-border bg-white/80 text-[#6d4b39]"
              }`}
            >
              Келемін
            </button>
            <button
              type="button"
              onClick={() => setAttendance("no")}
              className={`rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                attendance === "no"
                  ? "bg-[#7a4b34] text-white"
                  : "luxury-border bg-white/80 text-[#6d4b39]"
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
          className="rounded-full bg-[linear-gradient(135deg,#3d6f65,#2f5a51,#7a4b34)] px-6 py-4 text-sm font-extrabold uppercase tracking-[0.28em] text-white transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? "Жіберілуде..." : "Жауапты жіберу"}
        </button>

        {feedback ? <p className="text-sm text-[#7a5b47]">{feedback}</p> : null}
      </div>
    </form>
  );
}
