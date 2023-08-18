import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {PurchaseItem} from "src/app/controller/bean/core/PurchaseItem";

@Injectable()
export class PurchaseItemDao {
    constructor(@InjectRepository(PurchaseItem) private readonly repository: Repository<PurchaseItem>,) {}

    async save(item: PurchaseItem): Promise<PurchaseItem> {
        const savedItem = await this.repository.save(item);
        return savedItem;
    }

    findByProductId(id: number): Promise<PurchaseItem[]> {
        return this.repository.find({ where: { product :{ id } } });
    }

    deleteByProductId(id: number): Promise<void> {
        return this.repository.delete({ product: { id } }).then(() => undefined);
    }

    findByPurchaseId(id: number): Promise<PurchaseItem[]> {
        return this.repository.find({ where: { purchase: { id } } });
    }

    deleteByPurchaseId(id: number): Promise<void> {
        return this.repository.delete({ purchase: { id } }).then(() => undefined);
    }


}
