import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1647163666232 implements MigrationInterface {
    name = 'migration1647163666232'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "login" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "record" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date" TIMESTAMP WITH TIME ZONE NOT NULL, "message" character varying NOT NULL, "author" character varying NOT NULL, "fileName" character varying NOT NULL, "userId" uuid, CONSTRAINT "PK_5cb1f4d1aff275cf9001f4343b9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "record" ADD CONSTRAINT "FK_8675cd3761984947c2506f39a25" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "record" DROP CONSTRAINT "FK_8675cd3761984947c2506f39a25"`);
        await queryRunner.query(`DROP TABLE "record"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
