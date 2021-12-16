import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Products } from "../../products/entities/products.entity";
import { Header } from "../../header/entities/header.entity";
import { Status } from "../../status/entities/status.entity";


@Entity()
export class Movements {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @ManyToOne(() => Products, Products => Products.movements)
    @JoinColumn({ name: 'product_id' })
    Products: Products;

    @Column()
    product_id: number

    @Column({ type: 'float' })
    quantity: number;

    @Column({ type: 'float' })
    total_purchasePrice: number;

    @Column({ type: 'float' })
    unit_price: number;

    @ManyToOne(() => Header, Header => Header.Movements)
    @JoinColumn({ name: 'header_id' })
    Header: Header;

    @Column()
    header_id: number

    @Column({ type: 'float' })
    quantity_returned: number;

    @ManyToOne(() => Status, Status => Status.Movements)
    @JoinColumn({ name: 'status_id' })
    Status: Status;

    @Column()
    status_id: number
}