import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TravelPlan } from './travel-plan.entity';
import { CreateTravelPlanDto } from './dto/create-travel-plan.dto';
import { CountriesService } from '../countries/countries.service';

@Injectable()
export class TravelPlansService {
  constructor(
    @InjectRepository(TravelPlan)
    private readonly travelPlanRepository: Repository<TravelPlan>,
    private readonly countriesService: CountriesService,
  ) {}

  async create(dto: CreateTravelPlanDto): Promise<TravelPlan> {
    await this.countriesService.findOrFetch(dto.countryCode);

    const plan = this.travelPlanRepository.create({
      title: dto.title,
      startDate: dto.startDate,
      endDate: dto.endDate,
      countryCode: dto.countryCode.toUpperCase(),
    });

    return this.travelPlanRepository.save(plan);
  }

  async findAll(): Promise<TravelPlan[]> {
    return this.travelPlanRepository.find();
  }

  async findOne(id: number): Promise<TravelPlan> {
    const plan = await this.travelPlanRepository.findOne({ where: { id } });
    if (!plan) throw new NotFoundException(`Travel plan ${id} not found`);
    return plan;
  }

  async remove(id: number): Promise<void> {
    const plan = await this.findOne(id);
    await this.travelPlanRepository.remove(plan);
  }
}
