import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MessageEntity } from "src/entities/message.entity";
import { Repository } from "typeorm";
import { UserService } from "./user.service";

@Injectable()
export class MessageService {
    constructor(
        @InjectRepository(MessageEntity) private messageRepo: Repository<MessageEntity>,
        private userService: UserService
    ) {}

    async findById(id: string): Promise<MessageEntity | null> {
        const message = await this.messageRepo.findOne({ where: { id } });
        if (!message) throw new NotFoundException("Message not found");
        return message;
    }

    async findAll(): Promise<MessageEntity[]> {
        return this.messageRepo.find();
    }

    async create(userId: string, content: string): Promise<MessageEntity> {
        const user = await this.userService.findById(userId);
        if (!user) throw new NotFoundException("User not found");
        const message = this.messageRepo.create(
            {
                content : content, 
                user: user
            });
        return this.messageRepo.save(message);
    }
}