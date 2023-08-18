import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {Client} from "src/app/controller/bean/core/Client";

@Injectable()
export class ClientDao {
    constructor(@InjectRepository(Client) private readonly repository: Repository<Client>,) {}

    async save(item: Client): Promise<Client> {
        const savedItem = await this.repository.save(item);
        return savedItem;
    }

    async deleteByEmail(email: string): Promise<void> {
        await this.repository.delete({ email });
    }

    async findByEmail(email: string): Promise<Client | undefined> {
        return this.repository.findOne({ where: { email } });
    }
}
