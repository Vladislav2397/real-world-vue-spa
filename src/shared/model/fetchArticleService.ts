// Incorrect import
// TODO: Move api to shared slice
import articleApi from "@/entities/article/api/rest.mock"

class NotifierService {
    static handlers: Record<string, Set<(payload: any) => void>> = {}

    static notifyHandlers(type: string, payload: any) {
        FetchArticleService.handlers[type].forEach(handler => {
            handler(payload)
        })
    }

    static registerSubscribe(type: string, handler: (payload: any) => void) {
        if (FetchArticleService.handlers[type]) {
            FetchArticleService.handlers[type].add(handler)
        } else {
            FetchArticleService.handlers[type] = new Set([handler])
        }
    }
}

class FetchArticleService extends NotifierService {
    async fetchList() {
        const { articles } = await articleApi.getList({})

        FetchArticleService.notifyHandlers("fetchList", articles)
    }
}

export default FetchArticleService
