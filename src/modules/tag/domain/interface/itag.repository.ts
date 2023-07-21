import { TicketEntity } from "src/modules/ticket/domain/model/ticket.entity";
import { TagEntity } from "../model/tag.entity";
import { TicketDetailEntity } from "src/modules/ticket-detail/domain/model/ticketDetail.entity";

export interface ITagRepository {
    createTag(tag: TagEntity): Promise<TagEntity>;
    updateTagById(id: number, tag: TagEntity): Promise<TagEntity>;
    deleteTagById(id: number): Promise<TagEntity>;
    listAllTags(): Promise<TagEntity[]>;
    findTagById(id: number): Promise<TagEntity | null>;
    findTicketsByTagId(id: number): Promise<TicketEntity[]>;
    assignTagToTicketDetail(id: number, tdetailId: number): Promise<TicketDetailEntity>
}