import { Cities } from '../const';

export type Offer = {
  id: string;
  title: string;
  type: string;
  price: number;
  city: {
    name: keyof typeof Cities;
    location: {
      latitude: number;
      longitude: number;
      zoom: number;
    };
  };
  location: {
    latitude: number;
    longitude: number;
    zoom: number;
  };
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  description: string;
  bedrooms: number;
  goods: [string];
  host: {
    name: string;
    avatarUrl: string;
    isPro: boolean;
  };
  images: [string];
  maxAdults: number;
}

export type OfferCardType = {
  id: string;
  title: string;
  type: string;
  price: number;
  city: {
    name: keyof typeof Cities;
    location: {
      latitude: number;
      longitude: number;
      zoom: number;
    };
  };
  location: {
    latitude: number;
    longitude: number;
    zoom: number;
  };
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  previewImage: string;
}

export type OfferLikeType = Offer | OfferCardType;
