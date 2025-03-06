
export interface Herb {
  id: string;
  name: string;
  color: string;
  benefits: string[];
  oilPreparation: string;
  tincturePreparation: string;
  category?: HerbCategory;
}

export type HerbCategory = 'heart' | 'stomach' | 'mens' | 'womens' | 'brain';
