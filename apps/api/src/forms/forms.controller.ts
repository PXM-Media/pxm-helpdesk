import { Controller, Get, Post, Body, Param, UseGuards, Request } from '@nestjs/common';
import { FormsService } from './forms.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('forms')
export class FormsController {
    constructor(private formsService: FormsService) { }

    @Post()
    @UseGuards(AuthGuard('jwt'))
    create(@Body() createFormDto: any) {
        // Only admins should do this
        return this.formsService.create(createFormDto);
    }

    @Get()
    findAll() {
        return this.formsService.findAll();
    }

    @Get(':slug')
    findOne(@Param('slug') slug: string) {
        return this.formsService.findBySlug(slug);
    }

    @Post(':slug/submit')
    submit(@Param('slug') slug: string, @Body() submissionData: any) {
        // Allow public access
        // If auth header exists, use it? For now, public.
        return this.formsService.submit(slug, submissionData, null); // Null user for now
    }
}
