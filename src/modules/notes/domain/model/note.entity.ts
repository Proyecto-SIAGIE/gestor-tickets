import { AutoMap } from "@automapper/classes";
import { FileEntity } from "src/modules/file/domain/model/file.entity";
import { TicketEntity } from "src/modules/ticket/domain/model/ticket.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('note')
export class NoteEntity {

    @AutoMap()
    @PrimaryGeneratedColumn('increment')
    id: number;

    @AutoMap()
    @Column('int',{name:'tech_id'})
    techId: number;

    @AutoMap()
    @Column('varchar',{name:'tech_name'})
    techName: string;

    @AutoMap()
    @Column('timestamp')
    date: Date;

    @AutoMap()
    @Column('varchar',{
        length: 500
    })
    comment: string;

    @AutoMap()
    @Column('bool')
    isPrivate: boolean;

    @AutoMap()
    @ManyToOne(
        () => TicketEntity,
        (ticketEntity) => ticketEntity.notes,
    )
    @JoinColumn({ name: 'ticket_id' })
    ticket: TicketEntity;

    @AutoMap()
    @Column('int',{
        name: 'ticket_id'
    })
    ticketId: number;

    @AutoMap()
    @OneToMany(
        () => FileEntity,
        (FileEntity) => FileEntity.note,
        { cascade: true } 
    )
    files: FileEntity[];
}