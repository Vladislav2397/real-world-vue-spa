import articles from "./article.mock.json"
import comments from "./comment.mock.json"
import tags from "./tags.mock.json"

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

type Tags = {
    pool: Record<string, (typeof tags)["pool"][keyof (typeof tags)["pool"]]>
}

const ApiStoreMock = {
    articles: articles as unknown as Articles,
    comments: comments as unknown as Comments,
    tags: tags as unknown as Tags,
}

export default ApiStoreMock
