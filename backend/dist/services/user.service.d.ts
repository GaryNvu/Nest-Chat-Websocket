import { CreateUserDto } from "src/dtos/create-user.dtos";
import { UserEntity } from "src/entities/user.entity";
import { Repository } from "typeorm";
export declare class UserService {
    private userRepo;
    users: any;
    constructor(userRepo: Repository<UserEntity>);
    findById(id: string): Promise<UserEntity | null>;
    findByEmail(email: string): Promise<UserEntity | null>;
    findAll(): Promise<UserEntity[]>;
    create(data: CreateUserDto): Promise<UserEntity>;
    updateColor(userId: string, color: string): Promise<UserEntity>;
}
