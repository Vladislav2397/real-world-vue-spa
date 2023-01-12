import ApiStoreMock from "@/shared/api/mock"
import { Comment, CommentId, WrittenComment } from "../types"

import type { ArticleSlug } from "@/entities/article"

const getComment = () =>
    ApiStoreMock.comments.pool["33550"] as unknown as Comment

const addComment = async (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _slug: ArticleSlug,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _params: WrittenComment
): Promise<Comment> => {
    return getComment()
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getComments = async (_slug: ArticleSlug): Promise<Comment[]> => {
    return []
}

const deleteComment = async (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _slug: ArticleSlug,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _commentId: CommentId
): Promise<void> => {
    //
}

const commentApiMock = {
    addComment,
    getComments,
    deleteComment,
}

export default commentApiMock
