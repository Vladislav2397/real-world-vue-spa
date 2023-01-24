<template lang="pug">

article-editor
    button.btn.btn-lg.pull-xs-right.btn-primary(
        type="button"
        @click="publish"
    ) Publish Article

</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"

import { ArticleEditor } from "@/entities/article"
import { useModule } from "vuex-simple"
import { isArrayOfStrings } from "@/utils/ArrayUtils"
import { notifySuccess } from "@/utils/NotificationUtils"

@Component({
    components: { ArticleEditor },
})
export default class CreateArticleForm extends Vue {
    isLoading = false
    errors: string[] = []

    article = {
        slug: "",
    }

    title = ""
    description = ""
    body = ""
    tagList: string[] = []

    get Article() {
        return useModule(this.$store, ["article"]) as any
    }

    get existingTagList() {
        return []
    }

    async publish(): Promise<void> {
        this.errors = []

        this.isLoading = true
        try {
            let article

            article = await this.Article.create()
            notifySuccess("Article was successfully created, redirecting...")

            await this.$router.push({
                name: this.$routesNames.articleView,
                params: { slug: article.slug },
            })
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
