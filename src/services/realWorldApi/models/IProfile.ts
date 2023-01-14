export default interface IProfile {
    username: string
    bio: string | null // ?? add null
    image: string | null
    following: boolean
}
