import { AutoMap } from "@automapper/classes";
import { TagEntity } from "src/modules/tag/domain/model/tag.entity";
import { TicketEntity } from "src/modules/ticket/domain/model/ticket.entity";

import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('ticket-detail')
export class TicketDetailEntity {
    
    @AutoMap()
    @PrimaryGeneratedColumn('increment')
    id: number;

    @AutoMap()
    @Column('timestamp')
    date: Date;

    @AutoMap()
    @Column('timestamp',{
        name:'date_mod'
    })
    dateMod: Date;

    @AutoMap()
    @Column('int',{
        name: 'assigned_tech_id',
    })
    assignedTechId: number;

    @AutoMap()
    @Column('varchar',{
        name: 'assigned_tech_name'
    })
    assignedTechName: string;

    @AutoMap()
    @Column('timestamp',{
        nullable: true,
        name: 'solve_date'
    })
    solveDate: Date;

    @AutoMap()
    @Column('varchar')
    source: string;

    @AutoMap()
    @Column('int')
    status: number;

    @AutoMap()
    @Column('int')
    priority: number;

    @AutoMap()
    @Column('int')
    impact: number;

    @AutoMap()
    @Column('int')
    urgency: number;

    @AutoMap()
    @Column('varchar')
    summary: string;

    @AutoMap()
    @Column('varchar',{
        nullable: true
    })
    modality: string;

    @AutoMap()
    @Column('int')
    type: number;

    @AutoMap()
    @Column('varchar')
    process: string;

    @AutoMap()
    @Column('int',{
        nullable: true,
        name: 'usi_status'
    })
    usiStatus: number;

    @OneToOne(
        () => TicketEntity
    )
    @JoinColumn({name: 'ticket_id'})
    ticket: TicketEntity

    @Column('int',{
        name: 'ticket_id'
    })
    ticketId: number;

    @ManyToOne(
        () => TagEntity,
        (tagEntity) => tagEntity.ticketDetails
    )
    @JoinColumn({name: 'tag_id'})
    tag: TagEntity
}