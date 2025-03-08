
export interface Herb {
  id: string;
  name: string;
  color: string;
  benefits: string[];
  oilPreparation: string;
  tincturePreparation: string;
  category?: HerbCategory;
}

export type HerbCategory = 'heart' | 'stomach' | 'mens' | 'womens' | 'brain' | 'tea';

export interface HerbPairing {
  herbId: string;
  reason: string;
}

export interface HerbalTea {
  id: string;
  name: string;
  color: string;
  benefits: string[];
  preparation: string;
  effects: string[];
  bestTimeToConsume: string;
}
