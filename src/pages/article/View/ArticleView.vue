<template lang="pug">

common-loader(v-if="isLoading || !article")

div(v-else class="article-page")
    .banner
        .container
            h1 {{ article.title }}
            article-view-actions(
                :article="article"
                @delete-article="onDeleteArticle"
            )
    .container.page
        .row.article-content
            .col-md-12(v-html="HTMLBody")
        hr

        .article-actions
            article-view-actions(
                :article="article"
                @delete-article="onDeleteArticle"
            )
        .row
            article-comments.col-xs-12.col-md-8.offset-md-2(
                :slug="slug"
            )

</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import { Route } from "vue-router"
import { useModule } from "vuex-simple"

import DOMPurify from "dompurify"
import { marked } from "marked"

import { Loader } from "@/shared/ui"
import { CommentList } from "@/entities/comment"

import ArticleViewActions from "@/components/ArticleViewActions.vue"
import { IArticle } from "@/services/realWorldApi/models"

Component.registerHooks(["beforeRouteEnter", "beforeRouteUpdate"])

@Component({
    components: {
        ArticleViewActions,
        "common-loader": Loader,
        "article-comments": CommentList,
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            // @ts-ignore
            vm.onRouteUpdate(to, from, next)
        })
    },
    beforeRouteUpdate(to, from, next) {
        // @ts-ignore
        this.onRouteUpdate(to, from, next)
    },
})
export default class ArticleView extends Vue {
    isLoading = false
    slug = ""
    _article: IArticle | null = null

    get Article() {
        return useModule(this.$store, ["article"]) as any
    }

    get article(): IArticle {
        return this.Article.articlesCache[this.slug] || this._article
    }

    get HTMLBody(): string {
        const dirtyHtml = marked(this.article.body)
        return DOMPurify.sanitize(dirtyHtml)
    }

    async onRouteUpdate(
        to: Route,
        from: Route,
        next: () => void
    ): Promise<void> {
        next()

        this.isLoading = true
        try {
            const toSlug = to?.params?.slug
            const fromSlug = from?.params?.slug
            if (!toSlug) {
                this.$router.push({ name: this.$routesNames.home })
                return
            }
            if (toSlug !== fromSlug) {
                await this.Article.fetchSingle(toSlug)
                this.slug = toSlug
            }
        } catch (e) {
            this.$router.push({ name: this.$routesNames.home })
        } finally {
            this.isLoading = false
        }
    }

    async onDeleteArticle(): Promise<void> {
        this.isLoading = true
        try {
            await this.Article.delete(this.slug)
            this.$router.push({ name: this.$routesNames.home })
        } finally {
            this.isLoading = false
        }
    }
}
</script>
