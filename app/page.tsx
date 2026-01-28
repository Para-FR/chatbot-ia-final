import { ChatContainer } from '@/components/chat/chat-container';

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-50 p-4 dark:bg-zinc-950">
      <ChatContainer />
    </main>
  );
}
