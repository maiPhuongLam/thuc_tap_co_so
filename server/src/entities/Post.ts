import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne, OneToMany, ManyToMany, JoinTable} from 'typeorm'
import { User } from './User'

@Entity('posts')
export class Post extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number
   
    @ManyToOne(() => User, (user) => user.posts)
    user: User

    @ManyToMany(() => User, (user) => user.likes)
    likes: User[]

    @ManyToMany(() => User, (user) => user.comments)
    comments: User[]

    @Column()
    desc: string
    
    @Column()
    image: string

    @Column()
    createdAt: string
}