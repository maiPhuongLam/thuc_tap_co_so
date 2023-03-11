import { Entity, Column, BaseEntity, PrimaryColumn,} from 'typeorm'

@Entity('comments')
export class Comment extends BaseEntity {
    @Column()
    @PrimaryColumn()
    userId: number

    @Column()
    @PrimaryColumn()
    postId: number

    @Column()
    desc: string
}