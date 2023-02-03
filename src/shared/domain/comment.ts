import type { User } from "./user"
import type { Article } from "./article"

export type CommentId = BrandType<number>
export type Comment = {
    id: CommentId
    author: User
    createdAt: DateTime
    updatedAt: DateTime
    body: string
    article: Article
}
