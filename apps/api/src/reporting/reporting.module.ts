import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportingService } from './reporting.service';
import { ReportingController } from './reporting.controller';
import { Ticket } from '../tickets/ticket.entity';
import { User } from '../users/user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Ticket, User])],
    controllers: [ReportingController],
    providers: [ReportingService],
})
export class ReportingModule { }
