import { IsNotEmpty, Matches, IsEmail, IsStrongPassword, IsBoolean, IsMobilePhone, IsIn } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn} from "typeorm"

@Entity()
export class User extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    @IsNotEmpty()
    @Matches(/^[A-Za-z]+\s[A-Za-z]+$/)
    fullName: string;

    @Column({ unique: true })
    @IsNotEmpty()
    @IsEmail()
    email: string

    @Column({ unique: true })
    @IsNotEmpty()
    @IsMobilePhone('he-IL')
    phoneNumber: string

    @Column()
    @IsNotEmpty()
    @IsStrongPassword()
    password: string;

    @Column()
    address: string

    @Column()
    @IsBoolean()
    isStaff: boolean

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

}
