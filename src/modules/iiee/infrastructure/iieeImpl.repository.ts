import { InjectRepository } from "@nestjs/typeorm";
import { IieeRepository } from "../domain/interface/iiee.repository";
import { IieeEntity } from "../domain/model/iiee.entity";
import { Repository } from "typeorm";

export class IieeImplRepository implements IieeRepository{
    
    constructor(
        @InjectRepository(IieeEntity)
        private readonly iieeOrmRepository: Repository<IieeEntity>
    ){}
    
    async createIiee(iiee: IieeEntity): Promise<IieeEntity> {
        const iieePreload = this.iieeOrmRepository.create(iiee);
        const resultIiee = await this.iieeOrmRepository.save(iieePreload);
        return resultIiee;
    }
    
    async updateIieeById(id: number, iieeUpdate: IieeEntity): Promise<IieeEntity> {
        const iiee = await this.iieeOrmRepository.findOneBy({id: id});
        if (!iiee) return null;

        const iieePreload = await this.iieeOrmRepository.preload({
            id: iiee.id,
            ...iieeUpdate
        })
        const iieeUpdated = await this.iieeOrmRepository.save(iieePreload);
        return iieeUpdated;
    }
    
    async deleteIieeById(id: number): Promise<IieeEntity> {
        const iiee = await this.iieeOrmRepository.findOneBy({id: id});
        if(!iiee) return null;
        const resultIiee =  await this.iieeOrmRepository.remove(iiee);
        return resultIiee;
    }
    
    async findIieeById(id: number): Promise<IieeEntity> {
        const iiee = this.iieeOrmRepository.findOneBy({ id: id });
        return iiee;
    }

    findIieeByModularCode(iieeModularCode: string) {
        const iiee = this.iieeOrmRepository.findOneBy({ modularCode: iieeModularCode });
        return iiee;
    }
    
    async listAllIiees(): Promise<IieeEntity[]> {
        const iiees = this.iieeOrmRepository.find();
        return iiees;
    }

}