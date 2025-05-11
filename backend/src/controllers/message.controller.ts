import { Controller, Get, Param, Post } from "@nestjs/common";
import { MessageService } from "src/services/message.service";
import { UserService } from "src/services/user.service";

@Controller('message')
export class MessageController {
    constructor(
        private readonly messageService: MessageService, 
        private readonly userService: UserService
    ) {}

    @Get('id')
    findById(@Param('id') id: string) {
        return this.messageService.findById(id);
    }

    @Get('all')
    findAll() {
        return this.messageService.findAll();
    }

    @Post()
    create(@Param('userId') userId: string, @Param('content') content: string) {
        return this.messageService.create(userId, content);
    }
}