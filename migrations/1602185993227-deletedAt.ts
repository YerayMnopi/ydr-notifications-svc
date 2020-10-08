import {MigrationInterface, QueryRunner} from "typeorm";

export class deletedAt1602185993227 implements MigrationInterface {
    name = 'deletedAt1602185993227'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "notifications" ("createdAt" date NOT NULL DEFAULT '"2020-10-08T19:39:53.375Z"', "updatedAt" date NOT NULL DEFAULT '"2020-10-08T19:39:53.375Z"', "deletedAt" date, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "slug" character varying(255) NOT NULL, "image" character varying(255), "from" character varying(255) DEFAULT null, "to" character varying(255) NOT NULL, "read_at" date DEFAULT null, "text" character varying(255) NOT NULL, "link" character varying(255) DEFAULT null, CONSTRAINT "UQ_9c7b39f42b38591fbb8878c52f5" UNIQUE ("name"), CONSTRAINT "UQ_fe687619b0190843780d486e05f" UNIQUE ("slug"), CONSTRAINT "PK_6a72c3c0f683f6462415e653c3a" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "notifications"`);
    }

}
