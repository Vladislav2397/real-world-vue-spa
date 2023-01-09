import { Action } from "vuex-simple"
import { articleModel } from "@/entities/article"

export class ArticleModule extends articleModel.ArticleModule {
    @Action()
    create() {
        const slug = "some-1"

        // work with data

        this.updatePool({
            [slug]: {
                slug,
            },
        })
    }

    @Action()
    update() {
        const slug = "some-1"

        this.updatePool({
            [slug]: {
                slug,
            },
        })
    }

    @Action()
    remove() {
        const slug = "some-1"
    }
}
