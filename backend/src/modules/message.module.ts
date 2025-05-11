import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";
import { MessageController } from "src/controllers/message.controller";
import { MessageEntity } from "src/entities/message.entity";
import { MessageService } from "src/services/message.service";
import { UserModule } from "./user.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([MessageEntity]),
        UserModule,
    ],
    controllers: [MessageController], 
    providers: [MessageService],
    exports: [MessageService],
})
export class MessageModule {}