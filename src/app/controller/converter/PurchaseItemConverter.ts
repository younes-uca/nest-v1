import { Injectable } from "@nestjs/common";
import {PurchaseItem} from "src/app/controller/bean/core/PurchaseItem";
import {PurchaseItemDto} from "src/app/controller/dto/PurchaseItemDto";
import {ProductConverter} from "src/app/controller/converter/ProductConverter";
import {PurchaseConverter} from "src/app/controller/converter/PurchaseConverter";
import {AbstractConverter} from "../../zynerator/converter/AbstractConverter";
import {Purchase} from "../bean/core/Puchase";
import {PurchaseDto} from "../dto/PurchaseDto";

@Injectable()
export class PurchaseItemConverter  extends AbstractConverter<PurchaseItem, PurchaseItemDto> {

    constructor(
        // private readonly purchaseConverter: PurchaseConverter ,
        private readonly productConverter: ProductConverter,) {
        super();
    }

    toItem(dto: PurchaseItemDto): PurchaseItem {
        if (!dto) {
            return null;
        }
        const item = new PurchaseItem();
        if (dto.id) {
            item.id = dto.id;
        }
        if (dto.price) {
            item.price = dto.price;
        }
        if (dto.quantity) {
            item.quantity = dto.quantity;
        }
        item.product = this.productConverter.toItem(dto.product);

        // item.purchase = this.purchaseConverter.toItem(dto.purchase);
        return item;
    }

    toDto(item: PurchaseItem): PurchaseItemDto {
        if (!item) {
            return null;
        }
        const dto = new PurchaseItemDto();
        if (item.id) {
            dto.id = item.id;
        }
        if (item.price) {
            dto.price = item.price;
        }
        if (item.quantity) {
            dto.quantity = item.quantity;
        }
        dto.product = this.productConverter.toDto(item.product);

        // dto.purchase = this.purchaseConverter.toDto(item.purchase);
        return dto;
    }
}
