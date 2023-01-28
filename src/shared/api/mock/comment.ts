import { WrittenComment } from "@/entities/comment"
import mockJson from "./json"

const { comments, users } = mockJson

const getCurrentUser = () => {
    return users.pool[users.currentUser!]
}

type CommentActions = {
    add(slug: ArticleSlug, params: WrittenComment): void
    remove(slug: ArticleSlug, commentId: CommentId): void
}

const actions: CommentActions = {
    add(slug, params) {
        const commentId = new Date().getTime()

        const currentDate = new Date().toString()

        comments.pool[commentId] = {
            id: commentId,
            article: slug,
            author: getCurrentUser().username,
            body: "",
            createdAt: currentDate,
            updatedAt: currentDate,
        }
    },
    remove(_, commentId) {
        delete comments.pool[commentId]
    },
}

const commentStoreApiMock = {
    actions,
}

export default commentStoreApiMock
