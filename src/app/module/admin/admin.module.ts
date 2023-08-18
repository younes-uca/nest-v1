import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from "src/app/controller/bean/core/Client";
import { ClientRestAdmin } from "src/app/module/admin/ws/ClientRestAdmin";
import { ClientAdminServiceImpl } from "src/app/module/admin/service/impl/ClientAdminServiceImpl";
import { ClientDao } from "src/app/controller/dao/facade/core/ClientDao";
import { ClientConverter } from "src/app/controller/converter/ClientConverter";
import { PurchaseItemDao } from "src/app/controller/dao/facade/core/PurchaseItemDao";
import { PurchaseDao } from "src/app/controller/dao/facade/core/PurchaseDao";
import { PurchaseItemConverter } from "src/app/controller/converter/PurchaseItemConverter";
import { PurchaseConverter } from "src/app/controller/converter/PurchaseConverter";
import { ProductDao } from "src/app/controller/dao/facade/core/ProductDao";
import { ProductConverter } from "src/app/controller/converter/ProductConverter";
import { PurchaseRestAdmin } from "src/app/module/admin/ws/PurchaseRestAdmin";
import { Purchase } from "src/app/controller/bean/core/Puchase";
import { PurchaseItemRestAdmin } from "src/app/module/admin/ws/PurchaseItemRestAdmin";
import { Product } from "src/app/controller/bean/core/Product";
import { PurchaseItem } from "src/app/controller/bean/core/PurchaseItem";
import { ProductRestAdmin } from "src/app/module/admin/ws/ProductRestAdmin";
import {ProductAdminServiceImpl} from "src/app/module/admin/service/impl/ProductAdminServiceImpl";
import {PurchaseItemAdminServiceImpl} from "src/app/module/admin/service/impl/PurchaseItemAdminServiceImpl";
import {PurchaseAdminServiceImpl} from "src/app/module/admin/service/impl/PurchaseAdminServiceImpl";

@Module({
    imports: [TypeOrmModule.forFeature([Client, Purchase, PurchaseItem, Product])],
    controllers: [ClientRestAdmin,ProductRestAdmin , PurchaseItemRestAdmin,  PurchaseRestAdmin,],
    providers: [
        ClientAdminServiceImpl, ClientDao, ClientConverter,
        ProductAdminServiceImpl, ProductDao, ProductConverter,
        PurchaseItemAdminServiceImpl, PurchaseItemDao, PurchaseItemConverter,
        PurchaseAdminServiceImpl, PurchaseDao, PurchaseConverter,

    ],
})
export class AdminModule {}
