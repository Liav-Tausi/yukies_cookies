import { Entity, PrimaryGeneratedColumn, JoinColumn, BaseEntity, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm"
import { IsNotEmpty } from "class-validator";
import { User } from "./User";


@Entity()
export class Cart extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User)
    @JoinColumn()
    @IsNotEmpty()
    user: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
