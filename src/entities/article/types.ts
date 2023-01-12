import { User } from "@/entities/user"

export type ArticleSlug = string

export type Article = {
    slug: ArticleSlug
    title: string
    description: string
    body: string
    tagList: string[]
    createdAt: DateTime
    updatedAt: DateTime
    favorited: boolean
    favoritesCount: number
    author: User
}

/**
 * ```ts
 *  type RecordType = { id: number, name: string, tags: any[] }
 *  type Result = PartialPick<RecordType, 'id' | 'name'>
 *  // Result = { id?: number, name?: string }
 * ```
 */
type PartialPick<T, P extends keyof T> = Partial<Pick<T, P>>

/**
 *  ```ts
 *  type RecordType = { id: number, name: string, tags: any[] }
 *  type Result = RecordPartial<RecordType, 'name' | 'tags'>
 *  // Result = { id: number, name?: string, tags?: any[] }
 *  ```
 */
type RecordPartial<T extends object, P extends keyof T> = Omit<T, P> &
    PartialPick<T, P>

export type WrittenArticle = RecordPartial<
    Pick<Article, "title" | "description" | "body" | "tagList">,
    "tagList"
>
export type UpdateArticle = Partial<WrittenArticle>
