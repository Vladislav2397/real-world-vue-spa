import articles from "./article.mock.json"

type ArticleApi = {
    slug: ArticleSlug
    title: string
    description: string
    body: string
    tagList: string[]
    createdAt: string
    updatedAt: string
    favoritesCount: number
    author: UserName
}

type Articles = {
    pool: Record<ArticleSlug, ArticleApi>
    articlesCount: number
}

type ArticleActions = {
    create: (article: ArticleApi) => void
    update: (article: ArticleApi) => void
}

const state: Articles = {
    ...articles,
}
const actions: ArticleActions = {
    create(article) {
        state.pool[article.slug] = article
    },
    update(article) {
        const existsArticle = state.pool[article.slug]

        if (existsArticle) {
            state.pool[article.slug] = {
                ...existsArticle,
                ...article,
            }
        } else {
            throw new Error("Article is not exists")
        }
    },
}

const articleStoreApiMock = {
    state,
    actions,
}

export default articleStoreApiMock
