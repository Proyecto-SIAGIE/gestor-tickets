import { AutoMap } from "@automapper/classes";
import { UserExternalEntity } from "src/user-external/domain/model/userExternal.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('ticket')
export class TicketEntity {

    @AutoMap()
    @PrimaryGeneratedColumn('increment')
    id: number;
    
    @AutoMap()
    @Column('varchar',{
        length: 500
    })
    description: string;

    @AutoMap()
    @Column('varchar',{
        length: 8,
        name: 'student_dni'
    })
    studentDNI: string;

    @AutoMap()
    @Column('int',{
        name: 'category_id'
    })
    categoryId: number;

    @AutoMap()
    @Column('int',{
        name: 'subcategory1_id'
    })
    subcategory1Id: number;

    @AutoMap()
    @Column('int',{
        name: 'subcategory2_id'
    })
    subcategory2Id: number;

    @AutoMap()
    @Column('int',{
        name: 'subcategory3_id'
    })
    subcategory3Id: number;

    @AutoMap()
    @ManyToOne(
        () => UserExternalEntity,
        ( userEntity ) => userEntity.tickets,
    )
    @JoinColumn({ name: 'user_external_id' })
    userExternal: UserExternalEntity;

    @AutoMap()
    @Column('int',{
        name: 'iiee_id'
    })
    iieeId: number;


}