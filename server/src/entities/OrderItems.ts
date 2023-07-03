import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn, UpdateDateColumn, CreateDateColumn } from "typeorm"
import { IsNotEmpty, IsNumber, Min, Max } from "class-validator";
import { User } from "./User";
import { orderItemsTableEnumConfig } from "../enums/ORMEnums/orderItemTableEnum";


@Entity()
export class OrderItems extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User)
    @JoinColumn()
    @IsNotEmpty()
    user: number;

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