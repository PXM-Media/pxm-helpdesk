import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket } from '../tickets/ticket.entity';
import { User } from '../users/user.entity';

@Injectable()
export class ReportingService {
    constructor(
        @InjectRepository(Ticket)
        private ticketsRepository: Repository<Ticket>,
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }

    async getTicketStats() {
        const statusCounts = await this.ticketsRepository
            .createQueryBuilder('ticket')
            .select('ticket.status', 'status')
            .addSelect('COUNT(ticket.id)', 'count')
            .groupBy('ticket.status')
            .getRawMany();

        const priorityCounts = await this.ticketsRepository
            .createQueryBuilder('ticket')
            .select('ticket.priority', 'priority')
            .addSelect('COUNT(ticket.id)', 'count')
            .groupBy('ticket.priority')
            .getRawMany();

        return {
            status: statusCounts,
            priority: priorityCounts
        };
    }

    async getAgentPerformance() {
        // Mock implementation - real one would count resolved tickets per agent
        return [
            { agent: 'Admin', resolved: 10, responseTime: '2h' }
        ];
    }
}
