import { UserExternalRequestDto } from "../application/dto/userExternalReq.dto";
import { UserExternalResponseDto } from "../application/dto/userExternalRes.dto";

export interface UserExternalService {
    registerUserExternal(user: UserExternalRequestDto): Promise<UserExternalResponseDto>;
    updateUserExternalById(id: number, userRequest: UserExternalRequestDto): Promise<UserExternalResponseDto>;
    deleteUserExtenalById(id: number): Promise<UserExternalResponseDto>;
    findUserExternalById(id: number):Promise<UserExternalResponseDto | null>;
    listAllUserExternals():Promise<UserExternalResponseDto[]>;
}