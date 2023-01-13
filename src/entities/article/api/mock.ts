import {
    IArticleGetListRequestParams,
    IArticleList,
    IArticleUpdateRequestParams,
} from "@/services/realWorldApi/models"
import ApiStoreMock from "@/shared/api/mock"
import { Article, ArticleSlug, WrittenArticle } from "@/entities/article"

const getArticleBySlug = (slug: ArticleSlug) => {
    return ApiStoreMock.articles.pool[slug] as unknown as Article
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

const getFeed = async (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _pagination: Pagination
): Promise<IArticleList> => {
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

const getItem = async (slug: ArticleSlug): Promise<Article> => {
    return getArticleBySlug(slug)
}

const returnArticle = (article?: Partial<Article>) => {
    return {
        ...(ApiStoreMock.articles.pool[
            "new-article-128390"
        ] as unknown as Article),
        ...article,
    }
}

const create = async (params: WrittenArticle): Promise<Article> => {
    return returnArticle(params)
}

const update = async (
    slug: ArticleSlug,
    params: IArticleUpdateRequestParams
): Promise<Article> => {
    return {
        ...getArticleBySlug(slug),
        ...params,
    }
}

const remove = async (slug: ArticleSlug): Promise<Article> => {
    return getArticleBySlug(slug)
}

export const addToFavorites = async (slug: ArticleSlug): Promise<Article> => {
    console.log("add to favorites", slug)
    const article = getArticleBySlug(slug)

    return {
        ...article,
        favorited: true,
        favoritesCount: article.favoritesCount + 1,
    }
}

export const removeFromFavorites = async (
    slug: ArticleSlug
): Promise<Article> => {
    console.log("remove from favorites", slug)
    const article = getArticleBySlug(slug)

    return {
        ...article,
        favorited: false,
        favoritesCount: article.favoritesCount,
    }
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
