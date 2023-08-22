import { IGenericResponse } from "src/utils/generic";
import { UserOticRequestDto } from "../../application/dto/userOticReq.dto";
import { UserOticResponseDto } from "../../application/dto/userOticRes.dto";

export interface UserOticService {
    registerUserOtic(user: UserOticRequestDto): Promise<IGenericResponse<UserOticResponseDto>>;
    updateUserOticById(id: number, userRequest: UserOticRequestDto): Promise<IGenericResponse<UserOticResponseDto>>;
    deleteUserOticById(id: number): Promise<IGenericResponse<UserOticResponseDto>>;
    findUserOticById(id: number): Promise<IGenericResponse<UserOticResponseDto>>;
    listAllUserOtics(): Promise<UserOticResponseDto[]>;
}