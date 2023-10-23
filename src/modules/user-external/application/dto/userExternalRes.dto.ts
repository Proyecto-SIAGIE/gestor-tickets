import { AutoMap } from "@automapper/classes";
import { RoleResponseDto } from "src/modules/role/application/dto/roleRes.dto";


export class UserExternalResponseDto {

    @AutoMap()
    id: number;

    @AutoMap()
    passportUserId: number;

    @AutoMap()
    username: string;

    @AutoMap()
    dni: string;

    @AutoMap()
    name: string;

    @AutoMap()
    lastName: string;

    @AutoMap()
    email: string;

    @AutoMap()
    phone: string;

    @AutoMap()
    phoneExt: string;

    @AutoMap()
    roleId: number;
    
    //@AutoMap()
    role: RoleResponseDto
}
