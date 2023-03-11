import { Entity, Column, BaseEntity, PrimaryColumn,} from 'typeorm'

@Entity('likes')
export class Like extends BaseEntity {
    @Column()
    @PrimaryColumn()
    userId: number

    @Column()
    @PrimaryColumn()
    postId: number
}