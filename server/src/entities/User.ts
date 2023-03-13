import { 
    Entity, 
    Column, 
    PrimaryGeneratedColumn, 
    BaseEntity, 
    ManyToMany, 
    JoinTable, 
    OneToMany, 
    DeleteDateColumn, 
    CreateDateColumn, 
    UpdateDateColumn 
} from 'typeorm'
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

    @ManyToMany(() => Post, (post) => post.likes)
    @JoinTable({
        name: 'likes'
    })
    likes: Post[]

    @ManyToMany(() => Post, (post) => post.comments)
    @JoinTable({
        name: 'comments',
    })
    comments: Post[]

    @OneToMany(() => Post, (post) => post.user)
    posts: Post[]

    @ManyToMany(type => User, user => user.followings)
    @JoinTable({
        name: 'follows',
        joinColumn: {
            name: 'userFollower',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: "userFollowing",
            referencedColumnName: 'id'
        }
    })
    followers: User[];
  
    @ManyToMany(type => User, user => user.followers)
    followings: User[];

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