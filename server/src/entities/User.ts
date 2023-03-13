import { 
    Entity, 
    Column, 
    PrimaryGeneratedColumn, 
    BaseEntity, 
    ManyToMany, 
    JoinTable, 
    OneToMany, 
    RelationCount,
} from 'typeorm'
import { Comment } from './Comment'
import { Follow } from './Follow'
import { Post } from './Post'

@Entity('users')
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    username: string

    @Column()
    email: string

    @Column()
    phone: string

    @Column()
    password: string

    @Column()
    firstname: string

    @Column()
    lastname: string

    @Column()
    isAdmin: boolean

    @Column()
    profilePicture: string

    @Column()
    coverPicture: string

    @Column()
    livesin: string

    @Column()
    about: String

    @Column()
    isDeleted: boolean

    @OneToMany(() => Post, (post) => post.user)
    posts: Post[]

    @ManyToMany(() => User, user => user.following)
    @JoinTable({
        name: 'follows',
        joinColumn: {
            name: 'following',
            referencedColumnName: 'id'
        }, 
        inverseJoinColumn: {
            name: 'follower',
            referencedColumnName: 'id'
        }
    })
    followers: User[];

    @ManyToMany(() => Post, (post) => post.likes)
    @JoinTable({
        name: 'likes',
        joinColumn: {
            name: 'userId',
            referencedColumnName: 'id'
        }, 
        inverseJoinColumn: {
            name: 'postId',
            referencedColumnName: 'id'
        }
    })
    likes: Post[]

    // @ManyToMany(() => Post, (post) => post.comments)
    // @JoinTable({
    //     name: 'comments',
    //     joinColumn: {
    //         name: 'userId',
    //         referencedColumnName: 'id'
    //     }, 
    //     inverseJoinColumn: {
    //         name: 'postId',
    //         referencedColumnName: 'id'
    //     }
    // })
    // comments: Post[]
  
    @ManyToMany(() => User, user => user.followers)
    following: User[];

    @OneToMany(() => Comment, comment => comment.user)
    comment: Comment[];
  
    @OneToMany(() => Comment, comment => comment.user)
    comments: Comment[];
    // @DeleteDateColumn()
    // @Column({ name: 'deletedAt', nullable: true })
    // public deletedAt?: Date

    // @CreateDateColumn({ type: 'timestamp' })
    // @Column({ name: 'createdAt' })
    // public createdAt!: Date

    // @UpdateDateColumn({ type: 'timestamp' })
    // @Column({ name: 'updatedAt' })
    // public updatedAt!: Date
}