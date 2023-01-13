import {
    IArticleGetListRequestParams,
    IArticleList,
    IArticleUpdateRequestParams,
} from "@/services/realWorldApi/models"
import IArticle from "@/services/realWorldApi/models/IArticle"
import ApiStoreMock from "@/shared/api/mock"
import { ArticleSlug } from "@/entities/article"

const getArticleBySlug = (slug: ArticleSlug) => {
    return ApiStoreMock.articles.pool[slug] as unknown as IArticle
}

const getList = async (
    params: IArticleGetListRequestParams
): Promise<IArticleList> => {
    let articles = Object.values(
        ApiStoreMock.articles.pool
    ) as unknown as IArticleList["articles"]

    if (params.tag) {
        const { tag } = params
        articles = articles.filter(article => article.tagList.includes(tag))
    }

    if (params.author) {
        const { author } = params
        articles = articles.filter(
            article => article.author.username === author
        )
    }

    if (params.favorited) {
        articles = articles.filter(article => article.favorited)
    }

    return {
        articles,
        articlesCount: ApiStoreMock.articles.articlesCount,
    }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getFeed = async (..._args: any[]): Promise<IArticleList> => {
    const articles = Object.values(
        ApiStoreMock.articles.pool
    ) as unknown as IArticleList["articles"]

    const filteredArticles = articles.filter(
        item => item.author.username === "vladislav"
    )

    return {
        articles: filteredArticles,
        articlesCount: filteredArticles.length,
    }
}

const getItem = async (slug: ArticleSlug): Promise<IArticle> => {
    return getArticleBySlug(slug)
}

const returnArticle = () =>
    ApiStoreMock.articles.pool["new-article-128390"] as unknown as IArticle

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const create = async (_params: unknown): Promise<IArticle> => {
    return returnArticle()
}

const update = async (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _slug: ArticleSlug,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _params: IArticleUpdateRequestParams
): Promise<IArticle> => {
    return returnArticle()
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const remove = async (_slug: ArticleSlug): Promise<IArticle> => {
    return returnArticle()
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const addToFavorites = async (_slug: ArticleSlug): Promise<IArticle> => {
    return returnArticle()
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const removeFromFavorites = async (
    _slug: ArticleSlug
): Promise<IArticle> => {
    return returnArticle()
}

const articleApiMock = {
    getList,
    getItem,
    getFeed,
    create,
    update,
    remove,
    addToFavorites,
    removeFromFavorites,
}

export default articleApiMock
