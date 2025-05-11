import { MessageEntity } from './message.entity';
export declare class UserEntity {
    id: string;
    username: string;
    email: string;
    password: string;
    color: string;
    createdAt: Date;
    messages: MessageEntity[];
}
