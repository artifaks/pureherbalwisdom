
export interface Ebook {
  id: string;
  title: string;
  description: string;
  price: string;
  type: string;
  popular: boolean;
  fileUrl?: string;
  coverUrl?: string;  // New field for cover image
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
