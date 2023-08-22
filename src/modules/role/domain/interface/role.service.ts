import { IGenericResponse } from "src/utils/generic";
import { RoleRequestDto } from "../../application/dto/roleReq.dto";
import { RoleResponseDto } from "../../application/dto/roleRes.dto";

/*
https://docs.nestjs.com/providers#services
*/
export interface RoleService {
    registerRole(role: RoleRequestDto): Promise<IGenericResponse<RoleResponseDto>>;
    findRoleById(id: number):Promise<IGenericResponse<RoleResponseDto>>;
    listAllRoles():Promise<RoleResponseDto[]>
}
