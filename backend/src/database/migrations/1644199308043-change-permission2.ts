import {MigrationInterface, QueryRunner} from "typeorm";

export class changePermission21644199308043 implements MigrationInterface {
    name = 'changePermission21644199308043'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movements" DROP COLUMN "returned_quantity"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movements" ADD "returned_quantity" double precision NOT NULL DEFAULT '0'`);
    }

}
