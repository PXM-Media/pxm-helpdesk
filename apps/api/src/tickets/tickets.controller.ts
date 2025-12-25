import { Controller, Get, Post, Body, UseGuards, Request, Param, Patch } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('tickets')
@UseGuards(AuthGuard('jwt'))
export class TicketsController {
    constructor(private ticketsService: TicketsService) { }

    @Post()
    create(@Request() req, @Body() createTicketDto: any) {
        return this.ticketsService.create(req.user, createTicketDto);
    }

    @Get()
    findAll(@Request() req) {
        return this.ticketsService.findAll(req.user);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.ticketsService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateTicketDto: any) {
        return this.ticketsService.update(+id, updateTicketDto);
    }
}
