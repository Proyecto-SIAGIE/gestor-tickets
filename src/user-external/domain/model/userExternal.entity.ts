import { AutoMap } from "@automapper/classes";
import { RoleEntity } from "src/role/domain/model/role.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('user-external')
export class UserExternalEntity{
    
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
        length: 8,
        unique: true
    })
    dni: string;

    @AutoMap()
    @Column('varchar')
    name: string;

    @AutoMap()
    @Column('varchar',{
        name: 'last_name'
    })
    lastName: string;

    @AutoMap()
    @Column('varchar',{
        unique: true
    })
    email: string;

    @AutoMap()
    @Column('varchar',{
        length: 9
    })
    phone: string;

    @AutoMap()
    @Column('varchar',{
        name: 'phone_ext'
    })
    phoneExt: string;

    @ManyToOne(
        () => RoleEntity,
        ( roleEntity ) => roleEntity.userExternals,
    )
    @JoinColumn({ name: 'role_id' })
    role: RoleEntity
}