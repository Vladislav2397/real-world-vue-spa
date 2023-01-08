import data from './article.mock.json'
import { IArticleCreateRequestParams, IArticleUpdateRequestParams } from "@/services/realWorldApi/models"
import IArticle from '@/services/realWorldApi/models/IArticle'

// [origin]/articles?limit=20&offset=0&tag=test
const getArticles = async () => {
    return data
}

type CreateArticleParams = IArticleCreateRequestParams
const createArticle = async (params: CreateArticleParams): Promise<IArticle> => {
    return {
        slug: "string",
        title: params.title,
        description: params.description,
        body: params.body,
        tagList: params.tagList ?? [],
        createdAt: new Date(),
        updatedAt: new Date(),
        favorited: false,
        favoritesCount: 0,
        author: {
            username: "string",
            bio: "string",
            image: null,
            following: false,
        },
    }
}

type UpdateArticleParams = IArticleUpdateRequestParams
const updateArticle = async (
    slug: string,
    params: UpdateArticleParams
): Promise<IArticle> => {
    const article: IArticle = {
        slug: "string",
        title: params.title ?? '',
        description: params.description ?? '',
        body: params.body ?? '',
        tagList: params.tagList ?? [],
        createdAt: new Date(),
        updatedAt: new Date(),
        favorited: false,
        favoritesCount: 0,
        author: {
            username: "string",
            bio: "string",
            image: null,
            following: false,
        },
    }

    return article
}

const articleMock = {
    getArticles,
    createArticle,
    updateArticle,
}

export default articleMock
