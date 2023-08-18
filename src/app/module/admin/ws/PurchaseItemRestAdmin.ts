import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PurchaseItemConverter } from "src/app/controller/converter/PurchaseItemConverter";
import { PurchaseItemDto } from "src/app/controller/dto/PurchaseItemDto";
import {PurchaseItemAdminServiceImpl} from "src/app/module/admin/service/impl/PurchaseItemAdminServiceImpl";

@Controller('purchase-item')
@ApiTags('Purchase Items')
export class PurchaseItemRestAdmin {
    constructor(
        private readonly purchaseItemService: PurchaseItemAdminServiceImpl,
        private readonly purchaseItemConverter: PurchaseItemConverter,
    ) {
    }

    @Get('product/:productId')
    @ApiOperation({ summary: 'Find purchase item by product ID' })
    @ApiResponse({ status: 200, description: 'Purchase item found', type: PurchaseItemDto })
    async findByProductId(@Param('productId') productId: number): Promise<PurchaseItemDto[] | undefined> {
        const purchaseItem = await this.purchaseItemService.findByProductId(productId);
        return this.purchaseItemConverter.toDtos(purchaseItem);
    }

    @Delete('product/:productId')
    @ApiOperation({ summary: 'Delete purchase item by product ID' })
    @ApiResponse({ status: 200, description: 'Purchase item deleted' })
    async deleteByProductId(@Param('productId') productId: number): Promise<void> {
        await this.purchaseItemService.deleteByProductId(productId);
    }

    @Post()
    @ApiOperation({ summary: 'Save purchase item' })
    @ApiResponse({ status: 201, description: 'Purchase item created', type: PurchaseItemDto })
    async save(@Body() purchaseItemDto: PurchaseItemDto): Promise<PurchaseItemDto> {
        const purchaseItemEntity = this.purchaseItemConverter.toItem(purchaseItemDto);
        const savedPurchaseItem = await this.purchaseItemService.save(purchaseItemEntity);
        return this.purchaseItemConverter.toDto(savedPurchaseItem);
    }
}
