import {MigrationInterface, QueryRunner} from "typeorm";

export class changePermission1644161317293 implements MigrationInterface {
    name = 'changePermission1644161317293'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "permission" ("id" SERIAL NOT NULL, "module" character varying NOT NULL, "submodule" character varying NOT NULL, "permission" character varying NOT NULL, CONSTRAINT "PK_3b8b97af9d9d8807e41e6f48362" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "permission_users_users" ("permissionId" integer NOT NULL, "usersId" integer NOT NULL, CONSTRAINT "PK_b561a5db58992f97f10d31062b4" PRIMARY KEY ("permissionId", "usersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_07a36b98dd038db7473acff777" ON "permission_users_users" ("permissionId") `);
        await queryRunner.query(`CREATE INDEX "IDX_18b51dd0e5301d161cb56b8d6c" ON "permission_users_users" ("usersId") `);
        await queryRunner.query(`ALTER TABLE "permission_users_users" ADD CONSTRAINT "FK_07a36b98dd038db7473acff7778" FOREIGN KEY ("permissionId") REFERENCES "permission"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "permission_users_users" ADD CONSTRAINT "FK_18b51dd0e5301d161cb56b8d6cb" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "permission_users_users" DROP CONSTRAINT "FK_18b51dd0e5301d161cb56b8d6cb"`);
        await queryRunner.query(`ALTER TABLE "permission_users_users" DROP CONSTRAINT "FK_07a36b98dd038db7473acff7778"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_18b51dd0e5301d161cb56b8d6c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_07a36b98dd038db7473acff777"`);
        await queryRunner.query(`DROP TABLE "permission_users_users"`);
        await queryRunner.query(`DROP TABLE "permission"`);
    }

}
