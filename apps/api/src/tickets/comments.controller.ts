import { Controller, Get, Post, Body, Param, UseGuards, Request } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('tickets/:ticketId/comments')
@UseGuards(AuthGuard('jwt'))
export class CommentsController {
    constructor(private commentsService: CommentsService) { }

    @Post()
    create(
        @Param('ticketId') ticketId: string,
        @Request() req,
        @Body() body: { content: string, isInternal?: boolean }
    ) {
        return this.commentsService.create(+ticketId, req.user, body.content, body.isInternal);
    }

    @Get()
    findAll(@Param('ticketId') ticketId: string) {
        return this.commentsService.findByTicket(+ticketId);
    }
}
