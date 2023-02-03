export type UserName = BrandType<string>
export type UserImage = BrandType<Maybe<string>>

export type User = {
    username: UserName
    bio: string | null
    image: UserImage
    following: boolean
}
