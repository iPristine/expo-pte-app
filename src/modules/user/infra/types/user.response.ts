export type UserResponse = {
    id: string
    username: string
    email: string
    full_name: string
    disabled: boolean
    favorates: string[],
    hashed_password: string
}