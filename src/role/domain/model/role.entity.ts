import { AutoMap } from "@automapper/classes";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('role')
export class RoleEntity {

    @AutoMap()
    @PrimaryGeneratedColumn('increment')
    id: number;

    @AutoMap()
    @Column('varchar')
    name: string;
}