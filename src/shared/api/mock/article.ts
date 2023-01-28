import mockJson from "./json"

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

type PartialWithOmit<T, K extends keyof T> = Partial<Omit<T, K>> & Pick<T, K>

type ArticleActions = {
    create: (article: ArticleApi) => void
    update: (article: PartialWithOmit<ArticleApi, "slug">) => void
    remove: (slug: ArticleSlug) => void
    addToFavorite: (slug: ArticleSlug) => void
    removeFromFavorite: (slug: ArticleSlug) => void
}

const state: Articles = {
    ...mockJson.articles,
}
const getters = {
    get articleBySlug() {
        return (slug: ArticleSlug) => state.pool[slug]
    },
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
    remove(slug) {
        const article = { ...state.pool[slug] }

        delete state.pool[slug]

        return article
    },
    addToFavorite(slug) {
        state.pool[slug].favoritesCount += 1
        const user = mockJson.users.pool[mockJson.users.currentUser!]
        user.favorites = [...new Set([...user.favorites, slug])]
    },
    removeFromFavorite(slug) {
        state.pool[slug].favoritesCount -= 1
        const user = mockJson.users.pool[mockJson.users.currentUser!]
        user.favorites = user.favorites.filter(item => item !== slug)
    },
}

const articleStoreApiMock = {
    state,
    getters,
    actions,
}

export default articleStoreApiMock
