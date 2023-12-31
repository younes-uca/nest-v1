import {ClientDto} from "src/app/controller/dto/ClientDto";
import {PurchaseItemDto} from "src/app/controller/dto/PurchaseItemDto";
export class PurchaseDto {
    public id: number;
    public reference: string;
    public purchaseDate: Date;
    public total: number;
    public description: string;
    public client: ClientDto ;
    public purchaseItems: PurchaseItemDto[];
}
