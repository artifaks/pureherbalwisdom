
export interface Herb {
  id: string;
  name: string;
  color: string;
  benefits: string[];
  oilPreparation: string;
  tincturePreparation: string;
}

export type HerbCategory = 'heart' | 'stomach' | 'mens' | 'womens';
