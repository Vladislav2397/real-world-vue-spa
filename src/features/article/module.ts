import { Action } from "vuex-simple"
import { articleApi, articleModel } from "@/entities/article"
import { notifyErrors, notifySuccess } from "@/utils/NotificationUtils"

export class ArticleModule extends articleModel.ArticleModule {
    notifier = {
        notifySuccess,
        notifyErrors,
    }

    @Action()
    async create() {
        try {
            const article = await articleApi.create(this.active)

            this.addArticleToCache(article)

            this.notifier.notifySuccess(
                "Article was successfully created, redirecting..."
            )

            return article
        } catch (error) {
            this.notifier.notifyErrors(["Article was not created"])
            throw new Error("Article was not created")
        }
    }
    //
    // @Action()
    // update() {
    //     const slug = "some-1"
    //
    //     // @ts-ignore
    //     this.updatePool({
    //         [slug]: {
    //             slug,
    //         },
    //     })
    // }
    //
    // @Action()
    // remove() {
    //     const slug = "some-1"
    // }
}
