import type { CommentId } from "./comment"
import type { UserName } from "./user"

export type Tag = BrandType<string>

export type ArticleSlug = BrandType<string>
export type Article = {
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
