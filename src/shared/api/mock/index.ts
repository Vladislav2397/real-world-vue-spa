import articles from "./article.mock.json"
import comments from "./comment.mock.json"

type Articles = {
    pool: Record<
        string,
        (typeof articles)["pool"][keyof (typeof articles)["pool"]]
    >
    articlesCount: (typeof articles)["articlesCount"]
}

type Comments = {
    pool: Record<
        string,
        (typeof comments)["pool"][keyof (typeof comments)["pool"]]
    >
}

const ApiStoreMock = {
    articles: articles as unknown as Articles,
    comments: comments as unknown as Comments,
}

export default ApiStoreMock
