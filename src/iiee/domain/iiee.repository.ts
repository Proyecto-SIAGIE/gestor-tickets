import { IieeEntity } from "./model/iiee.entity";

export interface IieeRepository {
    createIiee(iiee: IieeEntity): Promise<IieeEntity>;
    updateIieeById(id: number, iieeUpdate: IieeEntity):Promise<IieeEntity>;
    deleteIieeById(id: number):Promise<IieeEntity>;
    findIieeById(id: number):Promise<IieeEntity | null>;
    listAllIiees():Promise<IieeEntity[]>
}