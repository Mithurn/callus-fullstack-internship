import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ConsultationsService } from './consultations.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Consultations')
@ApiBearerAuth()
@Controller('consultations')
@UseGuards(JwtAuthGuard)
export class ConsultationsController {
  constructor(private readonly consultationsService: ConsultationsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all consultations for the authenticated user' })
  @ApiResponse({ status: 200, description: 'List of consultations' })
  async findAll(@Request() req) {
    return this.consultationsService.findAll(req.user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific consultation' })
  @ApiResponse({ status: 200, description: 'Consultation details' })
  async findOne(@Param('id') id: string, @Request() req) {
    return this.consultationsService.findOne(+id, req.user.id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new consultation' })
  @ApiResponse({ status: 201, description: 'Consultation created successfully' })
  async create(@Body() createConsultationDto: { title: string; description: string; scheduledAt?: Date }, @Request() req) {
    return this.consultationsService.create({
      ...createConsultationDto,
      userId: req.user.id,
    });
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a consultation' })
  @ApiResponse({ status: 200, description: 'Consultation updated successfully' })
  async update(@Param('id') id: string, @Body() updateConsultationDto: any, @Request() req) {
    return this.consultationsService.update(+id, updateConsultationDto, req.user.id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a consultation' })
  @ApiResponse({ status: 200, description: 'Consultation deleted successfully' })
  async remove(@Param('id') id: string, @Request() req) {
    return this.consultationsService.remove(+id, req.user.id);
  }
} 