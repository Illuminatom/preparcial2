import { UsersEntity } from "src/users/users.entity";
import { Column, CreateDateColumn, Entity, ForeignKey, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class AppointmentsEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @ManyToOne(() => UsersEntity, users => users.appointments)
    patient: UsersEntity

    @ManyToOne(() => UsersEntity, users => users.appointments)
    doctor: UsersEntity 

    @Column()
    dateTime: Date

    @Column({enum: ["pending", "cancelled", "done"]})
    status: string

    @CreateDateColumn()
    created_at: Date
}
