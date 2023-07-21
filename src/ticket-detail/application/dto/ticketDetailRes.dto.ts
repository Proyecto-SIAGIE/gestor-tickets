import { AutoMap } from "@automapper/classes";

export class TicketDetailResponseDto {

    @AutoMap()
    id: number;

    @AutoMap()
    data: Date;

    @AutoMap()
    dateMod: Date;

    @AutoMap()
    assignedTechId: number;

    @AutoMap()
    assignedTechName: string;

    @AutoMap()
    solveDate: Date;

    @AutoMap()
    source: string;

    @AutoMap()
    status: number;

    @AutoMap()
    priority: number;

    @AutoMap()
    impact: number;

    @AutoMap()
    urgency: number;

    @AutoMap()
    summary: string;

    @AutoMap()
    modality: string;

    @AutoMap()
    type: number;

    @AutoMap()
    process: string;

    @AutoMap()
    usiStatus: number;

    @AutoMap()
    tagId: number;
}