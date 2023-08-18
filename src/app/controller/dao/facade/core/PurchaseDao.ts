import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Purchase} from "src/app/controller/bean/core/Puchase";

@Injectable()
export class PurchaseDao {
    constructor(@InjectRepository(Purchase) private readonly repository: Repository<Purchase>,) {
    }

    async save(item: Purchase): Promise<Purchase> {
        const savedItem = await this.repository.save(item);
        return savedItem;
    }

    findByReference(reference: string): Promise<Purchase | undefined> {
        return this.repository.findOne({where: {reference}});
    }

    deleteByReference(reference: string): Promise<void> {
        return this.repository.delete({reference}).then(() => undefined);
    }

    findByClientId(id: number): Promise<Purchase[]> {
        return this.repository.find({where: {client: {id}}});
    }

    deleteByClientId(id: number): Promise<void> {
        return this.repository.delete({client: {id}}).then(() => undefined);
    }

    // new

    async  findAll(): Promise<Purchase[]> {
        return this.repository.find();
    }

    async findById(id: number): Promise<Purchase> {
        return this.repository.findOne({where: {id}});
    }


}
