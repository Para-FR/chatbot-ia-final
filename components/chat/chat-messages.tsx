'use client';

import { useEffect, useRef } from 'react';
import { MessageBubble } from './message-bubble';
import type { Message } from '@/types/chat';

interface ChatMessagesProps {
  messages: Message[];
  isLoading: boolean;
}

export function ChatMessages({ messages, isLoading }: ChatMessagesProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      ref={scrollRef}
      className="flex-1 overflow-y-auto p-4"
    >
      {messages.length === 0 ? (
        <div className="flex h-full items-center justify-center">
          <div className="text-center text-zinc-500">
            <p className="text-3xl mb-2">🪙</p>
            <p className="text-lg font-medium">Bienvenue sur AideMoiAreconnaitre !</p>
            <p className="text-sm mt-1">
              Expert en identification de pièces d'or
            </p>
            <p className="text-xs mt-3 max-w-xs mx-auto">
              Envoyez une photo de votre pièce et je vous aiderai à l'identifier : type, pureté, poids, valeur indicative...
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
          {isLoading && messages[messages.length - 1]?.role === 'user' && (
            <div className="flex items-center gap-2 text-zinc-500">
              <div className="flex gap-1">
                <span className="h-2 w-2 rounded-full bg-zinc-400 animate-bounce [animation-delay:-0.3s]" />
                <span className="h-2 w-2 rounded-full bg-zinc-400 animate-bounce [animation-delay:-0.15s]" />
                <span className="h-2 w-2 rounded-full bg-zinc-400 animate-bounce" />
              </div>
              <span className="text-sm">Claude réfléchit...</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
