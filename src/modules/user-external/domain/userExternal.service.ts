
import { TicketRequestDto } from "src/modules/ticket/application/dto/ticketReq.dto";
import { TicketResponseDto } from "src/modules/ticket/application/dto/ticketRes.dto";
import { UserExternalRequestDto } from "../application/dto/userExternalReq.dto";
import { UserExternalResponseDto } from "../application/dto/userExternalRes.dto";
import { IGenericResponse, IPaginatedRequest, IPaginatedResponse } from "src/utils/interface/generic";

export interface UserExternalService {
    registerUserExternal(user: UserExternalRequestDto): Promise<IGenericResponse<UserExternalResponseDto>>;
    updateUserExternalById(id: number, userRequest: UserExternalRequestDto): Promise<IGenericResponse<UserExternalResponseDto>>;
    deleteUserExtenalById(id: number): Promise<IGenericResponse<UserExternalResponseDto>>;
    findUserExternalById(id: number): Promise<IGenericResponse<UserExternalResponseDto>>;
    listAllUserExternals(filter: IPaginatedRequest): Promise<IPaginatedResponse<UserExternalResponseDto>>;
    
    assignRoleToUserExternal(roleId: number, userId: number): Promise<IGenericResponse<UserExternalResponseDto>>;
    unassignRoleToUserExternal(roleId: number, userId: number): Promise<IGenericResponse<UserExternalResponseDto>>;
    listUserExternalsByRoleId(roleId: number, filter: IPaginatedRequest): Promise<IPaginatedResponse<UserExternalResponseDto>>;

    createTicketByRequesterUserId(userId: number, ticket: TicketRequestDto): Promise<IGenericResponse<TicketResponseDto>>;
}