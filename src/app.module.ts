import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { CountriesModule } from './countries/countries.module';
import { TravelPlansModule } from './travel-plans/travel-plans.module';
import { Country } from './countries/country.entity';
import { TravelPlan } from './travel-plans/travel-plan.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'travel.db',
      entities: [Country, TravelPlan],
      synchronize: true,
    }),
    HttpModule,
    CountriesModule,
    TravelPlansModule,
  ],
})
export class AppModule {}
