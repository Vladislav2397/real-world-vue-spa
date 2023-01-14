type Profile = {
    username: string
    bio: string | null
    image: string | null
    following: boolean
}

type Article = {
    slug: string
    title: string
    description: string
    body: string
    tagList: string[]
    createdAt: Date
    updatedAt: Date
    favorited: boolean
    favoritesCount: number
    author: Profile
}

type ArticleList = {
    articles: Article[]
    articlesCount: number
}

type ArticleFilters = {
    tag?: string
    author?: string
    favorited?: string
} & Pagination

type CreateArticle = {
    title: string
    description: string
    body: string
    tagList?: Tag[]
}
type UpdateArticle = {
    title?: string
    description?: string
    body?: string
    tagList?: string[]
}

export type ArticleApi = {
    getList: (params: ArticleFilters) => Promise<ArticleList>
    getFeed: (params: Pagination) => Promise<ArticleList>
    getItem: (slug: ArticleSlug) => Promise<Article>
    create: (params: CreateArticle) => Promise<Article>
    update: (slug: ArticleSlug, params: UpdateArticle) => Promise<Article>
    remove: (slug: ArticleSlug) => Promise<Article>
    addToFavorites: (slug: ArticleSlug) => Promise<Article>
    removeFromFavorites: (slug: ArticleSlug) => Promise<Article>
}
