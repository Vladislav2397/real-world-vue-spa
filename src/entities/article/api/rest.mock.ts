import { IArticle } from "@/services/realWorldApi/models"

import ApiStoreMock from "@/shared/api/mock"
import utils from "@/shared/lib/utils"

import { ArticleApi } from "./rest.types"

const getArticleBySlug = (slug: ArticleSlug) => {
    return ApiStoreMock.articles.pool[slug] as unknown as Article
}

const mapArticleStore = (article: any): IArticle => {
    const currentUser = ApiStoreMock.users.pool[ApiStoreMock.users.currentUser!]
    const articleUser = ApiStoreMock.users.pool[article.author]

    return {
        ...article,
        createdAt: new Date(article.createdAt),
        updatedAt: new Date(article.updatedAt),
        favorited: currentUser.favorites.includes(article.slug),
        author: {
            ...utils.object.pick(articleUser, ["username", "bio", "image"]),
            following: currentUser.following.includes(articleUser.username),
        },
    }
}

const articleApiMock: ArticleApi = {
    async getList({ limit, offset, tag, favorited, author }) {
        let articles: IArticle[] = utils.other.getPaginatedList(
            Object.values(ApiStoreMock.articles.pool).map(mapArticleStore),
            { limit, offset }
        )

        if (tag) {
            articles = articles.filter(article => article.tagList.includes(tag))
        }

        if (author) {
            articles = articles.filter(
                article => article.author.username === author
            )
        }

        if (favorited) {
            articles = articles.filter(article => article.favorited)
        }

        return {
            articles,
            articlesCount: ApiStoreMock.articles.articlesCount,
        }
    },
    async getItem(slug) {
        const article = getArticleBySlug(slug)
        const articleAuthor = ApiStoreMock.users.pool[article.author]

        return {
            ...article,
            author: {
                ...articleAuthor,
                following: false,
            },
        }
    },
    async getFeed(pagination) {
        const articles: IArticle[] = Object.values(
            ApiStoreMock.articles.pool
        ).map(mapArticleStore)

        const filteredArticles = articles.filter(
            item => item.author.username === "vladislav"
        )

        return {
            articles: utils.other.getPaginatedList(
                filteredArticles,
                pagination
            ),
            articlesCount: filteredArticles.length,
        }
    },
    async create(params) {
        const article = getArticleBySlug("1")
        const articleAuthor = ApiStoreMock.users.pool[article.author]

        return {
            ...article,
            ...params,
            author: {
                ...articleAuthor,
                following: false,
            },
        }
    },
    async update(slug, params) {
        const article = getArticleBySlug(slug)
        const articleAuthor = ApiStoreMock.users.pool[article.author]

        return {
            ...article,
            ...params,
            author: {
                ...articleAuthor,
                following: false,
            },
        }
    },
    async remove(slug) {
        const article = getArticleBySlug(slug)
        const articleAuthor = ApiStoreMock.users.pool[article.author]

        return {
            ...article,
            author: {
                ...articleAuthor,
                following: false,
            },
        }
    },
    async addToFavorites(slug) {
        const article = getArticleBySlug(slug)
        const articleAuthor = ApiStoreMock.users.pool[article.author]

        return {
            ...article,
            favorited: true,
            favoritesCount: article.favoritesCount + 1,
            author: {
                ...articleAuthor,
                following: false,
            },
        }
    },
    async removeFromFavorites(slug) {
        const article = getArticleBySlug(slug)
        const articleAuthor = ApiStoreMock.users.pool[article.author]

        return {
            ...article,
            favorited: false,
            favoritesCount: article.favoritesCount,
            author: {
                ...articleAuthor,
                following: false,
            },
        }
    },
}

export default articleApiMock
