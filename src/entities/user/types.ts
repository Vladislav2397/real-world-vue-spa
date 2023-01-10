type UserName = string
type UserImage = string | null

export type User = {
    username: UserName
    bio: string
    image: UserImage
    following: boolean
}
