import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AutomationsService } from './automations.service';
import { Automation } from './automation.entity';
import { TicketsModule } from '../tickets/tickets.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Automation]),
        forwardRef(() => TicketsModule)
    ],
    providers: [AutomationsService],
    exports: [AutomationsService],
})
export class AutomationsModule { }
