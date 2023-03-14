import { 
    Entity, 
    Column, 
    PrimaryGeneratedColumn, 
    BaseEntity, 
    ManyToMany, 
    JoinTable, 
    OneToMany, 
} from 'typeorm'

import { Comment } from './Comment'
import { Like } from './Like'
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

    @OneToMany(type => Post, (post) => post.user)
    posts: Post[]

    @ManyToMany(type => User, user => user.following)
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
    
    @ManyToMany(type => User, user => user.followers)
    following: User[];

    @OneToMany(() => Comment, comment => comment.user)
    comments: Comment[];

    @OneToMany(() => Like, like => like.user)
    likes: Like[];
}