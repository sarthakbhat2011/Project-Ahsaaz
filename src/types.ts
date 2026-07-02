export interface Signup {
  name: string;
  email?: string;
  message: string;
  reflection: string;
  timestamp: string;
}

export interface SentEmail {
  id: string;
  to: string;
  subject: string;
  html: string;
  timestamp: string;
  sentSuccessfully: boolean;
  errorMsg: string;
}

export interface DonationImpact {
  id: string;
  amount: number;
  meals: number;
  families: number;
  title: string;
  description: string;
  icon: string;
}

export interface ConversationMessage {
  sender: 'user' | 'ahsaaz';
  text: string;
  timestamp: string;
}
