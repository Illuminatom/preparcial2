import { UsersEntity } from "src/users/users.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class RolesEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({unique: true})
    role_name: string

    @Column({ nullable: true })
    description?: string

    @ManyToMany(() => UsersEntity, users => users.roles)
    users: UsersEntity[]
}
