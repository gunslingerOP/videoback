import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity, ManyToOne} from "typeorm";
import { User } from "./User";

@Entity()
export class AccessTicket extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @CreateDateColumn()
    createdAt: Date;
  
    @Column()
    @UpdateDateColumn()
    updatedAt: Date;


    @Column()
    type: number;

    @Column()
    active: boolean;

    @Column()
    videoId: number;

@ManyToOne((type)=>User, (user)=>user.AccessTicket)
user:User

}
