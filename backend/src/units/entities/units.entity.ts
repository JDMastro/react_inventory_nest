import { Entity, Column, PrimaryGeneratedColumn, Unique, OneToMany } from 'typeorm';
import { Products } from "../../products/entities/products.entity";


@Entity()
@Unique("idx_units",["code"])
export class Units {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  code: string;

  @Column()
  description: string;

  @OneToMany(() => Products, Products => Products.Units)
  Products: Products[];

}