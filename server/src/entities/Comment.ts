import { Entity, Column, BaseEntity, PrimaryColumn, ManyToOne} from 'typeorm'
import { Post } from './Post'
import { User } from './User'
@Entity('comments')
export class Comment extends BaseEntity {
    @Column()
    @PrimaryColumn()
    userId: number

    @Column()
    @PrimaryColumn()
    postId: number

    @Column()
    public desc: string

    @ManyToOne(() => User, (user) => user.comments)
    user: User

    @ManyToOne(() => Post, (post) => post.comments)
    post: Post

}