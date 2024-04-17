
export type CurrentUserEntity = {
  id: string
  username: string,
  email: string,
  fullName: string,
  disabled: boolean,
  favorates: any[],
  hashedPassword: string,
}
