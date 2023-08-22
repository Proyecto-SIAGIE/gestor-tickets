import { TicketResponseDto } from "src/modules/ticket/application/dto/ticketRes.dto";
import { TagRequestDto } from "../../application/dto/tagReq.dto";
import { TagResponseDto } from "../../application/dto/tagRes.dto";
import { TicketDetailResponseDto } from "src/modules/ticket-detail/application/dto/ticketDetailRes.dto";
import { IGenericResponse, IPaginatedRequest, IPaginatedResponse } from "src/utils/generic";

export interface TagService {
    registerTag(tag: TagRequestDto): Promise<IGenericResponse<TagResponseDto>>;
    updateTagById(id: number, tag: TagRequestDto): Promise<IGenericResponse<TagResponseDto>>;
    deleteTagById(id: number): Promise<IGenericResponse<TagResponseDto>>;
    listAllTags(): Promise<TagResponseDto[]>;
    findTagById(id: number): Promise<IGenericResponse<TagResponseDto>>;
    findTicketsByTagId(id: number, filter: IPaginatedRequest): Promise<IPaginatedResponse<TicketResponseDto>>;
    assignTagToTicketDetail(id: number, tdetailId: number): Promise<IGenericResponse<TicketDetailResponseDto>>
}