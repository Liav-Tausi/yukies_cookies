import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from "typeorm"
import { IsNotEmpty } from "class-validator";
import { User } from "./User";
import { Cake } from "./Cake";


@Entity()
export class Favorite extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User)
    @JoinColumn()
    @IsNotEmpty()
    user: number;

    @ManyToOne(() => Cake)
    @JoinColumn()
    @IsNotEmpty()
    cake: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
