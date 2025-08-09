import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuotationsService } from './quotations.service';
import { QuotationsController } from './quotations.controller';
import { Quotation } from './quotation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Quotation])],
  providers: [QuotationsService],
  controllers: [QuotationsController],
})
export class QuotationsModule {} 