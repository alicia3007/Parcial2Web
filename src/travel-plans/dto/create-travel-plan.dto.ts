import { IsString, IsNotEmpty, Matches, IsNumber } from 'class-validator';

export class CreateTravelPlanDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'startDate debe ser YYYY-MM-DD',
  })
  startDate!: string;

  @IsString()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'endDate debe ser YYYY-MM-DD',
  })
  endDate!: string;

  @IsString()
  @IsNotEmpty()
  countryCode!: string;

  @IsNumber()
  userId!: number;
}
