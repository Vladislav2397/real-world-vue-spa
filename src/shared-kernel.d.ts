declare type DateTime = Date
declare type Pagination = {
    limit?: number
    offset?: number
}

declare type FeedTab = {
    id: string
    title: string
}

type Tag = string

type UserName = string & { __tag?: "UserName" }
type User = {
    username: UserName
    bio: string | null
    image: UserImage
    following: boolean
}

type ArticleSlug = string & { __tag?: "ArticleSlug" }
type Article = {
    slug: ArticleSlug
    title: string
    description: string
    body: string
    tagList: Tag[]
    createdAt: DateTime
    updatedAt: DateTime
    favorited: boolean
    favoritesCount: number
    author: UserName
    comments: CommentId[]
}

type CommentId = number
type Comment = {
    id: CommentId
    author: User
    createdAt: DateTime
    updatedAt: DateTime
    body: string
    article: Article
}
