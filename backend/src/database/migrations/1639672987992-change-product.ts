import {MigrationInterface, QueryRunner} from "typeorm";

export class changeProduct1639672987992 implements MigrationInterface {
    name = 'changeProduct1639672987992'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ADD "waste_quantity" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "waste_quantity"`);
    }

}
