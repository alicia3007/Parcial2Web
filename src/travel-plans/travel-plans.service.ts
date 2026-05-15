import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TravelPlan } from './travel-plan.entity';
import { CreateTravelPlanDto } from './dto/create-travel-plan.dto';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { CountriesService } from '../countries/countries.service';
import { UsersService } from '../users/users.service';

interface Expense {
  description: string;
  amount: number;
  category: string;
}

@Injectable()
export class TravelPlansService {
  constructor(
    @InjectRepository(TravelPlan)
    private readonly travelPlanRepository: Repository<TravelPlan>,
    private readonly countriesService: CountriesService,
    private readonly usersService: UsersService,
  ) {}

  async create(dto: CreateTravelPlanDto): Promise<TravelPlan> {
    await this.countriesService.findOrFetch(dto.countryCode);
    await this.usersService.findOne(dto.userId);

    const plan = this.travelPlanRepository.create({
      title: dto.title,
      startDate: dto.startDate,
      endDate: dto.endDate,
      countryCode: dto.countryCode.toUpperCase(),
      userId: dto.userId,
      expenses: '[]',
    });

    return this.travelPlanRepository.save(plan);
  }

  async findAll(): Promise<object[]> {
    const plans = await this.travelPlanRepository.find();
    return plans.map((p) => ({
      ...p,
      expenses: JSON.parse(p.expenses) as Expense[],
    }));
  }

  async findOne(id: number): Promise<object> {
    const plan = await this.travelPlanRepository.findOne({ where: { id } });
    if (!plan) throw new NotFoundException(`Travel plan ${id} no se encontró`);
    return { ...plan, expenses: JSON.parse(plan.expenses) as Expense[] };
  }

  async remove(id: number): Promise<void> {
    const plan = await this.travelPlanRepository.findOne({ where: { id } });
    if (!plan) throw new NotFoundException(`Travel plan ${id} no se encontró`);
    await this.travelPlanRepository.remove(plan);
  }

  async addExpense(id: number, dto: CreateExpenseDto): Promise<object> {
    const plan = await this.travelPlanRepository.findOne({ where: { id } });
    if (!plan) throw new NotFoundException(`Travel plan ${id} no se encontró`);

    const expenses = JSON.parse(plan.expenses) as Expense[];
    expenses.push(dto);
    plan.expenses = JSON.stringify(expenses);

    const saved = await this.travelPlanRepository.save(plan);
    return { ...saved, expenses: JSON.parse(saved.expenses) as Expense[] };
  }
}
