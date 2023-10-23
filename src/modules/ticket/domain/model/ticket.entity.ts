import { AutoMap } from "@automapper/classes";
import { FileEntity } from "src/modules/file/domain/model/file.entity";
import { IieeEntity } from "src/modules/iiee/domain/model/iiee.entity";
import { NoteEntity } from "src/modules/notes/domain/model/note.entity";
import { TicketDetailEntity } from "src/modules/ticket-detail/domain/model/ticketDetail.entity";
import { UserExternalEntity } from "src/modules/user-external/domain/model/userExternal.entity";

import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

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
        name: 'subcategory2_id',
        nullable: true
    })
    subcategory2Id: number;

    @AutoMap()
    @Column('int',{
        name: 'subcategory3_id',
        nullable: true
    })
    subcategory3Id: number;

    @AutoMap()
    @ManyToOne(
        () => UserExternalEntity,
        ( userEntity ) => userEntity.tickets,
    )
    @JoinColumn({ name: 'user_external_id' })
    userExternal: UserExternalEntity;

    @OneToOne(
        () => TicketDetailEntity,
        ticketDetail => ticketDetail.ticket,
    )
    ticketDetail: TicketDetailEntity

    /*@AutoMap()
    @Column('int',{
        name: 'user_external_id'
    })
    userExternalId: number;*/

    @OneToMany(
        () => FileEntity,
        (fileEntity) => fileEntity.ticket,
        { cascade: true } 
    )
    files: FileEntity[];

    @OneToMany(
        () => NoteEntity,
        (noteEntity) => noteEntity.ticket,
        { cascade: true } 
    )
    notes: NoteEntity[];

    @ManyToOne(
        () => IieeEntity,
        (iieeEntity) => iieeEntity.tickets,
    )
    @JoinColumn({name: 'iiee_id'})
    iiee: IieeEntity;
}