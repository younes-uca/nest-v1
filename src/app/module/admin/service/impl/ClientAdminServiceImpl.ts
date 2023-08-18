import {Injectable} from "@nestjs/common";
import {ClientDao} from "src/app/controller/dao/facade/core/ClientDao";
import {Client} from "src/app/controller/bean/core/Client";

@Injectable()
export class ClientAdminServiceImpl  {
    constructor(private readonly clientDao: ClientDao) {}

    async save(item: Client): Promise<Client> {
        const savedItem = await this.clientDao.save(item);
        return savedItem;
    }

    async findByEmail(email: string): Promise<Client | undefined> {
        return this.clientDao.findByEmail(email);
    }

    async deleteByEmail(email: string): Promise<void> {
        return this.clientDao.deleteByEmail(email);
    }
}
