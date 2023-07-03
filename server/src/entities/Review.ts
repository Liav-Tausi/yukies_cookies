import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from "typeorm"
import { IsNotEmpty, IsNumber, Min, Max, IsString, Length } from "class-validator";
import { User } from "./User";
import { Cake } from "./Cake";
import { reviewTableEnumConfig } from "../enums/ORMEnums/reviewTableEnum";


@Entity()
export class Review extends BaseEntity{

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

    @Column()
    @IsNotEmpty()
    @IsNumber()
    @Min(reviewTableEnumConfig.MinRating)
    @Max(reviewTableEnumConfig.MaxRating)
    rating: number;

    @Column()
    @IsNotEmpty()
    @IsString()
    @Length(reviewTableEnumConfig.MinCommentLength, reviewTableEnumConfig.MaxCommentLength)
    comment: string

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}