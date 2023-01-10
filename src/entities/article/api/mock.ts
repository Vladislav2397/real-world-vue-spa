import {
    IArticleAddCommentRequestParams,
    IArticleList,
    IArticleUpdateRequestParams,
    IComment,
} from "@/services/realWorldApi/models"
import IArticle from "@/services/realWorldApi/models/IArticle"
import ApiStoreMock from "@/shared/api/mock"

const getArticleBySlug = (slug: string) => {
    return ApiStoreMock.articles.pool[slug] as unknown as IArticle
}

const getList = async (..._args: any[]): Promise<IArticleList> => {
    return {
        articles: Object.values(
            ApiStoreMock.articles.pool
        ) as unknown as IArticleList["articles"],
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

const getItem = async (slug: string): Promise<IArticle> => {
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
    _slug: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _params: IArticleUpdateRequestParams
): Promise<IArticle> => {
    return returnArticle()
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const remove = async (_slug: string): Promise<IArticle> => {
    return returnArticle()
}

const getComment = () =>
    ApiStoreMock.comments.pool["33550"] as unknown as IComment

const addComment = async (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _slug: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _params: IArticleAddCommentRequestParams
): Promise<IComment> => {
    return getComment()
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getComments = async (_slug: string): Promise<IComment[]> => {
    return []
}

const deleteComment = async (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _slug: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _commentId: number
): Promise<void> => {
    //
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const addToFavorites = async (_slug: string): Promise<IArticle> => {
    return returnArticle()
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const removeFromFavorites = async (_slug: string): Promise<IArticle> => {
    return returnArticle()
}

const articleApiMock = {
    getList,
    getItem,
    getFeed,
    create,
    update,
    remove,
    getComments,
    addComment,
    deleteComment,
    addToFavorites,
    removeFromFavorites,
}

export default articleApiMock
