
export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  author?: string;
  created_at: string;
  updated_at: string;
  user_id: string;
  image_url?: string;
  tags?: string[] | string;
  featured?: boolean;
}
