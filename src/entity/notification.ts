import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity, ManyToOne} from "typeorm";
import { User } from "./User";

@Entity()
export class Notification extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @CreateDateColumn()
    createdAt: Date;
  
    @Column()
    @UpdateDateColumn()
    updatedAt: Date;


    @Column()
    title: string;

    @Column()
    body: string;

    @Column()
    recipientId: number;

@ManyToOne((type)=>User, (u)=>u.notifications)
user:User

}
