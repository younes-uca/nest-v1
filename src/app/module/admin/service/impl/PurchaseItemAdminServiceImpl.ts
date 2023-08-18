import { Injectable } from "@nestjs/common";
import { PurchaseItemDao } from "src/app/controller/dao/facade/core/PurchaseItemDao";
import { PurchaseItem } from "src/app/controller/bean/core/PurchaseItem";

@Injectable()
export class PurchaseItemAdminServiceImpl {
    constructor(private readonly purchaseItemDao: PurchaseItemDao) {}

    async save(item: PurchaseItem): Promise<PurchaseItem> {
        const savedPurchaseItem = await this.purchaseItemDao.save(item);
        return savedPurchaseItem;
    }

    async findByProductId(productId: number): Promise<PurchaseItem[]> {
        return this.purchaseItemDao.findByProductId(productId);
    }
    async findByPurchaseId(purchaseId: number): Promise<PurchaseItem[]> {
        return this.purchaseItemDao.findByPurchaseId(purchaseId);
    }

    async deleteByProductId(productId: number): Promise<void> {
        return this.purchaseItemDao.deleteByProductId(productId);
    }



}
