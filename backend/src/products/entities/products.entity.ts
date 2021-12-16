import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, Unique, ManyToOne } from 'typeorm';
import { Units } from "../../units/entities/units.entity";
import { Movements } from 'src/movements/entities/movements.entity';

@Entity()
@Unique("idx_products_", ["sku", "name"])
export class Products {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    sku: string;

    @Column({ nullable: true })
    code_bar: string;

    @Column({ type: 'float' })
    current_existence: number;

    @Column({ type: 'float' })
    reserved_quantity: number;

    @ManyToOne(() => Units, Units => Units.Products)
    @JoinColumn({ name: 'purchase_unit_id' })
    Units: Units;

    @Column()
    purchase_unit_id: number

    @ManyToOne(() => Units, Units => Units.Products)
    @JoinColumn({ name: 'sale_unit_id' })
    unit_sale: Units;

    @Column()
    sale_unit_id: number

    @Column({ nullable: true, type: 'float' })
    to_discount: number




    @OneToMany(() => Products, Products => Products.product_parent)
    Products: Products[];

    @ManyToOne(() => Products, Products => Products.Products)
    @JoinColumn({ name: 'product_parent_id' })
    product_parent: Products;

    @Column({ nullable: true })
    product_parent_id: number



    @Column({ default : 0 })
    waste_quantity : number









    @Column({ default: false })
    isderivate: boolean

    @Column()
    user_id: number

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



    @ManyToOne(() => Movements, movements => movements.Products)
    movements: Movements[];

}