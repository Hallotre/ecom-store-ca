export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  discountedPrice: number;
  imageUrl: string;
  rating: number;
  tags: string[];
  reviews: Review[];
  image: {
    url: string;
    alt: string;
  };
}

export interface Review {
  id: string;
  username: string;
  rating: number;
  description: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface ContactFormData {
  fullName: string;
  subject: string;
  email: string;
  body: string;
}