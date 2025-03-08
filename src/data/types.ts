
export interface Herb {
  id: string;
  name: string;
  color: string;
  benefits: string[];
  oilPreparation: string;
  tincturePreparation: string;
  category?: HerbCategory;
  effects?: string[];
  bestTimeToConsume?: string;
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
