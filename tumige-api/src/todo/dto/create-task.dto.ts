import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  note: string;

  @IsString()
  @IsOptional()
  rank: string;

  @IsString()
  @IsOptional()
  tag: string;

  @IsString()
  @IsOptional()
  isBuy: string;
}
