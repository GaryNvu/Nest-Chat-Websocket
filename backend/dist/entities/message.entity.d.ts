import { UserEntity } from './user.entity';
export declare class MessageEntity {
    id: string;
    content: string;
    createdAt: Date;
    user: UserEntity;
}
