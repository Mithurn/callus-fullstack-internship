import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Consultation } from './consultation.entity';

@Injectable()
export class ConsultationsService {
  constructor(
    @InjectRepository(Consultation)
    private consultationsRepository: Repository<Consultation>,
  ) {}

  async findAll(userId: number): Promise<Consultation[]> {
    return this.consultationsRepository.find({
      where: { userId },
      relations: ['user', 'provider'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number, userId: number): Promise<Consultation> {
    const consultation = await this.consultationsRepository.findOne({
      where: { id, userId },
      relations: ['user', 'provider'],
    });
    if (!consultation) {
      throw new NotFoundException('Consultation not found');
    }
    return consultation;
  }

  async create(createConsultationDto: { title: string; description: string; userId: number; scheduledAt?: Date }): Promise<Consultation> {
    const consultation = this.consultationsRepository.create(createConsultationDto);
    return this.consultationsRepository.save(consultation);
  }

  async update(id: number, updateConsultationDto: Partial<Consultation>, userId: number): Promise<Consultation> {
    const consultation = await this.findOne(id, userId);
    Object.assign(consultation, updateConsultationDto);
    return this.consultationsRepository.save(consultation);
  }

  async remove(id: number, userId: number): Promise<void> {
    const consultation = await this.findOne(id, userId);
    await this.consultationsRepository.remove(consultation);
  }
} 