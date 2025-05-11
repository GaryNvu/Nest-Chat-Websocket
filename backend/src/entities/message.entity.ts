import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity()
export class MessageEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column('text')
    content: string;
    
    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;
    
    @ManyToOne(() => UserEntity, user => user.messages, { 
        onDelete: 'CASCADE'
    })
    user: UserEntity;
}