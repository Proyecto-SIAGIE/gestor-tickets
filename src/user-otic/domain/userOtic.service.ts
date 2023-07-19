import { UserOticRequestDto } from "../application/dto/userOticReq.dto";
import { UserOticResponseDto } from "../application/dto/userOticRes.dto";

export interface UserOticService {
    registerUserOtic(user: UserOticRequestDto): Promise<UserOticResponseDto>;
    updateUserOticById(id: number, userRequest: UserOticRequestDto): Promise<UserOticResponseDto>;
    deleteUserOticById(id: number): Promise<UserOticResponseDto>;
    findUserOticById(id: number): Promise<UserOticResponseDto | null>;
    listAllUserOtics(): Promise<UserOticResponseDto[]>;
}