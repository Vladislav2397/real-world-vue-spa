import ApiStoreMock from "@/shared/api/mock"
import { Comment, CommentId, WrittenComment } from "../types"

import type { ArticleSlug } from "@/entities/article"

const getComment = (comment?: Partial<Comment>) => {
    return {
        ...ApiStoreMock.comments.pool["33550"],
        ...comment,
    } as unknown as Comment
}

const addComment = async (
    slug: ArticleSlug,
    params: WrittenComment
): Promise<Comment> => {
    console.log("article added slug: %s, params: %s", slug, params)
    return getComment(params)
}

const getComments = async (slug: ArticleSlug): Promise<Comment[]> => {
    return Object.values(ApiStoreMock.comments.pool).filter(
        comment => comment.article === slug
    ) as unknown as Comment[]
}

const deleteComment = async (
    slug: ArticleSlug,
    commentId: CommentId
): Promise<void> => {
    console.log("article deleted slug: %s, commentId: %s", slug, commentId)
}

const commentApiMock = {
    addComment,
    getComments,
    deleteComment,
}

export default commentApiMock
