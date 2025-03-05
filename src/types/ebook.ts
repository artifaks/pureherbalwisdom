
export interface Ebook {
  id: string;  // Changed from "number | string" to just "string"
  title: string;
  description: string;
  price: string;
  type: string;
  popular: boolean;
  fileUrl?: string;
}

export interface Purchase {
  id: string;
  userId: string;
  ebookId: string;
  paymentStatus: 'pending' | 'completed' | 'failed';
  stripeSessionId?: string;
  createdAt: string;
  updatedAt: string;
}
