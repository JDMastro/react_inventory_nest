import {MigrationInterface, QueryRunner} from "typeorm";

export class changeMovementAdd1643693241205 implements MigrationInterface {
    name = 'changeMovementAdd1643693241205'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movements" ADD "returned_quantity" double precision NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movements" DROP COLUMN "returned_quantity"`);
    }

}
