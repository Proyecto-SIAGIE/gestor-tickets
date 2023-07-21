import { AutoMap } from "@automapper/classes";
import { TicketEntity } from "src/modules/ticket/domain/model/ticket.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('iiee')
export class IieeEntity {

    @AutoMap()
    @PrimaryGeneratedColumn('increment')
    id: number;

    @AutoMap()
    @Column('varchar')
    name: string;

    @AutoMap()
    @Column('varchar',{
        name: 'modular_code'
    })
    modularCode: string;

    @AutoMap()
    @Column('varchar',{
        name: 'dre_name'
    })
    dreName: string;

    @AutoMap()
    @Column('varchar',{
        name: 'ugel_name'
    })
    ugelName: string;

    @AutoMap()
    @Column('text')
    address: string;

    @OneToMany(
        () => TicketEntity,
        (ticketEntity) => ticketEntity.iiee,
        {cascade: true}
    )
    tickets: TicketEntity[];
}