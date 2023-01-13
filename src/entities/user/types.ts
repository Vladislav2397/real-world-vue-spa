type UserName = string
type UserImage = string | null

export type User = {
    username: UserName
    bio: string | null
    image: UserImage
    following: boolean
}
