import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { QuotationsService } from './quotations.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Quotations')
@ApiBearerAuth()
@Controller('quotations')
@UseGuards(JwtAuthGuard)
export class QuotationsController {
  constructor(private readonly quotationsService: QuotationsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all quotations for the authenticated user' })
  @ApiResponse({ status: 200, description: 'List of quotations' })
  async findAll(@Request() req) {
    return this.quotationsService.findAll(req.user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific quotation' })
  @ApiResponse({ status: 200, description: 'Quotation details' })
  async findOne(@Param('id') id: string, @Request() req) {
    return this.quotationsService.findOne(+id, req.user.id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new quotation' })
  @ApiResponse({ status: 201, description: 'Quotation created successfully' })
  async create(@Body() createQuotationDto: { title: string; description: string; amount: number }, @Request() req) {
    return this.quotationsService.create({
      ...createQuotationDto,
      userId: req.user.id,
    });
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a quotation' })
  @ApiResponse({ status: 200, description: 'Quotation updated successfully' })
  async update(@Param('id') id: string, @Body() updateQuotationDto: any, @Request() req) {
    return this.quotationsService.update(+id, updateQuotationDto, req.user.id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a quotation' })
  @ApiResponse({ status: 200, description: 'Quotation deleted successfully' })
  async remove(@Param('id') id: string, @Request() req) {
    return this.quotationsService.remove(+id, req.user.id);
  }
} 