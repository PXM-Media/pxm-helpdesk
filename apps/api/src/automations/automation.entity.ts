import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum AutomationEvent {
    TICKET_CREATED = 'TICKET_CREATED',
    TICKET_UPDATED = 'TICKET_UPDATED',
}

@Entity()
export class Automation {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({
        type: 'enum',
        enum: AutomationEvent,
    })
    event: AutomationEvent;

    @Column({ type: 'json' })
    conditions: any[]; // e.g. [{ field: 'priority', operator: 'equals', value: 'HIGH' }]

    @Column({ type: 'json' })
    actions: any[]; // e.g. [{ action: 'assign_group', value: 1 }]

    @Column({ default: true })
    isActive: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
