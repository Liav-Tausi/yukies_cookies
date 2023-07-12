import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn, UpdateDateColumn, CreateDateColumn } from "typeorm"
import { IsNotEmpty, IsNumber, Min, Max } from "class-validator";
import { orderItemsTableEnumConfig } from "../enums/ORMEnums/orderItemTableEnum";
import { Order } from "./Order";


@Entity()
export class OrderItems extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Order)
    @JoinColumn()
    @IsNotEmpty()
    order: number;

    @Column()
    @IsNotEmpty()
    @IsNumber()
    @Min(orderItemsTableEnumConfig.MinTotalAmount)
    @Max(orderItemsTableEnumConfig.MaxTotalAmount)
    totalAmount: number;

    @Column()
    @IsNotEmpty()
    @IsNumber()
    @Min(orderItemsTableEnumConfig.MinQuantity)
    @Max(orderItemsTableEnumConfig.MaxQuantity)
    quantity: number

    @Column()
    @IsNotEmpty()
    @IsNumber()
    @Min(orderItemsTableEnumConfig.MinPrice)
    @Max(orderItemsTableEnumConfig.MaxPrice)
    price: number

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}