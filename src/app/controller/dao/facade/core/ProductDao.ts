import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {Product} from "src/app/controller/bean/core/Product";

@Injectable()
export class ProductDao {
    constructor(@InjectRepository(Product) private readonly repository: Repository<Product>,) {}

    async save(item: Product): Promise<Product> {
        const savedItem = await this.repository.save(item);
        return savedItem;
    }

    findByCode(code: string): Promise<Product | undefined> {
        return this.repository.findOne({ where:{code} });
    }

    deleteByCode(code: string): Promise<void> {
        return this.repository.delete({ code }).then(() => undefined);
    }
}
