
export interface Ebook {
  id: string;
  title: string;
  description: string;
  price: string;
  type: string;
  popular: boolean;
  fileUrl?: string;
  coverUrl?: string;  // Added coverUrl property
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
