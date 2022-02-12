import {MigrationInterface, QueryRunner} from "typeorm";

export class addDescriptionPermission1644326180762 implements MigrationInterface {
    name = 'addDescriptionPermission1644326180762'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "permission" ADD "description" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "permission" DROP COLUMN "description"`);
    }

}
