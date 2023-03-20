import { 
    Entity, 
    Column, 
    BaseEntity, 
    CreateDateColumn, 
    UpdateDateColumn, 
    ManyToOne, 
    PrimaryGeneratedColumn
} from 'typeorm'
import { User } from './User' 
@Entity('messages')
export class Message extends BaseEntity {  
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(type => User, user => user.messagesSend)
    sender: User

    @ManyToOne(type => User, user => user.messageReceiver)
    receiver: User

    @Column()
    text: string

    @CreateDateColumn()
    createdDate: Date

    @UpdateDateColumn()
    updatedDate: Date
}