import { IsNotEmpty, IsString, IsNumber, Length, Min, Max, IsUrl } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn } from "typeorm"
import { cakeTableEnumConfig } from "../enums/ORMEnums/cakeTableEnum";

@Entity()
export class Cake extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    @IsNotEmpty()
    @IsString()
    @Length(cakeTableEnumConfig.MinLengthName, cakeTableEnumConfig.MaxLengthName)
    name: string

    @Column()
    @IsNotEmpty()
    @IsString()
    @Length(cakeTableEnumConfig.MinLengthShortDescription, cakeTableEnumConfig.MaxLengthShortDescription)
    shortDescription: string

    @Column()
    @IsNotEmpty()
    @IsString()
    @Length(cakeTableEnumConfig.MinLengthLongDescription, cakeTableEnumConfig.MaxLengthLongDescription)
    longDescription: string

    @Column()
    @IsNotEmpty()
    @IsNumber()
    @Min(cakeTableEnumConfig.MinPrice)
    @Max(cakeTableEnumConfig.MaxPrice)
    price: number

    @Column()
    @IsString()
    @IsUrl()
    imageUrl: string

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

}
