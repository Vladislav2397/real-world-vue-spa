<template lang="pug">

.editor-page: .container.page: .row: .col-md-10.offset-md-1.col-xs-12
    common-errors-list(:errors="errors")

    form
        fieldset(
            :disabled="isLoading"
        )
            fieldset.form-group
                input.form-control.form-control-lg(
                    v-model="active.title"
                    type="text"
                    placeholder="Article Title"
                    required="true"
                )
            fieldset.form-group
                input.form-control(
                    v-model="active.description"
                    type="text"
                    placeholder="What's this article about?"
                    required="true"
                )
            fieldset.form-group
                textarea.form-control(
                    v-model="active.body"
                    rows="8"
                    placeholder="Write your article (in markdown)"
                    required="true"
                )
            fieldset.form-group
                input.form-control(
                    v-model="active.tagList"
                    type="text"
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
            slot
                button.btn.btn-lg.pull-xs-right.btn-primary(
                    type="button"
                    @click="publish"
                ) Publish Article

</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator"
import { createHelpers } from "vuex-map-fields"
import { useModule } from "vuex-simple"

import { ErrorList } from "@/shared/ui"

import { IArticle } from "@/services/realWorldApi/models"
import { ArticleModule } from "@/entities/article/model"
// import Article from "@/store/modules/Article"
// import { isArrayOfStrings } from "@/utils/ArrayUtils"
// import { notifySuccess } from "@/utils/NotificationUtils"

const { mapFields } = createHelpers({
    getterType: "article/getField",
    mutationType: "article/updateField",
})

@Component({
    components: {
        "common-errors-list": ErrorList,
    },
    computed: {
        ...mapFields({
            active: "active",
            // title: "active.title",
            // description: "active.description",
            // body: "active.body",
            // tagList: "active.tagList",
        }),
    },
})
export default class ArticleEditor extends Vue {
    @Prop() readonly article: IArticle | undefined

    declare active: ArticleModule["active"]

    isLoading = false

    // @ts-ignore
    existingTagList: string[] = this.article?.tagList?.slice() || []
    errors: string[] = []

    get Article() {
        return useModule(this.$store, ["article"]) as any
    }

    removeTag(tag: string): void {
        const index = this.existingTagList.indexOf(tag)
        this.existingTagList.splice(index, 1)
    }

    created() {
        this.Article.resetActive()
    }

    publish() {
        //
    }
    // async publish(): Promise<void> {
    //     this.errors = []
    //
    //     this.isLoading = true
    //     try {
    //         let article
    //
    //         if (this.article) {
    //             let newTagsList = this.existingTagList.slice()
    //             if (this.tagList.length > 0) {
    //                 newTagsList = newTagsList.concat(this.tagList.split(","))
    //             }
    //             article = await this.Article.update({
    //                 slug: this.article.slug,
    //                 params: {
    //                     title: this.title,
    //                     description: this.description,
    //                     body: this.body,
    //                     tagList: newTagsList,
    //                 },
    //             })
    //             notifySuccess("Article was successfully edited, redirecting...")
    //         } else {
    //             article = await this.Article.create({
    //                 title: this.title,
    //                 body: this.body,
    //                 tagList: this.tagList.split(","),
    //                 description: this.description,
    //             })
    //             notifySuccess(
    //                 "Article was successfully created, redirecting..."
    //             )
    //         }
    //
    //         this.$router.push({
    //             name: this.$routesNames.articleView,
    //             params: { slug: article.slug },
    //         })
    //     } catch (e) {
    //         if (isArrayOfStrings(e)) {
    //             this.errors = e as string[]
    //         } else {
    //             throw e
    //         }
    //     } finally {
    //         this.isLoading = false
    //     }
    // }
}
</script>
