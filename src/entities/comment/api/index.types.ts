type Profile = {
    username: string
    bio: string | null
    image: string | null
    following: boolean
}

type WrittenComment = {
    body: string
}

type Comment = {
    id: number
    createdAt: Date
    updatedAt: Date
    body: string
    author: Profile
}

export type CommentApi = {
    getList: (slug: ArticleSlug) => Promise<Comment[]>
    add: (slug: ArticleSlug, params: WrittenComment) => Promise<Comment>
    remove: (slug: ArticleSlug, commentId: CommentId) => Promise<void>
}
