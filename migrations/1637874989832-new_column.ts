import {MigrationInterface, QueryRunner} from "typeorm";

export class newColumn1637874989832 implements MigrationInterface {
    name = 'newColumn1637874989832'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notifications" ADD "new" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "notifications" ALTER COLUMN "createdAt" SET DEFAULT '"2021-11-25T21:16:30.149Z"'`);
        await queryRunner.query(`ALTER TABLE "notifications" ALTER COLUMN "updatedAt" SET DEFAULT '"2021-11-25T21:16:30.149Z"'`);
        await queryRunner.query(`ALTER TABLE "notifications" DROP CONSTRAINT "UQ_9c7b39f42b38591fbb8878c52f5"`);
        await queryRunner.query(`ALTER TABLE "notifications" ALTER COLUMN "from" SET DEFAULT null`);
        await queryRunner.query(`ALTER TABLE "notifications" ALTER COLUMN "read_at" SET DEFAULT null`);
        await queryRunner.query(`ALTER TABLE "notifications" ALTER COLUMN "link" SET DEFAULT null`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notifications" ALTER COLUMN "link" SET DEFAULT NULL`);
        await queryRunner.query(`ALTER TABLE "notifications" ALTER COLUMN "read_at" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "notifications" ALTER COLUMN "from" SET DEFAULT NULL`);
        await queryRunner.query(`ALTER TABLE "notifications" ADD CONSTRAINT "UQ_9c7b39f42b38591fbb8878c52f5" UNIQUE ("name")`);
        await queryRunner.query(`ALTER TABLE "notifications" ALTER COLUMN "updatedAt" SET DEFAULT '2020-10-08'`);
        await queryRunner.query(`ALTER TABLE "notifications" ALTER COLUMN "createdAt" SET DEFAULT '2020-10-08'`);
        await queryRunner.query(`ALTER TABLE "notifications" DROP COLUMN "new"`);
    }

}
