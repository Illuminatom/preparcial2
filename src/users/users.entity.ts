import { BeforeInsert, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt';
import { RolesEntity } from "src/roles/roles.entity";
import { AppointmentsEntity } from "src/appointments/appointments.entity";

@Entity()
export class UsersEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({unique: true})
    email: string

    @Column({ select: false })
    password: string

    @BeforeInsert()
    async hashPassword() {
        if (this.password) {
            const salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password, salt);
        }
    }

    @Column()
    name: string

    @Column({ nullable:true })
    phone?: string

    @Column({default: true})
    is_active: boolean

    @CreateDateColumn()
    created_at: Date

    @ManyToMany(() => RolesEntity, roles => roles.users)
    @JoinTable()
    roles: RolesEntity[]

    @OneToMany(() => AppointmentsEntity, appointments => appointments.patient)
    appointments: AppointmentsEntity[];
}
