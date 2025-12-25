import { Controller, Get, UseGuards } from '@nestjs/common';
import { ReportingService } from './reporting.service';
import { AuthGuard } from '@nestjs/passport'; // Assuming AuthGuard is available/mocked

@Controller('reporting')
// @UseGuards(AuthGuard('jwt')) // Uncomment when Auth is fully ready
export class ReportingController {
    constructor(private reportingService: ReportingService) { }

    @Get('tickets')
    getTicketStats() {
        return this.reportingService.getTicketStats();
    }

    @Get('agents')
    getAgentPerformance() {
        return this.reportingService.getAgentPerformance();
    }
}
