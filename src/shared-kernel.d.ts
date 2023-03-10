/** DateTime is a timestamp string */
declare type DateTime = BrandType<Date>
declare type Pagination = {
    limit?: number
    offset?: number
}

declare type FeedTab = {
    id: string
    title: string
}

declare type BrandType<T> = T & { __tag?: "brandType" }
declare type Maybe<T> = T | null

type Tag = string

type UserName = string & { __tag?: "UserName" }
type User = {
    username: UserName
    bio: string | null
    image: UserImage
    following: boolean
}

// type ArticleSlug = string & { __tag?: "ArticleSlug" }
// type Article = {
//     slug: ArticleSlug
//     title: string
//     description: string
//     body: string
//     tagList: Tag[]
//     createdAt: DateTime
//     updatedAt: DateTime
//     favorited: boolean
//     favoritesCount: number
//     author: UserName
//     comments: CommentId[]
// }

type CommentId = number
type Comment = {
    id: CommentId
    author: User
    createdAt: DateTime
    updatedAt: DateTime
    body: string
    article: Article
}
