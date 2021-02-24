import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, OneToMany} from "typeorm";
import { AccessTicket } from "./accessTicket";
import { Feedback } from "./feedback";
import { Following } from "./following";
import { Notification } from "./notification";
import { Plan } from "./plan";
import { Video } from "./video";

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userName: string;

    @Column()
    googleName: string;

    @Column()
    googleEmail: string;

    @Column()
    googleId: string;


    @Column({nullable:true})
    googlePicture: string;

    @Column()
    googleVerifiedEmail: boolean;


    @OneToMany((type) => Notification, (n) => n.user)
    notifications: Notification[];
  
  
    @OneToMany((type) => Following, (following) => following.user)
    following: Following[];
  
  
    @OneToMany((type) => Feedback, (f) => f.user)
    feedback: Feedback[];
  
  
    @OneToMany((type) => AccessTicket, (AccessTicket) => AccessTicket.user)
    AccessTicket: AccessTicket;

     
    @ManyToOne((type) => Video, (Video) => Video.users)
    Video: Video;
}
