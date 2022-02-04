import { KindMovements } from 'src/kindmovements/entities/kindmovements.entity';
import { Entity, Column, PrimaryGeneratedColumn, Unique, OneToMany } from 'typeorm';
import { Movements } from "../../movements/entities/movements.entity";
import { SettingStatus } from "../../settings-status/entities/settingStatus.entity";

@Entity()
@Unique("idx_status",["code"])
export class Status {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    code: string;

    @Column({ default: false })
    is_to_employee: boolean

    @OneToMany(() => KindMovements, KindMovements => KindMovements.Status)
    KindMovements: KindMovements[];

    @OneToMany(() => Movements, Movements => Movements.Status)
    Movements: Movements[];

    @OneToMany(() => SettingStatus, SettingStatus => SettingStatus.Status)
    SettingStatus: SettingStatus[];
}