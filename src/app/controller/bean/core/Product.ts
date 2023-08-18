import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity( 'product')
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    code: string;

    @Column()
    reference: string;
}