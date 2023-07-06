"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressMigration1688644966876 = void 0;
class AddressMigration1688644966876 {
    constructor() {
        this.name = 'AddressMigration1688644966876';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user" ADD "address" character varying NOT NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "address"`);
    }
}
exports.AddressMigration1688644966876 = AddressMigration1688644966876;
//# sourceMappingURL=1688644966876-addressMigration.js.map