<template lang="pug">

.editor-page
    .container.page
        .row
            .col-md-10.offset-md-1.col-xs-12
                common-errors-list(:errors="errors")

                form
                    fieldset(:disabled="isLoading")
                        fieldset.form-group
                            input(
                                v-model="title"
                                type="text"
                                class="form-control form-control-lg"
                                placeholder="Article Title"
                                required="true"
                            )
                        fieldset.form-group
                            input(
                                v-model="description"
                                type="text"
                                class="form-control"
                                placeholder="What's this article about?"
                                required="true"
                            )
                        fieldset.form-group
                            textarea(
                                v-model="body"
                                class="form-control"
                                rows="8"
                                placeholder="Write your article (in markdown)"
                                required="true"
                            )
                        fieldset.form-group
                            input(
                                v-model="tagList"
                                type="text"
                                class="form-control"
                                placeholder="Enter tags"
                                required="true"
                            )
                            .tag-list
                                span.tag-default.tag-pill.ng-binding.ng-scope(
                                    v-for="tag in existingTagList"
                                    :key="tag"
                                )
                                    i.ion-close-round(
                                        @click="removeTag(tag)"
                                    )
                                    | &nbsp;{{ tag }}
                        button(
                            class="btn btn-lg pull-xs-right btn-primary"
                            type="button"
                            @click="publish"
                        ) Publish Article

</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator"

import CommonErrorsList from "@/components/CommonErrorsList.vue"
import { IArticle } from "@/services/realWorldApi/models"
import Article from "@/store/modules/Article"
import { isArrayOfStrings } from "@/utils/ArrayUtils"
import { notifySuccess } from "@/utils/NotificationUtils"

@Component({
    components: {
        CommonErrorsList,
    },
})
export default class ArticleEditor extends Vue {
    @Prop() readonly article: IArticle | undefined

    isLoading = false
    // @ts-ignore
    title = this.article?.title || ""
    // @ts-ignore
    description = this.article?.description || ""
    // @ts-ignore
    body = this.article?.body || ""
    tagList = ""
    // @ts-ignore
    existingTagList: string[] = this.article?.tagList?.slice() || []
    errors: string[] = []

    removeTag(tag: string): void {
        const index = this.existingTagList.indexOf(tag)
        this.existingTagList.splice(index, 1)
    }

    async publish(): Promise<void> {
        this.errors = []

        this.isLoading = true
        try {
            let article
            if (this.article) {
                let newTagsList = this.existingTagList.slice()
                if (this.tagList.length > 0) {
                    newTagsList = newTagsList.concat(this.tagList.split(","))
                }
                article = await Article.update({
                    slug: this.article.slug,
                    params: {
                        title: this.title,
                        description: this.description,
                        body: this.body,
                        tagList: newTagsList,
                    },
                })
                notifySuccess("Article was successfully edited, redirecting...")
            } else {
                article = await Article.create({
                    title: this.title,
                    body: this.body,
                    tagList: this.tagList.split(","),
                    description: this.description,
                })
                notifySuccess(
                    "Article was successfully created, redirecting..."
                )
            }

            this.$router.push({
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
