import { InjectRepository } from "@nestjs/typeorm";
import { UserOticEntity } from "../domain/model/userOtic.entity";
import { UserOticRepository } from "../domain/userOtic.repository";
import { Repository } from "typeorm";

export class UserOticImplRepository implements UserOticRepository {
    constructor(
        @InjectRepository(UserOticEntity)
        private readonly userOrmRepository: Repository<UserOticEntity>,
    ){}
    
    async createUserOtic(user: UserOticEntity): Promise<UserOticEntity> {
        const userPreload = this.userOrmRepository.create(user);
        const resultUser = await this.userOrmRepository.save(userPreload);
        return resultUser;
    }
    
    async updateUserOticById(id: number, userRequest: UserOticEntity): Promise<UserOticEntity> {
        const user = await this.findUserOticById(id);
        if (!user) return null;

        const userPreload = await this.userOrmRepository.preload({
            id: user.id,
            ...userRequest
        })

        const userUpdated = await this.userOrmRepository.save(userPreload);
        return userUpdated;
    }
    
    async deleteUserOticById(id: number): Promise<UserOticEntity> {
        const user = await this.findUserOticById(id);
        if (!user) return null;
        const resultUser = await this.userOrmRepository.remove(user);
        return resultUser;
    }
    
    async findUserOticById(id: number): Promise<UserOticEntity> {
        const user = this.userOrmRepository.findOneBy({ id: id });
        return user;
    }
    
    async listAllUserOtics(): Promise<UserOticEntity[]> {
        const users = this.userOrmRepository.find();
        return users;
    }

}