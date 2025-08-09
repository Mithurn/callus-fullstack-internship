import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quotation } from './quotation.entity';

@Injectable()
export class QuotationsService {
  constructor(
    @InjectRepository(Quotation)
    private quotationsRepository: Repository<Quotation>,
  ) {}

  async findAll(userId: number): Promise<Quotation[]> {
    return this.quotationsRepository.find({
      where: { userId },
      relations: ['user', 'provider'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number, userId: number): Promise<Quotation> {
    const quotation = await this.quotationsRepository.findOne({
      where: { id, userId },
      relations: ['user', 'provider'],
    });
    if (!quotation) {
      throw new NotFoundException('Quotation not found');
    }
    return quotation;
  }

  async create(createQuotationDto: { title: string; description: string; amount: number; userId: number }): Promise<Quotation> {
    const quotation = this.quotationsRepository.create(createQuotationDto);
    return this.quotationsRepository.save(quotation);
  }

  async update(id: number, updateQuotationDto: Partial<Quotation>, userId: number): Promise<Quotation> {
    const quotation = await this.findOne(id, userId);
    Object.assign(quotation, updateQuotationDto);
    return this.quotationsRepository.save(quotation);
  }

  async remove(id: number, userId: number): Promise<void> {
    const quotation = await this.findOne(id, userId);
    await this.quotationsRepository.remove(quotation);
  }
} 