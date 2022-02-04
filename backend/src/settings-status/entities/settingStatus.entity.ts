import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Status } from "../../status/entities/status.entity";


@Entity()
export class SettingStatus {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @ManyToOne(() => Status, Status => Status.SettingStatus)
    @JoinColumn({ name: 'status_parent_id' })
    Status: Status;

    @Column()
    status_parent_id: number

    @ManyToOne(() => Status, Status => Status.SettingStatus)
    @JoinColumn({ name: 'status_child_id' })
    statusChildId: Status;

    @Column()
    status_child_id: number


   
}