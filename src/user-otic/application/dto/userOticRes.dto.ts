import { AutoMap } from "@automapper/classes";

export class UserOticResponseDto {

    @AutoMap()
    id: number;

    @AutoMap()
    username: string;

    @AutoMap()
    email: string;
}