import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity, ManyToOne} from "typeorm";
import { User } from "./User";

@Entity()
export class Following extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @CreateDateColumn()
    createdAt: Date;
  
    @Column()
    @UpdateDateColumn()
    updatedAt: Date;


    @Column()
    active: string;

    @Column()
    videoId: number;

@ManyToOne((type)=>User,(u)=>u.following)
user:User

}
