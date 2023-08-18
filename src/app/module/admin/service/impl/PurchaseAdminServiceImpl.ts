import {PurchaseDao} from "src/app/controller/dao/facade/core/PurchaseDao";
import {Purchase} from "src/app/controller/bean/core/Puchase";
import {PurchaseItem} from "src/app/controller/bean/core/PurchaseItem";
import {PurchaseItemAdminServiceImpl} from "src/app/module/admin/service/impl/PurchaseItemAdminServiceImpl";
import {Injectable, NotFoundException} from "@nestjs/common";

@Injectable()
export class PurchaseAdminServiceImpl  {
    constructor(private readonly purchaseDao: PurchaseDao,
                private readonly purchaseItemService: PurchaseItemAdminServiceImpl,) {}

    async save(purchase: Purchase): Promise<Purchase> {
        const savedPurchase = await this.purchaseDao.save(purchase);

        if (purchase.purchaseItems) {
            const savedPurchaseItems: PurchaseItem[] = [];
            for (const purchaseItem of purchase.purchaseItems) {
                purchaseItem.purchase = savedPurchase;
                const savedPurchaseItem = await this.purchaseItemService.save(purchaseItem);
                savedPurchaseItems.push(savedPurchaseItem);
            }
            savedPurchase.purchaseItems = savedPurchaseItems;
        }

        return savedPurchase;
    }

    async findByReference(reference: string): Promise<Purchase | undefined> {
        return this.purchaseDao.findByReference(reference);
    }

    async deleteByReference(reference: string): Promise<void> {
        return this.purchaseDao.deleteByReference(reference);
    }
// new
    async findAll(): Promise<Purchase[]> {
        return this.purchaseDao.findAll();
    }

    async findById(id: number): Promise<Purchase> {
        return this.purchaseDao.findById(id);
    }


    async update(purchase: Purchase): Promise<Purchase> {
        const existingPurchase = await this.findWithAssociatedLists(purchase.id);

        if (!existingPurchase) {
            throw new NotFoundException(`Purchase with ID ${purchase.id} not found`);
        }

        existingPurchase.reference = purchase.reference;
        existingPurchase.purchaseDate = purchase.purchaseDate;
        existingPurchase.total = purchase.total;
        existingPurchase.description = purchase.description;

        if (purchase.purchaseItems) {
            existingPurchase.purchaseItems.forEach((existingItem, index) => {
                const newItem = purchase.purchaseItems.find(item => item.id === existingItem.id);
                if (newItem) {
                    existingPurchase.purchaseItems[index] = newItem;
                }
            });
        }
        return this.purchaseDao.save(existingPurchase);
    }

    async findWithAssociatedLists(id: number): Promise<Purchase> {
        const result = await this.purchaseDao.findById(id);
        if (result && result.id) {
            result.purchaseItems = await this.purchaseItemService.findByPurchaseId(result.id);
        }
        return result;
    }
}
