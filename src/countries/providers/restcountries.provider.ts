import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

interface RestCountryResponse {
  name: {
    common: string;
  };
  region: string;
  capital?: string[];
  population: number;
  flags?: {
    png?: string;
  };
}

@Injectable()
export class RestcountriesProvider {
  constructor(private readonly httpService: HttpService) {}

  async getByAlphaCode(code: string) {
    const url = `https://restcountries.com/v3.1/alpha/${code}`;

    const response = await firstValueFrom(
      this.httpService.get<RestCountryResponse[]>(url),
    );

    const data = response.data[0];

    return {
      alphaCode: code.toUpperCase(),
      name: data.name.common,
      region: data.region,
      capital: data.capital?.[0] ?? 'N/A',
      population: data.population,
      flagUrl: data.flags?.png ?? '',
    };
  }
}
