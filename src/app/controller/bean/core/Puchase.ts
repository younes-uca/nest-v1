import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import {Client} from "./Client";
import {PurchaseItem} from "./PurchaseItem";
import {PurchaseItemDto} from "../../dto/PurchaseItemDto";


@Entity('purchase')
export class Purchase  {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 500 })
    reference: string;

    @Column()
    purchaseDate: Date;

    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
    total: number;

    @Column({ length: 500 })
    description: string;

    @ManyToOne(() => Client, { eager: true })
    client: Client;

    @OneToMany(() => PurchaseItem, purchaseItem => purchaseItem.purchase)
    purchaseItems: PurchaseItem[];


}
