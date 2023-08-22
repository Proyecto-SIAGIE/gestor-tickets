import { RoleEntity } from "../model/role.entity";

export interface RoleRepository {
    createRole(role: RoleEntity): Promise<RoleEntity>;
    findRoleById(id: number):Promise<RoleEntity | null>;
    listAllRoles():Promise<RoleEntity[]>
}