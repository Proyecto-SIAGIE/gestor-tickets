import { RoleRequestDto } from "../application/dto/roleReq.dto";
import { RoleResponseDto } from "../application/dto/roleRes.dto";

/*
https://docs.nestjs.com/providers#services
*/
export interface RoleService {
    registerRole(role: RoleRequestDto): Promise<RoleResponseDto>;
    findRoleById(id: number):Promise<RoleResponseDto | null>;
    listAllRoles():Promise<RoleResponseDto[]>
}
