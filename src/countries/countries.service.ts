import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Country } from './country.entity';
import { RestcountriesProvider } from './providers/restcountries.provider';

@Injectable()
export class CountriesService {
  constructor(
    @InjectRepository(Country)
    private readonly countryRepository: Repository<Country>,
    private readonly restcountriesProvider: RestcountriesProvider,
  ) {}

  async findOrFetch(alphaCode: string): Promise<Country> {
    const code = alphaCode.toUpperCase();

    const existing = await this.countryRepository.findOne({
      where: { alphaCode: code },
    });
    if (existing) return existing;

    let data: Partial<Country>;
    try {
      data = await this.restcountriesProvider.getByAlphaCode(code);
    } catch {
      throw new NotFoundException(`Country with code ${code} not found`);
    }

    const country = this.countryRepository.create(data);
    return this.countryRepository.save(country);
  }
}
