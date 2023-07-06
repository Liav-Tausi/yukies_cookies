import { MigrationInterface, QueryRunner } from "typeorm";

export class AddressMigration1688644966876 implements MigrationInterface {
    name = 'AddressMigration1688644966876'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "address" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "address"`);
    }

}
