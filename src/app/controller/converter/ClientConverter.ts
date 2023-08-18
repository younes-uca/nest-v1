import {Injectable} from "@nestjs/common";
import {Client} from "src/app/controller/bean/core/Client";
import {ClientDto} from "src/app/controller/dto/ClientDto";
import {AbstractConverter} from "../../zynerator/converter/AbstractConverter";

@Injectable()
export class ClientConverter extends AbstractConverter<Client, ClientDto> {
    toItem(dto: ClientDto): Client {
        if (!dto) {
            return null;
        }
        const item = new Client();
        if (dto.id) {
            item.id = dto.id;
        }
        if (dto.fullName) {
            item.fullName = dto.fullName;
        }
        if (dto.email) {
            item.email = dto.email;
        }
        return item;
    }

    toDto(item: Client): ClientDto {
        if (!item) {
            return null;
        }
        const dto = new ClientDto();
        if (item.id) {
            dto.id = item.id;
        }
        if (item.fullName) {
            dto.fullName = item.fullName;
        }
        if (item.email) {
            dto.email = item.email;
        }
        return dto;
    }
}
