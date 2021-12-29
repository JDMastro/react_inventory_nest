import {MigrationInterface, QueryRunner} from "typeorm";

export class changeMovements1640804222922 implements MigrationInterface {
    name = 'changeMovements1640804222922'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movements" ADD "person_id" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movements" DROP COLUMN "person_id"`);
    }

}
