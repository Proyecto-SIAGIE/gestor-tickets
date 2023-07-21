import { TicketResponseDto } from "src/modules/ticket/application/dto/ticketRes.dto";
import { TagRequestDto } from "../../application/dto/tagReq.dto";
import { TagResponseDto } from "../../application/dto/tagRes.dto";
import { TicketDetailResponseDto } from "src/modules/ticket-detail/application/dto/ticketDetailRes.dto";

export interface ITagService {
    registerTag(tag: TagRequestDto): Promise<TagResponseDto>;
    updateTagById(id: number, tag: TagRequestDto): Promise<TagResponseDto>;
    deleteTagById(id: number): Promise<TagResponseDto>;
    listAllTags(): Promise<TagResponseDto[]>;
    findTagById(id: number): Promise<TagResponseDto | null>;
    findTicketsByTagId(id: number): Promise<TicketResponseDto[]>;
    assignTagToTicketDetail(id: number, tdetailId: number): Promise<TicketDetailResponseDto>
}