import { MessageService } from "src/services/message.service";
import { UserService } from "src/services/user.service";
export declare class MessageController {
    private readonly messageService;
    private readonly userService;
    constructor(messageService: MessageService, userService: UserService);
    findById(id: string): Promise<import("../entities/message.entity").MessageEntity | null>;
    findAll(): Promise<import("../entities/message.entity").MessageEntity[]>;
    create(userId: string, content: string): Promise<import("../entities/message.entity").MessageEntity>;
}
