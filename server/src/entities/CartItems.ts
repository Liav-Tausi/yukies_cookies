import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from "typeorm"
import { IsNotEmpty, IsNumber, Min, Max } from "class-validator";
import { Cake } from "./Cake";
import { cartItemsTableEnumConfig } from "../enums/ORMEnums/cartItemsTableEnum";
import { Cart } from "./Cart";


@Entity()
export class CartItems extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Cart)
    @JoinColumn()
    @IsNotEmpty()
    cart: number;

    @ManyToOne(() => Cake)
    @JoinColumn()
    @IsNotEmpty()
    cake: number;

    @Column()
    @IsNotEmpty()
    @IsNumber()
    @Min(cartItemsTableEnumConfig.MinQuantity)
    @Max(cartItemsTableEnumConfig.MaxQuantity)
    quantity: number


    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
