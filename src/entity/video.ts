import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity, OneToMany} from "typeorm";
import { Feedback } from "./feedback";
import { User } from "./User";

@Entity()
export class Video extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @CreateDateColumn()
    createdAt: Date;
  
    @Column()
    @UpdateDateColumn()
    updatedAt: Date;

    @Column()
    link: string;

    @Column()
    description: number;

    @Column()
    title: boolean;

    @Column()
    public: number;

    @Column()
    version: boolean;

    @OneToMany((type)=>User, (user)=>user.Video)
    users:User[]

    @OneToMany((type)=>Feedback, (Feedback)=>Feedback.Video)
    Feedbacks:Feedback[]

}
