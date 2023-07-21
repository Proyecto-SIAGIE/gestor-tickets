import { AutoMap } from "@automapper/classes";
import { TicketDetailEntity } from "src/modules/ticket-detail/domain/model/ticketDetail.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('tag')
export class TagEntity {

    @AutoMap()
    @PrimaryGeneratedColumn('increment')
    id: number;

    @AutoMap()
    @Column('varchar')
    name: string;

    @OneToMany(
        () => TicketDetailEntity,
        (ticketDetailEntity) => ticketDetailEntity.tag,
        {cascade: true}
    )
    ticketDetails: TicketDetailEntity[];
}