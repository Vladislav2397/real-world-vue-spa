import { articleApi } from "@/entities/article"

// eslint-disable-next-line @typescript-eslint/no-empty-function
const articleService = (store: any) => {}

const fetchArticles = async () => {
    const users = []

    const { articles, articlesCount } = await articleApi.getList({})

    articles.forEach(article => {
        users.push(article.author)
    })
}
