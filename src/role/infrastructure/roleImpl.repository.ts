import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { RoleEntity } from "src/role/domain/model/role.entity";
import { RoleRepository } from "src/role/domain/role.repository";
import { Repository } from "typeorm";

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