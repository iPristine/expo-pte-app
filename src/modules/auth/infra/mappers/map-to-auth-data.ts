import {LoginResponse} from "@/src/modules/auth/infra/types/login.response";
import {LoginEntity} from "@/src/modules/auth/infra/types/login.entity";

export const mapToAuthData= (data: LoginResponse): LoginEntity => ({
    accessToken: data.access_token,
    tokenType: data.token_type
})