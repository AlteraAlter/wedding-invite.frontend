import { InvitationPage } from "@/components/invitation-page";

export default function Home() {
  return (
    <InvitationPage
      apiBaseUrl={process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000"}
      musicUrl={process.env.NEXT_PUBLIC_BACKGROUND_MUSIC_URL}
    />
  );
}
