import { MessageEntity } from "src/entities/message.entity";
import { Repository } from "typeorm";
import { UserService } from "./user.service";
export declare class MessageService {
    private messageRepo;
    private userService;
    constructor(messageRepo: Repository<MessageEntity>, userService: UserService);
    findById(id: string): Promise<MessageEntity | null>;
    findAll(): Promise<MessageEntity[]>;
    create(userId: string, content: string): Promise<MessageEntity>;
}
