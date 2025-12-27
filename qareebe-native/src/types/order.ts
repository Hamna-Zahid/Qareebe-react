export interface Location {
    latitude: number;
    longitude: number;
    address?: string;
}

export type OrderStatus = 'pending' | 'accepted' | 'rejected' | 'expired' | 'completed' | 'shipped';

export interface OrderItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image?: string;
}

export interface Order {
    id?: string;
    customerId: string;
    customerName: string;
    customerPhone: string;
    shopId: string;
    shopName: string;
    items: OrderItem[];
    totalAmount: number;
    status: OrderStatus;
    deliveryLocation: Location;
    createdAt: any; // ServerTimestamp
    updatedAt: any;
    acceptedAt?: any;
    expiresAt: any; // createdAt + 5 minutes
}
