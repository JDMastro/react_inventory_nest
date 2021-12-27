import {MigrationInterface, QueryRunner} from "typeorm";

export class settingsAdd1640616751122 implements MigrationInterface {
    name = 'settingsAdd1640616751122'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "settings" ("id" SERIAL NOT NULL, "description" character varying NOT NULL, "key" character varying NOT NULL, "value" character varying NOT NULL, CONSTRAINT "idx_settings" UNIQUE ("key"), CONSTRAINT "PK_0669fe20e252eb692bf4d344975" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "settings"`);
    }

}
