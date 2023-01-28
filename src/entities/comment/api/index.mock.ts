import mockJson, { commentStoreApiMock } from "@/shared/api/mock"

import { Comment } from "../types"
import { CommentApi } from "./index.types"

const getComment = (comment?: Partial<Comment>) => {
    return {
        ...mockJson.comments.pool["33550"],
        ...comment,
    } as unknown as Comment
}

const commentApiMock: CommentApi = {
    async getList(slug) {
        return Object.values(mockJson.comments.pool).filter(
            comment => comment.article === slug
        ) as unknown as Comment[]
    },
    async add(slug, params) {
        console.log("article added slug: %s, params: %s", slug, params)

        commentStoreApiMock.actions.add(slug, params)

        return getComment(params)
    },
    async remove(slug, commentId) {
        console.log("article deleted slug: %s, commentId: %s", slug, commentId)

        commentStoreApiMock.actions.remove(slug, commentId)
    },
}

export default commentApiMock
