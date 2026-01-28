'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useChat } from '@/hooks/use-chat';
import { ChatMessages } from './chat-messages';
import { ChatInput } from './chat-input';

export function ChatContainer() {
  const { messages, sendMessage, isLoading, clearMessages } = useChat();

  return (
    <Card className="w-full max-w-2xl mx-auto h-[600px] flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold">🪙 AideMoiAreconnaitre</CardTitle>
        {messages.length > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={clearMessages}
            disabled={isLoading}
          >
            Effacer
          </Button>
        )}
      </CardHeader>
      <CardContent className="flex-1 flex flex-col overflow-hidden p-0">
        <ChatMessages messages={messages} isLoading={isLoading} />
        <ChatInput onSend={sendMessage} isLoading={isLoading} />
      </CardContent>
    </Card>
  );
}
