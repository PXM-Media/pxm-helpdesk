import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormsService } from './forms.service';
import { Form } from './form.entity';
import { FormsController } from './forms.controller';
import { TicketsModule } from '../tickets/tickets.module'; // Import to use ticketsService

@Module({
    imports: [
        TypeOrmModule.forFeature([Form]),
        TicketsModule
    ],
    controllers: [FormsController],
    providers: [FormsService],
})
export class FormsModule { }
