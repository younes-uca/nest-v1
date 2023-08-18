import {Body, Controller, Delete, Get, Param, Post} from "@nestjs/common";
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {ClientAdminServiceImpl} from "src/app/module/admin/service/impl/ClientAdminServiceImpl";
import {ClientConverter} from "src/app/controller/converter/ClientConverter";
import {ClientDto} from "src/app/controller/dto/ClientDto";

@Controller('client')
@ApiTags('Clients')
export class ClientRestAdmin {
    constructor(
        private readonly clientService: ClientAdminServiceImpl,
        private readonly clientConverter: ClientConverter,
    ) {
    }

    @Get(':email')
    @ApiOperation({summary: 'Find a client by email'})
    @ApiResponse({status: 200, description: 'Client found', type: ClientDto})
    async findByEmail(@Param('email') email: string): Promise<ClientDto | undefined> {
        const client = await this.clientService.findByEmail(email);
        return this.clientConverter.toDto(client);
    }

    @Delete(':email')
    @ApiOperation({summary: 'Delete a client by email'})
    @ApiResponse({status: 200, description: 'Client deleted'})
    async deleteByEmail(@Param('email') email: string): Promise<void> {
        await this.clientService.deleteByEmail(email);
    }

    @Post()
    @ApiOperation({summary: 'Save a client'})
    @ApiResponse({status: 201, description: 'Client created', type: ClientDto})
    async save(@Body() clientDto: ClientDto): Promise<ClientDto> {
        const clientEntity = this.clientConverter.toItem(clientDto);
        const createdClient = await this.clientService.save(clientEntity);
        return this.clientConverter.toDto(createdClient);
    }


}
