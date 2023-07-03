import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from "typeorm"
import { IsNotEmpty, IsNumber, Min, Max, IsDate } from "class-validator";
import { User } from "./User";
import { orderTableEnum, orderTableEnumConfig } from "../enums/ORMEnums/orderTableEnum";


@Entity()
export class Order extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User)
    @JoinColumn()
    @IsNotEmpty()
    user: number;

    @Column()
    @IsNotEmpty()
    @IsNumber()
    @Min(orderTableEnumConfig.MinTotalAmount)
    @Max(orderTableEnumConfig.MaxTotalAmount)
    totalAmount: number;

    @Column()
    @IsNotEmpty()
    @IsDate()
    orderTime: Date

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}