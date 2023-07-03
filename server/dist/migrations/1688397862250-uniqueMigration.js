"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UniqueMigration1688397862250 = void 0;
class UniqueMigration1688397862250 {
    constructor() {
        this.name = 'UniqueMigration1688397862250';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_f2578043e491921209f5dadd080" UNIQUE ("phoneNumber")`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_f2578043e491921209f5dadd080"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22"`);
    }
}
exports.UniqueMigration1688397862250 = UniqueMigration1688397862250;
//# sourceMappingURL=1688397862250-uniqueMigration.js.map