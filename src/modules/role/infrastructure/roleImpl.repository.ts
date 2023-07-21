import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { RoleEntity } from "../domain/model/role.entity";
import { RoleRepository } from "../domain/role.repository";

@Injectable()
export class RoleImplRepository implements RoleRepository {
    constructor(
        @InjectRepository(RoleEntity)
        private readonly roleOrmRepository: Repository<RoleEntity>) { }
    
    async createRole(role: RoleEntity): Promise<RoleEntity> {

        const rolePreload = this.roleOrmRepository.create(role);
        const resultRole = await this.roleOrmRepository.save(rolePreload);
        return resultRole;
    }

    async findRoleById(id: number): Promise<RoleEntity> {
        const role = this.roleOrmRepository.findOneBy({ id: id });
        return role;
    }

    async listAllRoles(): Promise<RoleEntity[]> {
        const roles = this.roleOrmRepository.find();
        return roles;
    }

}