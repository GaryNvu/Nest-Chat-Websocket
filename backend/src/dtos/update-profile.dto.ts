import { IsHexColor } from 'class-validator';

export class UpdateProfileDto {
  @IsHexColor()
  color: string;
}