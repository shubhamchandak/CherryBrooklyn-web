import { OrderItem } from './orderItem';
import { IItem } from '../interfaces/IItem';

export interface Order {
    items: IItem[];
    customerName: string;
    phone: number;
    address: string;
}
