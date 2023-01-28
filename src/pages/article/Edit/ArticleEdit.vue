<template lang="pug">

common-loader(
    v-if="isLoading"
)
article-editor(
    v-else
    :article="article"
)

</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import { NavigationGuardNext, Route } from "vue-router"
import { useModule } from "vuex-simple"

import { Loader } from "@/shared/ui"
import { ArticleEditor } from "@/entities/article"

import { IArticle } from "@/services/realWorldApi/models"

Component.registerHooks(["beforeRouteEnter", "beforeRouteUpdate"])

@Component({
    components: {
        "common-loader": Loader,
        "article-editor": ArticleEditor,
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
export default class ArticleEdit extends Vue {
    isLoading = false
    article: IArticle | null = null

    get Article() {
        return useModule(this.$store, ["article"]) as any
    }

    async onRouteUpdate(
        to: Route,
        from: Route,
        next: NavigationGuardNext
    ): Promise<void> {
        next()
        // this.isLoading = true
        // try {
        //     const toSlug = to?.params?.slug
        //     const fromSlug = from?.params?.slug
        //
        //     if (!toSlug) {
        //         // this.$router.push({ name: this.$routesNames.home })
        //         next({ name: this.$routesNames.home })
        //         // return
        //     }
        //     if (toSlug !== fromSlug || !this.article) {
        //         await this.Article.fetchSingle(toSlug)
        //         this.article = this.Article.articlesCache[toSlug]
        //     }
        // } catch (e) {
        //     // this.$router.push({ name: this.$routesNames.home })
        //     next({ name: this.$routesNames.home })
        // } finally {
        //     this.isLoading = false
        // }
    }

    created() {
        this.isLoading = true

        try {
            const { slug } = this.$route.params

            if (!slug) return

            this.Article.fetchSingle(slug)
        } catch (error) {
            console.log(error)
        } finally {
            this.isLoading = false
        }
    }
}
</script>
