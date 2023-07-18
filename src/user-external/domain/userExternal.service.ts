import { TicketRequestDto } from "src/ticket/application/dto/ticketReq.dto";
import { UserExternalRequestDto } from "../application/dto/userExternalReq.dto";
import { UserExternalResponseDto } from "../application/dto/userExternalRes.dto";
import { TicketResponseDto } from "src/ticket/application/dto/ticketRes.dto";

export interface UserExternalService {
    registerUserExternal(user: UserExternalRequestDto): Promise<UserExternalResponseDto>;
    updateUserExternalById(id: number, userRequest: UserExternalRequestDto): Promise<UserExternalResponseDto>;
    deleteUserExtenalById(id: number): Promise<UserExternalResponseDto>;
    findUserExternalById(id: number): Promise<UserExternalResponseDto | null>;
    listAllUserExternals(): Promise<UserExternalResponseDto[]>;
    
    assignRoleToUserExternal(roleId: number, userId: number): Promise<UserExternalResponseDto>;
    unassignRoleToUserExternal(roleId: number, userId: number): Promise<UserExternalResponseDto>;
    listUserExternalsByRoleId(roleId: number): Promise<UserExternalResponseDto[]>;

    createTicketByRequesterUserId(userId: number, ticket: TicketRequestDto): Promise<TicketResponseDto>;
}