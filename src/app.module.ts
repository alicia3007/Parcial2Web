import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { CountriesModule } from './countries/countries.module';
import { TravelPlansModule } from './travel-plans/travel-plans.module';
import { UsersModule } from './users/users.module';
import { Country } from './countries/country.entity';
import { TravelPlan } from './travel-plans/travel-plan.entity';
import { User } from './users/user.entity';
import { AuditMiddleware } from './middleware/audit.middleware';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'travel.db',
      entities: [Country, TravelPlan, User],
      synchronize: true,
    }),
    HttpModule,
    CountriesModule,
    TravelPlansModule,
    UsersModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuditMiddleware).forRoutes('travel-plans', 'users');
  }
}
