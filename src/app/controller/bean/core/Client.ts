import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity( 'client')
export class Client {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    fullName: string;

    @Column()
    email: string;

}