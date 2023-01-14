// import commentApiMock from "./index.mock"
import {
    IArticleAddCommentRequestParams,
    IComment,
} from "@/services/realWorldApi/models"
import RealWorldApiInstance from "@/services/realWorldApi/RealWorldApiBase"
import { CommentApi } from "@/entities/comment/api/index.types"

const ARTICLES_PATH = "/articles"

export const ArticleAddComment = async (
    slug: string,
    params: IArticleAddCommentRequestParams
): Promise<IComment> => {
    const res = await RealWorldApiInstance.post(
        `${ARTICLES_PATH}/${slug}/comments`,
        {
            comment: params,
        }
    )
    return res?.data?.comment as IComment
}

export const ArticleGetComments = async (slug: string): Promise<IComment[]> => {
    const res = await RealWorldApiInstance.get(
        `${ARTICLES_PATH}/${slug}/comments`
    )
    return res?.data?.comments as IComment[]
}

export const ArticleDeleteComment = async (
    slug: string,
    commentId: number
): Promise<void> => {
    await RealWorldApiInstance.delete(
        `${ARTICLES_PATH}/${slug}/comments/${commentId}`
    )
}

const commentApi: CommentApi = {
    getList: ArticleGetComments,
    add: ArticleAddComment,
    remove: ArticleDeleteComment,
    // ...commentApiMock,
}

export default commentApi
