import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article, Category } from './kb.entity';

@Injectable()
export class KnowledgeBaseService {
    constructor(
        @InjectRepository(Article)
        private articlesRepository: Repository<Article>,
        @InjectRepository(Category)
        private categoriesRepository: Repository<Category>,
    ) { }

    async findAllCategories(): Promise<Category[]> {
        return this.categoriesRepository.find({ relations: ['articles'] });
    }

    async createArticle(data: Partial<Article>): Promise<Article> {
        const article = this.articlesRepository.create(data);
        return this.articlesRepository.save(article);
    }

    async searchArticles(query: string): Promise<Article[]> {
        // Basic SQL LIKE search for MVP. Meilisearch would go here.
        return this.articlesRepository.createQueryBuilder('article')
            .where('article.title LIKE :query OR article.content LIKE :query', { query: `%${query}%` })
            .andWhere('article.isPublic = :isPublic', { isPublic: true })
            .getMany();
    }

    async findOne(id: number): Promise<Article> {
        return this.articlesRepository.findOne({ where: { id }, relations: ['category'] });
    }
}
