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
exports.CartItems = void 0;
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const Cake_1 = require("./Cake");
const cartItemsTableEnum_1 = require("../enums/ORMEnums/cartItemsTableEnum");
const Cart_1 = require("./Cart");
let CartItems = class CartItems extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], CartItems.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Cart_1.Cart),
    (0, typeorm_1.JoinColumn)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CartItems.prototype, "cart", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Cake_1.Cake),
    (0, typeorm_1.JoinColumn)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CartItems.prototype, "cake", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(cartItemsTableEnum_1.cartItemsTableEnumConfig.MinQuantity),
    (0, class_validator_1.Max)(cartItemsTableEnum_1.cartItemsTableEnumConfig.MaxQuantity),
    __metadata("design:type", Number)
], CartItems.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], CartItems.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], CartItems.prototype, "updatedAt", void 0);
CartItems = __decorate([
    (0, typeorm_1.Entity)()
], CartItems);
exports.CartItems = CartItems;
//# sourceMappingURL=CartItems.js.map