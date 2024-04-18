import {UserResponse} from "@/src/modules/user/infra/types/user.response";
import {UserEntity} from "@/src/modules/user/infra/types/user.entity";

export const userResponseMapper = (user: UserResponse): UserEntity => {
    return {
        id: user.id,
        username: user.username,
        email: user.email,
        fullName: user.full_name,
        disabled: user.disabled,
        favorates: user.favorates,
        hashedPassword: user.hashed_password
    }
}