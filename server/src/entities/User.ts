import { IsNotEmpty, Matches, IsEmail, IsString, IsBoolean, IsPhoneNumber, IsStrongPassword,} from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn} from "typeorm"
import { userTableEnum, userTableEnumConfig, userTableEnumMSG } from "../enums/ORMEnums/userTableEnum";


@Entity()
export class User extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    @IsNotEmpty()
    @IsString()
    @Matches(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/, { message: userTableEnum.FullName + userTableEnumMSG.IsRequired })
    fullName: string

    @Column()
    @IsNotEmpty()
    @IsEmail()
    email: string

    @Column()
    @IsNotEmpty()
    @IsString()
    @IsPhoneNumber('IL',
    { message: userTableEnumMSG.PhoneNumber + userTableEnumMSG.IsRequired })
    phoneNumber: string

    @Column()
    @IsNotEmpty()
    @IsString()
    @IsStrongPassword({
        minLength: userTableEnumConfig.MinLengthPassword,
        minLowercase: userTableEnumConfig.MinLowercasePassword,
        minUppercase: userTableEnumConfig.MinUppercasePassword,
        minNumbers: userTableEnumConfig.MinNumbersPassword,
        minSymbols: userTableEnumConfig.MinSymbolsPassword,
    }, { message: userTableEnum.Password + userTableEnumMSG.ValidPassword})
    password: string;

    @Column()
    @IsBoolean()
    isStaff: boolean

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

}
