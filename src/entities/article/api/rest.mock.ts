import { IArticle } from "@/services/realWorldApi/models"

import { Article, ArticleSlug } from "@/shared/domain"
import ApiStoreMock, { articleStoreApiMock } from "@/shared/api/mock"
import lib from "@/shared/lib"

const { utils } = lib

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
        console.log("articleApiMock.create", params)

        if (!params.title || !params.body || !params.tagList?.length) {
            throw new Error("Article is not valid")
        }

        const currentDate = new Date()
        const { length: slug } = Object.keys(ApiStoreMock.articles.pool)

        const article = {
            ...params,
            createdAt: currentDate,
            updatedAt: currentDate,
            favorited: false,
            comments: [],
            favoritesCount: 0,
            slug: `${slug + 1}`,
            tagList: params.tagList ?? [],
            author: {
                following: false,
                username: "vladislav",
                image: null,
                bio: null,
            },
        }

        articleStoreApiMock.actions.create({
            ...article,
            author: article.author.username,
            createdAt: article.createdAt.toString(),
            updatedAt: article.updatedAt.toString(),
        })

        return article
    },
    async update(slug, params) {
        const article = getArticleBySlug(slug)
        const articleAuthor = ApiStoreMock.users.pool[article.author]

        articleStoreApiMock.actions.update({
            slug,
            ...params,
        })

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

        articleStoreApiMock.actions.remove(slug)

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

        articleStoreApiMock.actions.addToFavorite(slug)

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

        articleStoreApiMock.actions.removeFromFavorite(slug)

        return {
            ...article,
            favorited: false,
            // favoritesCount: article.favoritesCount,
            author: {
                ...articleAuthor,
                following: false,
            },
        }
    },
}

export default articleApiMock
