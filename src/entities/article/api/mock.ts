import {
    IArticleAddCommentRequestParams,
    IArticleUpdateRequestParams,
    IComment,
} from "@/services/realWorldApi/models"
import IArticle from "@/services/realWorldApi/models/IArticle"
import ApiStoreMock from "@/shared/api/mock"

const getList = async (...args: any[]) => {
    return {
        articles: Object.values(ApiStoreMock.articles.pool),
        articlesCount: ApiStoreMock.articles.articlesCount,
    }
}

const returnArticle = () =>
    ApiStoreMock.articles.pool["new-article-128390"] as unknown as IArticle

const create = async (params: any): Promise<IArticle> => {
    return returnArticle()
}

const update = async (
    slug: string,
    params: IArticleUpdateRequestParams
): Promise<IArticle> => {
    return returnArticle()
}

const remove = async (slug: string): Promise<IArticle> => {
    return returnArticle()
}

const getComment = () =>
    ApiStoreMock.comments.pool["33550"] as unknown as IComment

const addComment = async (
    slug: string,
    params: IArticleAddCommentRequestParams
): Promise<IComment> => {
    return getComment()
}

const getComments = async (slug: string): Promise<IComment[]> => {
    return []
}

const deleteComment = async (
    slug: string,
    commentId: number
): Promise<void> => {
    //
}

export const addToFavorites = async (slug: string): Promise<IArticle> => {
    return returnArticle()
}

export const removeFromFavorites = async (slug: string): Promise<IArticle> => {
    return returnArticle()
}

const articleApiMock = {
    getList,
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
