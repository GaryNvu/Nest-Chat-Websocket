import { CreateUserDto } from "src/dtos/create-user.dtos";
import { UserService } from "src/services/user.service";
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    findById(id: string): Promise<import("../entities/user.entity").UserEntity | null>;
    findByEmail(email: string): Promise<import("../entities/user.entity").UserEntity | null>;
    findAll(): Promise<import("../entities/user.entity").UserEntity[]>;
    create(body: CreateUserDto): Promise<import("../entities/user.entity").UserEntity>;
    updateColor(id: string, color: string): Promise<import("../entities/user.entity").UserEntity>;
}
