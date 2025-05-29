import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserEntity } from './entities/user.entity';
import { MessageEntity } from './entities/message.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user.module';
import { MessageModule } from './modules/message.module';
import { AuthModule } from './modules/auth.module';
import { MessageGateway } from './gateways/message.gateway';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        return {
          type: 'postgres',
          host: process.env.DB_HOST || 'localhost',
          port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
          username: process.env.DB_USERNAME,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_NAME,
          entities: [UserEntity, MessageEntity],
          synchronize: true,
        };
      },
    }),
    UserModule,
    MessageModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService, MessageGateway],
})
export class AppModule {}
