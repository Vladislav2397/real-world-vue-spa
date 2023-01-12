import type { User } from "@/entities/user"
import type { Article } from "@/entities/article"

export type CommentId = number

export type Comment = {
    id: CommentId
    author: User
    createdAt: DateTime
    updatedAt: DateTime
    body: string
    article: Article
}

export type WrittenComment = Pick<Comment, "body">
