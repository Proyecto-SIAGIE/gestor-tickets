import { InjectRepository } from "@nestjs/typeorm";
import { UserExternalEntity } from "../domain/model/userExternal.entity";
import { userExternalRepository } from "../domain/userExternal.repository";
import { Repository } from "typeorm";

export class UserExternalImplRepository implements userExternalRepository {
    constructor(
        @InjectRepository(UserExternalEntity)
        private readonly userOrmRepository: Repository<UserExternalEntity>) { }
        
    async createUserExternal(user: UserExternalEntity): Promise<UserExternalEntity> {
        const userPreload = this.userOrmRepository.create(user);
        const resultUser = await this.userOrmRepository.save(userPreload);
        return resultUser;
    }
    
    async updateUserExternalById(id: number, userRequest: UserExternalEntity): Promise<UserExternalEntity> {
        const user = await this.findUserExternalById(id);
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