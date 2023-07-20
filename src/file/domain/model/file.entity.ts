import { AutoMap } from "@automapper/classes";
import { NoteEntity } from "src/notes/domain/model/note.entity";
import { TicketEntity } from "src/ticket/domain/model/ticket.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('file')
export class FileEntity {

    @AutoMap()
    @PrimaryGeneratedColumn('increment')
    id: number;

    @AutoMap()
    @Column('varchar')
    name: string;

    @AutoMap()
    @Column('double')
    size: number;

    @AutoMap()
    @Column('timestamp')
    date: Date;

    @AutoMap()
    @Column('varchar')
    path: string;

    @ManyToOne(
        () => TicketEntity,
        (ticketEntity) => ticketEntity.files,
    )
    @JoinColumn({ name: 'ticket_id' })
    ticket: TicketEntity;

    @ManyToOne(
        () => NoteEntity,
        (noteEntity) => noteEntity.files,
    )
    @JoinColumn({ name: 'note_id' })
    note: NoteEntity;
}