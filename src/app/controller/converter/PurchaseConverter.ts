import {Injectable} from "@nestjs/common";
import {ClientConverter} from "src/app/controller/converter/ClientConverter";
import {PurchaseItemConverter} from "src/app/controller/converter/PurchaseItemConverter";
import {PurchaseDto} from "src/app/controller/dto/PurchaseDto";
import {AbstractConverter} from "../../zynerator/converter/AbstractConverter";
import {Purchase} from "../bean/core/Puchase";
@Injectable()
export class PurchaseConverter extends AbstractConverter<Purchase, PurchaseDto> {


    constructor(
        private readonly clientConverter: ClientConverter,
        private readonly purchaseItemConverter: PurchaseItemConverter
    ) {
        super();
    }

    toItem(dto: PurchaseDto): Purchase {
        if (!dto) {
            return null;
        }

        const item = new Purchase();
        if (dto.id) {
            item.id = dto.id;
        }
        if (dto.reference) {
            item.reference = dto.reference;
        }
        if (dto.purchaseDate) {
            item.purchaseDate = dto.purchaseDate;
        }

        if (dto.total) {
            item.total = dto.total;
        }
        if (dto.description) {
            item.description = dto.description;
        }

        if (dto.client?.id) {
            item.client = this.clientConverter.toItem(dto.client);
        }

        if (dto.purchaseItems?.length > 0) {
            item.purchaseItems = this.purchaseItemConverter.toItems(dto.purchaseItems);
        }

        return item;
    }

    toDto(item: Purchase): PurchaseDto {
        if (!item) {
            return null;
        }
        const dto = new PurchaseDto();

        if (item.id) {
            dto.id = item.id;
        }
        if (item.reference) {
            dto.reference = item.reference;
        }
        if (item.purchaseDate) {
            dto.purchaseDate = item.purchaseDate;
        }
        if (item.total) {
            dto.total = item.total;
        }
        if (item.description) {
            dto.description = item.description;
        }

        if (item.client) {
            dto.client = this.clientConverter.toDto(item.client);
        }

        if (item.purchaseItems?.length > 0) {
            dto.purchaseItems = this.purchaseItemConverter.toDtos(item.purchaseItems);
        }
        return dto;
    }
}