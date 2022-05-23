import {MigrationInterface, QueryRunner} from "typeorm";

export class removeSetUpdateAt1637875533602 implements MigrationInterface {
    name = 'removeSetUpdateAt1637875533602'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notifications" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "notifications" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "notifications" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "notifications" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "notifications" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "notifications" ADD "deletedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "notifications" ALTER COLUMN "from" SET DEFAULT null`);
        await queryRunner.query(`ALTER TABLE "notifications" ALTER COLUMN "read_at" SET DEFAULT null`);
        await queryRunner.query(`ALTER TABLE "notifications" ALTER COLUMN "link" SET DEFAULT null`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notifications" ALTER COLUMN "link" SET DEFAULT NULL`);
        await queryRunner.query(`ALTER TABLE "notifications" ALTER COLUMN "read_at" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "notifications" ALTER COLUMN "from" SET DEFAULT NULL`);
        await queryRunner.query(`ALTER TABLE "notifications" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "notifications" ADD "deletedAt" date`);
        await queryRunner.query(`ALTER TABLE "notifications" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "notifications" ADD "updatedAt" date NOT NULL DEFAULT '2021-11-25'`);
        await queryRunner.query(`ALTER TABLE "notifications" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "notifications" ADD "createdAt" date NOT NULL DEFAULT '2021-11-25'`);
    }

}
