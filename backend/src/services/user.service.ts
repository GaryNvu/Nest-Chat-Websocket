import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDto } from "src/dtos/create-user.dtos";
import { UserEntity } from "src/entities/user.entity";
import { Not, Repository } from "typeorm";

@Injectable()
export class UserService {
    users: any;
    constructor(
        @InjectRepository(UserEntity) 
        private userRepo: Repository<UserEntity>
    ) {}
    
    async findById(id: string): Promise<UserEntity | null> {
        const user = this.userRepo.findOne({ where: { id } });
        if (!user) throw new NotFoundException("User not found");
        return user;
    }

    async findByEmail(email: string): Promise<UserEntity | null> {
        const user = this.userRepo.findOne({ where: { email } });
        if (!user) throw new NotFoundException("User not found");
        return user;
    }

    async findAll(): Promise<UserEntity[]> {
        return this.userRepo.find();
    }

    async create(data: CreateUserDto): Promise<UserEntity> {
        const user = {
            username: data.username,
            email: data.email,
            password: data.password,
            color: data.color,
        }
        return this.userRepo.save(user);
    }

    async updateColor(userId: string, color: string): Promise<UserEntity> {
        const user = await this.userRepo.findOne({ where: { id: userId } });
        if (!user) throw new NotFoundException("User not found");

        user.color = color;

        const newUser = await this.userRepo.save(user);

        if (!newUser) {
            throw new NotFoundException("Failed to retrieve updated user");
        }
        return newUser;
    }
}
