import { InjectRepository } from "@nestjs/typeorm";
import { UserExternalEntity } from "../domain/model/userExternal.entity";
import { userExternalRepository } from "../domain/interface/userExternal.repository";
import { Repository } from "typeorm";
import { ErrorManager } from "src/utils/errors/error.manager";
import { RoleEntity } from "src/modules/role/domain/model/role.entity";
import { TicketEntity } from "src/modules/ticket/domain/model/ticket.entity";


export class UserExternalImplRepository implements userExternalRepository {
    constructor(
        @InjectRepository(UserExternalEntity)
        private readonly userOrmRepository: Repository<UserExternalEntity>,
        @InjectRepository(RoleEntity)
        private readonly roleOrmRepository: Repository<RoleEntity>,
        @InjectRepository(TicketEntity)
        private readonly ticketOrmRepository: Repository<TicketEntity>,
        ) { }
    
    getOrmRepository() {
        return this.userOrmRepository;
    }
    
    async createTicketByRequesterUserId(userId: number, ticket: TicketEntity): Promise<TicketEntity> {
        const user = await this.findUserExternalById(userId);
        if(!user){
            throw new ErrorManager({
                type: 'NOT_FOUND',
                message: `User with Id ${userId} not found`
            })
        }

        ticket.userExternal = user;
        const ticketPreload = this.ticketOrmRepository.create(ticket);
        const resultTicket = await this.ticketOrmRepository.save(ticketPreload);
        return resultTicket;
    }

    async assignRoleToUserExternal(roleId: number, userId: number): Promise<UserExternalEntity> {
        const user = await this.findUserExternalById(userId);
        if (!user) return null;

        const role = await this.roleOrmRepository.findOneBy({id: roleId});
        if(!role) throw new ErrorManager({
            type: 'NOT_FOUND',
            message: `Role with Id ${roleId} not found`
        })

        const userPreload = await this.userOrmRepository.preload({
            id: user.id,
            role: role,
            ...user
        })
        const userUpdated = await this.userOrmRepository.save(userPreload);
        return userUpdated;
    }

    async unassignRoleToUserExternal(roleId: number, userId: number): Promise<UserExternalEntity> {
        const user = await this.findUserExternalById(userId);
        if (!user) return null;

        const role = await this.roleOrmRepository.findOneBy({id: roleId});
        if(!role) throw new ErrorManager({
            type: 'NOT_FOUND',
            message: `Role with Id ${roleId} not found`
        })

        const userPreload = await this.userOrmRepository.preload({
            id: user.id,
            role: null,
            ...user
        })
        const userUpdated = await this.userOrmRepository.save(userPreload);
        return userUpdated;
        
    }

    async listUserExternalsByRoleId(roleId: number): Promise<UserExternalEntity[]> {
        const users = this.userOrmRepository.find({ where: { role: { id: roleId } } });
        return users;
    }

    async createUserExternal(user: UserExternalEntity): Promise<UserExternalEntity> {
        const userPreload = this.userOrmRepository.create(user);
        const resultUser = await this.userOrmRepository.save(userPreload);
        return resultUser;
    }

    async updateUserExternalById(id: number, userRequest: UserExternalEntity): Promise<UserExternalEntity> {
        const user = await this.findUserExternalById(id);
        if (!user) return null;
        const userPreload = await this.userOrmRepository.preload({
            id: user.id,
            role: user.role,
            ...userRequest
        })
        const userUpdated = await this.userOrmRepository.save(userPreload);
        return userUpdated;
    }

    async deleteUserExtenalById(id: number): Promise<UserExternalEntity> {
        const user = await this.findUserExternalById(id);
        if (!user) return null;
        const resultUser = await this.userOrmRepository.remove(user);
        return resultUser;
    }

    async findUserExternalById(id: number): Promise<UserExternalEntity> {
        const user = this.userOrmRepository.findOneBy({ id: id });
        return user;
    }

    async listAllUserExternals(): Promise<UserExternalEntity[]> {
        const users = this.userOrmRepository.find();
        return users;
    }

}