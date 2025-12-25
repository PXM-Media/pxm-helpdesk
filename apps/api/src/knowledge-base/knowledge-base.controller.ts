import { Controller, Get, Post, Body, Query, Param } from '@nestjs/common';
import { KnowledgeBaseService } from './knowledge-base.service';

@Controller('kb')
export class KnowledgeBaseController {
    constructor(private kbService: KnowledgeBaseService) { }

    @Get('categories')
    getCategories() {
        return this.kbService.findAllCategories();
    }

    @Get('search')
    search(@Query('q') query: string) {
        return this.kbService.searchArticles(query);
    }

    @Post('articles')
    createArticle(@Body() body: any) {
        return this.kbService.createArticle(body);
    }

    @Get('articles/:id')
    getArticle(@Param('id') id: number) {
        return this.kbService.findOne(id);
    }
}
