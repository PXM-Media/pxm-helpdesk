import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../users/user.entity';
import { Comment } from './comment.entity';

export enum TicketStatus {
    NEW = 'NEW',
    OPEN = 'OPEN',
    PENDING = 'PENDING',
    SOLVED = 'SOLVED',
    CLOSED = 'CLOSED',
}

export enum TicketPriority {
    LOW = 'LOW',
    NORMAL = 'NORMAL',
    HIGH = 'HIGH',
    URGENT = 'URGENT',
}

@Entity()
export class Ticket {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    subject: string;

    @Column({ type: 'text' })
    description: string;

    @Column({
        type: 'enum',
        enum: TicketStatus,
        default: TicketStatus.NEW,
    })
    status: TicketStatus;

    @Column({
        type: 'enum',
        enum: TicketPriority,
        default: TicketPriority.NORMAL,
    })
    priority: TicketPriority;

    @ManyToOne(() => User, { nullable: false })
    requester: User;

    @ManyToOne(() => User, { nullable: true })
    assignee: User;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => Comment, (comment) => comment.ticket)
    comments: Comment[];
}
