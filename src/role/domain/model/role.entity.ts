import { AutoMap } from "@automapper/classes";
import { UserExternalEntity } from "src/user-external/domain/model/userExternal.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('role')
export class RoleEntity {

    @AutoMap()
    @PrimaryGeneratedColumn('increment')
    id: number;

    @AutoMap()
    @Column('varchar')
    name: string;

    @OneToMany(
        () => UserExternalEntity,
        (userExternal) => userExternal.role,
        { cascade: true }
    )
    userExternals: UserExternalEntity[]
}