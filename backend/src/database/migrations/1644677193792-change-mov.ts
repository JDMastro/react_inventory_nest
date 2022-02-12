import {MigrationInterface, QueryRunner} from "typeorm";

export class changeMov1644677193792 implements MigrationInterface {
    name = 'changeMov1644677193792'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movements" ADD "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`);
        await queryRunner.query(`ALTER TABLE "movements" ALTER COLUMN "updateAt" TYPE TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "movements" ALTER COLUMN "updateAt" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "movements" ALTER COLUMN "updateAt" SET DEFAULT ('now'::text)::timestamp(6) with time zone`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movements" ALTER COLUMN "updateAt" SET DEFAULT ('now'::text)::timestamp(3) with time zone`);
        await queryRunner.query(`ALTER TABLE "movements" ALTER COLUMN "updateAt" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "movements" ALTER COLUMN "updateAt" TYPE TIMESTAMP(3)`);
        await queryRunner.query(`ALTER TABLE "movements" DROP COLUMN "created_at"`);
    }

}
