import {TypeOrmModuleOptions} from "@nestjs/typeorm";
import {Client} from "../app/controller/bean/core/Client";
import {Purchase} from "../app/controller/bean/core/Puchase";
import {Product} from "../app/controller/bean/core/Product";
import {PurchaseItem} from "../app/controller/bean/core/PurchaseItem";

const  databaseProperties : TypeOrmModuleOptions =    {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username:'root',
    password:'',
    database: 'nest-purchase-v3',
    synchronize:true,
    entities: [ Client, Purchase, Product, PurchaseItem,],

};
export  default databaseProperties;
