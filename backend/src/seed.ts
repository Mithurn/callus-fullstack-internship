import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UsersService } from './users/users.service';
import { QuotationsService } from './quotations/quotations.service';
import { ConsultationsService } from './consultations/consultations.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  
  const usersService = app.get(UsersService);
  const quotationsService = app.get(QuotationsService);
  const consultationsService = app.get(ConsultationsService);

  try {
    // Create test users
    console.log('Creating test users...');
    
    const customer = await usersService.create({
      email: 'customer@test.com',
      password: 'password123',
      name: '테스트 고객',
      role: 'customer',
    });

    const provider = await usersService.create({
      email: 'provider@test.com',
      password: 'password123',
      name: '테스트 사업자',
      role: 'provider',
    });

    console.log('Test users created:', { customer: customer.email, provider: provider.email });

    // Create test quotations
    console.log('Creating test quotations...');
    
    await quotationsService.create({
      title: '웹사이트 개발 견적',
      description: '회사 웹사이트 개발을 위한 견적 요청입니다.',
      amount: 5000000,
      userId: customer.id,
    });

    await quotationsService.create({
      title: '모바일 앱 개발 견적',
      description: 'iOS/Android 앱 개발을 위한 견적 요청입니다.',
      amount: 8000000,
      userId: customer.id,
    });

    // Create test consultations
    console.log('Creating test consultations...');
    
    await consultationsService.create({
      title: '웹사이트 개발 상담',
      description: '웹사이트 개발에 대한 상담을 요청합니다.',
      userId: customer.id,
      scheduledAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    });

    await consultationsService.create({
      title: '모바일 앱 개발 상담',
      description: '모바일 앱 개발에 대한 상담을 요청합니다.',
      userId: customer.id,
      scheduledAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
    });

    console.log('Seed data created successfully!');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await app.close();
  }
}

bootstrap(); 