import {MigrationInterface, QueryRunner} from "typeorm";

export class init1643121434109 implements MigrationInterface {
    name = 'init1643121434109'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "signs" ("id" SERIAL NOT NULL, "sign" character varying NOT NULL, CONSTRAINT "PK_79660c6bf130a669793b219aaec" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "conversion" ("id" SERIAL NOT NULL, "conversion_from" integer NOT NULL, "conversion_to" integer NOT NULL, "conversion_quatity" integer NOT NULL, "signs_id" integer NOT NULL, CONSTRAINT "idx_conversion" UNIQUE ("conversion_from", "conversion_to"), CONSTRAINT "PK_47d350fae88ddb04db6de706bc8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "units" ("id" SERIAL NOT NULL, "code" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "idx_units" UNIQUE ("code"), CONSTRAINT "PK_5a8f2f064919b587d93936cb223" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "products" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "sku" character varying NOT NULL, "code_bar" character varying, "current_existence" double precision NOT NULL, "reserved_quantity" double precision NOT NULL, "purchase_unit_id" integer NOT NULL, "sale_unit_id" integer NOT NULL, "to_discount" double precision, "product_parent_id" integer, "waste_quantity" integer NOT NULL DEFAULT '0', "isderivate" boolean NOT NULL DEFAULT false, "user_id" integer NOT NULL, "creation_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updateAt" TIMESTAMP(3) NOT NULL DEFAULT ('now'::text)::timestamp(3) with time zone, "delete_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "sale_price" integer NOT NULL DEFAULT '0', "actived" boolean NOT NULL DEFAULT true, "movementsId" integer, CONSTRAINT "idx_products_" UNIQUE ("sku", "name"), CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "kindidentity" ("id" SERIAL NOT NULL, "description" character varying NOT NULL, "code" character varying NOT NULL, CONSTRAINT "idx_des_kind" UNIQUE ("code"), CONSTRAINT "PK_9148ef5308241359ff9d1bfcc23" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "code" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "creation_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updateAt" TIMESTAMP(3) NOT NULL DEFAULT ('now'::text)::timestamp(3) with time zone, "delete_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "person_id" integer NOT NULL, CONSTRAINT "UQ_1f7a2b11e29b1422a2622beab36" UNIQUE ("code"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "idx_users" UNIQUE ("email", "code"), CONSTRAINT "REL_5ed72dcd00d6e5a88c6a6ba3d1" UNIQUE ("person_id"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "roles" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "person" ("id" SERIAL NOT NULL, "kind_id" integer NOT NULL, "idnumber" character varying NOT NULL, "name" character varying NOT NULL, "second_name" character varying, "first_surname" character varying NOT NULL, "second_surname" character varying, "fullname" character varying NOT NULL, "address" character varying NOT NULL, "phone" character varying NOT NULL, "contact" character varying NOT NULL, "status" boolean NOT NULL DEFAULT true, "user_id" integer NOT NULL, "creation_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updateAt" TIMESTAMP(3) NOT NULL DEFAULT ('now'::text)::timestamp(3) with time zone, "delete_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "roles_id" integer NOT NULL, CONSTRAINT "idx_person" UNIQUE ("phone", "idnumber"), CONSTRAINT "PK_5fdaf670315c4b7e70cce85daa3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "header" ("id" SERIAL NOT NULL, "person_id" integer NOT NULL, "number_order" character varying NOT NULL, "kind_movements_id" integer NOT NULL, "observation" character varying NOT NULL, "creation_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updateAt" TIMESTAMP(3) NOT NULL DEFAULT ('now'::text)::timestamp(3) with time zone, "delete_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_007a885cf40484eb750d0355339" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "movements" ("id" SERIAL NOT NULL, "product_id" integer NOT NULL, "quantity" double precision NOT NULL, "total_purchasePrice" double precision NOT NULL, "unit_price" double precision NOT NULL, "header_id" integer NOT NULL, "quantity_returned" double precision NOT NULL, "status_id" integer NOT NULL, "suggest" boolean NOT NULL DEFAULT false, "suggest_units" double precision NOT NULL DEFAULT '0', "suggest_generated" double precision NOT NULL DEFAULT '0', "amount_used" double precision NOT NULL DEFAULT '0', "waste_quantity" double precision NOT NULL DEFAULT '0', "person_id" integer, "observation" character varying, "updateAt" TIMESTAMP(3) DEFAULT ('now'::text)::timestamp(3) with time zone, CONSTRAINT "PK_5a8e3da15ab8f2ce353e7f58f67" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "status" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "code" character varying NOT NULL, "is_to_employee" boolean NOT NULL DEFAULT false, CONSTRAINT "idx_status" UNIQUE ("code"), CONSTRAINT "PK_e12743a7086ec826733f54e1d95" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "consecutive" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "prefix" character varying NOT NULL, "last_inserted" integer NOT NULL DEFAULT '1', CONSTRAINT "idx_consecutive" UNIQUE ("prefix"), CONSTRAINT "PK_1025693cb0041f2eda2ee913282" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "kind_movements" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "user_id" integer NOT NULL, "roles_id" integer NOT NULL, "require_consecutive" boolean NOT NULL DEFAULT false, "creation_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updateAt" TIMESTAMP(3) NOT NULL DEFAULT ('now'::text)::timestamp(3) with time zone, "delete_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "status_id" integer NOT NULL, "classification_kindmovement_id" integer NOT NULL, "consecutive_id" integer, CONSTRAINT "PK_7690167c46ca89b0b5cb1ba6b52" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "classification_kind_movement" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_03c91c17e950a50625fb262a1c1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "settings" ("id" SERIAL NOT NULL, "description" character varying NOT NULL, "key" character varying NOT NULL, "value" character varying NOT NULL, CONSTRAINT "idx_settings" UNIQUE ("key"), CONSTRAINT "PK_0669fe20e252eb692bf4d344975" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "conversion" ADD CONSTRAINT "FK_ddd91b6bf82f5c4c46e2413e7ca" FOREIGN KEY ("conversion_from") REFERENCES "units"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "conversion" ADD CONSTRAINT "FK_8d312d0f7c0ed9334588197d398" FOREIGN KEY ("conversion_to") REFERENCES "units"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "conversion" ADD CONSTRAINT "FK_8133a0e8f61583695ad55000cb2" FOREIGN KEY ("signs_id") REFERENCES "signs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_774f5a086ca962dfe78c62aa10b" FOREIGN KEY ("purchase_unit_id") REFERENCES "units"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_0ea8e23207f42911bb85ef0a584" FOREIGN KEY ("sale_unit_id") REFERENCES "units"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_8852048b204485e00fe8a0ffdf7" FOREIGN KEY ("product_parent_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_0681e70e1a9569a4220a4a9b556" FOREIGN KEY ("movementsId") REFERENCES "movements"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_5ed72dcd00d6e5a88c6a6ba3d18" FOREIGN KEY ("person_id") REFERENCES "person"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "person" ADD CONSTRAINT "FK_0e4c050597bca13d5c70a79ff6e" FOREIGN KEY ("kind_id") REFERENCES "kindidentity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "person" ADD CONSTRAINT "FK_09c3552ecb9879d9b2410a0f783" FOREIGN KEY ("roles_id") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "header" ADD CONSTRAINT "FK_a7ec5da323ac67b3f93588f1a3d" FOREIGN KEY ("person_id") REFERENCES "person"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "header" ADD CONSTRAINT "FK_113b522d4a9fb93c4979106b9f7" FOREIGN KEY ("kind_movements_id") REFERENCES "kind_movements"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "movements" ADD CONSTRAINT "FK_0536efaa7e21b101f827a7c62f6" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "movements" ADD CONSTRAINT "FK_994e65eae8b497472663826feb0" FOREIGN KEY ("header_id") REFERENCES "header"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "movements" ADD CONSTRAINT "FK_952696d941a19bf0dd6c86306be" FOREIGN KEY ("status_id") REFERENCES "status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "kind_movements" ADD CONSTRAINT "FK_c37d0a0c38420f8b4c82cef731f" FOREIGN KEY ("roles_id") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "kind_movements" ADD CONSTRAINT "FK_56f359f21dc13b1afec210e28b3" FOREIGN KEY ("status_id") REFERENCES "status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "kind_movements" ADD CONSTRAINT "FK_f811588625365965d8b5a21fbd1" FOREIGN KEY ("classification_kindmovement_id") REFERENCES "classification_kind_movement"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "kind_movements" ADD CONSTRAINT "FK_122ac21f64c42399181f23d7df5" FOREIGN KEY ("consecutive_id") REFERENCES "consecutive"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "kind_movements" DROP CONSTRAINT "FK_122ac21f64c42399181f23d7df5"`);
        await queryRunner.query(`ALTER TABLE "kind_movements" DROP CONSTRAINT "FK_f811588625365965d8b5a21fbd1"`);
        await queryRunner.query(`ALTER TABLE "kind_movements" DROP CONSTRAINT "FK_56f359f21dc13b1afec210e28b3"`);
        await queryRunner.query(`ALTER TABLE "kind_movements" DROP CONSTRAINT "FK_c37d0a0c38420f8b4c82cef731f"`);
        await queryRunner.query(`ALTER TABLE "movements" DROP CONSTRAINT "FK_952696d941a19bf0dd6c86306be"`);
        await queryRunner.query(`ALTER TABLE "movements" DROP CONSTRAINT "FK_994e65eae8b497472663826feb0"`);
        await queryRunner.query(`ALTER TABLE "movements" DROP CONSTRAINT "FK_0536efaa7e21b101f827a7c62f6"`);
        await queryRunner.query(`ALTER TABLE "header" DROP CONSTRAINT "FK_113b522d4a9fb93c4979106b9f7"`);
        await queryRunner.query(`ALTER TABLE "header" DROP CONSTRAINT "FK_a7ec5da323ac67b3f93588f1a3d"`);
        await queryRunner.query(`ALTER TABLE "person" DROP CONSTRAINT "FK_09c3552ecb9879d9b2410a0f783"`);
        await queryRunner.query(`ALTER TABLE "person" DROP CONSTRAINT "FK_0e4c050597bca13d5c70a79ff6e"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_5ed72dcd00d6e5a88c6a6ba3d18"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_0681e70e1a9569a4220a4a9b556"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_8852048b204485e00fe8a0ffdf7"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_0ea8e23207f42911bb85ef0a584"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_774f5a086ca962dfe78c62aa10b"`);
        await queryRunner.query(`ALTER TABLE "conversion" DROP CONSTRAINT "FK_8133a0e8f61583695ad55000cb2"`);
        await queryRunner.query(`ALTER TABLE "conversion" DROP CONSTRAINT "FK_8d312d0f7c0ed9334588197d398"`);
        await queryRunner.query(`ALTER TABLE "conversion" DROP CONSTRAINT "FK_ddd91b6bf82f5c4c46e2413e7ca"`);
        await queryRunner.query(`DROP TABLE "settings"`);
        await queryRunner.query(`DROP TABLE "classification_kind_movement"`);
        await queryRunner.query(`DROP TABLE "kind_movements"`);
        await queryRunner.query(`DROP TABLE "consecutive"`);
        await queryRunner.query(`DROP TABLE "status"`);
        await queryRunner.query(`DROP TABLE "movements"`);
        await queryRunner.query(`DROP TABLE "header"`);
        await queryRunner.query(`DROP TABLE "person"`);
        await queryRunner.query(`DROP TABLE "roles"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "kindidentity"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TABLE "units"`);
        await queryRunner.query(`DROP TABLE "conversion"`);
        await queryRunner.query(`DROP TABLE "signs"`);
    }

}
