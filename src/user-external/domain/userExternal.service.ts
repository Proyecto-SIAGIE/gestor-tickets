import { UserExternalRequestDto } from "../application/dto/userExternalReq.dto";
import { UserExternalResponseDto } from "../application/dto/userExternalRes.dto";

export interface UserExternalService {
    registerUserExternal(user: UserExternalRequestDto): Promise<UserExternalResponseDto>;
    updateUserExternalById(id: number, userRequest: UserExternalRequestDto): Promise<UserExternalResponseDto>;
    deleteUserExtenalById(id: number): Promise<UserExternalResponseDto>;
    findUserExternalById(id: number): Promise<UserExternalResponseDto | null>;
    listAllUserExternals(): Promise<UserExternalResponseDto[]>;
    
    assignRoleToUserExternal(roleId: number, userId: number): Promise<UserExternalResponseDto>;
    unassignRoleToUserExternal(roleId: number, userId: number): Promise<UserExternalResponseDto>;
    listUserExternalsByRoleId(roleId: number): Promise<UserExternalResponseDto[]>;
}