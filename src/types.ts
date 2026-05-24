export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  category: 'production' | 'industry';
  imageUrl: string;
  createdAt: string;
}

export interface Inquiry {
  id: string;
  clientName: string;
  phone: string;
  brushType: string;
  content: string;
  createdAt: string;
  status: 'pending' | 'completed';
}

export interface ProductType {
  name: string;
  description: string;
  iconName: string;
}

export interface KeyProduct {
  id: string;
  name: string;
  brand?: string;
  tagline: string;
  description: string;
  imageUrl: string;
  features: string[];
}
