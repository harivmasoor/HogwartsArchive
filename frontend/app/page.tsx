import Header from "@/app/components/header";
import ChatSection from "./components/chat-section";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-10 p-24 bg-gradient-to-b from-yellow-300 via-yellow-100 to-yellow-50">
      <Header />
      <ChatSection />
    </main>
  );
}

