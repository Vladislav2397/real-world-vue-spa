import { ArticleSlug } from "@/shared/domain"
import articles from "./json/article.mock.json"
import comments from "./json/comment.mock.json"
import users from "./json/user.mock.json"

import articleStoreApiMock from "./article"
import commentStoreApiMock from "./comment"

type Articles = {
    pool: Record<
        ArticleSlug,
        {
            slug: ArticleSlug
            title: string
            description: string
            body: string
            tagList: string[]
            createdAt: string
            updatedAt: string
            favoritesCount: number
            author: UserName
        }
    >
    articlesCount: number
}

type Comments = {
    pool: Record<
        string,
        {
            id: number
            createdAt: string
            updatedAt: string
            body: string
            article: string
            author: string
        }
    >
}

type Users = {
    pool: Record<
        UserName,
        {
            username: UserName
            email: string
            bio: string | null
            image: string
            following: UserName[]
            favorites: ArticleSlug[]
        }
    >
    currentUser: UserName | null
    token: string | null
}

const ApiStoreMock = {
    articleStoreApiMock,
    commentStoreApiMock,
    articles: articles as Articles,
    comments: comments as Comments,
    users: users as Users,
}

export { articleStoreApiMock, commentStoreApiMock }

export default ApiStoreMock
