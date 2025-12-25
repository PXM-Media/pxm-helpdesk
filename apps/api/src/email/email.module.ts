import { Module, forwardRef } from '@nestjs/common';
import { EmailService } from './email.service';
import { TicketsModule } from '../tickets/tickets.module';
import { UsersModule } from '../users/users.module';

@Module({
    imports: [forwardRef(() => TicketsModule), UsersModule],
    providers: [EmailService],
    exports: [EmailService],
})
export class EmailModule { }
