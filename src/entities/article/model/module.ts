import { Mutation, Getter, State } from "vuex-simple"

export class ArticleModule {
    @State()
    pool = {}

    @State()
    poolByTags = {}

    @State()
    active = null

    @Mutation()
    updatePool(pool) {
        this.pool = {
            ...this.pool,
            ...pool,
        }
    }

    @Mutation()
    updatePoolByTags(tag: string, slugs: string[]) {
        Vue.set(this.poolByTags, tag, slugs)
    }

    @Getter()
    get articleBySlug() {
        return (slug: string) => this.pool[slug]
    }

    @Getter()
    get articlesByTag() {
        return (tag: string) =>
            this.articlesByTag[tag].map(slug => this.pool[slug])
    }
}
