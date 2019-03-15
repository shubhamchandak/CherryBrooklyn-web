import { OrderItem } from './orderItem';

export interface Order {
    items: OrderItem[];
    customerName: string;
    phone: number;
    address: string;
}
