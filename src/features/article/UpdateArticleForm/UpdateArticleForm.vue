<template lang="pug">

article-editor
    button.btn.btn-lg.pull-xs-right.btn-primary(
        type="button"
        @click="publish"
    ) Publish Article

</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import { useModule } from "vuex-simple"
import { isArrayOfStrings } from "@/utils/ArrayUtils"

@Component
export default class UpdateArticleForm extends Vue {
    isLoading = false
    errors: string[] = []

    created() {
        const { slug } = this.$route.params

        if (!slug) return

        this.Article.getItem(slug)
    }

    get Article() {
        return useModule(this.$store, ["article"]) as any
    }

    async toArticleView(slug: ArticleSlug) {
        await this.$router.push({
            name: this.$routesNames.articleView,
            params: { slug },
        })
    }

    async publish(): Promise<void> {
        this.errors = []

        this.isLoading = true
        try {
            const article = await this.Article.update()

            await this.toArticleView(article.slug)
        } catch (e) {
            if (isArrayOfStrings(e)) {
                this.errors = e as string[]
            } else {
                throw e
            }
        } finally {
            this.isLoading = false
        }
    }
}
</script>
