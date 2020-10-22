type Message = {
  id: string;
  text: string;
  chat: string; // Chat id
  author: User;
  createdAt: string;
  closable: boolean;
};

type Chat = {
  id: string;
  title: string;
  isUnread: boolean;
  typingAuthor: string;
};

type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  settings: Settings;
}

type Settings = {
  theme: Theme;
  language: Language;
};

type Theme = 'light' | 'dark';

type Language = 'en' | 'ru';