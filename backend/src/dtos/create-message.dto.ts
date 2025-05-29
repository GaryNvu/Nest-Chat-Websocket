import { IsString, IsNotEmpty } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  @IsNotEmpty()
  userId: string;
  
  @IsString()
  @IsNotEmpty()
  content: string;
}