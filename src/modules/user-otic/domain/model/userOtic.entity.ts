import { AutoMap } from "@automapper/classes";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('user-otic')
export class UserOticEntity {
    
    @AutoMap()
    @PrimaryGeneratedColumn('increment')
    id: number;

    @AutoMap()
    @Column('varchar',{
        unique: true
    })
    username: string;
    
    @AutoMap()
    @Column('varchar',{
        unique: true
    })
    email: string;
}