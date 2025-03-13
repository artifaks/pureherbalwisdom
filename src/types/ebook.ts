export interface Ebook {
  id: string;
  title: string;
  description: string | null;
  author: string | null;
  cover_image_url: string | null;
  file_url: string;
  file_type: string;
  file_size: number | null;
  is_premium: boolean;
  price: number | null;
  tags: string[] | null;
  created_at: string;
  updated_at: string;
  categories?: EbookCategory[];
}

export interface EbookCategory {
  id: string;
  name: string;
  description: string | null;
  created_at: string;
}

export interface EbookWithCategory extends Ebook {
  categories: EbookCategory[];
}

export interface EbookUpload {
  title: string;
  description?: string;
  author?: string;
  cover_image?: File;
  file: File;
  is_premium: boolean;
  price?: number;
  tags?: string[];
  category_ids: string[];
}
