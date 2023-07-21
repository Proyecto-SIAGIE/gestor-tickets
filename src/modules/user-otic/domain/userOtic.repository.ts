import { UserOticEntity } from "./model/userOtic.entity";

export interface UserOticRepository {
    createUserOtic(user: UserOticEntity): Promise<UserOticEntity>;
    updateUserOticById(id: number, userRequest: UserOticEntity): Promise<UserOticEntity>;
    deleteUserOticById(id: number): Promise<UserOticEntity>;
    findUserOticById(id: number):Promise<UserOticEntity | null>;
    listAllUserOtics():Promise<UserOticEntity[]>;
}