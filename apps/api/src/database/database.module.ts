import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/user.entity';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: process.env.DB_HOST || 'localhost',
            port: 3306,
            username: process.env.DB_USER || 'helpdesk',
            password: process.env.DB_PASSWORD || 'helpdeskpassword',
            database: process.env.DB_NAME || 'helpdesk',
            entities: [User],
            synchronize: true, // Auto-create tables for now (not for prod)
        }),
    ],
})
export class DatabaseModule { }
