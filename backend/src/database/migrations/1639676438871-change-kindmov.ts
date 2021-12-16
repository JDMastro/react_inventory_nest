import {MigrationInterface, QueryRunner} from "typeorm";

export class changeKindmov1639676438871 implements MigrationInterface {
    name = 'changeKindmov1639676438871'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "kind_movements" DROP CONSTRAINT "FK_812d0b64f7f66668667c0cf8d05"`);
        await queryRunner.query(`ALTER TABLE "kind_movements" RENAME COLUMN "classificationkindmovement_id" TO "classification_kindmovement_id"`);
        await queryRunner.query(`ALTER TABLE "kind_movements" ADD CONSTRAINT "FK_f811588625365965d8b5a21fbd1" FOREIGN KEY ("classification_kindmovement_id") REFERENCES "classification_kind_movement"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "kind_movements" DROP CONSTRAINT "FK_f811588625365965d8b5a21fbd1"`);
        await queryRunner.query(`ALTER TABLE "kind_movements" RENAME COLUMN "classification_kindmovement_id" TO "classificationkindmovement_id"`);
        await queryRunner.query(`ALTER TABLE "kind_movements" ADD CONSTRAINT "FK_812d0b64f7f66668667c0cf8d05" FOREIGN KEY ("classificationkindmovement_id") REFERENCES "classification_kind_movement"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
