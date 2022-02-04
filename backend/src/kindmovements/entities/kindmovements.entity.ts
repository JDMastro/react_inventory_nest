import { Status } from 'src/status/entities/status.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Header } from "../../header/entities/header.entity";
import { classificationPeople } from "../../classification_people/entities/classificationPeople.entity";
import { ClassificationKindMovement } from "../../classificationkindmovement/entities/classificationkindmovement.entity";
import { Consecutive } from "../../consecutive/entities/consecutive.entity";

@Entity()
export class KindMovements {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string

    @Column()
    description: string

    @Column()
    user_id: number

    

    @ManyToOne(() => classificationPeople, classificationPeople => classificationPeople.KindMovement)
    @JoinColumn({ name: 'classificationpeople_id' })
    classificationPeople: classificationPeople;

    @Column()
    classificationpeople_id: number

   /* @Column({ default: false })
    provider: boolean

    @Column({ default: false })
    input: boolean

    @Column({ default: false })
    output: boolean

    @Column({ default: false })
    return: boolean*/

    @Column({ default: false })
    require_consecutive: boolean

    @Column({
        name: 'creation_at',
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
    })
    creationAt: Date;

    @Column("timestamp", { precision: 3, default: () => "CURRENT_TIMESTAMP(3)", onUpdate: "CURRENT_TIMESTAMP(3)" })
    updateAt: Date;

    @Column({ name: 'delete_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    deleteAt: Date;

    @ManyToOne(() => Status, Status => Status.KindMovements)
    @JoinColumn({ name: 'status_id' })
    Status: Status;

    @Column()
    status_id: number

    @OneToMany(() => Header, Header => Header.KindMovements)
    Header: Header[];


    @ManyToOne(() => ClassificationKindMovement, ClassificationKindMovement => ClassificationKindMovement.KindMovements)
    @JoinColumn({ name: 'classification_kindmovement_id' })
    ClassificationKindMovement: ClassificationKindMovement;

    @Column()
    classification_kindmovement_id: number



    @ManyToOne(() => Consecutive, Consecutive => Consecutive.KindMovements)
    @JoinColumn({ name: 'consecutive_id' })
    Consecutive: Consecutive;

    @Column({ nullable: true })
    consecutive_id: number



   


}