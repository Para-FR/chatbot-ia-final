'use client';

import ReactMarkdown from 'react-markdown';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import type { Message } from '@/types/chat';

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user';

  return (
    <div
      className={cn(
        'flex items-start gap-3 mb-4',
        isUser ? 'flex-row-reverse' : 'flex-row'
      )}
    >
      <Avatar className="h-8 w-8 shrink-0">
        <AvatarFallback
          className={cn(
            'text-sm font-medium',
            isUser
              ? 'bg-amber-500 text-white'
              : 'bg-zinc-200 text-zinc-700 dark:bg-zinc-700 dark:text-zinc-200'
          )}
        >
          {isUser ? 'U' : '🪙'}
        </AvatarFallback>
      </Avatar>
      <div
        className={cn(
          'max-w-[80%] rounded-2xl px-4 py-2',
          isUser
            ? 'bg-amber-500 text-white'
            : 'bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100'
        )}
      >
        {message.image && (
          <img
            src={`data:${message.image.mediaType};base64,${message.image.data}`}
            alt="Image envoyée"
            className="max-w-full h-auto rounded-lg mb-2"
            style={{ maxHeight: '200px' }}
          />
        )}
        {message.content && (
          isUser ? (
            <p className="text-sm whitespace-pre-wrap break-words">
              {message.content}
            </p>
          ) : (
            <div className="text-sm prose prose-sm prose-zinc dark:prose-invert max-w-none">
              <ReactMarkdown
                components={{
                  h1: ({ children }) => (
                    <h1 className="text-lg font-bold mt-3 mb-2 first:mt-0">{children}</h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-base font-bold mt-3 mb-1.5 first:mt-0">{children}</h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-sm font-bold mt-2 mb-1 first:mt-0">{children}</h3>
                  ),
                  p: ({ children }) => (
                    <p className="mb-2 last:mb-0">{children}</p>
                  ),
                  ul: ({ children }) => (
                    <ul className="list-disc list-inside mb-2 space-y-1">{children}</ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="list-decimal list-inside mb-2 space-y-1">{children}</ol>
                  ),
                  li: ({ children }) => (
                    <li className="ml-1">{children}</li>
                  ),
                  strong: ({ children }) => (
                    <strong className="font-semibold">{children}</strong>
                  ),
                  em: ({ children }) => (
                    <em className="italic">{children}</em>
                  ),
                  code: ({ children }) => (
                    <code className="bg-zinc-200 dark:bg-zinc-700 px-1 py-0.5 rounded text-xs">
                      {children}
                    </code>
                  ),
                  pre: ({ children }) => (
                    <pre className="bg-zinc-200 dark:bg-zinc-700 p-2 rounded-lg overflow-x-auto mb-2">
                      {children}
                    </pre>
                  ),
                  hr: () => (
                    <hr className="my-3 border-zinc-300 dark:border-zinc-600" />
                  ),
                }}
              >
                {message.content}
              </ReactMarkdown>
            </div>
          )
        )}
      </div>
    </div>
  );
}
