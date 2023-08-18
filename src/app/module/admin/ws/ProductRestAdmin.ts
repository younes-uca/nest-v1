import {Body, Controller, Delete, forwardRef, Get, Inject, Param, Post} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductConverter } from "src/app/controller/converter/ProductConverter";
import { ProductDto } from "src/app/controller/dto/ProductDto";
import {ProductAdminServiceImpl} from "../service/impl/ProductAdminServiceImpl";

@Controller('product')
@ApiTags('Products')
export class ProductRestAdmin {
    constructor(
        private readonly productService: ProductAdminServiceImpl,
        private readonly productConverter: ProductConverter,
    ) {
    }

    @Get(':code')
    @ApiOperation({ summary: 'Find a product by code' })
    @ApiResponse({ status: 200, description: 'Product found', type: ProductDto })
    async findByCode(@Param('code') code: string): Promise<ProductDto | undefined> {
        const product = await this.productService.findByCode(code);
        return this.productConverter.toDto(product);
    }

    @Delete(':code')
    @ApiOperation({ summary: 'Delete a product by code' })
    @ApiResponse({ status: 200, description: 'Product deleted' })
    async deleteByCode(@Param('code') code: string): Promise<void> {
        await this.productService.deleteByCode(code);
    }

    @Post()
    @ApiOperation({ summary: 'Save a product' })
    @ApiResponse({ status: 201, description: 'Product created', type: ProductDto })
    async save(@Body() productDto: ProductDto): Promise<ProductDto> {
        const productEntity = this.productConverter.toItem(productDto);
        const createdProduct = await this.productService.save(productEntity);
        return this.productConverter.toDto(createdProduct);
    }
}
