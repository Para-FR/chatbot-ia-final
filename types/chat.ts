export interface MessageImage {
  data: string;      // base64
  mediaType: string; // image/jpeg, image/png, etc.
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  image?: MessageImage;  // Image optionnelle
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
}
