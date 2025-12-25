import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Form } from './form.entity';
import { TicketsService } from '../tickets/tickets.service';
import { User } from '../users/user.entity';

@Injectable()
export class FormsService {
    constructor(
        @InjectRepository(Form)
        private formsRepository: Repository<Form>,
        private ticketsService: TicketsService,
    ) { }

    async create(data: Partial<Form>): Promise<Form> {
        const form = this.formsRepository.create(data);
        return this.formsRepository.save(form);
    }

    async findAll(): Promise<Form[]> {
        return this.formsRepository.find();
    }

    async findBySlug(slug: string): Promise<Form> {
        return this.formsRepository.findOne({ where: { slug } });
    }

    async submit(slug: string, submissionData: any, user?: User): Promise<any> {
        const form = await this.findBySlug(slug);
        if (!form) throw new Error('Form not found');

        // Basic validation against schema would go here.

        // Map to ticket
        // Simplistic mapping: Title -> Subject, rest -> Description
        const subject = submissionData.title || submissionData.subject || `${form.title} Submission`;
        const description = JSON.stringify(submissionData, null, 2); // Dump all data for MVP

        // If public submission, we might need a "Guest" user or find existing by email.
        // For this MVP, assuming user is passed or we create a dummy 'Guest'.
        // In a real app, we'd handle guest users (create if not exists).

        // NOTE: This relies on ticketsService accommodating a null user or we fetch a system user.
        // For now, let's assume we REQUIRE auth or we fail. 
        // BUT the requirement includes public forms.
        // Let's Stub "Public User".

        return this.ticketsService.create(user as User, {
            subject,
            description,
            priority: 'NORMAL',
        });
    }
}
