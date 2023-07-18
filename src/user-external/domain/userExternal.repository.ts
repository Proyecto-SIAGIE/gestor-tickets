import { UserExternalEntity } from "./model/userExternal.entity";

export interface userExternalRepository{
    createUserExternal(user: UserExternalEntity): Promise<UserExternalEntity>;
    updateUserExternalById(id: number, userRequest: UserExternalEntity): Promise<UserExternalEntity>;
    deleteUserExtenalById(id: number): Promise<UserExternalEntity>;
    findUserExternalById(id: number):Promise<UserExternalEntity | null>;
    listAllUserExternals():Promise<UserExternalEntity[]>;

    assignRoleToUserExternal(roleId: number, userId: number): Promise<UserExternalEntity>;
    unassignRoleToUserExternal(roleId: number, userId: number): Promise<UserExternalEntity>;
    listUserExternalsByRoleId(roleId: number): Promise<UserExternalEntity[]>;
}