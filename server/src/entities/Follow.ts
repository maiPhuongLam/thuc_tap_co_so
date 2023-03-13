import { Entity, Column, BaseEntity, PrimaryColumn,} from 'typeorm'

@Entity('follows')
export class Follow extends BaseEntity {
    @Column()
    @PrimaryColumn()
    userFollowing: number

    @Column()
    @PrimaryColumn()
    userFollowed: number

}