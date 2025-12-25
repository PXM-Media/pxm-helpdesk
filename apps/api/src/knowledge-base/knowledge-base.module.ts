import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KnowledgeBaseService } from './knowledge-base.service';
import { KnowledgeBaseController } from './knowledge-base.controller';
import { Article, Category } from './kb.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Article, Category])],
    controllers: [KnowledgeBaseController],
    providers: [KnowledgeBaseService],
})
export class KnowledgeBaseModule { }
