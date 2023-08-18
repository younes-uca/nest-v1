import { Injectable } from "@nestjs/common";
import { ProductDao } from "src/app/controller/dao/facade/core/ProductDao";
import { Product } from "src/app/controller/bean/core/Product";

@Injectable()
export class ProductAdminServiceImpl  {
    constructor(private readonly productDao: ProductDao) {}

    async save(item: Product): Promise<Product> {
        const savedItem = await this.productDao.save(item);
        return savedItem;
    }

    async findByCode(code: string): Promise<Product | undefined> {
        return this.productDao.findByCode(code);
    }

    async deleteByCode(code: string): Promise<void> {
        return this.productDao.deleteByCode(code);
    }
}
