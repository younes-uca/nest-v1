import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import {Product} from "./Product";
import {Purchase} from "./Puchase";


@Entity('purchase-item')
export class PurchaseItem {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Product)
    product: Product;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    price: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    quantity: number;

    @ManyToOne(() => Purchase, purchase => purchase.purchaseItems)
    purchase: Purchase;
}
