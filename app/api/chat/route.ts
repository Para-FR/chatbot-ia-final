import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export const runtime = 'nodejs';
export const maxDuration = 30;

const SYSTEM_PROMPT = `Tu es "AideMoiAreconnaitre", un expert numismate spécialisé dans l'identification et l'estimation des pièces d'or.

Ton expertise couvre :
- Napoléons (20 francs, 10 francs, 5 francs)
- Souverains britanniques
- Krugerrands sud-africains
- Eagles américains
- Maple Leaf canadiens
- Pesos mexicains
- Vreneli suisses
- Et toutes autres pièces d'or d'investissement ou de collection

Quand on te montre une photo de pièce, tu dois fournir ces informations :
1. **Identification** : Type de pièce (pays, dénomination, année si visible)
2. **Caractéristiques** : Description de l'avers, du revers et de la tranche
3. **Titrage** : Pureté de l'or (ex: 900‰, 916,7‰, 999,9‰)
4. **Poids** : Poids brut et poids en or fin théorique
5. **Tirage** : Nombre de pièces frappées (si connu)
6. **Refrappe** : Indiquer s'il s'agit d'une refrappe (pièce frappée postérieurement avec les coins d'origine ou des reproductions officielles)
7. **Cours légal** : Préciser si la pièce a encore cours légal dans son pays d'origine
8. **Authenticité** : Éléments à vérifier pour s'assurer de l'authenticité
9. **Valeur indicative** : Fourchette de prix approximative (prime sur le cours de l'or)

Sois précis, professionnel et pédagogue. Structure ta réponse avec des sections claires. Si tu n'es pas certain de l'identification, indique-le clairement et propose des hypothèses.`;

interface MessageImage {
  data: string;
  mediaType: string;
}

interface MessageInput {
  role: 'user' | 'assistant';
  content: string;
  image?: MessageImage;
}

type ImageMediaType = 'image/jpeg' | 'image/png' | 'image/gif' | 'image/webp';

function formatMessagesForClaude(messages: MessageInput[]): Anthropic.MessageParam[] {
  return messages.map((msg) => {
    if (msg.role === 'user' && msg.image) {
      const content: Anthropic.ContentBlockParam[] = [
        {
          type: 'image',
          source: {
            type: 'base64',
            media_type: msg.image.mediaType as ImageMediaType,
            data: msg.image.data,
          },
        },
      ];
      if (msg.content.trim()) {
        content.push({
          type: 'text',
          text: msg.content,
        });
      }
      return {
        role: msg.role,
        content,
      };
    }
    return {
      role: msg.role,
      content: msg.content,
    };
  });
}

export async function POST(req: Request) {
  try {
    const { messages } = (await req.json()) as { messages: MessageInput[] };

    if (!messages || !Array.isArray(messages)) {
      return new Response('Messages requis', { status: 400 });
    }

    const formattedMessages = formatMessagesForClaude(messages);
    const encoder = new TextEncoder();

    const stream = new ReadableStream({
      async start(controller) {
        try {
          const response = anthropic.messages.stream({
            model: 'claude-sonnet-4-5-20250929',
            max_tokens: 1024,
            system: SYSTEM_PROMPT,
            messages: formattedMessages,
          });

          response.on('text', (text) => {
            const data = JSON.stringify({ text });
            controller.enqueue(encoder.encode(`data: ${data}\n\n`));
          });

          response.on('message', () => {
            controller.enqueue(encoder.encode('data: [DONE]\n\n'));
            controller.close();
          });

          response.on('error', (error) => {
            console.error('Erreur Anthropic:', error);
            const errorData = JSON.stringify({
              error: 'Une erreur est survenue',
            });
            controller.enqueue(encoder.encode(`data: ${errorData}\n\n`));
            controller.close();
          });
        } catch (error) {
          console.error('Erreur lors de la création du stream:', error);
          controller.error(error);
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    });
  } catch (error) {
    console.error('Erreur API:', error);
    return new Response('Erreur interne du serveur', { status: 500 });
  }
}
