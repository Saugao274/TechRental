export type ProductParameter = {
  key: string;
  label: string;
  value: string;
  _id: string;
};

export type Product = {
  _id: string;
  title: string;
  brand: string;
  category: string;
  price: number;
  priceWeek: number;
  priceMonth: number;
  images: string[];
  view: number;
  idShop: string;
  details: string;
  shortDetails: string;
  parameter: ProductParameter[];
  reviews: any[]; // You can define a Review type if needed
  isHotProduct: boolean;
  isNewProduct: boolean;
  location: string;
  soldCount: number;
  discount: number;
  stock: number;
  adminApprovalStatus: string;
  status: string;
  __v: number;
};

export type Order = {
  _id: string;
  customerId: string;
  products: Product[];
  totalPrice: number;
  status: 'pending_payment' | 'paid' | 'shipped' | 'cancelled'; // Adjust as needed
  duration: number;
  deliveryDate: string; // ISO Date string
  createdAt: string;
  updatedAt: string;
  __v: number;
};