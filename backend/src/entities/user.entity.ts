import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { MessageEntity } from './message.entity';

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column()
    @IsNotEmpty()
    username: string;
    
    @Column({ unique: true })
    @IsEmail()
    @IsNotEmpty()
    email: string;
    
    @Column()
    password: string;

    @Column()
    color: string;
    
    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;
    
    @OneToMany(() => MessageEntity, message => message.user)
    messages: MessageEntity[];
}
