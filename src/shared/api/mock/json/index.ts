import articles from "./article.mock.json"
import comments from "./comment.mock.json"
import users from "./user.mock.json"

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
    articles: articles as Articles,
    comments: comments as Comments,
    users: users as Users,
}

export default ApiStoreMock
