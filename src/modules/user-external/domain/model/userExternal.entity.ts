import { AutoMap } from "@automapper/classes";
import { RoleEntity } from "src/modules/role/domain/model/role.entity";
import { TicketEntity } from "src/modules/ticket/domain/model/ticket.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('user-external')
export class UserExternalEntity{
    
    @AutoMap()
    @PrimaryGeneratedColumn('increment')
    id: number;

    @AutoMap()
    @Column('int',
    {name: 'passport_user_id', unique: true}
    )
    passportUserId: number;

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

    //@AutoMap()
    @ManyToOne(
        () => RoleEntity,
        ( roleEntity ) => roleEntity.userExternals,
    )
    @JoinColumn({ name: 'role_id' })
    role: RoleEntity

    @OneToMany(
        () => TicketEntity,
        (ticketEntity) => ticketEntity.userExternal,
        { cascade: true } 
    )
    tickets: TicketEntity[];

}