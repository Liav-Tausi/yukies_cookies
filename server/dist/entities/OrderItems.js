"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderItems = void 0;
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const User_1 = require("./User");
const orderItemTableEnum_1 = require("../enums/ORMEnums/orderItemTableEnum");
let OrderItems = class OrderItems extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], OrderItems.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User),
    (0, typeorm_1.JoinColumn)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], OrderItems.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(orderItemTableEnum_1.orderItemsTableEnumConfig.MinTotalAmount),
    (0, class_validator_1.Max)(orderItemTableEnum_1.orderItemsTableEnumConfig.MaxTotalAmount),
    __metadata("design:type", Number)
], OrderItems.prototype, "totalAmount", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(orderItemTableEnum_1.orderItemsTableEnumConfig.MinQuantity),
    (0, class_validator_1.Max)(orderItemTableEnum_1.orderItemsTableEnumConfig.MaxQuantity),
    __metadata("design:type", Number)
], OrderItems.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(orderItemTableEnum_1.orderItemsTableEnumConfig.MinPrice),
    (0, class_validator_1.Max)(orderItemTableEnum_1.orderItemsTableEnumConfig.MaxPrice),
    __metadata("design:type", Number)
], OrderItems.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], OrderItems.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], OrderItems.prototype, "updatedAt", void 0);
OrderItems = __decorate([
    (0, typeorm_1.Entity)()
], OrderItems);
exports.OrderItems = OrderItems;
//# sourceMappingURL=OrderItems.js.map