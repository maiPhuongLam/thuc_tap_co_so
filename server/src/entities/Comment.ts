import { Entity, Column, BaseEntity, PrimaryColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm'
import { Post } from './Post'
import { User } from './User'

@Entity('comments')
export class Comment extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    text: string

    @ManyToOne(() => Post, (post) => post.comments)
    post: Post

    @ManyToOne(() => User, (user) => user.comments)
    user: User
}