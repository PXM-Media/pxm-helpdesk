import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';
import { Ticket } from '../tickets/ticket.entity';

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text' })
    content: string;

    @Column({ default: false })
    isInternal: boolean;

    @ManyToOne(() => User, { nullable: true })
    author: User;

    @ManyToOne(() => Ticket, (ticket) => ticket.comments, { onDelete: 'CASCADE' })
    ticket: Ticket;

    @CreateDateColumn()
    createdAt: Date;
}
