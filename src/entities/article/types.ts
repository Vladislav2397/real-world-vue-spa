import { User } from "@/entities/user"

export type ArticleSlug = string
export type Article = {
    slug: ArticleSlug
    title: string
    description: string
    body: string
    tagList: string[]
    createdAt: Date
    updatedAt: Date
    favorited: boolean
    favoritesCount: number
    author: User
}
