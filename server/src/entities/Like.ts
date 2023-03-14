import { Entity, Column, BaseEntity, PrimaryColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm'
import { Post } from './Post'
import { User } from './User'

@Entity('likes')
export class Like extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    postId: number

    @Column()
    userId: number

    @ManyToOne(() => Post, (post) => post.comments)
    post: Post

    @ManyToOne(() => User, (user) => user.comments)
    user: User
}